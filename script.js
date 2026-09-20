// ==========================================
// 🌻 DÍA DE LAS FLORES AMARILLAS - 1:30 🌻
// Proyecto Multimedia Interactivo
// Autor: Alex Parrales Choez
// ==========================================

// ===== VARIABLES GLOBALES =====
const musica = document.getElementById('musica-fondo');
const canvas = document.getElementById('canvas-efectos');
const ctx = canvas.getContext('2d');

let musicaReproduciendo = false;
let petalos = [];
let corazones = [];
let estrellas = [];
let fuegosArtificiales = [];
let tiempoInicio = 0;
let animacionActiva = false;
let mensajeIndex = 0;

const DURACION_TOTAL = 90; // 1:30 minutos

// ===== CONFIGURAR CANVAS =====
function configurarCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
configurarCanvas();
window.addEventListener('resize', configurarCanvas);

// ===== MENSAJES =====
const mensajes = [
    { texto: "💛 Hoy es un día especial 💛", tipo: "normal", duracion: 4000 },
    { texto: "Porque el universo conspiró", tipo: "normal", duracion: 4000 },
    { texto: "para recordarte lo importante que eres", tipo: "normal", duracion: 4000 },
    { texto: "🌻 Flores Amarillas Para Ti 🌻", tipo: "titulo", duracion: 5000 },
    { texto: "Porque mereces lo más hermoso", tipo: "normal", duracion: 4000 },
    { texto: "Cada pétalo lleva un deseo de felicidad", tipo: "normal", duracion: 4000 },
    { texto: "Y cada flor representa lo especial que eres", tipo: "normal", duracion: 4000 },
    { texto: "Eres luz, eres alegría, eres única", tipo: "normal", duracion: 4000 },
    { texto: "💛 Te quiero mucho 💛", tipo: "titulo", duracion: 5000 }
];

// ===== CREAR MARCO DE FLORES =====
function crearMarcoBorde() {
    const emojisFlor = ['🌻', '🌼', '🌻', '🌼', '🌸', '🌼', '🌻'];
    const bordes = ['borde-superior', 'borde-inferior', 'borde-izquierdo', 'borde-derecho'];
    
    bordes.forEach(idBorde => {
        const contenedor = document.getElementById(idBorde);
        if (!contenedor) return;
        const esVertical = idBorde === 'borde-izquierdo' || idBorde === 'borde-derecho';
        const cantidad = esVertical ? 30 : 35;
        
        for (let i = 0; i < cantidad; i++) {
            const flor = document.createElement('span');
            flor.classList.add('flor-borde');
            flor.textContent = emojisFlor[Math.floor(Math.random() * emojisFlor.length)];
            flor.style.animationDelay = (Math.random() * 3) + 's';
            contenedor.appendChild(flor);
        }
    });
}

// ===== INICIAR EXPERIENCIA =====
function iniciarExperiencia() {
    console.log('🌻 Iniciando experiencia...');
    
    const pantallaInicio = document.getElementById('pantalla-inicio');
    if (pantallaInicio) pantallaInicio.classList.add('desaparecer');

    setTimeout(() => {
        const contenedor = document.getElementById('contenedor-principal');
        if (contenedor) contenedor.classList.add('visible');
        if (pantallaInicio) pantallaInicio.style.display = 'none';
        
        crearMarcoBorde();
        setTimeout(() => {
            const marco = document.getElementById('marco-flores-borde');
            if (marco) marco.classList.add('visible');
        }, 500);
        
        reproducirMusica();
        tiempoInicio = Date.now();
        animacionActiva = true;
        
        setTimeout(() => {
            secuenciaAnimacion();
        }, 1000);
    }, 1000);
}

// ===== CONTROL DE MÚSICA =====
function reproducirMusica() {
    if (!musica) return;
    musica.volume = 0.5;
    musica.play().then(() => {
        musicaReproduciendo = true;
        console.log('🎵 Música iniciada');
    }).catch(err => {
        console.log('⚠️ Reproducción automática bloqueada (interactúa con la página):', err);
    });
}

function toggleMusica() {
    if (!musica) return;
    const btn = document.getElementById('btn-musica');
    if (musicaReproduciendo) {
        musica.pause();
        if (btn) {
            btn.classList.add('pausado');
            btn.textContent = '🔇';
        }
    } else {
        musica.play();
        if (btn) {
            btn.classList.remove('pausado');
            btn.textContent = '🎵';
        }
    }
    musicaReproduciendo = !musicaReproduciendo;
}

