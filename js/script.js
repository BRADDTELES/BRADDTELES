document.addEventListener("DOMContentLoaded", function () {

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  const elementsToAnimate = document.querySelectorAll(".animated-element");
  elementsToAnimate.forEach((element) => {
    observer.observe(element);
  });

  // --- Typing effect --- //
  const textPart1 = " Desenvolvedor Android";
  const textPart2 = " Web Full Stack em Formação";
  const element1 = document.getElementById("typing-text-1");
  const element2 = document.getElementById("typing-text-2");
  const cursor = document.querySelector(".typing-cursor");
  const typingSpeed = 70;
  function type(element, text, callback) {
    let i = 0;
    function typeChar() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(typeChar, typingSpeed);
      } else if (callback) {
        callback();
      }
    }
    typeChar();
  }
  setTimeout(() => {
    cursor.style.display = "inline-block";
    type(element1, textPart1, () => {
      type(element2, textPart2, () => {});
    });
  }, 500);

  // --- Modal Video Handler --- //
  const videoModal = document.getElementById("videoModal");
  const videoIframe = document.getElementById("youtube-video-iframe");
  videoModal.addEventListener("show.bs.modal", function (event) {
    const button = event.relatedTarget;
    const videoSrc = button.getAttribute("data-video-src");
    videoIframe.setAttribute("src", videoSrc + "?autoplay=1&rel=0");
  });
  videoModal.addEventListener("hide.bs.modal", function () {
    videoIframe.setAttribute("src", "");
  });

  // Adição sugerida: Integre particles.js aqui se quiser (ex.: descomente o div no HTML e adicione a biblioteca via CDN)
  particlesJS("particles-js", {
    particles: {
        number: { value: 50, density: { enable: true, value_area: 800 } },
        color: { value: '#0d6efd' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: { enable: true, speed: 2 }
    },
    interactivity: { detect_on: 'canvas', events: { onhover: { enable: true, mode: 'repulse' } } }
  });

   // --- Efeito Matrix: Códigos sendo "digitados" ao fundo --- //
  /* const canvas = document.getElementById('matrix-bg');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Redimensionar canvas em resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?'; // Caracteres para simular código
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array.from({ length: Math.floor(columns) }, () => Math.floor(Math.random() * canvas.height / fontSize));

  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Fade gradual para efeito de "digitação"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0d6efd'; // Cor azul para combinar com o tema (mude para '#00ff00' para verde Matrix)
    ctx.font = `${fontSize}px monospace`; // Fonte como código

    drops.forEach((y, x) => {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, x * fontSize, y * fontSize);

      if (y * fontSize > canvas.height && Math.random() > 0.975) {
        drops[x] = 0; // Reinicia a "queda"
      }
      drops[x]++;
    });
  }

  setInterval(draw, 100); */

  // --- Partículas de Código: Movendo da direita para a esquerda, lento, com efeitos adicionais --- //
  const canvas = document.getElementById('matrix-bg');
  const ctx = canvas.getContext('2d');

  // Suporte a alta resolução (anti-borrão)
  const dpr = window.devicePixelRatio || 1;
  canvas.style.width = window.innerWidth + "px";
  canvas.style.height = window.innerHeight + "px";
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);
  ctx.imageSmoothingEnabled = false; // Desativa anti-aliasing para texto nítido

  // Redimensionar canvas em resize
  window.addEventListener('resize', () => {
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    ctx.imageSmoothingEnabled = false;
  });

  // Snippets de código Kotlin e TypeScript (incluindo os que você adicionou + extras)
  const codeSnippets = [
    // Kotlin
    'fun main() { println("Hello, World!") }',
    'val x: Int = 10',
    'class User(val name: String)',
    'suspend fun fetchData() { ... }',
    'import kotlinx.coroutines.*',
    'class MainActivity : ComponentActivity() {}',
    'private val splashScreenViewModel : SplashScreenViewModel by lazy { ViewModelProvider(this@MainActivity)[SplashScreenViewModel::class.java] }',
    'companion object { val deeplinkRequestToken: MutableStateFlow<String?> = MutableStateFlow(null) }',
    'override fun onNewIntent(intent: Intent) { super.onNewIntent(intent) setIntent(intent) handleIntent(intent) }',
    'Log.d("MainActivity", "=== handleIntent chamado ===")',
    'if (uri.scheme == "netflixapp" && uri.host == "auth") {}',
    'val requestToken = uri.getQueryParameter("request_token")',
    'if (requestToken != null && requestToken != "TEST_TOKEN") {}',
    'suspend fun fetchData() { ... }',
    'import kotlinx.coroutines.*',
    'private val movieId: Int,',
    'private val filmeRepository: FilmeRepository',
    'private val _uiState = MutableStateFlow<UiState<FilmeDetalhes>>(UiState.Loading)',
    'val uiState: StateFlow<UiState<FilmeDetalhes>> = _uiState',
    'init { buscarDetalhesFilme() }',
    '_uiState.value = UiState.Error("Erro ao buscar detalhes do filme.")',
    'class Factory(private val movieId: Int, private val filmeRepository: FilmeRepository) : ViewModelProvider.Factory {}',
    'override fun <T : ViewModel> create(modelClass: Class<T>): T { if (modelClass.isAssignableFrom(FilmeDetalhesViewModel::class.java)) {} }',
    '@Suppress("UNCHECKED_CAST") return FilmeDetalhesViewModel(movieId, filmeRepository) as T',
    'throw IllegalArgumentException("Unknown ViewModel class")',
    '@Serializable @SerialName("id")',
    'package com.danilloteles.appnetflixapi.repository.v3',
    // TypeScript (extras para equilíbrio)
    'const add = (a: number, b: number) => a + b;',
    'interface User { name: string; age: number; }',
    'function greet(name: string): string { return `Hello, ${name}`; }',
    'type Point = { x: number; y: number; };',
    'async function fetchData(): Promise<any> { ... }',
    'import React from "react";',
    'const [state, setState] = useState<number>(0);',
    'class Person { constructor(public name: string) {} }',
    'enum Direction { Up, Down, Left, Right }',
    'const fetchData = async (url: string): Promise<Response> => { return fetch(url); };'
  ];

  // Partículas: Cada uma é um objeto com texto, posição x/y, velocidade, opacidade, oscilação
  const particles = [];
  const numParticles = 15; // Número de partículas
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)], // Snippet aleatório
      x: window.innerWidth + Math.random() * 200, // Começa fora da tela à direita
      y: Math.random() * window.innerHeight, // Posição vertical aleatória
      speed: 0.5 + Math.random() * 0.5, // Velocidade lenta variável
      opacity: 1, // Começa opaco
      wave: Math.random() * 2 - 1, // Direção da oscilação vertical
      color: Math.random() > 0.5 ? '#0d6efd' : '#B125EA' // Azul (Kotlin) ou Roxo (TypeScript)
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa completamente para evitar borrão

    ctx.font = 'bold 16px monospace'; // Fonte nítida
    ctx.shadowColor = 'rgba(0, 0, 0, 0)'; // Sem glow para máxima nitidez (ative se quiser)
    ctx.shadowBlur = 0;

    particles.forEach((particle) => {
      ctx.fillStyle = particle.color + Math.floor(particle.opacity * 255).toString(16).padStart(2, '0'); // Fade com opacidade
      ctx.fillText(particle.text, particle.x, particle.y);

      particle.x -= particle.speed; // Move para a esquerda lentamente
      particle.y += particle.wave * 0.1; // Oscilação vertical sutil

      // Reduz opacidade para fade gradual
      if (particle.x < window.innerWidth / 2) {
        particle.opacity -= 0.005; // Fade lento
      }

      // Renova quando sai da tela ou opacidade zero
      if (particle.x < -ctx.measureText(particle.text).width || particle.opacity <= 0) {
        particle.x = window.innerWidth + Math.random() * 100; // Reaparece na direita
        particle.y = Math.random() * window.innerHeight; // Nova posição vertical
        particle.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]; // Novo snippet
        particle.opacity = 1; // Reseta opacidade
        particle.color = Math.random() > 0.5 ? '#0d6efd' : '#B125EA'; // Nova cor
        particle.wave = Math.random() * 2 - 1; // Nova oscilação
      }
    });
  }

  setInterval(draw, 50); // Atualização lenta (a cada 100ms para movimento suave)
});
