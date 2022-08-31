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
populatedInputOnReload();

function onFormInput() {
    formData.email = refs.input.value;
    formData.message = refs.textarea.value;

    localStorage.setItem(STORAGE_INPUT, JSON.stringify(formData));
};

function onFormSubmit(e) {
    e.preventDefault();

    if (!refs.input.value || !refs.textarea.value) { 
        return alert('Please fill in all fields!');
    }

    console.log(formData);

    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_INPUT);
};

function populatedInputOnReload() { 
    const savedInput = localStorage.getItem(STORAGE_INPUT);
    const parsedInput = JSON.parse(savedInput);

    if (savedInput) { 
        refs.input.value = parsedInput.email;
        refs.textarea.value = parsedInput.message;
    }
};