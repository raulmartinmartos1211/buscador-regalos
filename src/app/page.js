'use client';
import { useState, useEffect } from 'react';

const PERFILES_FAMILIA = [
  {
    label: 'Pareja',
    emoji: '🥂',
    destinatario: 'Mi pareja',
    ocasion: 'Aniversario',
    estilo: 'Original y sorprendente',
    presupuesto: '80',
    intereses: 'Detalles con estilo, experiencias gastronómicas, café de especialidad o escapadas de fin de semana',
  },
  {
    label: 'Madre',
    emoji: '🌸',
    destinatario: 'Mi madre',
    ocasion: 'Cumpleaños',
    estilo: 'Emotivo / Sentimental',
    presupuesto: '60',
    intereses: 'Bienestar personal, aromaterapia, decoración acogedora para casa, lectura o cocina creativa',
  },
  {
    label: 'Padre',
    emoji: '⌚',
    destinatario: 'Mi padre',
    ocasion: 'Cumpleaños',
    estilo: 'Práctico y útil',
    presupuesto: '65',
    intereses: 'Accesorios prácticos con buen diseño, café o vino, bricolaje, música o paseos al aire libre',
  },
  {
    label: 'Abuelo',
    emoji: '📻',
    destinatario: 'Mi abuelo',
    ocasion: 'Cumpleaños',
    estilo: 'Emotivo / Sentimental',
    presupuesto: '50',
    intereses: 'Comodidad en casa, recuerdos familiares, lectura fácil, juegos clásicos, jardinería o buenos dulces',
  },
  {
    label: 'Abuela',
    emoji: '🫖',
    destinatario: 'Mi abuela',
    ocasion: 'Detalle especial',
    estilo: 'Emotivo / Sentimental',
    presupuesto: '50',
    intereses: 'Infusiones y repostería, álbumes de fotos familiares, mantas suaves, bienestar y detalles emotivos',
  },
  {
    label: 'Hijo / Hija',
    emoji: '🚀',
    destinatario: 'Mi hijo/a',
    ocasion: 'Cumpleaños',
    estilo: 'Tech & Diseño',
    presupuesto: '70',
    intereses: 'Tecnología útil, creatividad, deporte, música o accesorios modernos para su habitación y día a día',
  },
  {
    label: 'Hermano/a',
    emoji: '🎧',
    destinatario: 'Mi hermano/a',
    ocasion: 'Cumpleaños',
    estilo: 'Tech & Diseño',
    presupuesto: '50',
    intereses: 'Gadgets originales, deporte, viajes, café o accesorios prácticos para el trabajo y ocio',
  },
  {
    label: 'Primo/a',
    emoji: '🎲',
    destinatario: 'Mi primo/a',
    ocasion: 'Amigo Invisible',
    estilo: 'Original y sorprendente',
    presupuesto: '35',
    intereses: 'Juegos de mesa para reuniones, accesorios divertidos pero útiles, música o gadgets curiosos',
  },
  {
    label: 'Amigo/a',
    emoji: '✨',
    destinatario: 'Un buen amigo/a',
    ocasion: 'Cumpleaños',
    estilo: 'Gourmet & Hogar',
    presupuesto: '45',
    intereses: 'Detalles originales con personalidad, gastronomía, deporte, viajes o decoración minimalista',
  },
];

const OCASIONES = ['Cumpleaños', 'Aniversario', 'Navidad / Reyes', 'Amigo Invisible', 'Detalle especial'];

const ESTILOS_REGALO = [
  'Práctico y útil',
  'Original y sorprendente',
  'Emotivo / Sentimental',
  'Tech & Diseño',
  'Gourmet & Hogar',
];

const PRESUPUESTOS = ['25', '50', '100', '200'];

