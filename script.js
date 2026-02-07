const stuff = document.getElementById('stuff');
const bro = document.getElementById('bro');
const thisBtn = document.querySelectorAll('button');

let output = '';
let lastResult = '';
let historyList = []; // stores all calculations

function thisElse() {
  stuff.value = output || '0';
}

function updateBroHistory() {
  bro.innerHTML = ''; 
  historyList.forEach((item, index) => {
    const div = document.createElement('div');
    div.textContent = item;
    div.classList.add('historyItem');
    div.style.cursor = 'pointer';
    div.addEventListener('click', () => {
      output = item.split(' = ')[0]; // load the expression only
      thisElse();
    });
    bro.appendChild(div);
  });
}

function doctor(value) {
  if (value === 'AC') {
    output = '';
    historyList = [];
    updateBroHistory();
  } else if (value === 'DEL') {
    output = output.slice(0, -1);
  } else if (value === '=') {
    try {
      const result = eval(output.replace('%','/100'));
      historyList.push(output + ' = ' + result);
      output = result.toString();
      lastResult = output;
      updateBroHistory();
    } catch {
      output = 'Error';
    }
  } else {
    if (output === 'Error') output = '';
    output += value;
  }
  thisElse();
}

thisBtn.forEach(bar => {
  bar.addEventListener('click', () => doctor(bar.dataset.value));
});

document.addEventListener('keydown', esd => {
  if (!isNaN(esd.key) || "+-*/.%".includes(esd.key)) doctor(esd.key);
  if (esd.key === 'Enter') doctor('=');
  if (esd.key === 'Backspace') doctor('DEL');
  if (esd.key === 'Escape') doctor('AC');
});
document.getElementById('backRed').addEventListener('click', () => {
  const calc = document.querySelector('.stuffCalc');
  calc.innerHTML = '<div style="text-align:center; font-size:2rem; color:red; padding:50px;">Goodbye!</div>';
  setTimeout(() => {
    window.location.href = '../index3.html';
  }, 1500); 
});
