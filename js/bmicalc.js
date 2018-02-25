const wrap = document.querySelector('.wrap');
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const run = document.querySelector('.run');
const out = document.querySelector('.out')
let outcomeData = JSON.parse(localStorage.getItem('outcome')) || [];

function btnClick() {
  if (height.value == "" || weight.value == "") {return}
  calcBMI();
  run.style.display = 'none';
  out.style.display = 'flex';
}

function calcBMI() {
  // let height = document.querySelector('#height').value;
  // let weight = document.querySelector('#weight').value;
  const bmi = weight.value / ((height.value / 100) * (height.value / 100));
  addOutcome(bmi.toFixed(2), height.value, weight.value);
}
run.addEventListener('click', btnClick);
window.addEventListener('keydown',(e) => {
  if (e.keyCode == 13) {
    btnClick();
  }
})

function addOutcome(bmi, height, weight) {
  const date = new Date();
  const intbmi = Number(bmi);

  let title;
  let datatitle;
  if (intbmi >= 35) {
    title = '重度肥胖'
    datatitle = 5
  }else if(intbmi >= 30){
    title = '中度肥胖'
    datatitle = 4
  }else if(intbmi >= 27){
    title = '輕度肥胖'
    datatitle = 3
  }else if (intbmi >= 24) {
    title = '過重'
    datatitle = 2
  }else if (intbmi >= 18.5) {
    title = '正常'
    datatitle = 1
  }else{
    title = '過輕'
    datatitle = 0
  }

  const data = {
    title: title,
    datatitle: datatitle,
    bmi: bmi,
    weight: weight,
    height: height,
    date: {
      date: date.getDate(),
      month: date.getMonth(),
      year: date.getFullYear()
    }
  }
  outcomeData.push(data);
  localStorage.setItem("outcome", JSON.stringify(outcomeData));
  console.log(data.date.month);

  popOutcome(outcomeData)
}

function popOutcome(data) {
  console.log(data);
  wrap.innerHTML = '<div class="top">BMI紀錄</div>' + data.map(item => {
    return `
  <div class="outcome" data-title="${item.datatitle}">
    <div class="title">${item.title}</div>
    <div class="item">
      <span>BMI </span>${item.bmi}</div>
    <div class="item">
      <span>weight</span>${item.weight} kg</div>
    <div class="item">
      <span>height </span>${item.height} cm</div>
    <div class="item">
      <span>${item.date.month}-${item.date.date}-${item.date.year}</span>
    </div>
  </div>
  `
  }).join('')
}
popOutcome(outcomeData);