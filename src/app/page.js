'use client';
import { useState, useEffect } from 'react';

const PERFILES_REGALO = [
  {
    label: 'Pareja',
    emoji: '🥂',
    destinatario: 'Mi pareja',
    ocasion: 'Aniversario',
    estilo: 'Original y sorprendente',
    presupuesto: '80',
    intereses: 'Detalles con estilo, café de especialidad, escapadas de fin de semana o accesorios elegantes',
  },
  {
    label: 'Madre',
    emoji: '🌸',
    destinatario: 'Mi madre',
    ocasion: 'Cumpleaños',
    estilo: 'Hogar & Decoración',
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
    label: 'Amigo Invisible',
    emoji: '🎲',
    destinatario: 'Amigo Invisible',
    ocasion: 'Amigo Invisible',
    estilo: 'Original y sorprendente',
    presupuesto: '25',
    intereses: 'Juegos de mesa dinámicos, gadgets ingeniosos y útiles, café o accesorios divertidos',
  },
  {
    label: 'Abuelo/a',
    emoji: '🫖',
    destinatario: 'Mis abuelos',
    ocasion: 'Detalle especial',
    estilo: 'Emotivo / Sentimental',
    presupuesto: '50',
    intereses: 'Comodidad en casa, marcos digitales con fotos familiares, infusiones, mantas suaves o lectura',
  },
  {
    label: 'Hijo / Hija',
    emoji: '🚀',
    destinatario: 'Mi hijo/a',
    ocasion: 'Cumpleaños',
    estilo: 'Tech & Gadgets',
    presupuesto: '70',
    intereses: 'Tecnología útil, luces LED, creatividad, deporte, música o accesorios modernos para su habitación',
  },
  {
    label: 'Hermano/a',
    emoji: '🎧',
    destinatario: 'Mi hermano/a',
    ocasion: 'Cumpleaños',
    estilo: 'Tech & Gadgets',
    presupuesto: '50',
    intereses: 'Gadgets originales, deporte, viajes, café o accesorios prácticos para el trabajo y ocio',
  },
  {
    label: 'Amigo/a',
    emoji: '✨',
    destinatario: 'Un buen amigo/a',
    ocasion: 'Cumpleaños',
    estilo: 'Gourmet & Café',
    presupuesto: '45',
    intereses: 'Detalles originales con personalidad, gastronomía, deporte, viajes o decoración minimalista',
  },
];

const PERFILES_PARA_MI = [
  {
    label: 'Setup & Tech',
    emoji: '💻',
    destinatario: 'Mi escritorio y día a día',
    ocasion: 'Uso diario / Productividad',
    estilo: 'Tech & Setup',
    presupuesto: '60',
    intereses: 'Accesorios ergonómicos para escritorio, soporte de monitor, iluminación LED y gadgets útiles',
  },
  {
    label: 'Café & Cocina',
    emoji: '☕',
    destinatario: 'Mi cocina y desayunos',
    ocasion: 'Capricho práctico',
    estilo: 'Café & Cocina',
    presupuesto: '50',
    intereses: 'Cafetera de especialidad, espumador de leche, accesorios de cocina duraderos y menaje con buen diseño',
  },
  {
    label: 'Gym & Deporte',
    emoji: '💪',
    destinatario: 'Mis entrenamientos',
    ocasion: 'Salud y rendimiento',
    estilo: 'Gym & Salud',
    presupuesto: '55',
    intereses: 'Accesorios de entrenamiento, pistola de masaje muscular, botella térmica de acero y equipamiento fitness',
  },
  {
    label: 'Audio & Gaming',
    emoji: '🎧',
    destinatario: 'Música, series y gaming',
    ocasion: 'Uso diario / Ocio',
    estilo: 'Audio & Gaming',
    presupuesto: '80',
    intereses: 'Auriculares inalámbricos con buena batería, altavoz bluetooth portátil o teclado mecánico compacto',
  },
  {
    label: 'Hogar & Orden',
    emoji: '🕯️',
    destinatario: 'Mi salón o dormitorio',
    ocasion: 'Confort en casa',
    estilo: 'Hogar & Orden',
    presupuesto: '45',
    intereses: 'Iluminación cálida, difusor de aromas, organizadores minimalistas y accesorios de descanso',
  },
  {
    label: 'Viajes & Mochila',
    emoji: '🎒',
    destinatario: 'Mis escapadas y desplazamientos',
    ocasion: 'Viajes / Organización',
    estilo: 'Viajes & Mochila',
    presupuesto: '50',
    intereses: 'Organizadores de maleta, batería externa compacta, mochila de cabina y accesorios de viaje',
  },
];

const IDEAS_SORPRENDEME = [
  {
    modo: 'regalo',
    destinatario: 'Compañero de Amigo Invisible',
    ocasion: 'Amigo Invisible',
    estilo: 'Original y sorprendente',
    presupuesto: '25',
    intereses: 'Le encanta el café, trabajar en ordenador, los gadgets ingeniosos y los juegos rápidos con amigos',
  },
  {
    modo: 'regalo',
    destinatario: 'Mi madre',
    ocasion: 'Navidad / Reyes',
    estilo: 'Hogar & Decoración',
    presupuesto: '65',
    intereses: 'Disfruta relajándose en casa leyendo, con luz cálida, buen té y accesorios elegantes',
  },
  {
    modo: 'personal',
    destinatario: 'Mi escritorio y zona de estudio/trabajo',
    ocasion: 'Uso diario / Productividad',
    estilo: 'Tech & Setup',
    presupuesto: '70',
    intereses: 'Quiero mejorar la iluminación, el orden de cables y la comodidad frente al ordenador',
  },
  {
    modo: 'regalo',
    destinatario: 'Mi pareja',
    ocasion: 'Navidad / Reyes',
    estilo: 'Gourmet & Café',
    presupuesto: '90',
    intereses: 'Le apasiona la cocina creativa, el café de especialidad y los detalles con diseño minimalista',
  },
  {
    modo: 'personal',
    destinatario: 'Entrenar y cuidarme en casa o gimnasio',
    ocasion: 'Deporte y salud',
    estilo: 'Gym & Salud',
    presupuesto: '60',
    intereses: 'Busco accesorios prácticos para recuperación muscular, hidratación y rendimiento deportivo',
  },
];

