import throttle from 'lodash.throttle';

const STORAGE_INPUT = 'feedback-form-state';
const formData = {};

const refs = {
    form: document.querySelector('.feedback-form'),
    input: document.querySelector('.feedback-form input'),
    textarea: document.querySelector('.feedback-form textarea'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onFormInput, 500));

function onFormInput(e) {
    formData[e.target.name] = e.target.value;
    localStorage.setItem(STORAGE_INPUT, JSON.stringify(formData));
};

populatedInput();

function onFormSubmit(e) {
    e.preventDefault();
    console.log(`The feedback message from email "${refs.input.value}" is sent!`);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_INPUT);
};

function populatedInput() { 
    const savedInput = localStorage.getItem(STORAGE_INPUT);
    const parsedInput = JSON.parse(savedInput);
    if (savedInput) { 
        refs.input.value = parsedInput.email;
        refs.textarea.value = parsedInput.message;
    }
};