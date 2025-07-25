document.addEventListener('DOMContentLoaded', function() {
    // --- DATOS DEL JUEGO ---
    const personajes = [
        { nombre: 'Pancho', color: 'text-red-500' },
        { nombre: 'Tapir', color: 'text-blue-500' },
        { nombre: 'Jose', color: 'text-green-500' },
        { nombre: 'Chino', color: 'text-purple-500' },
        { nombre: 'Juancho', color: 'text-orange-500' }
    ];

    const excusas = [
        "Jugó con la mascota y le pinchó.",
        "Tengo un cumpleañito de una sobri.",
        "Tengo otro partido.",
        "Recién terminé de jugar a la pelota.",
        "Yo juego al fútbol más tarde.",
        "Si voy no podría correr.",
        "Lo manda bien tarde un feriado, cosa que si queríamos jugar igual no hay cancha.",
        "Yo sigo de gira familiar... ahora me estoy yendo a lo de mi suegra.",
        "Las 'Bolas' son viejas, te rompen la pala.",
        "Padel mañana.",
        "Estoy cocinando guiso de lenteja 😑",
        "Me fui a las 6 de la mañana y volví recién.",
        "¿Desde cuándo organizamos un partido temprano?",
        "Tengo que volar (chelo).",
        "Porque si la pecheás ahora temprano, tanto tiempo para conseguir otro partido...",
        "No arriesgues chinito, mirá si mañana estás hecho percha.",
        "Hoy juega Boca."
    ];

    const confirmaciones = [
        "¡De una! ¿Dónde y a qué hora?",
        "Siii, cuenten conmigo. 🔥",
        "¡Vamos! Estoy para jugar.",
        "Listo, avisen nomás.",
        "Recontra juego."
    ];
    
    // --- ELEMENTOS DEL DOM ---
    const chatWindow = document.getElementById('chat-window');
    const startButton = document.getElementById('start-chat-button');

    // --- LÓGICA DEL JUEGO ---

    function crearMensajeHTML(nombre, color, texto, esIniciador) {
        const alignClass = esIniciador ? 'ml-auto' : 'mr-auto';
        const bgColor = esIniciador ? 'bg-[#dcf8c6]' : 'bg-white';
        const sentClass = esIniciador ? 'sent' : '';

        return `
            <div class="max-w-xs md:max-w-md ${alignClass} message-pop-in ${sentClass}">
                <div class="${bgColor} rounded-lg p-2 shadow-md">
                    <p class="font-bold text-sm ${color}">${nombre}</p>
                    <p class="text-gray-800">${texto}</p>
                </div>
            </div>
        `;
    }

    function anadirMensajeAlChat(htmlMensaje) {
        if (chatWindow) {
            chatWindow.innerHTML += htmlMensaje;
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    }

    async function iniciarChat() {
        if (!startButton || !chatWindow) {
            console.error("No se pueden encontrar los elementos del chat para iniciar.");
            return;
        }

        startButton.disabled = true;
        startButton.classList.add('opacity-50', 'cursor-not-allowed');
        startButton.querySelector('span').textContent = 'Generando chat...';

        chatWindow.innerHTML = ''; 

        const participantes = [...personajes].sort(() => Math.random() - 0.5);
        const excusasMezcladas = [...excusas].sort(() => Math.random() - 0.5);
        const confirmacionesMezcladas = [...confirmaciones].sort(() => Math.random() - 0.5);

        const iniciador = participantes[0];
        const respondedores = participantes.slice(1);

        const numeroDeConfirmaciones = Math.random() < 0.6 ? 1 : 2; 
        const confirman = respondedores.slice(0, numeroDeConfirmaciones);
        const ponenExcusas = respondedores.slice(numeroDeConfirmaciones);

        let delay = 500;

        setTimeout(() => {
            const mensajeHTML = crearMensajeHTML(iniciador.nombre, iniciador.color, "Padel hoy", true);
            anadirMensajeAlChat(mensajeHTML);
        }, delay);

        let excusaIndex = 0;
        let confirmacionIndex = 0;
        
        const respondedoresMezclados = [...confirman, ...ponenExcusas].sort(() => Math.random() - 0.5);

        for (const personaje of respondedoresMezclados) {
            delay += 1000 + Math.random() * 1500; 

            setTimeout(() => {
                let textoRespuesta;
                if (confirman.find(p => p.nombre === personaje.nombre)) {
                    textoRespuesta = confirmacionesMezcladas[confirmacionIndex % confirmacionesMezcladas.length];
                    confirmacionIndex++;
                } else {
                    textoRespuesta = excusasMezcladas[excusaIndex % excusasMezcladas.length];
                    excusaIndex++;
                }
                
                const mensajeHTML = crearMensajeHTML(personaje.nombre, personaje.color, textoRespuesta, false);
                anadirMensajeAlChat(mensajeHTML);

            }, delay);
        }
        
        setTimeout(() => {
            startButton.disabled = false;
            startButton.classList.remove('opacity-50', 'cursor-not-allowed');
            startButton.querySelector('span').textContent = "¡Mandar 'Padel hoy'!";
        }, delay + 500);
    }

    // --- EVENT LISTENER ---
    if (startButton) {
        startButton.addEventListener('click', iniciarChat);
    } else {
        console.error("Error: El botón con id 'start-chat-button' no fue encontrado. El juego no puede iniciar.");
        if (chatWindow) {
            chatWindow.innerHTML = `<div class="bg-red-200 text-red-800 p-3 rounded-lg text-center text-sm shadow"><p>Error al cargar el juego. No se encontró el botón de inicio.</p></div>`;
        }
    }
});