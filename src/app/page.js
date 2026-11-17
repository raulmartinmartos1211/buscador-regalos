'use client';
import { useState } from 'react';

export default function Home() {
  const [destinatario, setDestinatario] = useState('');
  const [presupuesto, setPresupuesto] = useState('50');
  const [intereses, setIntereses] = useState('');
  const [regalos, setRegalos] = useState([]);
  const [cargando, setCargando] = useState(false);

  const buscarRegalos = async (e) => {
    e.preventDefault();
    setCargando(true);
    setRegalos([]);
    try {
      const res = await fetch('/api/recomendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destinatario, presupuesto, intereses }),
      });
      const data = await res.json();
      if (data.regalos) {
        setRegalos(data.regalos);
      } else if (data.error) {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Hubo un error al buscar regalos. Revisa la consola.');
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-amber-400 to-rose-500 bg-clip-text text-transparent mb-3">
          Buscador de Regalos con IA
        </h1>
        <p className="text-slate-400 text-center mb-8">
          Dinos para quién es y qué le gusta. Nuestra IA encontrará el regalo perfecto en segundos.
        </p>

        <form onSubmit={buscarRegalos} className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">¿Para quién es?</label>
              <input
                type="text"
                required
                placeholder="Ej: Mi padre de 60 años, mi pareja..."
                value={destinatario}
                onChange={(e) => setDestinatario(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-amber-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Presupuesto máximo (€)</label>
              <input
                type="number"
                required
                min="5"
                value={presupuesto}
                onChange={(e) => setPresupuesto(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-amber-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">Aficiones, gustos o pistas</label>
            <textarea
              required
              rows="3"
              placeholder="Ej: Le encanta el café de especialidad, salir a correr por la montaña y leer novela negra..."
              value={intereses}
              onChange={(e) => setIntereses(e.target.value)}
              className="w-full p-3 rounded-xl bg-slate-800 border border-slate-700 focus:border-amber-400 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full py-3.5 rounded-xl font-bold bg-gradient-to-r from-amber-500 to-rose-500 hover:opacity-90 transition disabled:opacity-50 cursor-pointer"
          >
            {cargando ? 'Pensando ideas originales...' : 'Encontrar Regalos Ideales'}
          </button>
        </form>

        {regalos.length > 0 && (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-5">
            {regalos.map((regalo, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h2 className="text-lg font-bold text-amber-400">{regalo.titulo}</h2>
                    <span className="text-xs bg-slate-800 px-2.5 py-1 rounded-full text-slate-300 shrink-0">
                      {regalo.precioEstimado}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 mb-4">{regalo.descripcion}</p>
                </div>
                <a
                  href={regalo.urlAmazon}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center py-2.5 px-4 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 transition"
                >
                  Ver opciones en Amazon →
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}