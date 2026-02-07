let score = JSON.parse(localStorage.getItem('score')) || { wins:0, losses:0, ties:0, streak:0 };
let history = JSON.parse(localStorage.getItem('history')) || [];
let isAutoPlaying = false;
let intervalId = null;

const moves = document.querySelectorAll('.movebut');
const resultEl = document.querySelector('.jsresult');
const movesEl = document.querySelector('.jsmoves');
const scoreEl = document.querySelector('.jsscore');
const streakEl = document.querySelector('.winstreak');
const historyList = document.querySelector('.historylist');

function pickComputerMove() {
  const options = ['rock','paper','scissors'];
  return options[Math.floor(Math.random()*3)];
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if(playerMove===computerMove) result='Tie';
  else if ((playerMove==='rock' && computerMove==='scissors') ||
           (playerMove==='paper' && computerMove==='rock') ||
           (playerMove==='scissors' && computerMove==='paper')) result='Win';
  else result='Lose';

  if(result==='Win'){ score.wins++; score.streak++; spawnConfetti(); }
  else if(result==='Lose'){ score.losses++; score.streak=0; }
  else score.ties++;

  history.unshift({player:playerMove, computer:computerMove, result});
  if(history.length>10) history.pop();
  localStorage.setItem('score', JSON.stringify(score));
  localStorage.setItem('history', JSON.stringify(history));

  updateUI(playerMove, computerMove, result);
}

function updateUI(playerMove, computerMove, result) {
  resultEl.textContent = result ? `Result: ${result}` : 'Make your move!';

  if(playerMove && computerMove){
    movesEl.innerHTML = `
      <span>You <img src="images/${playerMove}-emoji.png"></span>
      <span>Computer <img src="images/${computerMove}-emoji.png"></span>
    `;
  } else movesEl.innerHTML = '';

  scoreEl.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  streakEl.textContent = score.streak>1 ? `Win Streak: ${score.streak}` : '';
  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = '';
  history.forEach(item=>{
    const li = document.createElement('li');
    li.textContent = `${item.player} vs ${item.computer} → ${item.result}`;
    historyList.appendChild(li);
  });
}

moves.forEach(btn => btn.addEventListener('click', ()=>playGame(btn.dataset.move)));

document.body.addEventListener('keydown', e=>{
  if(e.key==='r') playGame('rock');
  if(e.key==='p') playGame('paper');
  if(e.key==='s') playGame('scissors');
});

document.querySelector('.resetbut').addEventListener('click', ()=>{
  score={wins:0,losses:0,ties:0,streak:0};
  history=[];
  localStorage.removeItem('score');
  localStorage.removeItem('history');
  updateUI('','','');
});

document.querySelector('.autoplaybut').addEventListener('click', ()=>{
  if(!isAutoPlaying){
    intervalId = setInterval(()=>playGame(['rock','paper','scissors'][Math.floor(Math.random()*3)]),1000);
    isAutoPlaying=true;
  } else { clearInterval(intervalId); isAutoPlaying=false; }
});

function spawnConfetti(){
  for(let i=0;i<20;i++){
    const conf = document.createElement('div');
    conf.classList.add('confetti');
    conf.style.left = Math.random()*window.innerWidth+'px';
    conf.style.backgroundColor = ['#e10600','#ff4d4d','#ffaaaa'][Math.floor(Math.random()*3)];
    document.body.appendChild(conf);
    setTimeout(()=>conf.remove(),1000);
  }
}

// Initialize UI
updateUI('','','');