const OCASIONES_REGALO = ['Cumpleaños', 'Amigo Invisible', 'Navidad / Reyes', 'Aniversario', 'Detalle especial'];
const OCASIONES_PARA_MI = ['Uso diario / Productividad', 'Capricho práctico', 'Renovar equipo', 'Hogar y confort', 'Deporte y salud'];

const CATEGORIAS_REGALO = [
  'Práctico y útil',
  'Original y sorprendente',
  'Tech & Gadgets',
  'Gourmet & Café',
  'Hogar & Decoración',
  'Deporte & Bienestar',
  'Moda & Accesorios',
  'Ocio & Juegos',
  'Emotivo / Sentimental',
  'Viajes & Aventura',
];

const CATEGORIAS_PARA_MI = [
  'Tech & Setup',
  'Audio & Gaming',
  'Café & Cocina',
  'Gym & Salud',
  'Hogar & Orden',
  'Viajes & Mochila',
  'Bricolaje & Herramientas',
  'Cuidado Personal',
  'Lectura & Estudio',
  'Ofertas Calidad-Precio',
];

const PRIORIDADES_FILTRO = [
  { id: 'equilibrado', label: '✨ Equilibrado (IA Concierge)' },
  { id: 'calidad-precio', label: '💎 Máxima relación calidad-precio' },
  { id: 'top-ventas', label: '🔥 Top ventas y más valorados' },
  { id: 'original', label: '🎯 Diferente y poco visto' },
];

const PRESUPUESTOS = ['25', '50', '100', '200'];

const COLECCIONES_DESTACADAS = [
  {
    etiqueta: 'AMIGO INVISIBLE • TOP VENTAS',
    titulo: 'Aciertos Seguros por Menos de 30€',
    rango: '15€ – 30€',
    descripcion: 'Gadgets ingeniosos, juegos dinámicos y detalles útiles con los que quedas genial sin pasarte de presupuesto.',
    icono: '🎲',
    perfil: {
      modo: 'regalo',
      destinatario: 'Amigo Invisible',
      ocasion: 'Amigo Invisible',
      estilo: 'Original y sorprendente',
      presupuesto: '30',
      intereses: 'Juegos de mesa rápidos, gadgets útiles y originales, accesorios de café o detalles divertidos con buen diseño',
    },
  },
  {
    etiqueta: 'SETUP & PRODUCTIVIDAD',
    titulo: 'Mejora tu Escritorio & Zona Tech',
    rango: '35€ – 90€',
    descripcion: 'Soportes ergonómicos, luces LED ambientales, audio limpio y accesorios para trabajar o jugar cómodo.',
    icono: '💻',
    perfil: {
      modo: 'personal',
      destinatario: 'Mi escritorio y setup',
      ocasion: 'Uso diario / Productividad',
      estilo: 'Tech & Setup',
      presupuesto: '80',
      intereses: 'Iluminación LED de escritorio, soporte ergonómico de monitor, altavoz compacto o gadgets tech útiles',
    },
  },
  {
    etiqueta: 'NAVIDAD & REYES • PARA MADRES',
    titulo: 'Ritual de Calma, Café & Bienestar',
    rango: '35€ – 75€',
    descripcion: 'Difusores de aromas, cafeteras de especialidad, iluminación cálida y piezas acogedoras para casa.',
    icono: '🕯️',
    perfil: {
      modo: 'regalo',
      destinatario: 'Mi madre',
      ocasion: 'Navidad / Reyes',
      estilo: 'Hogar & Decoración',
      presupuesto: '65',
      intereses: 'Decoración cálida, aromaterapia, lectura tranquila, té o café de especialidad y bienestar personal',
    },
  },
  {
    etiqueta: 'PARA PADRES & GOURMET',
    titulo: 'Café, Vino & Accesorios de Precisión',
    rango: '40€ – 95€',
    descripcion: 'Herramientas compactas bien construidas, accesorios de vino, cafeteras y audio portátil.',
    icono: '☕',
    perfil: {
      modo: 'regalo',
      destinatario: 'Mi padre',
      ocasion: 'Navidad / Reyes',
      estilo: 'Gourmet & Café',
      presupuesto: '80',
      intereses: 'Buen café por la mañana, accesorios de vino o cocina, herramientas prácticas y gadgets duraderos',
    },
  },
];

const TESTIMONIOS = [
  {
    nombre: 'Carlos M.',
    etiqueta: 'Amigo Invisible • 25€',
    texto: 'Llevaba 3 días dando vueltas en Amazon sin saber qué pillarle a un compañero de trabajo. Puse 3 aficiones suyas y me clavó un gadget que le encantó.',
    estrellas: 5,
  },
  {
    nombre: 'Laura G.',
    etiqueta: 'Cumpleaños Madre • 60€',
    texto: 'Me sacó ideas súper distintas a los típicos perfumes. Elegí un difusor de aromas minimalista con luz cálida y acerté de lleno.',
    estrellas: 5,
  },
  {
    nombre: 'javier_dev',
    etiqueta: 'Compra personal • Setup',
    texto: 'Lo usé en modo "Para mí" buscando mejorar mi escritorio por menos de 50€ y me recomendó justo dos accesorios que ni sabía que existían.',
    estrellas: 5,
  },
];