const COLECCIONES_FAMILIA = [
  {
    etiqueta: 'PARA ABUELOS',
    titulo: 'Recuerdos, Confort & Tradición',
    rango: '30€ – 65€',
    descripcion: 'Marcos digitales con fotos familiares, teteras elegantes y detalles cálidos para disfrutar en casa.',
    imagen: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=300&q=80',
    perfil: {
      destinatario: 'Mis abuelos',
      ocasion: 'Navidad / Reyes',
      estilo: 'Emotivo / Sentimental',
      presupuesto: '60',
      intereses: 'Les encanta ver fotos de la familia, estar cómodos en el salón, tomar té o café tranquilo y los detalles con valor sentimental',
    },
  },
  {
    etiqueta: 'PARA MADRES',
    titulo: 'Ritual de Calma & Hogar',
    rango: '40€ – 85€',
    descripcion: 'Difusores de aromas, sets de cuidado personal, iluminación cálida y piezas con diseño.',
    imagen: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=300&q=80',
    perfil: {
      destinatario: 'Mi madre',
      ocasion: 'Cumpleaños',
      estilo: 'Gourmet & Hogar',
      presupuesto: '70',
      intereses: 'Disfruta cuidando los detalles de casa, relajarse leyendo, las velas aromáticas, el bienestar y los accesorios elegantes',
    },
  },
  {
    etiqueta: 'PARA PADRES',
    titulo: 'Gourmet, Café & Precisión',
    rango: '45€ – 95€',
    descripcion: 'Cafeteras de especialidad, accesorios de vino, herramientas compactas y audio.',
    imagen: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80',
    perfil: {
      destinatario: 'Mi padre',
      ocasion: 'Cumpleaños',
      estilo: 'Práctico y útil',
      presupuesto: '80',
      intereses: 'Le gusta el buen café por la mañana, cocinar los fines de semana, los gadgets bien construidos y las cosas duraderas',
    },
  },
  {
    etiqueta: 'HIJOS & JÓVENES',
    titulo: 'Tech, Música & Creatividad',
    rango: '35€ – 110€',
    descripcion: 'Auriculares inalámbricos, luces ambientales LED, altavoces portátiles y accesorios.',
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
    perfil: {
      destinatario: 'Mi hijo joven',
      ocasion: 'Cumpleaños',
      estilo: 'Tech & Diseño',
      presupuesto: '90',
      intereses: 'Le encanta escuchar música, decorar su escritorio o habitación, la tecnología práctica y el deporte',
    },
  },
  {
    etiqueta: 'PRIMOS & AMIGOS',
    titulo: 'Planes, Juegos & Originalidad',
    rango: '20€ – 45€',
    descripcion: 'Juegos de mesa dinámicos, gadgets ingeniosos y regalos ideales para amigo invisible.',
    imagen: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=300&q=80',
    perfil: {
      destinatario: 'Mi primo y amigos',
      ocasion: 'Amigo Invisible',
      estilo: 'Original y sorprendente',
      presupuesto: '35',
      intereses: 'Le gustan las reuniones con amigos, los juegos de mesa rápidos, el humor inteligente y los gadgets útiles',
    },
  },
  {
    etiqueta: 'DEPORTE & ENERGÍA',
    titulo: 'Bienestar & Entrenamiento',
    rango: '35€ – 75€',
    descripcion: 'Pistolas de masaje muscular, botellas térmicas de acero y accesorios fitness.',
    imagen: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=300&q=80',
    perfil: {
      destinatario: 'Familiar deportista',
      ocasion: 'Cumpleaños',
      estilo: 'Práctico y útil',
      presupuesto: '65',
      intereses: 'Va al gimnasio o sale a correr, le gusta cuidarse, recuperar bien después de entrenar y los accesorios deportivos',
    },
  },
];

const PREGUNTAS_FRECUENTES = [
  {
    pregunta: '¿Tiene algún coste utilizar RegaloIdeal?',
    respuesta:
      'No, el servicio es 100% gratuito para ti. Puedes hacer tantas búsquedas como quieras para distintos familiares o amigos sin necesidad de crear cuenta ni suscribirte. Los precios en Amazon son exactamente los mismos que si entraras por tu cuenta.',
  },
  {
    pregunta: '¿Cómo funciona la selección de los 4 regalos?',
    respuesta:
      'Analizamos la relación con la persona (madre, abuelo, pareja, amigo...), su edad, la ocasión especial, el estilo que buscas y tu presupuesto máximo para filtrar propuestas concretas, originales y bien valoradas, evitando los típicos regalos aburridos.',
  },
  {
    pregunta: '¿Dónde se realiza la compra, el pago y el envío?',
    respuesta:
      'Al pulsar en "Ver en Amazon", te llevamos directamente a la tienda oficial de Amazon España. Allí puedes comparar marcas, leer opiniones de otros compradores, elegir envoltorio de regalo y disfrutar de envío rápido Prime y devolución garantizada.',
  },
  {
    pregunta: '¿Se guardan mis regalos favoritos si cierro la página?',
    respuesta:
      'Sí. Todo lo que marques con el corazón (♡) se queda guardado automáticamente en tu navegador, incluso si cierras la pestaña o vuelves mañana desde el mismo móvil u ordenador, para que puedas comparar con calma.',
  },
  {
    pregunta: '¿Puedo compartir una idea o toda mi lista por WhatsApp?',
    respuesta:
      'Sí. En cada recomendación tienes un botón directo de WhatsApp y otro para copiar el texto listo con el nombre del regalo, precio estimado y enlace directo, ideal si vais a hacer un regalo conjunto en familia.',
  },
  {
    pregunta: '¿Los precios mostrados en las tarjetas son exactos?',
    respuesta:
      'Te mostramos una estimación muy aproximada ajustada al presupuesto que nos has marcado para que te hagas una idea clara antes de entrar. El precio final y las ofertas flash del día se confirman directamente en la ficha de Amazon.',
  },
];

