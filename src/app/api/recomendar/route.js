import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { destinatario, presupuesto, intereses } = await request.json();
    const tag = process.env.AMAZON_TAG || 'pruebaregalos-21';
    const apiKey = process.env.GROQ_API_KEY;

    // 1. Consultar qué modelos tienes activos en tu cuenta de Groq
    const modelsRes = await fetch('https://api.groq.com/openai/v1/models', {
      headers: { 'Authorization': `Bearer ${apiKey}` },
    });
    const modelsData = await modelsRes.json();

    if (!modelsRes.ok) {
      throw new Error(modelsData.error?.message || 'Clave de Groq inválida');
    }

    // 2. Elegir un modelo de texto válido
    const disponibles = (modelsData.data || []).map((m) => m.id);
    console.log('Modelos activos en tu cuenta:', disponibles);

const modeloElegido =
  disponibles.find((id) => id.includes('llama') && !id.includes('guard')) ||
  disponibles.find((id) => (id.includes('qwen') || id.includes('gemma') || id.includes('gpt') || id.includes('mixtral')) && !id.includes('guard')) ||
  disponibles.find((id) => !id.includes('whisper') && !id.includes('guard') && !id.includes('orpheus') && !id.includes('arabic'));

    if (!modeloElegido) {
      throw new Error('No hay modelos activos en tu proyecto de Groq. Actívalos en console.groq.com/settings/limits');
    }

    const prompt = `Actúa como un experto asesor de compras y regalos.
    Recomienda exactamente 4 ideas de regalo originales, concretas y fáciles de encontrar en Amazon España para:
    - Persona: ${destinatario}
    - Presupuesto máximo aproximado: ${presupuesto}€
    - Gustos o detalles: ${intereses}

    Devuelve ÚNICAMENTE un objeto JSON válido con la clave "regalos" que contenga un array de 4 objetos con estas claves exactas:
    "titulo" (nombre atractivo del regalo),
    "descripcion" (por qué le va a encantar, máximo 2 frases),
    "precioEstimado" (ej: "~35€"),
    "busquedaAmazon" (palabras clave exactas para buscar ese producto en Amazon).`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: modeloElegido,
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.error?.message || 'Error en Groq API');
    }

    const parsed = JSON.parse(data.choices[0].message.content);
    const lista = Array.isArray(parsed) ? parsed : (parsed.regalos || Object.values(parsed)[0]);

    const regalos = lista.map((item) => ({
      ...item,
      urlAmazon: `https://www.amazon.es/s?k=${encodeURIComponent(item.busquedaAmazon)}&tag=${tag}`,
    }));

    return NextResponse.json({ regalos });
  } catch (error) {
    console.error('Error en API:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}