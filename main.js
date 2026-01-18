
const app = document.querySelector('#app');

// 1. Создаем структуру HTML через JS
app.innerHTML = `
  <div class="card-container">
    <div class="card hidden-content" id="card">
      <div class="avatar-wrapper" id="main-icon">💌</div>
      <h1 id="title">Тебе письмо...</h1>
      <div class="tap-hint" id="hint">(нажми, чтобы открыть)</div>
      
      <div id="content" class="hidden">
        <h1>Ксюшечка ❤️</h1>
        <div class="message-box">
          <span id="text-area"></span><span class="cursor"></span>
        </div>
        <button class="love-btn" id="boom-btn">Нажми меня, Котя!</button>
      </div>
    </div>
  </div>
`;

// Текст поздравления (можешь менять!)
const messageText = "Я просто хотел напомнить, как сильно я тебя люблю. Ты — самое чудесное, что случалось в моей жизни. Спасибо, что ты есть, моя радость!";

// Ссылки на элементы
const card = document.getElementById('card');
const mainIcon = document.getElementById('main-icon');
const title = document.getElementById('title');
const hint = document.getElementById('hint');
const content = document.getElementById('content');
const textArea = document.getElementById('text-area');
const boomBtn = document.getElementById('boom-btn');

let isOpen = false;

// 2. Логика открытия открытки
card.addEventListener('click', () => {
  if (isOpen) return;
  isOpen = true;

  // Меняем стили карточки
  card.classList.remove('hidden-content');
  hint.style.display = 'none';
  title.style.display = 'none';
  
  // Меняем иконку на котика
  mainIcon.textContent = '😻';
  
  // Показываем контент
  content.classList.remove('hidden');
  
  // Запускаем печатную машинку
  typeWriter(messageText, 0);
});

// 3. Эффект печатной машинки
function typeWriter(text, i) {
  if (i < text.length) {
    textArea.innerHTML += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1), 50); // Скорость печати
  } else {
    // Убираем курсор когда закончили
    document.querySelector('.cursor').style.display = 'none';
  }
}

// 4. Салют из сердечек и котиков
boomBtn.addEventListener('click', (e) => {
  e.stopPropagation(); // Чтобы не срабатывал клик по карточке
  createParticles();
  
  // Вибрация для телефона (если поддерживает)
  if (navigator.vibrate) navigator.vibrate(200);
  
  boomBtn.textContent = "Люблю тебя! 💕";
});

function createParticles() {
  const emojis = ['❤️', '💖', '😻', '😽', '🌸', '✨', '🍓'];
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Случайный эмодзи
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    
    // Случайная позиция по горизонтали
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '100vh'; // Вылетают снизу
    
    // Случайный размер и скорость
    const duration = Math.random() * 2 + 3; // от 3 до 5 секунд
    particle.style.animationDuration = duration + 's';
    particle.style.fontSize = (Math.random() * 1.5 + 1) + 'rem';
    
    document.body.appendChild(particle);
    
    // Удаляем элемент после анимации, чтобы не нагружать телефон
    setTimeout(() => {
      particle.remove();
    }, duration * 1000);
  }
}