const PREGUNTAS_FRECUENTES = [
  {
    pregunta: '¿Tiene algún coste usar RegaloIdeal?',
    respuesta:
      'Es 100% gratuito. Puedes buscar tantos regalos o productos para ti como quieras sin registros ni suscripciones. Los precios en Amazon son exactamente los mismos que si entraras por tu cuenta.',
  },
  {
    pregunta: '¿Cómo funciona el modo "Comprar para mí"?',
    respuesta:
      'Además de buscar regalos para otras personas, puedes activar el modo "Comprar para mí" para decirle a la IA qué necesitas mejorar (tu escritorio, tu cocina, el gimnasio, un viaje...) y tu presupuesto máximo. Te filtrará 4 opciones con alta relación calidad-precio y 4 estrellas o más.',
  },
  {
    pregunta: '¿Dónde se realiza la compra y el envío?',
    respuesta:
      'Al pulsar en "Ver en Amazon", te llevamos directamente a Amazon España filtrado por productos mejor valorados para que veas fotos reales, reseñas verificadas y disfrutes de envío rápido Prime y devolución oficial.',
  },
  {
    pregunta: '¿Se guardan mis favoritos si cierro la página?',
    respuesta:
      'Sí. Todo lo que marques con el corazón (♥) se guarda automáticamente en tu dispositivo para que puedas comparar opciones con calma o compartir tu lista por WhatsApp.',
  },
];

const BANCO_FOTOS_EXACTAS = [
  {
    claves: ['cafetera', 'café', 'cafe', 'espresso', 'espumador', 'molinillo'],
    imagen: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80',
    categoria: 'Café & Barista',
  },
  {
    claves: ['tetera', 'infusión', 'infusion', 'té ', 'matcha', 'termo', 'taza'],
    imagen: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=300&q=80',
    categoria: 'Té & Bebidas',
  },
  {
    claves: ['vino', 'sacacorchos', 'decantador', 'copa', 'cerveza', 'coctel', 'cóctel'],
    imagen: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=300&q=80',
    categoria: 'Vino & Gourmet',
  },
  {
    claves: ['airfryer', 'freidora', 'cocina', 'cuchillo', 'sartén', 'sarten', 'gourmet', 'tabla de queso'],
    imagen: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=300&q=80',
    categoria: 'Cocina & Hogar',
  },
  {
    claves: ['auricular', 'cascos', 'airpods', 'earbuds'],
    imagen: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=300&q=80',
    categoria: 'Auriculares & Audio',
  },
  {
    claves: ['altavoz', 'speaker', 'barra de sonido', 'tocadiscos', 'vinilo'],
    imagen: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=300&q=80',
    categoria: 'Altavoces & Música',
  },
  {
    claves: ['reloj', 'smartwatch', 'pulsera de actividad', 'cronógrafo'],
    imagen: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=300&q=80',
    categoria: 'Relojes & Wearables',
  },
  {
    claves: ['luz', 'luces', 'led', 'lámpara', 'lampara', 'rgb', 'proyector', 'tira led'],
    imagen: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=300&q=80',
    categoria: 'Iluminación & Ambiente',
  },
  {
    claves: ['monitor', 'escritorio', 'soporte', 'teclado', 'ratón', 'raton', 'alfombrilla', 'setup', 'ordenador', 'portátil'],
    imagen: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=300&q=80',
    categoria: 'Setup & Escritorio',
  },
  {
    claves: ['cargador', 'batería', 'bateria', 'powerbank', 'magsafe', 'cable'],
    imagen: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=300&q=80',
    categoria: 'Accesorios Tech',
  },
  {
    claves: ['masaje', 'pistola de masaje', 'cervical', 'relajación', 'spa'],
    imagen: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=300&q=80',
    categoria: 'Bienestar & Relax',
  },
  {
    claves: ['gym', 'gimnasio', 'deporte', 'entrenamiento', 'mancuerna', 'fitness', 'yoga', 'correr', 'running', 'botella'],
    imagen: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=300&q=80',
    categoria: 'Deporte & Fitness',
  },
  {
    claves: ['vela', 'difusor', 'aroma', 'aromaterapia', 'incienso', 'aceite esencial'],
    imagen: 'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=300&q=80',
    categoria: 'Aromas & Calma',
  },
  {
    claves: ['manta', 'cojín', 'cojin', 'almohada', 'albornoz', 'pijama', 'zapatillas de casa'],
    imagen: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=300&q=80',
    categoria: 'Confort & Hogar',
  },
  {
    claves: ['libro', 'lectura', 'kindle', 'cuaderno', 'libreta', 'bolígrafo', 'pluma', 'diario'],
    imagen: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=300&q=80',
    categoria: 'Lectura & Papelería',
  },
  {
    claves: ['cámara', 'camara', 'foto', 'álbum', 'album', 'marco', 'polaroid', 'instax'],
    imagen: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80',
    categoria: 'Fotografía & Recuerdos',
  },
  {
    claves: ['juego de mesa', 'cartas', 'ajedrez', 'puzzle', 'puzle', 'tablero', 'dado'],
    imagen: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=300&q=80',
    categoria: 'Juegos & Ocio',
  },
  {
    claves: ['mochila', 'viaje', 'maleta', 'neceser', 'organizador de equipaje', 'bolsa de viaje'],
    imagen: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=300&q=80',
    categoria: 'Viajes & Mochilas',
  },
  {
    claves: ['cartera', 'tarjetero', 'gafas de sol', 'bolso', 'cinturón', 'joyero'],
    imagen: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=300&q=80',
    categoria: 'Moda & Complementos',
  },
  {
    claves: ['herramienta', 'destornillador', 'bricolaje', 'taladro', 'multiherramienta', 'linterna'],
    imagen: 'https://images.unsplash.com/photo-1581147036324-c17ac41dfa6c?auto=format&fit=crop&w=300&q=80',
    categoria: 'Herramientas & EDC',
  },
  {
    claves: ['planta', 'maceta', 'jardín', 'jardin', 'bonsái', 'bonsai', 'huerto'],
    imagen: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=300&q=80',
    categoria: 'Plantas & Jardín',
  },
  {
    claves: ['perfume', 'colonia', 'crema', 'afeitado', 'barba', 'secador', 'skincare', 'cuidado facial'],
    imagen: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=300&q=80',
    categoria: 'Cuidado Personal',
  },
];

