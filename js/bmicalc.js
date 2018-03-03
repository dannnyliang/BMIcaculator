const wrap = document.querySelector('.wrap_record');
const height = document.querySelector('#height');
const weight = document.querySelector('#weight');
const run = document.querySelector('.run');
const header = document.querySelector('.header');
let outcomeData = JSON.parse(localStorage.getItem('outcome')) || [];

let stopAdd = false;
function btnClick() {
  if (height.value == "" || weight.value == "" || stopAdd) {return}
  const bmi = weight.value / ((height.value / 100) * (height.value / 100));
  addOutcome(bmi.toFixed(2), height.value, weight.value);

  run.style.display = 'none';
  stopAdd = !stopAdd;
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
    datatitle = 'severe-obese'
  }else if(intbmi >= 30){
    title = '中度肥胖'
    datatitle = 'medium-obese'
  }else if(intbmi >= 27){
    title = '輕度肥胖'
    datatitle = 'little-obese'
  }else if (intbmi >= 24) {
    title = '過重'
    datatitle = 'overweight'
  }else if (intbmi >= 18.5) {
    title = '正常'
    datatitle = 'normal'
  }else{
    title = '過輕'
    datatitle = 'light'
  }

  const data = {
    title: title,
    datatitle: datatitle,
    bmi: bmi,
    weight: weight,
    height: height,
    date: {
      date: date.getDate(),
      month: date.getMonth() + 1,//JANUARY >> 0, FEB >> 1......
      year: date.getFullYear()
    }
  }
  outcomeData.push(data);
  localStorage.setItem("outcome", JSON.stringify(outcomeData));

  popOutcome(outcomeData);
  updateBtn(bmi,title,datatitle)
}

function popOutcome(data) {
  wrap.innerHTML = '<div class="top">BMI紀錄</div>' + data.map(item => {
    return `
  <div class="outcome" style="border-color: var(--${item.datatitle})">
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

function updateBtn(bmi,title,datatitle) {
  const out = document.createElement('div');
  out.innerHTML = `
  
    <div class="bmi">${bmi}</div>
    <span>BMI</span>
    <div class="reset" style="background-color: var(--${datatitle})"><span></span></div>
    <div class="outtitle" style="color: var(--${datatitle})">${title}</div>
  
  `
  out.setAttribute('class','out btn');
  out.setAttribute('style', `color: var(--${datatitle})`)
  header.appendChild(out);

  resetBtn();
}

function resetBtn() {
  const reset = document.querySelector('.reset');
  const out = document.querySelector('.out')
  reset.addEventListener('click',function () {
    header.removeChild(out);
    run.style.display = 'flex';
    height.value = '';
    weight.value = '';
    stopAdd = !stopAdd;
  })
}