function obtenerMiniaturaRegalo(titulo = '', descripcion = '', index = 0) {
  const texto = `${titulo} ${descripcion}`.toLowerCase();
  if (texto.includes('café') || texto.includes('cafe') || texto.includes('cafetera') || texto.includes('taza') || texto.includes('cocina') || texto.includes('vino') || texto.includes('té') || texto.includes('tetera')) {
    return 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=300&q=80';
  }
  if (texto.includes('gym') || texto.includes('deporte') || texto.includes('entren') || texto.includes('masaje') || texto.includes('fitness') || texto.includes('botella')) {
    return 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=300&q=80';
  }
  if (texto.includes('auricular') || texto.includes('reloj') || texto.includes('altavoz') || texto.includes('luz') || texto.includes('cámara') || texto.includes('gadget') || texto.includes('digital')) {
    return 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80';
  }
  if (texto.includes('libro') || texto.includes('lectura') || texto.includes('vela') || texto.includes('hogar') || texto.includes('manta') || texto.includes('álbum') || texto.includes('foto') || texto.includes('marco')) {
    return 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?auto=format&fit=crop&w=300&q=80';
  }
  const miniaturas = [
    'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&w=300&q=80',
    'https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=300&q=80',
  ];
  return miniaturas[index % miniaturas.length];
}

