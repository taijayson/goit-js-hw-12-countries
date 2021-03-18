import './styles.css';

import { fetchCountries }  from './js/fetchCountries';

import debounce from 'lodash.debounce';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error } from '@pnotify/core/dist/PNotify.js';

import countriesTpl from './templates/countries-section.hbs';
import countryTpl from './templates/country-item.hbs';


const input = document.querySelector('#search');
const countrySection = document.querySelector('.country-section');

input.addEventListener('input', debounce(onInput, 500));

function onInput(event) {
    input.innerHTML = '';
    if (event.target.value) {  
        return;
    }

    fetchCountries(event.target.value)
        .then(countries => countryAdd(countries))
        .catch(err => error({ text: err.message }));

}

const countryAdd = countries => {
    input.innerHTML = '';
    if (countries.length === 1) {
        countrySection.insertAdjacentHTML('beforeend', countriesTpl(countries));
        return;
    }
    
    if (countries.length >= 2 && countries.length <= 10) {
        countrySection.insertAdjacentHTML('beforeend', countryTpl(countries));
        return;
    }
}

error({
    text: 'Ошибка в имени!',
});