// ===== ACTUALIZAR TIEMPO =====
function actualizarTiempo() {
    if (!animacionActiva) return;
    const transcurrido = Math.floor((Date.now() - tiempoInicio) / 1000);
    const minutos = Math.floor(transcurrido / 60);
    const segundos = transcurrido % 60;
    const tiempoDisplay = document.getElementById('tiempo-transcurrido');
    if (tiempoDisplay) {
        tiempoDisplay.textContent = `⏱️ ${minutos}:${segundos.toString().padStart(2, '0')} / 1:30`;
    }
    requestAnimationFrame(actualizarTiempo);
}

// ===== SECUENCIA DE ANIMACIÓN =====
function secuenciaAnimacion() {
    console.log('🎬 Iniciando secuencia - Duración: 1:30');
    actualizarTiempo();
    
    setTimeout(() => {
        const envoltorio = document.querySelector('.envoltorio-ramo');
        if (envoltorio) envoltorio.classList.add('aparecer');
    }, 300);

    setTimeout(() => {
        construirRamo();
    }, 1500);

    setTimeout(() => {
        const corona = document.querySelector('.corona-ramo');
        if (corona) corona.classList.add('aparecer');
    }, 7000);

    setTimeout(() => {
        document.querySelectorAll('.mariposa-ramo').forEach((m, i) => {
            setTimeout(() => m.classList.add('aparecer'), i * 400);
        });
    }, 8000);

    setTimeout(() => {
        document.querySelectorAll('.mariposa').forEach((m, i) => {
            setTimeout(() => m.classList.add('aparecer'), i * 500);
        });
    }, 10000);

    setTimeout(() => { iniciarPetalos(); }, 12000);
    setTimeout(() => { iniciarCorazones(); }, 14000);
    setTimeout(() => { iniciarEstrellas(); }, 16000);

    setTimeout(() => {
        mostrarSiguienteMensaje();
    }, 18000);

    const intervaloEfectos = setInterval(() => {
        if (animacionActiva) {
            efectoEspecial();
        } else {
            clearInterval(intervaloEfectos);
        }
    }, 10000);

    setTimeout(() => {
        granFinal();
        console.log('🎉 Gran final iniciado');
    }, 75000);
}

// ===== CONSTRUIR RAMO CORAZÓN =====
function construirRamo() {
    const contenedorFlores = document.getElementById('flores-ramo');
    if (!contenedorFlores) return;
    contenedorFlores.innerHTML = '';
    
    console.log('🌻 Construyendo corazón...');
    
    const emojisFlor = ['🌻', '🌻', '🌻', '🌼', '🌼', '🌼', '🌼', '🌼', '🌸', '🌸'];
    const numeroFlores = 50;
    const centroX = 200;
    const centroY = 180;
    const escala = 9;
    const coordenadas = [];
    
    for (let i = 0; i < numeroFlores; i++) {
        const t = (i / numeroFlores) * Math.PI * 2;
        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        coordenadas.push([centroX + x * escala, centroY - y * escala]);
    }
    
    console.log('📍 Coordenadas generadas:', coordenadas.length);
    
    coordenadas.forEach((coord, index) => {
        setTimeout(() => {
            const flor = document.createElement('div');
            flor.classList.add('flor-individual');
            
            const random = Math.random();
            if (random < 0.5) flor.textContent = '🌻';
            else if (random < 0.9) flor.textContent = '🌼';
            else flor.textContent = '🌸';
            
            flor.style.left = coord[0] + 'px';
            flor.style.top = coord[1] + 'px';
            flor.style.fontSize = '2rem';
            flor.style.zIndex = '3';
            
            // INTERACTIVIDAD: Click y Touch para explotar
            flor.addEventListener('click', (e) => explotarFlor(e, flor));
            flor.addEventListener('touchstart', (e) => {
                e.preventDefault(); // Evita zoom o scroll en móviles
                explotarFlor(e, flor);
            }, { passive: false });
            
            contenedorFlores.appendChild(flor);
            
            requestAnimationFrame(() => {
                flor.classList.add('aparecer');
            });
        }, index * 60);
    });
}

