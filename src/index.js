import './styles.css';

import fetchCountries  from './js/fetchCountries';

import debounce from 'lodash.debounce';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
import { error } from '@pnotify/core/dist/PNotify.js';

import countriesTpl from './templates/countries-section.hbs';
import countryTpl from './templates/country-item.hbs';


const input = document.querySelector('#search');
const countrySection = document.querySelector('.country-section');


input.addEventListener('input', debounce(onInput, 500));

function onInput(event) {
    if (!event.target.value) {
        countrySection.innerHTML = '';
        return;
    }

    fetchCountries(event.target.value)
        .then(countries => countryAdd(countries))
        .catch(err => error({ text: err.message }));

}

const countryAdd = countries => {
    countrySection.innerHTML = '';
    if (countries.length === 1) {
        return countrySection.insertAdjacentHTML('beforeend', countryTpl(countries[0]));
        
    }
    
    if (countries.length >= 2 && countries.length <= 10) {
        return countrySection.insertAdjacentHTML('beforeend', countriesTpl(countries));
        
    }

    if (countries.length > 10) {
        error({
            text: 'Слишком много совпадений, введите больше символов!',
        });
    }
}



