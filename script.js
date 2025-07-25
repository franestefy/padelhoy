{\rtf1\ansi\ansicpg1252\cocoartf2822
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 document.addEventListener('DOMContentLoaded', function() \{\
    // --- DATOS DEL JUEGO ---\
    const personajes = [\
        \{ nombre: 'Pancho', color: 'text-red-500' \},\
        \{ nombre: 'Tapir', color: 'text-blue-500' \},\
        \{ nombre: 'Jose', color: 'text-green-500' \},\
        \{ nombre: 'Chino', color: 'text-purple-500' \},\
        \{ nombre: 'Juancho', color: 'text-orange-500' \}\
    ];\
\
    const excusas = [\
        "Jug\'f3 con la mascota y le pinch\'f3.",\
        "Tengo un cumplea\'f1ito de una sobri.",\
        "Tengo otro partido.",\
        "Reci\'e9n termin\'e9 de jugar a la pelota.",\
        "Yo juego al f\'fatbol m\'e1s tarde.",\
        "Si voy no podr\'eda correr.",\
        "Lo manda bien tarde un feriado, cosa que si quer\'edamos jugar igual no hay cancha.",\
        "Yo sigo de gira familiar... ahora me estoy yendo a lo de mi suegra.",\
        "Las 'Bolas' son viejas, te rompen la pala.",\
        "Padel ma\'f1ana.",\
        "Estoy cocinando guiso de lenteja \uc0\u55357 \u56849 ",\
        "Me fui a las 6 de la ma\'f1ana y volv\'ed reci\'e9n.",\
        "\'bfDesde cu\'e1ndo organizamos un partido temprano?",\
        "Tengo que volar (chelo).",\
        "Porque si la peche\'e1s ahora temprano, tanto tiempo para conseguir otro partido...",\
        "No arriesgues chinito, mir\'e1 si ma\'f1ana est\'e1s hecho percha.",\
        "Hoy juega Boca."\
    ];\
\
    const confirmaciones = [\
        "\'a1De una! \'bfD\'f3nde y a qu\'e9 hora?",\
        "Siii, cuenten conmigo. \uc0\u55357 \u56613 ",\
        "\'a1Vamos! Estoy para jugar.",\
        "Listo, avisen nom\'e1s.",\
        "Recontra juego."\
    ];\
    \
    // --- ELEMENTOS DEL DOM ---\
    const chatWindow = document.getElementById('chat-window');\
    const startButton = document.getElementById('start-chat-button');\
\
    // --- L\'d3GICA DEL JUEGO ---\
\
    function crearMensajeHTML(nombre, color, texto, esIniciador) \{\
        const alignClass = esIniciador ? 'ml-auto' : 'mr-auto';\
        const bgColor = esIniciador ? 'bg-[#dcf8c6]' : 'bg-white';\
        const sentClass = esIniciador ? 'sent' : '';\
\
        return `\
            <div class="max-w-xs md:max-w-md $\{alignClass\} message-pop-in $\{sentClass\}">\
                <div class="$\{bgColor\} rounded-lg p-2 shadow-md">\
                    <p class="font-bold text-sm $\{color\}">$\{nombre\}</p>\
                    <p class="text-gray-800">$\{texto\}</p>\
                </div>\
            </div>\
        `;\
    \}\
\
    function anadirMensajeAlChat(htmlMensaje) \{\
        if (chatWindow) \{\
            chatWindow.innerHTML += htmlMensaje;\
            chatWindow.scrollTop = chatWindow.scrollHeight;\
        \}\
    \}\
\
    async function iniciarChat() \{\
        if (!startButton || !chatWindow) \{\
            console.error("No se pueden encontrar los elementos del chat para iniciar.");\
            return;\
        \}\
\
        startButton.disabled = true;\
        startButton.classList.add('opacity-50', 'cursor-not-allowed');\
        startButton.querySelector('span').textContent = 'Generando chat...';\
\
        chatWindow.innerHTML = ''; \
\
        const participantes = [...personajes].sort(() => Math.random() - 0.5);\
        const excusasMezcladas = [...excusas].sort(() => Math.random() - 0.5);\
        const confirmacionesMezcladas = [...confirmaciones].sort(() => Math.random() - 0.5);\
\
        const iniciador = participantes[0];\
        const respondedores = participantes.slice(1);\
\
        const numeroDeConfirmaciones = Math.random() < 0.6 ? 1 : 2; \
        const confirman = respondedores.slice(0, numeroDeConfirmaciones);\
        const ponenExcusas = respondedores.slice(numeroDeConfirmaciones);\
\
        let delay = 500;\
\
        setTimeout(() => \{\
            const mensajeHTML = crearMensajeHTML(iniciador.nombre, iniciador.color, "Padel hoy", true);\
            anadirMensajeAlChat(mensajeHTML);\
        \}, delay);\
\
        let excusaIndex = 0;\
        let confirmacionIndex = 0;\
        \
        const respondedoresMezclados = [...confirman, ...ponenExcusas].sort(() => Math.random() - 0.5);\
\
        for (const personaje of respondedoresMezclados) \{\
            delay += 1000 + Math.random() * 1500; \
\
            setTimeout(() => \{\
                let textoRespuesta;\
                if (confirman.find(p => p.nombre === personaje.nombre)) \{\
                    textoRespuesta = confirmacionesMezcladas[confirmacionIndex % confirmacionesMezcladas.length];\
                    confirmacionIndex++;\
                \} else \{\
                    textoRespuesta = excusasMezcladas[excusaIndex % excusasMezcladas.length];\
                    excusaIndex++;\
                \}\
                \
                const mensajeHTML = crearMensajeHTML(personaje.nombre, personaje.color, textoRespuesta, false);\
                anadirMensajeAlChat(mensajeHTML);\
\
            \}, delay);\
        \}\
        \
        setTimeout(() => \{\
            startButton.disabled = false;\
            startButton.classList.remove('opacity-50', 'cursor-not-allowed');\
            startButton.querySelector('span').textContent = "\'a1Mandar 'Padel hoy'!";\
        \}, delay + 500);\
    \}\
\
    // --- EVENT LISTENER ---\
    if (startButton) \{\
        startButton.addEventListener('click', iniciarChat);\
    \} else \{\
        console.error("Error: El bot\'f3n con id 'start-chat-button' no fue encontrado. El juego no puede iniciar.");\
        if (chatWindow) \{\
            chatWindow.innerHTML = `<div class="bg-red-200 text-red-800 p-3 rounded-lg text-center text-sm shadow"><p>Error al cargar el juego. No se encontr\'f3 el bot\'f3n de inicio.</p></div>`;\
        \}\
    \}\
\});}