// Menu Hamburguer
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  sidebar.classList.toggle('active');
});

// Lâmpada Interativa
const lamp = document.getElementById('lamp');
let isLampOn = false;

lamp.addEventListener('click', function() {
  isLampOn = !isLampOn;

  if (isLampOn) {
    // Lâmpada LIGADA → Modo CLARO
    this.classList.add('on');
    document.body.classList.add('light-mode');
    document.body.classList.remove('dark-mode');
    document.querySelector('.theme-toggle i').className = 'fas fa-sun';
  } else {
    // Lâmpada DESLIGADA → Modo ESCURO
    this.classList.remove('on');
    document.body.classList.remove('light-mode');
    document.body.classList.add('dark-mode');
    document.querySelector('.theme-toggle i').className = 'fas fa-moon';
  }
});


// Botão de Tema
const themeToggle = document.getElementById('themeToggle');

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  isLampOn = document.body.classList.contains('dark-mode');
  
  if (isLampOn) {
    lamp.classList.add('on');
    document.querySelector('.theme-toggle i').className = 'fas fa-sun';
  } else {
    lamp.classList.remove('on');
    document.querySelector('.theme-toggle i').className = 'fas fa-moon';
  }
});

// Atualiza a potência ao selecionar o aparelho
function atualizarPotencia() {
    const potenciaSelecionada = document.getElementById('aparelho').value;
    if (potenciaSelecionada) {
      document.getElementById('potencia').value = potenciaSelecionada;
    }
  }
  
  // Impede valores fora dos limites ao digitar
  document.getElementById('horas').addEventListener('input', function () {
    if (this.value > 24) this.value = 24;
    if (this.value < 1) this.value = 1;
  });
  
  document.getElementById('dias').addEventListener('input', function () {
    if (this.value > 30) this.value = 30;
    if (this.value < 1) this.value = 1;
  });
  
  document.getElementById('potencia').addEventListener('input', function () {
    if (this.value < 1) this.value = 1;
  });
  
  document.getElementById('quantidade').addEventListener('input', function () {
    if (this.value < 1) this.value = 1;
  });
  
  function calcularConsumo() {
    const potencia = parseFloat(document.getElementById('potencia').value);
    const horas = parseFloat(document.getElementById('horas').value);
    const dias = parseFloat(document.getElementById('dias').value);
    const quantidade = parseInt(document.getElementById('quantidade').value);
  
    if (isNaN(potencia) || potencia < 1) {
      alert("A potência deve ser um número maior que zero.");
      return;
    }
  
    if (horas < 1 || horas > 24) {
      alert("As horas devem estar entre 1 e 24.");
      return;
    }
  
    if (dias < 1 || dias > 30) {
      alert("Os dias devem estar entre 1 e 30.");
      return;
    }
  
    if (isNaN(quantidade) || quantidade < 1) {
      alert("A quantidade deve ser um número maior ou igual a 1.");
      return;
    }
  
    const consumoKWh = (potencia * horas * dias * quantidade) / 1000;
    const custo = consumoKWh * 0.68;
  
    document.getElementById('resultado').innerHTML =
      `Consumo total: ${consumoKWh.toFixed(2)} kWh<br>Custo estimado: R$ ${custo.toFixed(2)}`;
  }
  

// Navegação Suave
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Fecha o menu mobile
    menuToggle.classList.remove('active');
    sidebar.classList.remove('active');
    
    // Atualiza link ativo
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
    });
    this.classList.add('active');
    
    // Rola para a seção
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    const headerOffset = 100;
    const elementPosition = targetElement.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  });
});

// Animação ao Scroll
const sections = document.querySelectorAll('section');

function checkScroll() {
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.75) {
      section.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Ativa link conforme scroll
window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= sectionTop - 300) {
      current = section.getAttribute('id');
    }
  });
  
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});