// ===== EXPLOSIÓN DE FLOR AL HACER CLIC =====
function explotarFlor(evento, florElemento) {
    const rect = florElemento.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    
    const emojis = ['🌻', '🌼', '🌸', '✨', '💛', '⭐'];
    const numParticulas = 12;
    
    for (let i = 0; i < numParticulas; i++) {
        const particula = document.createElement('div');
        particula.classList.add('particula-explosion');
        particula.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        particula.style.position = 'fixed';
        particula.style.left = x + 'px';
        particula.style.top = y + 'px';
        particula.style.fontSize = '1.5rem';
        particula.style.zIndex = '100';
        particula.style.pointerEvents = 'none';
        particula.style.transition = 'all 1s ease-out';
        document.body.appendChild(particula);
        
        const angulo = (i / numParticulas) * Math.PI * 2;
        const distancia = 80 + Math.random() * 60;
        const destinoX = Math.cos(angulo) * distancia;
        const destinoY = Math.sin(angulo) * distancia;
        
        requestAnimationFrame(() => {
            particula.style.transform = `translate(${destinoX}px, ${destinoY}px) scale(0) rotate(360deg)`;
            particula.style.opacity = '0';
        });
        
        setTimeout(() => particula.remove(), 1000);
    }
    
    crearOndaExpansiva(x, y);
    
    florElemento.style.transition = 'all 0.3s ease';
    florElemento.style.transform = 'scale(1.5)';
    setTimeout(() => {
        florElemento.style.transform = 'scale(1)';
    }, 300);
}

// ===== ONDA EXPANSIVA =====
function crearOndaExpansiva(x, y) {
    const onda = document.createElement('div');
    onda.style.position = 'fixed';
    onda.style.left = x + 'px';
    onda.style.top = y + 'px';
    onda.style.transform = 'translate(-50%, -50%)';
    onda.style.width = '10px';
    onda.style.height = '10px';
    onda.style.border = '3px solid #FFD700';
    onda.style.borderRadius = '50%';
    onda.style.zIndex = '99';
    onda.style.pointerEvents = 'none';
    onda.style.transition = 'all 0.8s ease-out';
    document.body.appendChild(onda);
    
    requestAnimationFrame(() => {
        onda.style.width = '150px';
        onda.style.height = '150px';
        onda.style.opacity = '0';
    });
    
    setTimeout(() => onda.remove(), 900);
}

// ===== MOSTRAR MENSAJES =====
function mostrarSiguienteMensaje() {
    if (mensajeIndex >= mensajes.length) {
        mensajeIndex = 0;
    }
    
    const mensajeActual = mensajes[mensajeIndex];
    const display = document.getElementById('mensaje-actual');
    if (!display) return;
    
    display.classList.remove('aparecer');
    display.className = 'mensaje-display';
    
    setTimeout(() => {
        display.textContent = mensajeActual.texto;
        if (mensajeActual.tipo === 'titulo') {
            display.classList.add('tipo-titulo');
        }
        
        setTimeout(() => {
            display.classList.add('aparecer');
        }, 50);
        
        setTimeout(() => {
            mensajeIndex++;
            mostrarSiguienteMensaje();
        }, mensajeActual.duracion);
    }, 300);
}

// ===== SISTEMA DE PÉTALOS =====
class Petalo {
    constructor() { this.reset(); this.y = Math.random() * canvas.height; }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = -30;
        this.tamano = Math.random() * 20 + 10;
        this.velocidad = Math.random() * 2 + 1.5;
        this.rotacion = Math.random() * 360;
        this.velocidadRotacion = (Math.random() - 0.5) * 3;
        this.oscilacion = Math.random() * 3;
        this.velocidadOscilacion = Math.random() * 0.03 + 0.01;
        this.tiempo = 0;
        this.opacidad = Math.random() * 0.4 + 0.6;
        const colores = ['#FFD700', '#FFA500', '#FFEC8B', '#F0E68C', '#DAA520', '#FFDAB9'];
        this.color = colores[Math.floor(Math.random() * colores.length)];
    }
    actualizar() {
        this.y += this.velocidad;
        this.tiempo += this.velocidadOscilacion;
        this.x += Math.sin(this.tiempo) * this.oscilacion;
        this.rotacion += this.velocidadRotacion;
        if (this.y > canvas.height + 30) this.reset();
    }
    dibujar() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotacion * Math.PI) / 180);
        ctx.globalAlpha = this.opacidad;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, this.tamano / 2, this.tamano, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// ===== SISTEMA DE CORAZONES =====
class Corazon {
    constructor() { this.reset(); this.y = Math.random() * canvas.height; }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 30;
        this.tamano = Math.random() * 25 + 15;
        this.velocidad = Math.random() * 1.5 + 1;
        this.opacidad = Math.random() * 0.5 + 0.5;
        this.oscilacion = Math.random() * 2;
        this.tiempo = Math.random() * 100;
    }
    actualizar() {
        this.y -= this.velocidad;
        this.tiempo += 0.05;
        this.x += Math.sin(this.tiempo) * this.oscilacion;
        if (this.y < -30) this.reset();
    }
    dibujar() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.globalAlpha = this.opacidad;
        ctx.fillStyle = '#FFD700';
        ctx.font = this.tamano + 'px Arial';
        ctx.fillText('💛', 0, 0);
        ctx.restore();
    }
}

