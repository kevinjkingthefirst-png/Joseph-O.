document.querySelectorAll('.fadeup').forEach(block => {
  const check = () => {
    if (block.getBoundingClientRect().top < innerHeight - 100) {
      block.classList.add('show');
    }
  };
  check();
  addEventListener('scroll', check);
});

const toggle = document.getElementById('themeTog');
toggle.onclick = () => {
  document.body.classList.toggle('light');
  toggle.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
};

document.querySelectorAll('.track div').forEach(bar => {
  setTimeout(() => {
    bar.style.width = bar.dataset.level + '%';
  }, 400);
});

document.querySelectorAll('.workbox').forEach(box => {
  box.onclick = () => location.href = box.dataset.link;
});

const burger = document.getElementById('burgerBut');
const phoneMenu = document.querySelector('.phonemenu');

burger.onclick = () => {
  phoneMenu.classList.toggle('open');
};

phoneMenu.querySelectorAll('a').forEach(link => {
  link.onclick = () => phoneMenu.classList.remove('open');
});

phoneMenu.querySelectorAll('a').forEach(link => {
  link.onclick = () => {
    phoneMenu.querySelectorAll('a').forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    phoneMenu.classList.remove('open');
  };
});