function LogoRMM({ size = 'md' }) {
  const dimensiones = size === 'sm' ? 'w-9 h-9' : 'w-11 h-11';
  return (
    <div className={`relative ${dimensiones} rounded-xl bg-gradient-to-br from-[#F7E3B5] via-[#D4AF37] to-[#7D5C19] p-[1.5px] shadow-[0_0_25px_rgba(212,175,55,0.3)] group-hover:scale-105 transition duration-300 shrink-0`}>
      <div className="w-full h-full rounded-[10.5px] bg-[#070A13] flex items-center justify-center relative overflow-hidden">
        <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#E5C17B]/15 blur-sm" />
        <svg viewBox="0 0 64 64" className="w-full h-full p-1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldText" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFF1CC" />
              <stop offset="50%" stopColor="#E5C17B" />
              <stop offset="100%" stopColor="#B8892D" />
            </linearGradient>
            <linearGradient id="smileGold" x1="12" y1="42" x2="52" y2="42" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="55%" stopColor="#FFF0C2" />
              <stop offset="100%" stopColor="#E59838" />
            </linearGradient>
          </defs>
          <path d="M32 6L33.6 10.4L38 12L33.6 13.6L32 18L30.4 13.6L26 12L30.4 10.4L32 6Z" fill="url(#goldText)" />
          <text
            x="32"
            y="36"
            textAnchor="middle"
            fill="url(#goldText)"
            fontSize="17"
            fontWeight="900"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="1.2"
          >
            RMM
          </text>
          <path
            d="M14 44C23 51.5 41 51.5 50 43.5"
            stroke="url(#smileGold)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          <path
            d="M45.5 41.8L51.2 43.1L49.4 48.6"
            stroke="url(#smileGold)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}

export default function Home() {
  const [destinatario, setDestinatario] = useState('');
  const [ocasion, setOcasion] = useState('Cumpleaños');
  const [estilo, setEstilo] = useState('Práctico y útil');
  const [presupuesto, setPresupuesto] = useState('50');
  const [intereses, setIntereses] = useState('');
  const [perfilActivo, setPerfilActivo] = useState('');
  const [regalos, setRegalos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [copiado, setCopiado] = useState(null);
  const [faqAbierta, setFaqAbierta] = useState(0);
  const [mostrarSubir, setMostrarSubir] = useState(false);

  // Cargar favoritos persistentes desde localStorage
  useEffect(() => {
    try {
      const guardados = localStorage.getItem('rmm_regalos_favoritos');
      if (guardados) {
        setFavoritos(JSON.parse(guardados));
      }
    } catch (e) {
      // Ignorar si localStorage no está disponible
    }
  }, []);

  // Guardar favoritos automáticamente cada vez que cambien
  useEffect(() => {
    try {
      localStorage.setItem('rmm_regalos_favoritos', JSON.stringify(favoritos));
    } catch (e) {
      // Ignorar errores de almacenamiento
    }
  }, [favoritos]);

  useEffect(() => {
    const manejarScroll = () => {
      setMostrarSubir(window.scrollY > 280);
    };
    window.addEventListener('scroll', manejarScroll);
    return () => window.removeEventListener('scroll', manejarScroll);
  }, []);

  const volverAlInicio = (limpiar = false) => {
    if (limpiar) {
      setRegalos([]);
      setPerfilActivo('');
      setDestinatario('');
      setIntereses('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const ejecutarBusqueda = async (datos = null) => {
    const dest = datos ? datos.destinatario : destinatario;
    const ocas = datos ? datos.ocasion : ocasion;
    const est = datos ? datos.estilo : estilo;
    const pres = datos ? datos.presupuesto : presupuesto;
    const inter = datos ? datos.intereses : intereses;

    if (!dest.trim() || !inter.trim()) return;

    setCargando(true);
    setRegalos([]);

    setTimeout(() => {
      document.getElementById('zona-resultados')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

    try {
      const contextoCompleto = `Ocasión: ${ocas}. Enfoque/estilo deseado: ${est}. Gustos y pistas: ${inter}`;
      const res = await fetch('/api/recomendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ destinatario: dest, presupuesto: pres, intereses: contextoCompleto }),
      });
      const data = await res.json();
      if (data.regalos) {
        setRegalos(data.regalos);
      } else if (data.error) {
        alert('Error: ' + data.error);
      }
    } catch (err) {
      alert('Hubo un problema de conexión. Inténtalo de nuevo.');
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    ejecutarBusqueda();
  };

  const seleccionarPerfilRapido = (p) => {
    setPerfilActivo(p.label);
    setDestinatario(p.destinatario);
    setOcasion(p.ocasion);
    setEstilo(p.estilo);
    setPresupuesto(p.presupuesto);
    setIntereses(p.intereses);
  };

  const probarColeccion = (perfil) => {
    setPerfilActivo('');
    setDestinatario(perfil.destinatario);
    setOcasion(perfil.ocasion);
    setEstilo(perfil.estilo);
    setPresupuesto(perfil.presupuesto);
    setIntereses(perfil.intereses);
    ejecutarBusqueda(perfil);
  };

  const toggleFavorito = (regalo) => {
    const existe = favoritos.some((f) => f.titulo === regalo.titulo);
    if (existe) {
      setFavoritos(favoritos.filter((f) => f.titulo !== regalo.titulo));
    } else {
      setFavoritos([...favoritos, regalo]);
    }
  };

  const compartirRegalo = (regalo, id) => {
    const texto = `Mira esta idea de regalo para ${destinatario || 'ti'} 🎁\n*${regalo.titulo}* (${regalo.precioEstimado})\n${regalo.descripcion}\nVer en Amazon: ${regalo.urlAmazon}`;
    navigator.clipboard.writeText(texto);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2200);
  };

  const abrirWhatsAppRegalo = (regalo) => {
    const mensaje = encodeURIComponent(
      `¡Mira esta idea de regalo! 🎁\n*${regalo.titulo}* (${regalo.precioEstimado})\n${regalo.descripcion}\nVer en Amazon: ${regalo.urlAmazon}`
    );
    window.open(`https://wa.me/?text=${mensaje}`, '_blank', 'noopener,noreferrer');
  };

  const abrirWhatsAppListaFavoritos = () => {
    const items = favoritos
      .map((f, idx) => `${idx + 1}. *${f.titulo}* (${f.precioEstimado})\n👉 ${f.urlAmazon}`)
      .join('\n\n');
    const mensaje = encodeURIComponent(`Esta es mi selección de ideas de regalo en RegaloIdeal 🎁:\n\n${items}`);
    window.open(`https://wa.me/?text=${mensaje}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="inicio" className="min-h-screen bg-[#05070E] text-[#F4F1EA] flex flex-col relative overflow-x-hidden pb-24 sm:pb-0 selection:bg-[#E5C17B]/30 selection:text-[#F7E3B5]">
      {/* RESPLANDOR DE LUJO SUTIL */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[680px] h-[380px] rounded-full bg-[#D4AF37]/[0.09] blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#9E7B3A]/[0.06] blur-[140px]" />
      </div>

      {/* BARRA SUPERIOR CONCIERGE */}
      <div className="relative z-20 bg-[#0A0E1A] border-b border-[#E5C17B]/15 py-1.5 px-4 text-center">
        <p className="text-[10px] sm:text-xs tracking-[0.16em] uppercase text-[#E5C17B]/90 font-medium">
          RMM Gift Concierge • Selección Oficial en Amazon España
        </p>
      </div>

      {/* NAVBAR FIJA EN TODO MOMENTO CON LOGO RMM Y BOTÓN HOME */}
      <header className="sticky top-0 z-50 backdrop-blur-2xl bg-[#05070E]/90 border-b border-white/[0.07] shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-[68px] flex items-center justify-between">
          <button
            type="button"
            onClick={() => volverAlInicio(false)}
            className="flex items-center gap-3 group text-left cursor-pointer"
          >
            <LogoRMM size="md" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg tracking-tight leading-none text-white">
                  Regalo<span className="text-[#E5C17B]">Ideal</span>
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#E5C17B]/15 text-[#E5C17B] border border-[#E5C17B]/30">
                  RMM
                </span>
              </div>
              <span className="text-[10px] tracking-[0.12em] text-slate-400 mt-1">
                Raúl Martín Martos
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.14em] font-medium text-slate-400">
            <button
              type="button"
              onClick={() => volverAlInicio(false)}
              className="text-[#E5C17B] hover:text-white transition flex items-center gap-1.5 font-bold cursor-pointer"
            >
              <span>⌂</span> Home
            </button>
            <a href="#colecciones" className="hover:text-[#E5C17B] transition">Por familiar</a>
            <a href="#metodo" className="hover:text-[#E5C17B] transition">Método</a>
            <a href="#faq" className="hover:text-[#E5C17B] transition">Preguntas</a>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => volverAlInicio(false)}
              title="Volver arriba al inicio"
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full bg-gradient-to-r from-[#F7E3B5]/15 to-[#D4AF37]/15 hover:from-[#F7E3B5] hover:to-[#D4AF37] text-[#F7E3B5] hover:text-[#05070E] border border-[#E5C17B]/35 transition cursor-pointer"
            >
              <span className="text-sm leading-none">⌂</span>
              <span>Home</span>
            </button>

            {favoritos.length > 0 && (
              <a
                href="#favoritos"
                className="flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-full bg-rose-500/15 text-rose-300 border border-rose-500/35 transition"
              >
                <span>♥</span>
                <span>{favoritos.length}</span>
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        {/* HERO COMPACTO MOBILE-FIRST */}
        <section id="buscador" className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-14 pb-14">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-[#E5C17B]/25 text-[11px] uppercase tracking-[0.15em] text-[#E5C17B] font-semibold mb-4">
              ✦ Para padres, abuelos, hijos, primos y amigos
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.12] mb-4 text-white">
              El arte de acertar con{' '}
              <span className="bg-gradient-to-r from-[#F7E3B5] via-[#E5C17B] to-[#C69749] bg-clip-text text-transparent">
                quienes más quieres
              </span>
            </h1>

            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              Elige a quién quieres sorprender y descubre al instante 4 ideas con personalidad, disponibles en Amazon España y ajustadas a tu presupuesto.
            </p>
          </div>

          {/* PANEL DE BÚSQUEDA DE LUJO */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#0B0F1C]/95 backdrop-blur-xl p-5 sm:p-8 rounded-3xl border border-[#E5C17B]/20 shadow-[0_25px_80px_rgba(0,0,0,0.75)] space-y-6"
          >
            {/* Selector táctil horizontal de familiares y amigos */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  Elige un perfil rápido (toca para rellenar)
                </span>
                <span className="text-[10px] text-slate-500 sm:hidden">Desliza →</span>
              </div>

              <div className="flex sm:flex-wrap gap-2 overflow-x-auto pb-1.5 sm:pb-0">
                {PERFILES_FAMILIA.map((p) => {
                  const seleccionado = perfilActivo === p.label;
                  return (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => seleccionarPerfilRapido(p)}
                      className={`flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-semibold transition shrink-0 cursor-pointer ${
                        seleccionado
                          ? 'bg-[#E5C17B]/20 border border-[#E5C17B] text-[#F7E3B5] shadow-[0_0_15px_rgba(229,193,123,0.18)]'
                          : 'bg-white/[0.03] hover:bg-[#E5C17B]/10 hover:border-[#E5C17B]/40 border border-white/[0.08] text-slate-200'
                      }`}
                    >
                      <span>{p.emoji}</span>
                      <span>{p.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Ocasión */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-2.5">
                1. Ocasión
              </label>
              <div className="flex flex-wrap gap-2">
                {OCASIONES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setOcasion(item)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                      ocasion === item
                        ? 'bg-gradient-to-r from-[#F3D899] to-[#D4AF37] text-[#05070E] font-bold shadow-[0_4px_20px_rgba(212,175,55,0.25)]'
                        : 'bg-[#111729] text-slate-300 hover:bg-[#172038] border border-white/[0.07]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Estilo del regalo */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-2.5">
                2. Enfoque del regalo
              </label>
              <div className="flex flex-wrap gap-2">
                {ESTILOS_REGALO.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setEstilo(item)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                      estilo === item
                        ? 'bg-[#E5C17B]/20 text-[#F7E3B5] border border-[#E5C17B]/60 font-semibold'
                        : 'bg-[#080B14] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Destinatario + Control deslizante de presupuesto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-2">
                  3. ¿Para quién es? (puedes detallar edad)
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Mi abuelo de 78 años, mi hijo de 16, mi prima..."
                  value={destinatario}
                  onChange={(e) => {
                    setDestinatario(e.target.value);
                    setPerfilActivo('');
                  }}
                  className="w-full p-3.5 rounded-xl bg-[#060811] border border-white/10 focus:border-[#E5C17B] focus:ring-1 focus:ring-[#E5C17B]/40 outline-none transition text-sm text-white placeholder:text-slate-600"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                    4. Presupuesto máx.
                  </label>
                  <span className="text-sm font-extrabold text-[#E5C17B]">
                    Hasta {presupuesto}€
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[#060811] border border-white/10 space-y-2.5">
                  <input
                    type="range"
                    min="15"
                    max="300"
                    step="5"
                    value={presupuesto}
                    onChange={(e) => setPresupuesto(e.target.value)}
                    className="w-full accent-[#E5C17B] cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between gap-1.5">
                    {PRESUPUESTOS.map((cant) => (
                      <button
                        key={cant}
                        type="button"
                        onClick={() => setPresupuesto(cant)}
                        className={`flex-1 text-[11px] py-1 rounded-lg font-semibold transition cursor-pointer ${
                          presupuesto === cant
                            ? 'bg-[#E5C17B]/20 text-[#E5C17B] border border-[#E5C17B]/40'
                            : 'bg-white/[0.04] text-slate-400 hover:text-white'
                        }`}
                      >
                        {cant}€
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Gustos */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-2">
                5. Sus aficiones, estilo o pistas clave
              </label>
              <textarea
                required
                rows="3"
                placeholder="Ej: A mi abuela le encanta tomar infusiones por la tarde, ver fotos de los nietos y estar calentita leyendo en el sofá..."
                value={intereses}
                onChange={(e) => setIntereses(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-[#060811] border border-white/10 focus:border-[#E5C17B] focus:ring-1 focus:ring-[#E5C17B]/40 outline-none transition text-sm text-white placeholder:text-slate-600"
              />
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full py-4 rounded-2xl font-extrabold text-sm sm:text-base uppercase tracking-wider bg-gradient-to-r from-[#F7E3B5] via-[#E5C17B] to-[#C69749] text-[#05070E] hover:brightness-110 active:scale-[0.99] transition shadow-[0_10px_35px_rgba(212,175,55,0.28)] disabled:opacity-50 cursor-pointer"
            >
              {cargando ? '✦ Preparando tu selección privada...' : 'Revelar 4 Ideas Exclusivas →'}
            </button>
          </form>

          {/* ZONA DE RESULTADOS CON MINIATURAS COMPACTAS Y WHATSAPP DIRECTO */}
          <div id="zona-resultados" className="scroll-mt-24">
            {cargando && (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-[#0B0F1C] border border-white/10 p-5 rounded-2xl animate-pulse space-y-4">
                    <div className="flex gap-3.5 items-center">
                      <div className="w-16 h-16 rounded-xl bg-slate-800 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-slate-800 rounded w-20" />
                        <div className="h-5 bg-slate-800 rounded w-4/5" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-800/80 rounded w-full" />
                      <div className="h-3 bg-slate-800/80 rounded w-5/6" />
                    </div>
                    <div className="h-10 bg-slate-800 rounded-xl w-full" />
                  </div>
                ))}
              </div>
            )}

            {regalos.length > 0 && (
              <section className="mt-14">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E5C17B]">
                      Selección privada • {estilo}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                      Curaduría para {destinatario}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    <span className="text-xs font-medium bg-[#E5C17B]/10 text-[#E5C17B] border border-[#E5C17B]/25 px-3 py-1 rounded-full">
                      Máx. {presupuesto}€
                    </span>
                    <button
                      type="button"
                      onClick={() => volverAlInicio(true)}
                      className="text-xs font-semibold bg-white/[0.06] hover:bg-white/[0.12] text-slate-200 border border-white/10 px-3 py-1 rounded-full transition cursor-pointer"
                    >
                      ⌂ Nueva búsqueda
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                  {regalos.map((regalo, i) => {
                    const esFav = favoritos.some((f) => f.titulo === regalo.titulo);
                    return (
                      <article
                        key={i}
                        className="group bg-[#0B0F1C] border border-white/10 hover:border-[#E5C17B]/50 p-5 rounded-2xl flex flex-col justify-between transition duration-300 shadow-xl"
                      >
                        <div>
                          <div className="flex items-start gap-3.5 mb-3.5">
                            <div className="relative w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-xl overflow-hidden border border-white/10 shrink-0 bg-slate-900">
                              <img
                                src={obtenerMiniaturaRegalo(regalo.titulo, regalo.descripcion, i)}
                                alt={regalo.titulo}
                                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#E5C17B]">
                                  {i === 0 ? '✦ Elección destacada' : `Selección #${i + 1}`}
                                </span>
                                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full shrink-0">
                                  {regalo.precioEstimado}
                                </span>
                              </div>

                              <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#F7E3B5] transition leading-snug">
                                {regalo.titulo}
                              </h3>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-3.5">
                            {regalo.descripcion}
                          </p>

                          <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-4">
                            <span className="text-emerald-400/90">✓ Envío rápido Amazon</span>
                            <span>•</span>
                            <span>Ajustado a {ocasion}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2.5 border-t border-white/[0.06]">
                          <a
                            href={regalo.urlAmazon}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 text-center py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#F7E3B5] via-[#E5C17B] to-[#C69749] text-[#05070E] font-extrabold text-xs sm:text-sm hover:brightness-110 transition"
                          >
                            Ver en Amazon →
                          </a>
                          <button
                            type="button"
                            onClick={() => toggleFavorito(regalo)}
                            title="Guardar en favoritos"
                            className={`px-3 py-2.5 rounded-xl border transition text-sm cursor-pointer ${
                              esFav
                                ? 'bg-rose-500/15 border-rose-500/40 text-rose-400'
                                : 'bg-white/[0.04] hover:bg-white/[0.1] border-white/10 text-slate-300'
                            }`}
                          >
                            {esFav ? '♥' : '♡'}
                          </button>
                          <button
                            type="button"
                            onClick={() => abrirWhatsAppRegalo(regalo)}
                            title="Enviar por WhatsApp"
                            className="px-3 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/25 transition text-xs font-semibold cursor-pointer"
                          >
                            WA
                          </button>
                          <button
                            type="button"
                            onClick={() => compartirRegalo(regalo, `res-${i}`)}
                            title="Copiar enlace"
                            className="px-2.5 py-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.1] text-slate-300 border border-white/10 transition text-xs cursor-pointer"
                          >
                            {copiado === `res-${i}` ? '✓' : '📋'}
                          </button>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* BANDEJA DE FAVORITOS PERSISTENTES */}
          {favoritos.length > 0 && (
            <section id="favoritos" className="mt-14 p-5 sm:p-6 rounded-2xl bg-[#0B0F1C]/90 border border-[#E5C17B]/30 scroll-mt-24">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <h3 className="text-sm sm:text-base font-bold text-[#E5C17B] flex items-center gap-2">
                  <span>♥</span> Tus regalos guardados ({favoritos.length})
                </h3>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={abrirWhatsAppListaFavoritos}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 transition cursor-pointer"
                  >
                    Compartir lista por WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setFavoritos([])}
                    className="text-xs text-slate-400 hover:text-white cursor-pointer"
                  >
                    Limpiar
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {favoritos.map((fav, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#060811] border border-white/10"
                  >
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-white truncate">{fav.titulo}</p>
                      <p className="text-xs text-emerald-400">{fav.precioEstimado}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <a
                        href={fav.urlAmazon}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold px-3 py-1.5 rounded-lg bg-[#E5C17B] text-[#05070E]"
                      >
                        Amazon
                      </a>
                      <button
                        type="button"
                        onClick={() => toggleFavorito(fav)}
                        className="text-xs px-2 py-1.5 text-slate-400 hover:text-rose-400 cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </section>

        {/* COLECCIONES CURADAS POR FAMILIAR */}
        <section id="colecciones" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 border-t border-white/[0.06] scroll-mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E5C17B]">
                Guía por familiar y ocasión
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Colecciones listas para inspirarte
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Toca cualquier colección para ver 4 propuestas reales al instante
            </p>
          </div>

          <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory">
            {COLECCIONES_FAMILIA.map((col, idx) => (
              <div
                key={idx}
                className="min-w-[270px] sm:min-w-[295px] md:min-w-0 snap-start bg-[#0B0F1C] border border-white/[0.08] hover:border-[#E5C17B]/40 p-5 rounded-2xl flex flex-col justify-between transition"
              >
                <div>
                  <div className="flex items-center gap-3.5 mb-4">
                    <img
                      src={col.imagen}
                      alt={col.titulo}
                      className="w-14 h-14 rounded-xl object-cover border border-white/10 shrink-0"
                    />
                    <div>
                      <span className="text-[10px] font-bold tracking-[0.15em] text-[#E5C17B] block">
                        {col.etiqueta}
                      </span>
                      <span className="text-xs text-slate-400">{col.rango}</span>
                    </div>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1.5">{col.titulo}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-5">{col.descripcion}</p>
                </div>

                <button
                  type="button"
                  onClick={() => probarColeccion(col.perfil)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-[#E5C17B] hover:text-[#05070E] text-[#E5C17B] font-semibold text-xs border border-[#E5C17B]/25 transition cursor-pointer"
                >
                  Probar esta colección →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* MÉTODO CONCIERGE */}
        <section id="metodo" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 border-t border-white/[0.06] scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-[#0B0F1C]/60 border border-white/[0.06] p-6 rounded-2xl">
              <span className="text-xs font-bold text-[#E5C17B] tracking-widest">01</span>
              <h3 className="font-bold text-white text-base mt-2 mb-1.5">Para cada generación</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Desde un detalle emotivo para tus abuelos hasta lo último para tus hijos, primos o amigos.
              </p>
            </div>
            <div className="bg-[#0B0F1C]/60 border border-white/[0.06] p-6 rounded-2xl">
              <span className="text-xs font-bold text-[#E5C17B] tracking-widest">02</span>
              <h3 className="font-bold text-white text-base mt-2 mb-1.5">4 aciertos directos</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Sin listas interminables: seleccionamos cuatro opciones reales dentro del presupuesto que marques.
              </p>
            </div>
            <div className="bg-[#0B0F1C]/60 border border-white/[0.06] p-6 rounded-2xl">
              <span className="text-xs font-bold text-[#E5C17B] tracking-widest">03</span>
              <h3 className="font-bold text-white text-base mt-2 mb-1.5">Compra segura en Amazon</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                Compara precios, lee opiniones verificadas y recíbelo rápido en casa con garantía oficial.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ COMPLETO TIPO ACORDEÓN */}
        <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-14 border-t border-white/[0.06] scroll-mt-20">
          <div className="text-center mb-8">
            <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#E5C17B]">
              Resolvemos tus dudas
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Preguntas frecuentes
            </h2>
          </div>

          <div className="space-y-3">
            {PREGUNTAS_FRECUENTES.map((item, idx) => {
              const abierta = faqAbierta === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition ${
                    abierta
                      ? 'bg-[#0B0F1C] border-[#E5C17B]/35 shadow-lg'
                      : 'bg-[#0B0F1C]/60 border-white/[0.07] hover:border-white/15'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setFaqAbierta(abierta ? -1 : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-bold text-white text-sm sm:text-base leading-snug">
                      {item.pregunta}
                    </span>
                    <span className={`text-lg font-bold transition-transform duration-200 shrink-0 ${abierta ? 'text-[#E5C17B] rotate-45' : 'text-slate-400'}`}>
                      +
                    </span>
                  </button>
                  {abierta && (
                    <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/[0.05] mt-1 pt-3">
                      {item.respuesta}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* BOTÓN FLOTANTE "VOLVER ARRIBA / HOME" EN ESCRITORIO AL BAJAR */}
      {mostrarSubir && (
        <button
          type="button"
          onClick={() => volverAlInicio(false)}
          title="Volver arriba al inicio"
          className="hidden sm:flex fixed bottom-6 right-6 z-50 items-center gap-2 px-4 py-3 rounded-full bg-[#0B0F1C]/95 hover:bg-[#E5C17B] text-[#E5C17B] hover:text-[#05070E] border border-[#E5C17B]/40 shadow-[0_10px_35px_rgba(0,0,0,0.75)] backdrop-blur-xl font-bold text-xs uppercase tracking-wider transition cursor-pointer"
        >
          <span>↑</span>
          <span>Home</span>
        </button>
      )}

      {/* BARRA FLOTANTE INFERIOR ESTILO APP PARA MÓVIL (HOME SIEMPRE ACCESIBLE AL BAJAR) */}
      <nav className="sm:hidden fixed bottom-3 left-3 right-3 z-50 backdrop-blur-2xl bg-[#0B0F1C]/95 border border-[#E5C17B]/30 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.9)] px-2 py-2 flex items-center justify-around">
        <button
          type="button"
          onClick={() => volverAlInicio(false)}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-[#E5C17B] active:scale-95 transition cursor-pointer"
        >
          <span className="text-base leading-none">⌂</span>
          <span className="text-[10px] font-bold tracking-wider uppercase">Home</span>
        </button>

        <a
          href="#colecciones"
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-slate-300 hover:text-white transition"
        >
          <span className="text-base leading-none">✦</span>
          <span className="text-[10px] font-medium tracking-wider uppercase">Familia</span>
        </a>

        <a
          href={favoritos.length > 0 ? '#favoritos' : '#faq'}
          className="relative flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-slate-300 hover:text-white transition"
        >
          <span className="text-base leading-none">{favoritos.length > 0 ? '♥' : '?'}</span>
          <span className="text-[10px] font-medium tracking-wider uppercase">
            {favoritos.length > 0 ? `Guardados (${favoritos.length})` : 'Dudas'}
          </span>
        </a>

        <button
          type="button"
          onClick={() => volverAlInicio(true)}
          className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl text-slate-300 hover:text-white active:scale-95 transition cursor-pointer"
        >
          <span className="text-base leading-none">↺</span>
          <span className="text-[10px] font-medium tracking-wider uppercase">Nuevo</span>
        </button>
      </nav>

      {/* FOOTER + FIRMA RAÚL MARTÍN MARTOS + AVISO LEGAL OBLIGATORIO AMAZON */}
      <footer className="relative z-10 border-t border-white/[0.07] bg-[#03050A] py-12 px-4 text-center text-xs text-slate-500 space-y-3">
        <div className="flex flex-col items-center justify-center gap-2">
          <LogoRMM size="sm" />
          <p className="text-slate-200 font-bold text-sm">RegaloIdeal · Raúl Martín Martos</p>
        </div>
        <p className="text-slate-400">© {new Date().getFullYear()} RMM Gift Concierge. Todos los derechos reservados.</p>
        <p className="max-w-2xl mx-auto leading-relaxed text-slate-500">
          En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables. Los precios mostrados son orientativos y pueden variar en Amazon.
        </p>
      </footer>
    </div>
  );
}