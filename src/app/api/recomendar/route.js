import { NextResponse } from 'next/server';

function limpiarBusquedaAmazon(texto = '') {
  return texto
    .replace(/\b(amazon(\.es)?|comprar|online|espa[ñn]a|regalo(s)?\s+para)\b/gi, '')
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

    const prompt = `Actúa como un personal shopper experto en regalos de alto impacto y alta valoración en Amazon España.
Recomienda exactamente 4 ideas de regalo distintas entre sí, concretas, comprables hoy mismo y ajustadas al presupuesto para:
- Destinatario: ${destinatario}
- Presupuesto máximo: ${presupuesto}€
- Contexto y gustos: ${intereses}

Reglas estrictas para maximizar acierto y conversión:
1. Cada propuesta debe ser un producto físico real y específico (nunca tarjetas regalo, suscripciones ni experiencias abstractas).
2. Ajusta el precio estimado de cada producto para que esté dentro o ligeramente por debajo de ${presupuesto}€.
3. En "busquedaAmazon" escribe SOLO 3 a 5 palabras clave limpias del producto en español (ejemplo: "cafetera italiana acero inoxidable", "marco fotos digital wifi"). NUNCA incluyas las palabras "amazon", "comprar" ni "regalo".
4. En "titulo" pon un nombre atractivo y elegante (máximo 55 caracteres).
5. En "descripcion" explica en 2 frases cortas por qué encaja con esa persona y qué problema o deseo resuelve.

Devuelve ÚNICAMENTE un JSON válido con esta estructura exacta:
{
  "regalos": [
    {
      "titulo": "Nombre del producto",
      "descripcion": "Explicación persuasiva y cercana.",
      "precioEstimado": "~45€",
      "busquedaAmazon": "palabras clave limpias"
    }
  ]
}`;

    const consultarGroq = async (modelo) => {
      return fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: modelo,
          messages: [{ role: 'user', content: prompt }],
          response_format: { type: 'json_object' },
          temperature: 0.65,
        }),
      });
    };

    // Llamada directa al modelo principal de alta calidad (sin perder tiempo listando modelos)
    let response = await consultarGroq('llama-3.3-70b-versatile');

    // Respaldo automático si el modelo principal no estuviera disponible
    if (!response.ok) {
      response = await consultarGroq('llama-3.1-8b-instant');
    }

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Error en Groq API');
    }

    const parsed = JSON.parse(data.choices[0].message.content);
    const lista = Array.isArray(parsed) ? parsed : parsed.regalos || Object.values(parsed)[0];

    const regalos = (lista || []).slice(0, 4).map((item) => {
      const queryLimpia = limpiarBusquedaAmazon(item.busquedaAmazon || item.titulo);
      return {
        ...item,
        busquedaAmazon: queryLimpia,
        urlAmazon: `https://www.amazon.es/s?k=${encodeURIComponent(queryLimpia)}&tag=${tag}`,
      };
    });

    return NextResponse.json({ regalos });
  } catch (error) {
    console.error('Error en API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}