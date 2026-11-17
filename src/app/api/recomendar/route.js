import { NextResponse } from 'next/server';

function limpiarBusquedaAmazon(texto = '') {
  return texto
    .replace(/\b(amazon(\.es)?|comprar|online|espa[ñn]a|regalo(s)?\s+para)\b/gi, '')
    .replace(/[^\w\sáéíóúüñÁÉÍÓÚÜÑ-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function POST(request) {
  try {
    const { destinatario, presupuesto, intereses } = await request.json();
    const tag = process.env.AMAZON_TAG || 'raulmartin04-21';
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey) {
      throw new Error('Falta configurar GROQ_API_KEY');
    }

    const modelsRes = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { Authorization: `Bearer ${apiKey}` },
    });
    const modelsData = await modelsRes.json();

    if (!modelsRes.ok) {
      throw new Error(modelsData.error?.message || 'Clave de Groq inválida');
    }

    const disponibles = (modelsData.data || []).map((m) => m.id);
    const modeloElegido =
      disponibles.find((id) => id.includes('llama') && !id.includes('guard')) ||
      disponibles.find(
        (id) =>
          (id.includes('qwen') || id.includes('gemma') || id.includes('gpt') || id.includes('mixtral')) &&
          !id.includes('guard')
      ) ||
      disponibles.find(
        (id) =>
          !id.includes('whisper') &&
          !id.includes('guard') &&
          !id.includes('orpheus') &&
          !id.includes('arabic')
      );

    if (!modeloElegido) {
      throw new Error('No hay modelos activos en tu proyecto de Groq.');
    }

    const presupuestoNum = Number(presupuesto) || 50;

    const prompt = `Actúa como un personal shopper y estratega de comercio electrónico experto en Amazon España.
Tu objetivo es recomendar exactamente 4 productos físicos REALES, concretos, de alta demanda y muy bien valorados en Amazon España para:
- Objetivo / Destinatario: ${destinatario}
- Presupuesto máximo: ${presupuestoNum}€
- Contexto, modo y preferencias: ${intereses}

Reglas estrictas para maximizar conversión y satisfacción del comprador:
1. Cada propuesta debe ser un producto físico real y muy vendible en Amazon España (nunca tarjetas regalo, suscripciones ni experiencias intangibles).
2. Aprovecha bien el presupuesto: prioriza productos cuyo precio habitual esté entre el 60% y el 100% de ${presupuestoNum}€ (sin pasarse de ${presupuestoNum}€) para ofrecer máxima calidad.
3. Los 4 productos deben ser de tipos distintos entre sí (variedad real de soluciones).
4. En "busquedaAmazon" escribe SOLO 3 a 5 palabras clave exactas del producto en español para encontrarlo a la primera en Amazon (ej. "cafetera italiana acero inoxidable", "auriculares inalambricos cancelacion ruido"). NUNCA incluyas "amazon", "comprar" ni "regalo".
5. En "busquedaAlternativa" escribe 2 o 3 palabras clave más amplias de la categoría para comparar modelos (ej. "cafeteras espresso", "auriculares bluetooth").
6. En "titulo" pon un nombre claro, atractivo y específico (máximo 55 caracteres) que incluya la palabra clave principal del objeto.
7. En "porQueDestaca" pon una etiqueta corta de 3-4 palabras (ej. "Top ventas en su gama", "Calidad-precio imbatible", "Diseño premium duradero", "Acierto 100% práctico").
8. En "descripcion" explica en 2 frases directas y persuasivas el beneficio real y por qué encaja exactamente con lo pedido.

Devuelve ÚNICAMENTE un JSON válido con esta estructura exacta:
{
  "regalos": [
    {
      "titulo": "Nombre del producto",
      "porQueDestaca": "Etiqueta corta de valor",
      "descripcion": "Explicación persuasiva en 2 frases.",
      "precioEstimado": "~45€",
      "busquedaAmazon": "palabras clave exactas",
      "busquedaAlternativa": "categoria amplia"
    }
  ]
}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modeloElegido,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.65,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Error en Groq API');
    }

    const parsed = JSON.parse(data.choices[0].message.content);
    const lista = Array.isArray(parsed) ? parsed : parsed.regalos || Object.values(parsed)[0];

    const regalos = (lista || []).slice(0, 4).map((item) => {
      const queryLimpia = limpiarBusquedaAmazon(item.busquedaAmazon || item.titulo);
      const queryAlt = limpiarBusquedaAmazon(item.busquedaAlternativa || queryLimpia);

      return {
        ...item,
        busquedaAmazon: queryLimpia,
        urlAmazon: `https://www.amazon.es/s?k=${encodeURIComponent(queryLimpia)}&rh=p_72%3A831280031&tag=${tag}`,
        urlComparar: `https://www.amazon.es/s?k=${encodeURIComponent(queryAlt)}&tag=${tag}`,
      };
    });

    return NextResponse.json({ regalos });
  } catch (error) {
    console.error('Error en API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}