// Variables to access elements ===============================================

const h1 = document.querySelector('#trybewarts-header-title');
const buttonNavBar = document.querySelector('.button-nav-bar');
const inputEmail = document.getElementById('email');
const inputSenha = document.getElementById('senha');
const submitBtn = document.querySelector('#submit-btn');
const agreement = document.querySelector('#agreement');
const textArea = document.querySelector('#textarea');
const counter = document.querySelector('#counter');
const sectionForm = document.getElementById('forms');
const evaluationForm = document.getElementById('evaluation-form');
const content = document.getElementsByName('content');
const firstName = document.querySelector('#input-name');
const lastName = document.querySelector('#input-lastname');

// Function that makes the title be typed by itself ======================================
// Source: https://www.youtube.com/watch?v=8OHhNY4dxno

const textTitle = 'Trybewarts';
const interval = 200;

function showText(param1, param2, param3) {
  const char = param2.split('').reverse();
  const typer = setInterval(() => {
    if (!char.length) return clearInterval(typer);
    const next = char.pop();
    param1.innerHTML += next;
  }, param3);
}
showText(h1, textTitle, interval);

// Function to validate login (email and password) ======================================

function generateAlertInput() {
  if (inputEmail.value === 'tryber@teste.com' && inputSenha.value === '123456') {
    alert('Olá, Tryber!');
  } else {
    alert('Email ou senha inválidos.');
  }
}
generateAlertInput();

// Functions to enable or disable submit button =======================================

function enableSubmitBtn() {
  submitBtn.disabled = !agreement.checked;
}

submitBtn.addEventListener('click', (e) => {
  e.preventDefault();
});

// Functions to increment or decrement the characters of the text area ================================
// Source: https://www.youtube.com/watch?v=LiQcxaC2Ek4

textArea.addEventListener('keyup', (e) => {
  const subtract = e.target.maxLength - e.target.textLength;
  counter.innerHTML = `${subtract}`;
}, false);

// Function to get the value of the checkboxes ================================================
// Source: https://www.javascripttutorial.net/javascript-dom/javascript-getelementsbyname/

function getLearningContent() {
  const arrayContents = [];

  for (let index = 0; index < content.length; index += 1) {
    if (content[index].checked) {
      arrayContents.push(content[index].value);
    }
  }
  return arrayContents.join(', ');
}

// Function to get the values from the form =================================================

function getData() {
  const dataObj = {
    Nome: `${firstName.value} ${lastName.value}`,
    Email: document.getElementById('input-email').value,
    Casa: document.getElementById('house').value,
    Família: document.querySelector('input[name=family]:checked').value,
    Matérias: getLearningContent(),
    Avaliação: document.querySelector('input[name=rate]:checked').value,
    Observações: textArea.value,
  };
  return dataObj;
}

// Function to show the values in a new chart ========================================
// Sources: https://www.youtube.com/watch?v=0y9qookjE0w&t=2s // https://www.youtube.com/watch?v=CO29CxeRMx4

function showReply() {
  const dataObj = getData();
  evaluationForm.style.display = 'none';

  const formReply = document.createElement('form');
  formReply.id = 'form-data';
  sectionForm.appendChild(formReply);

  const keys = Object.keys(dataObj);
  for (let index = 0; index < keys.length; index += 1) {
    const paragraph = document.createElement('p');
    paragraph.innerHTML = `${keys[index]}: ${dataObj[keys[index]]}`;
    formReply.appendChild(paragraph);
  }
}

// Call functions ========================================================

window.onload = () => {
  buttonNavBar.addEventListener('click', generateAlertInput);
  agreement.addEventListener('change', enableSubmitBtn);
  submitBtn.addEventListener('click', showReply);
};