// ===== SISTEMA DE ESTRELLAS =====
class Estrella {
    constructor() { this.reset(); }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.tamano = Math.random() * 4 + 2;
        this.opacidad = 0;
        this.velocidadOpacidad = Math.random() * 0.02 + 0.01;
        this.creciendo = true;
    }
    actualizar() {
        if (this.creciendo) {
            this.opacidad += this.velocidadOpacidad;
            if (this.opacidad >= 1) this.creciendo = false;
        } else {
            this.opacidad -= this.velocidadOpacidad;
            if (this.opacidad <= 0) {
                this.creciendo = true;
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
            }
        }
    }
    dibujar() {
        ctx.save();
        ctx.globalAlpha = this.opacidad;
        ctx.fillStyle = '#FFD700';
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FFD700';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.tamano, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// ===== FUEGOS ARTIFICIALES =====
class FuegoArtificial {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.particulas = [];
        this.colores = ['#FFD700', '#FFA500', '#FF6347', '#FF69B4', '#FFEC8B', '#FFDAB9'];
        this.color = this.colores[Math.floor(Math.random() * this.colores.length)];
        this.crearParticulas();
    }
    crearParticulas() {
        const numParticulas = 30 + Math.floor(Math.random() * 20);
        for (let i = 0; i < numParticulas; i++) {
            const angulo = (i / numParticulas) * Math.PI * 2;
            const velocidad = Math.random() * 4 + 2;
            this.particulas.push({
                x: this.x, y: this.y,
                vx: Math.cos(angulo) * velocidad,
                vy: Math.sin(angulo) * velocidad,
                vida: 1,
                decaimiento: Math.random() * 0.015 + 0.01,
                tamano: Math.random() * 4 + 2,
                gravedad: 0.05
            });
        }
    }
    actualizar() {
        this.particulas.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravedad;
            p.vx *= 0.98;
            p.vida -= p.decaimiento;
        });
        this.particulas = this.particulas.filter(p => p.vida > 0);
    }
    dibujar() {
        this.particulas.forEach(p => {
            ctx.save();
            ctx.globalAlpha = p.vida;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = this.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.tamano, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });
    }
    estaVivo() { return this.particulas.length > 0; }
}

function iniciarPetalos() { for (let i = 0; i < 60; i++) petalos.push(new Petalo()); }
function iniciarCorazones() { for (let i = 0; i < 20; i++) corazones.push(new Corazon()); }
function iniciarEstrellas() { for (let i = 0; i < 50; i++) estrellas.push(new Estrella()); }

// ===== ANIMAR EFECTOS =====
function animarEfectos() {
    if (!animacionActiva) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    estrellas.forEach(e => { e.actualizar(); e.dibujar(); });
    petalos.forEach(p => { p.actualizar(); p.dibujar(); });
    corazones.forEach(c => { c.actualizar(); c.dibujar(); });
    
    fuegosArtificiales.forEach(f => {
        f.actualizar();
        f.dibujar();
    });
    fuegosArtificiales = fuegosArtificiales.filter(f => f.estaVivo());

    requestAnimationFrame(animarEfectos);
}

// ===== EFECTO ESPECIAL PERIÓDICO =====
function efectoEspecial() {
    const efectos = ['💛', '✨', '🌟', '💫', '🌻', '🌼'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const elem = document.createElement('div');
            elem.textContent = efectos[Math.floor(Math.random() * efectos.length)];
            elem.style.position = 'fixed';
            elem.style.left = Math.random() * 100 + 'vw';
            elem.style.top = Math.random() * 100 + 'vh';
            elem.style.fontSize = (Math.random() * 30 + 20) + 'px';
            elem.style.zIndex = '50';
            elem.style.pointerEvents = 'none';
            elem.style.transition = 'all 2s ease-out';
            elem.style.opacity = '1';
            document.body.appendChild(elem);

            setTimeout(() => {
                elem.style.transform = `translateY(-100px) scale(0) rotate(360deg)`;
                elem.style.opacity = '0';
            }, 100);

            setTimeout(() => elem.remove(), 2200);
        }, i * 100);
    }
}