function obtenerVisualProducto(titulo = '', descripcion = '') {
  const tituloLower = titulo.toLowerCase();
  const descLower = descripcion.toLowerCase();

  for (const item of BANCO_FOTOS_EXACTAS) {
    if (item.claves.some((clave) => tituloLower.includes(clave))) {
      return { imagen: item.imagen, categoria: item.categoria };
    }
  }

  for (const item of BANCO_FOTOS_EXACTAS) {
    if (item.claves.some((clave) => descLower.includes(clave))) {
      return { imagen: item.imagen, categoria: item.categoria };
    }
  }

  return { imagen: null, categoria: 'Selección RMM' };
}

function LogoRMM({ size = 'md' }) {
  const dimensiones =
    size === 'sm' ? 'w-9 h-9' : size === 'card' ? 'w-16 h-16' : 'w-11 h-11';
  return (
    <div className={`relative ${dimensiones} rounded-xl bg-gradient-to-br from-[#F7E3B5] via-[#D4AF37] to-[#7D5C19] p-[1.5px] shadow-[0_0_25px_rgba(212,175,55,0.28)] group-hover:scale-105 transition duration-300 shrink-0`}>
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

function MiniaturaTarjeta({ titulo, descripcion }) {
  const [errorImagen, setErrorImagen] = useState(false);
  const visual = obtenerVisualProducto(titulo, descripcion);

  if (!visual.imagen || errorImagen) {
    return <LogoRMM size="card" />;
  }

  return (
    <div className="w-16 h-16 rounded-2xl overflow-hidden border border-[#E5C17B]/35 bg-[#070A13] shrink-0 shadow-[0_4px_18px_rgba(0,0,0,0.5)] relative">
      <img
        src={visual.imagen}
        alt={titulo}
        onError={() => setErrorImagen(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default function Home() {
  const [modo, setModo] = useState('regalo');
  const [destinatario, setDestinatario] = useState('');
  const [ocasion, setOcasion] = useState('Cumpleaños');
  const [estilo, setEstilo] = useState('Práctico y útil');
  const [presupuesto, setPresupuesto] = useState('50');
  const [intereses, setIntereses] = useState('');
  const [perfilActivo, setPerfilActivo] = useState('');

  const [mostrarFiltrosPro, setMostrarFiltrosPro] = useState(false);
  const [prioridad, setPrioridad] = useState('equilibrado');
  const [evitar, setEvitar] = useState('');

  const [regalos, setRegalos] = useState([]);
  const [favoritos, setFavoritos] = useState([]);
  const [historial, setHistorial] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [copiado, setCopiado] = useState(null);
  const [faqAbierta, setFaqAbierta] = useState(0);
  const [mostrarSubir, setMostrarSubir] = useState(false);

  const URL_WEB = 'https://buscador-regalos.vercel.app';

  useEffect(() => {
    try {
      const guardados = localStorage.getItem('rmm_regalos_favoritos');
      if (guardados) setFavoritos(JSON.parse(guardados));
      const hist = localStorage.getItem('rmm_regalos_historial');
      if (hist) setHistorial(JSON.parse(hist));
    } catch (e) {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('rmm_regalos_favoritos', JSON.stringify(favoritos));
    } catch (e) {}
  }, [favoritos]);

  useEffect(() => {
    const manejarScroll = () => {
      setMostrarSubir(window.scrollY > 320);
    };
    window.addEventListener('scroll', manejarScroll);
    return () => window.removeEventListener('scroll', manejarScroll);
  }, []);

  const cambiarModo = (nuevoModo) => {
    setModo(nuevoModo);
    setPerfilActivo('');
    setDestinatario('');
    setIntereses('');
    if (nuevoModo === 'personal') {
      setOcasion('Uso diario / Productividad');
      setEstilo('Tech & Setup');
    } else {
      setOcasion('Cumpleaños');
      setEstilo('Práctico y útil');
    }
  };

  const volverAlInicio = (limpiar = false) => {
    if (limpiar) {
      setRegalos([]);
      setPerfilActivo('');
      setDestinatario('');
      setIntereses('');
      setEvitar('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const guardarEnHistorial = (entrada) => {
    try {
      const nuevo = [entrada, ...historial.filter((h) => h.destinatario !== entrada.destinatario)].slice(0, 3);
      setHistorial(nuevo);
      localStorage.setItem('rmm_regalos_historial', JSON.stringify(nuevo));
    } catch (e) {}
  };

  const ejecutarBusqueda = async (datos = null) => {
    const modoActual = datos?.modo || modo;
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
      const etiquetaPrioridad = PRIORIDADES_FILTRO.find((p) => p.id === prioridad)?.label || '';
      const notaModo =
        modoActual === 'personal'
          ? 'MODO COMPRA PERSONAL (el usuario busca productos para sí mismo, prioriza utilidad real, durabilidad y buena relación calidad-precio).'
          : 'MODO REGALO (el usuario busca sorprender a otra persona).';
      const notaEvitar = evitar.trim() ? ` EVITAR estrictamente: ${evitar.trim()}.` : '';

      const contextoCompleto = `${notaModo} Motivo/Ocasión: ${ocas}. Categoría/Enfoque: ${est}. Prioridad: ${etiquetaPrioridad}. Detalles y preferencias: ${inter}.${notaEvitar}`;

      const res = await fetch('/api/recomendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          destinatario: dest,
          presupuesto: pres,
          intereses: contextoCompleto,
        }),
      });
      const data = await res.json();
      if (data.regalos) {
        setRegalos(data.regalos);
        guardarEnHistorial({
          modo: modoActual,
          destinatario: dest,
          ocasion: ocas,
          estilo: est,
          presupuesto: pres,
          intereses: inter,
        });
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

  const sorprenderEnUnClic = () => {
    const aleatoria = IDEAS_SORPRENDEME[Math.floor(Math.random() * IDEAS_SORPRENDEME.length)];
    setModo(aleatoria.modo);
    setPerfilActivo('');
    setDestinatario(aleatoria.destinatario);
    setOcasion(aleatoria.ocasion);
    setEstilo(aleatoria.estilo);
    setPresupuesto(aleatoria.presupuesto);
    setIntereses(aleatoria.intereses);
    ejecutarBusqueda(aleatoria);
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
    if (perfil.modo) setModo(perfil.modo);
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
    const texto = `Mira esta idea que he encontrado en RegaloIdeal 🎁:\n*${regalo.titulo}* (${regalo.precioEstimado})\n${regalo.descripcion}\n\nDescúbrelo y busca más ideas aquí 👉 ${URL_WEB}`;
    navigator.clipboard.writeText(texto);
    setCopiado(id);
    setTimeout(() => setCopiado(null), 2200);
  };

  const abrirWhatsAppRegalo = (regalo) => {
    const mensaje = encodeURIComponent(
      `¡Mira esta idea que me ha sacado esta IA! 🎁\n*${regalo.titulo}* (${regalo.precioEstimado})\n${regalo.descripcion}\n\nPruébalo aquí para buscar más ideas 👇\n${URL_WEB}`
    );
    window.open(`https://wa.me/?text=${mensaje}`, '_blank', 'noopener,noreferrer');
  };

  const abrirWhatsAppListaFavoritos = () => {
    const items = favoritos
      .map((f, idx) => `${idx + 1}. *${f.titulo}* (${f.precioEstimado})`)
      .join('\n');
    const mensaje = encodeURIComponent(
      `Esta es mi lista de ideas favoritas en RegaloIdeal 🎁:\n\n${items}\n\nEntra aquí para verlas y buscar más 👇\n${URL_WEB}`
    );
    window.open(`https://wa.me/?text=${mensaje}`, '_blank', 'noopener,noreferrer');
  };

  const perfilesActuales = modo === 'regalo' ? PERFILES_REGALO : PERFILES_PARA_MI;
  const ocasionesActuales = modo === 'regalo' ? OCASIONES_REGALO : OCASIONES_PARA_MI;
  const categoriasActuales = modo === 'regalo' ? CATEGORIAS_REGALO : CATEGORIAS_PARA_MI;

  return (
    <div id="inicio" className="min-h-screen bg-[#05070E] text-[#F4F1EA] flex flex-col relative overflow-x-hidden pb-20 sm:pb-0 selection:bg-[#E5C17B]/30 selection:text-[#F7E3B5]">
      {/* RESPLANDOR AMBIENTAL DORADO */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-48 left-1/2 -translate-x-1/2 w-[680px] h-[380px] rounded-full bg-[#D4AF37]/[0.09] blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-[#9E7B3A]/[0.06] blur-[140px]" />
      </div>

      {/* BARRA SUPERIOR DE TEMPORADA */}
      <div className="relative z-20 bg-gradient-to-r from-[#0A0E1A] via-[#13192D] to-[#0A0E1A] border-b border-[#E5C17B]/20 py-1.5 px-4 text-center">
        <p className="text-[10px] sm:text-xs tracking-[0.14em] uppercase text-[#F7E3B5] font-semibold">
          ⚡ Especial Black Friday & Navidad • Ideas 4★+ con envío rápido en Amazon España
        </p>
      </div>

      {/* NAVBAR FIJA */}
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
                  AI
                </span>
              </div>
              <span className="text-[10px] tracking-[0.12em] text-slate-400 mt-1">
                Regalos & Compras Inteligentes
              </span>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-[0.14em] font-medium text-slate-400">
            <button
              type="button"
              onClick={() => volverAlInicio(false)}
              className="text-[#E5C17B] hover:text-white transition font-bold cursor-pointer"
            >
              Buscador
            </button>
            <a href="#colecciones" className="hover:text-[#E5C17B] transition">Colecciones</a>
            <a href="#opiniones" className="hover:text-[#E5C17B] transition">Opiniones</a>
            <a href="#faq" className="hover:text-[#E5C17B] transition">Ayuda</a>
          </nav>

          <div className="flex items-center gap-2">
            {favoritos.length > 0 && (
              <a
                href="#favoritos"
                className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/35 transition"
              >
                <span>♥</span>
                <span>Guardados ({favoritos.length})</span>
              </a>
            )}
            <button
              type="button"
              onClick={() => volverAlInicio(true)}
              title="Nueva búsqueda"
              className="flex items-center gap-1.5 text-xs font-bold px-3.5 py-2 rounded-full bg-gradient-to-r from-[#F7E3B5]/15 to-[#D4AF37]/15 hover:from-[#F7E3B5] hover:to-[#D4AF37] text-[#F7E3B5] hover:text-[#05070E] border border-[#E5C17B]/35 transition cursor-pointer"
            >
              <span>✦</span>
              <span>Nueva</span>
            </button>
          </div>
        </div>
      </header>

      <main className="relative z-10 flex-1">
        {/* HERO + SELECTOR DUAL + BOTÓN SORPRÉNDEME */}
        <section id="buscador" className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-14">
          <div className="text-center max-w-2xl mx-auto mb-7 sm:mb-9">
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-5">
              <div className="inline-flex p-1 rounded-2xl bg-[#0B0F1C] border border-[#E5C17B]/25 shadow-lg">
                <button
                  type="button"
                  onClick={() => cambiarModo('regalo')}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                    modo === 'regalo'
                      ? 'bg-gradient-to-r from-[#F7E3B5] to-[#D4AF37] text-[#05070E] shadow-[0_4px_20px_rgba(212,175,55,0.28)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>🎁</span>
                  <span>Buscar Regalo</span>
                </button>
                <button
                  type="button"
                  onClick={() => cambiarModo('personal')}
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                    modo === 'personal'
                      ? 'bg-gradient-to-r from-[#F7E3B5] to-[#D4AF37] text-[#05070E] shadow-[0_4px_20px_rgba(212,175,55,0.28)]'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span>🛍️</span>
                  <span>Comprar para mí</span>
                </button>
              </div>

              <button
                type="button"
                onClick={sorprenderEnUnClic}
                disabled={cargando}
                className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-white/[0.04] hover:bg-[#E5C17B]/15 border border-[#E5C17B]/35 text-[#F7E3B5] text-xs font-extrabold transition cursor-pointer"
              >
                <span>🎲</span>
                <span>Sorpréndeme</span>
              </button>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.12] mb-3.5 text-white">
              {modo === 'regalo' ? (
                <>
                  El arte de acertar con{' '}
                  <span className="bg-gradient-to-r from-[#F7E3B5] via-[#E5C17B] to-[#C69749] bg-clip-text text-transparent">
                    quienes más quieres
                  </span>
                </>
              ) : (
                <>
                  Encuentra lo mejor para ti{' '}
                  <span className="bg-gradient-to-r from-[#F7E3B5] via-[#E5C17B] to-[#C69749] bg-clip-text text-transparent">
                    sin perder horas
                  </span>
                </>
              )}
            </h1>

            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
              {modo === 'regalo'
                ? 'Indica para quién es, sus gustos y tu presupuesto. Nuestra IA filtra 4 regalos top valorados (4★+) en Amazon España.'
                : 'Dinos qué necesitas, para qué lo vas a usar y cuánto quieres gastar. Seleccionamos 4 opciones calidad-precio en Amazon España.'}
            </p>
          </div>

          {/* PANEL DE BÚSQUEDA */}
          <form
            onSubmit={handleSubmit}
            className="bg-[#0B0F1C]/95 backdrop-blur-xl p-5 sm:p-8 rounded-3xl border border-[#E5C17B]/20 shadow-[0_25px_80px_rgba(0,0,0,0.75)] space-y-6"
          >
            {/* Perfiles rápidos */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400">
                  {modo === 'regalo' ? 'Perfiles rápidos (toca para rellenar)' : 'Categorías rápidas (toca para rellenar)'}
                </span>
                <span className="text-[10px] text-slate-500 sm:hidden">Desliza →</span>
              </div>

              <div className="flex sm:flex-wrap gap-2 overflow-x-auto pb-1.5 sm:pb-0">
                {perfilesActuales.map((p) => {
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

            {/* Motivo / Ocasión */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-2.5">
                {modo === 'regalo' ? '1. Ocasión' : '1. Objetivo de compra'}
              </label>
              <div className="flex flex-wrap gap-2">
                {ocasionesActuales.map((item) => (
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

            {/* Categoría ampliada */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-2.5">
                {modo === 'regalo' ? '2. Categoría / Enfoque del regalo' : '2. Categoría del producto'}
              </label>
              <div className="flex flex-wrap gap-2">
                {categoriasActuales.map((item) => (
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

            {/* Destinatario/Uso + Presupuesto */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-2">
                  {modo === 'regalo' ? '3. ¿Para quién es? (puedes detallar edad)' : '3. ¿Qué buscas o para qué zona es?'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={
                    modo === 'regalo'
                      ? 'Ej: Mi abuelo de 78 años, mi compañero de amigo invisible...'
                      : 'Ej: Mejorar mi escritorio, hacer café en casa, entrenar...'
                  }
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

            {/* Gustos / Especificaciones */}
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-slate-400 mb-2">
                {modo === 'regalo' ? '5. Sus aficiones, estilo o pistas clave' : '5. Características o qué problema quieres resolver'}
              </label>
              <textarea
                required
                rows="3"
                placeholder={
                  modo === 'regalo'
                    ? 'Ej: Le encanta el café, ver series, salir a correr y las cosas minimalistas...'
                    : 'Ej: Quiero auriculares inalámbricos cómodos para trabajar, con buena batería y cancelación de ruido...'
                }
                value={intereses}
                onChange={(e) => setIntereses(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-[#060811] border border-white/10 focus:border-[#E5C17B] focus:ring-1 focus:ring-[#E5C17B]/40 outline-none transition text-sm text-white placeholder:text-slate-600"
              />
            </div>

            {/* DESPLEGABLE DE FILTROS AVANZADOS PRO */}
            <div className="border-t border-white/[0.07] pt-3">
              <button
                type="button"
                onClick={() => setMostrarFiltrosPro(!mostrarFiltrosPro)}
                className="flex items-center justify-between w-full text-left text-xs font-semibold text-slate-400 hover:text-[#E5C17B] transition py-1 cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span>⚙️</span>
                  <span>Filtros avanzados (Prioridad y exclusiones)</span>
                  {(prioridad !== 'equilibrado' || evitar.trim()) && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#E5C17B]/20 text-[#E5C17B]">
                      Activo
                    </span>
                  )}
                </span>
                <span className="text-sm">{mostrarFiltrosPro ? '▲' : '▼'}</span>
              </button>

              {mostrarFiltrosPro && (
                <div className="mt-3 p-4 rounded-2xl bg-[#060811] border border-white/[0.07] grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Criterio de selección IA
                    </label>
                    <select
                      value={prioridad}
                      onChange={(e) => setPrioridad(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F1C] border border-white/10 text-xs text-white outline-none focus:border-[#E5C17B]"
                    >
                      {PRIORIDADES_FILTRO.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                      Evitar (opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Ropa, colonias, tazas, libros..."
                      value={evitar}
                      onChange={(e) => setEvitar(e.target.value)}
                      className="w-full p-2.5 rounded-xl bg-[#0B0F1C] border border-white/10 text-xs text-white placeholder:text-slate-600 outline-none focus:border-[#E5C17B]"
                    />
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full py-4 rounded-2xl font-extrabold text-sm sm:text-base uppercase tracking-wider bg-gradient-to-r from-[#F7E3B5] via-[#E5C17B] to-[#C69749] text-[#05070E] hover:brightness-110 active:scale-[0.99] transition shadow-[0_10px_35px_rgba(212,175,55,0.28)] disabled:opacity-50 cursor-pointer"
            >
              {cargando
                ? '✦ Seleccionando productos 4★+ en Amazon...'
                : modo === 'regalo'
                ? 'Revelar 4 Ideas Exclusivas →'
                : 'Encontrar Mis 4 Mejores Opciones →'}
            </button>

            {/* HISTORIAL RECIENTE EN 1 CLIC */}
            {historial.length > 0 && (
              <div className="pt-2 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
                <span>Recientes:</span>
                {historial.map((h, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => probarColeccion(h)}
                    className="px-2.5 py-1 rounded-lg bg-white/[0.03] hover:bg-[#E5C17B]/15 text-slate-300 hover:text-[#F7E3B5] border border-white/[0.07] transition cursor-pointer"
                  >
                    ↻ {h.destinatario} ({h.presupuesto}€)
                  </button>
                ))}
              </div>
            )}
          </form>

          {/* ZONA DE RESULTADOS */}
          <div id="zona-resultados" className="scroll-mt-24">
            {cargando && (
              <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-[#0B0F1C] border border-white/10 p-5 rounded-2xl animate-pulse space-y-4">
                    <div className="flex gap-3.5 items-center">
                      <div className="w-16 h-16 rounded-2xl bg-slate-800 shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-slate-800 rounded w-24" />
                        <div className="h-5 bg-slate-800 rounded w-4/5" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-slate-800/80 rounded w-full" />
                      <div className="h-3 bg-slate-800/80 rounded w-5/6" />
                    </div>
                    <div className="h-11 bg-slate-800 rounded-xl w-full" />
                  </div>
                ))}
              </div>
            )}

            {regalos.length > 0 && (
              <section className="mt-14">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-[#E5C17B] font-bold">
                      ✦ Filtrado por valoración 4★+ en Amazon.es
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                      4 Opciones Top para Ti
                    </h2>
                  </div>

                  <button
                    type="button"
                    onClick={() => ejecutarBusqueda()}
                    className="self-start sm:self-auto text-xs font-bold px-3.5 py-2 rounded-xl bg-white/[0.05] hover:bg-[#E5C17B]/15 text-[#E5C17B] border border-[#E5C17B]/30 transition cursor-pointer"
                  >
                    ↻ Generar otras 4 ideas
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {regalos.map((regalo, idx) => {
                    const esFavorito = favoritos.some((f) => f.titulo === regalo.titulo);
                    const visual = obtenerVisualProducto(regalo.titulo, regalo.descripcion);
                    const esDestacado = idx === 0;

                    return (
                      <article
                        key={idx}
                        className={`relative flex flex-col justify-between p-5 sm:p-6 rounded-3xl bg-[#0B0F1C] border transition duration-300 ${
                          esDestacado
                            ? 'border-[#E5C17B]/55 shadow-[0_12px_40px_rgba(212,175,55,0.12)]'
                            : 'border-white/[0.09] hover:border-[#E5C17B]/35'
                        }`}
                      >
                        <div>
                          <div className="flex items-start gap-3.5 mb-4">
                            <MiniaturaTarjeta
                              titulo={regalo.titulo}
                              descripcion={regalo.descripcion}
                            />

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#E5C17B] truncate">
                                  {esDestacado
                                    ? '✦ Elección Destacada'
                                    : regalo.porQueDestaca || `#${idx + 1} • ${visual.categoria}`}
                                </span>
                                <span className="shrink-0 text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                  {regalo.precioEstimado}
                                </span>
                              </div>

                              <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                                {regalo.titulo}
                              </h3>
                            </div>
                          </div>

                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                            {regalo.descripcion}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-white/[0.06] space-y-2.5">
                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span className="text-emerald-400 font-medium">★ Filtro 4+ estrellas Amazon</span>
                            <span>Presupuesto ≤ {presupuesto}€</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <a
                              href={regalo.urlAmazon}
                              target="_blank"
                              rel="noopener noreferrer nofollow sponsored"
                              className="flex-1 py-3 px-4 rounded-xl font-extrabold text-xs sm:text-sm text-center bg-gradient-to-r from-[#F7E3B5] via-[#E5C17B] to-[#C69749] text-[#05070E] hover:brightness-110 transition shadow-[0_6px_20px_rgba(212,175,55,0.22)]"
                            >
                              Ver mejor opción →
                            </a>

                            <button
                              type="button"
                              onClick={() => toggleFavorito(regalo)}
                              title="Guardar en favoritos"
                              className={`p-3 rounded-xl border text-sm transition cursor-pointer ${
                                esFavorito
                                  ? 'bg-rose-500/20 border-rose-500/50 text-rose-300'
                                  : 'bg-white/[0.04] border-white/10 text-slate-300 hover:border-[#E5C17B]/40'
                              }`}
                            >
                              {esFavorito ? '♥' : '♡'}
                            </button>

                            <button
                              type="button"
                              onClick={() => abrirWhatsAppRegalo(regalo)}
                              title="Compartir idea por WhatsApp"
                              className="px-3 py-3 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/35 text-emerald-300 text-xs font-extrabold transition cursor-pointer"
                            >
                              WA
                            </button>

                            <button
                              type="button"
                              onClick={() => compartirRegalo(regalo, idx)}
                              title="Copiar recomendación"
                              className="p-3 rounded-xl bg-white/[0.04] hover:bg-white/10 border border-white/10 text-slate-300 text-xs transition cursor-pointer"
                            >
                              {copiado === idx ? '✓' : '📋'}
                            </button>
                          </div>

                          {/* Segundo enlace monetizado para comparar modelos y ofertas */}
                          <div className="text-center pt-0.5">
                            <a
                              href={regalo.urlComparar || regalo.urlAmazon}
                              target="_blank"
                              rel="noopener noreferrer nofollow sponsored"
                              className="inline-block text-[11px] text-slate-400 hover:text-[#E5C17B] underline decoration-white/20 hover:decoration-[#E5C17B] transition"
                            >
                              Comparar modelos, precios y ofertas en Amazon.es
                            </a>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </section>

        {/* FAVORITOS GUARDADOS */}
        {favoritos.length > 0 && (
          <section id="favoritos" className="max-w-4xl mx-auto px-4 sm:px-6 pb-16 scroll-mt-24">
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0B0F1C] border border-rose-500/25">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.15em] text-rose-300 font-bold">
                    ♥ Tu selección guardada
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
                    Favoritos ({favoritos.length})
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={abrirWhatsAppListaFavoritos}
                  className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold transition cursor-pointer"
                >
                  Compartir lista por WhatsApp
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {favoritos.map((fav, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl bg-[#060811] border border-white/10 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate">{fav.titulo}</p>
                      <p className="text-xs text-[#E5C17B] font-semibold mt-0.5">{fav.precioEstimado}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={fav.urlAmazon}
                        target="_blank"
                        rel="noopener noreferrer nofollow sponsored"
                        className="px-3 py-2 rounded-lg bg-[#E5C17B] text-[#05070E] text-xs font-extrabold hover:brightness-110 transition"
                      >
                        Amazon →
                      </a>
                      <button
                        type="button"
                        onClick={() => toggleFavorito(fav)}
                        className="p-2 rounded-lg bg-white/5 text-slate-400 hover:text-rose-400 text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* COLECCIONES RÁPIDAS */}
        <section id="colecciones" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 border-t border-white/[0.06] scroll-mt-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#E5C17B] font-bold">
              ✦ Inspiración en 1 clic
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5">
              Búsquedas Populares del Momento
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm mt-2">
              Pulsa en cualquier colección para lanzar automáticamente la búsqueda con IA.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {COLECCIONES_DESTACADAS.map((col, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-[#0B0F1C] border border-white/[0.08] hover:border-[#E5C17B]/40 transition flex flex-col justify-between gap-5"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#E5C17B]">
                      {col.etiqueta}
                    </span>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white/[0.05] text-slate-300">
                      {col.rango}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{col.icono}</span>
                    <h3 className="text-lg font-extrabold text-white">{col.titulo}</h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {col.descripcion}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => probarColeccion(col.perfil)}
                  className="w-full py-3 rounded-xl text-xs font-extrabold uppercase tracking-wider bg-white/[0.04] hover:bg-[#E5C17B] text-[#F7E3B5] hover:text-[#05070E] border border-[#E5C17B]/30 transition cursor-pointer"
                >
                  Explorar esta selección →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* OPINIONES */}
        <section id="opiniones" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 border-t border-white/[0.06] scroll-mt-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#E5C17B] font-bold">
              ★ Valoraciones de usuarios
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5">
              Miles de búsquedas resueltas en segundos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {TESTIMONIOS.map((t, i) => (
              <div
                key={i}
                className="p-6 rounded-3xl bg-[#0B0F1C] border border-white/[0.08] flex flex-col justify-between gap-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[#E5C17B] text-sm tracking-wider">
                      {'★'.repeat(t.estrellas)}
                    </div>
                    <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-[#E5C17B]/10 text-[#E5C17B] border border-[#E5C17B]/25">
                      {t.etiqueta}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    &ldquo;{t.texto}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-2.5 pt-3 border-t border-white/[0.06]">
                  <div className="w-7 h-7 rounded-full bg-[#E5C17B]/20 text-[#E5C17B] flex items-center justify-center text-xs font-extrabold">
                    {t.nombre[0].toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-white">{t.nombre}</span>
                  <span className="text-[10px] text-emerald-400 ml-auto">✓ Uso verificado</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PREGUNTAS FRECUENTES */}
        <section id="faq" className="max-w-3xl mx-auto px-4 sm:px-6 py-14 border-t border-white/[0.06] scroll-mt-20">
          <div className="text-center mb-8">
            <span className="text-[11px] uppercase tracking-[0.16em] text-[#E5C17B] font-bold">
              Dudas habituales
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1.5">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-3">
            {PREGUNTAS_FRECUENTES.map((item, idx) => {
              const abierta = faqAbierta === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-[#0B0F1C] border border-white/[0.08] overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setFaqAbierta(abierta ? -1 : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-white cursor-pointer"
                  >
                    <span>{item.pregunta}</span>
                    <span className="text-[#E5C17B] text-lg shrink-0">{abierta ? '−' : '+'}</span>
                  </button>
                  {abierta && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/[0.05] pt-3">
                      {item.respuesta}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* FOOTER CON DIVULGACIÓN OBLIGATORIA DE AFILIADO DE AMAZON ESPAÑA */}
      <footer className="relative z-10 border-t border-white/[0.08] bg-[#04060B] py-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <LogoRMM size="sm" />
            <div>
              <p className="text-sm font-extrabold text-white">
                Regalo<span className="text-[#E5C17B]">Ideal</span> RMM
              </p>
              <p className="text-[11px] text-slate-500">
                Recomendador inteligente de regalos y compras • España
              </p>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center sm:text-right max-w-md leading-relaxed">
            En calidad de Afiliado de Amazon, obtengo ingresos por las compras adscritas que cumplen los requisitos aplicables. Los precios y la disponibilidad pueden variar en Amazon.es.
          </p>
        </div>
      </footer>

      {/* BOTÓN FLOTANTE SUBIR ARRIBA */}
      {mostrarSubir && (
        <button
          type="button"
          onClick={() => volverAlInicio(false)}
          title="Volver arriba"
          className="fixed bottom-5 right-5 z-50 w-11 h-11 rounded-full bg-gradient-to-r from-[#F7E3B5] to-[#D4AF37] text-[#05070E] font-extrabold shadow-[0_6px_25px_rgba(212,175,55,0.4)] hover:scale-105 transition flex items-center justify-center cursor-pointer"
        >
          ↑
        </button>
      )}
    </div>
  );
}