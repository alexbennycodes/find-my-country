"use strict";

const countriesContainer = document.querySelector(".countries");

const addCountry = function (data) {
  console.log(data);
  const data_imgSrc = Object.values(data.flags)[1];
  const data_countryName = Object.values(data.name)[0];
  const data_continent = data.continents || "Undefined";
  const data_capital = data.capital || "Undefined";
  const data_languages = data.languages
    ? Object.values(data.languages).slice(0, 2)
    : ["Undefined"];
  const data_population = (+data.population / 100000).toFixed(1);
  const data_currencies = data.currencies
    ? Object.values(Object.values(data.currencies)[0])[0]
    : ["No Currency"];

  const html = `<article class="country">
    <img class="country-img" src="${data_imgSrc}" />
    <div class="country-data">
      <h3 class="country-name">${data_countryName}</h3>
      <h4 class="country-region">${data_continent}</h4>
      <p class="country-row"><span>📍</span>${data_capital}</p>
      <p class="country-row"><span>🗣️</span>${data_languages}</p>
        <p class="country-row"><span>👫</span>${data_population}M people</p>
      <p class="country-row"><span>💰</span>${data_currencies}</p>
    </div>
  </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};


const fetchCountry = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then(([data]) => addCountry(data));
};


fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    const countries = data;
    if (countries) {
      for (let country of countries) {
        if (country) {
          addCountry(country);
        }
      }
    }
  });