// ===== LANZAR FUEGO ARTIFICIAL =====
function lanzarFuegoArtificial() {
    const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
    const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
    fuegosArtificiales.push(new FuegoArtificial(x, y));
}

// ===== GRAN FINAL MEJORADO =====
function granFinal() {
    console.log('🎉 ¡Gran final iniciado!');
    
    const ramo = document.getElementById('ramo-construccion');
    const mensajesDiv = document.getElementById('contenedor-mensajes');
    if (ramo) ramo.classList.add('ocultar');
    if (mensajesDiv) mensajesDiv.style.opacity = '0';
    
    setTimeout(() => {
        const granFinalDiv = document.getElementById('gran-final');
        if (granFinalDiv) granFinalDiv.classList.add('aparecer');
    }, 500);
    
    // Fuegos artificiales continuos
    let contadorFuegos = 0;
    const intervaloFuegos = setInterval(() => {
        lanzarFuegoArtificial();
        if (Math.random() < 0.3) lanzarFuegoArtificial();
        if (Math.random() < 0.1) lanzarFuegoArtificial();
        contadorFuegos++;
        if (contadorFuegos > 30) clearInterval(intervaloFuegos);
    }, 500);
    
    // Explosión masiva de confeti (300 elementos)
    for (let i = 0; i < 300; i++) {
        setTimeout(() => {
            const elem = document.createElement('div');
            // Se eliminaron los espacios vacíos para que TODAS las partículas sean visibles
            const emojis = ['💛', '🌼', '✨', '🌸', '🌻', '💖', '🦋', '💫', '⭐'];
            elem.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            elem.style.position = 'fixed';
            elem.style.left = '50%';
            elem.style.top = '50%';
            elem.style.fontSize = (Math.random() * 40 + 20) + 'px';
            elem.style.zIndex = '250';
            elem.style.pointerEvents = 'none';
            elem.style.transition = 'all 3s ease-out';
            document.body.appendChild(elem);

            const angulo = (i / 300) * Math.PI * 2;
            const distancia = Math.random() * 800 + 300;
            const x = Math.cos(angulo) * distancia;
            const y = Math.sin(angulo) * distancia;

            setTimeout(() => {
                elem.style.transform = `translate(${x}px, ${y}px) rotate(720deg) scale(0)`;
                elem.style.opacity = '0';
            }, 50);

            setTimeout(() => elem.remove(), 3500);
        }, i * 10);
    }
    
    // Segunda ola: confeti cayendo
    setTimeout(() => {
        for (let i = 0; i < 150; i++) {
            setTimeout(() => {
                const elem = document.createElement('div');
                elem.textContent = '🌻';
                elem.style.position = 'fixed';
                elem.style.left = Math.random() * 100 + 'vw';
                elem.style.top = '-50px';
                elem.style.fontSize = (Math.random() * 30 + 20) + 'px';
                elem.style.zIndex = '250';
                elem.style.pointerEvents = 'none';
                elem.style.transition = 'all 4s ease-in';
                document.body.appendChild(elem);

                setTimeout(() => {
                    elem.style.top = '110vh';
                    elem.style.opacity = '0';
                }, 100);

                setTimeout(() => elem.remove(), 4500);
            }, i * 40);
        }
    }, 2000);
    
    // Tercera ola: corazones subiendo
    setTimeout(() => {
        for (let i = 0; i < 80; i++) {
            setTimeout(() => {
                const elem = document.createElement('div');
                elem.textContent = '💛';
                elem.style.position = 'fixed';
                elem.style.left = Math.random() * 100 + 'vw';
                elem.style.top = '110vh';
                elem.style.fontSize = (Math.random() * 25 + 15) + 'px';
                elem.style.zIndex = '250';
                elem.style.pointerEvents = 'none';
                elem.style.transition = 'all 4s ease-out';
                document.body.appendChild(elem);

                setTimeout(() => {
                    elem.style.top = '-50px';
                    elem.style.opacity = '0';
                }, 100);

                setTimeout(() => elem.remove(), 4500);
            }, i * 60);
        }
    }, 4000);
}

// ===== INICIAR ANIMACIÓN DE FONDO =====
setTimeout(() => {
    animarEfectos();
}, 1000);

// ===== VERIFICAR CARGA =====
window.addEventListener('load', () => {
    console.log('✅ Página cargada - Duración: 1:30');
    console.log('👤 Nombre: Alex Parrales Choez');
    console.log('📱 Responsive: Móviles, Tablets, PC, Laptops');
    console.log('🎆 Fuegos artificiales activos');
    console.log('👆 Haz clic en las flores para explotarlas');
});