"use strict";

const countriesContainer = document.querySelector(".countries");

//Btn Selectors
const showAllBtn = document.querySelector(".show-all");
const showAsiaBtn = document.querySelector(".show-asia");
const showAfricaBtn = document.querySelector(".show-africa");
const showEuropeBtn = document.querySelector(".show-europe");
const showAmericasBtn = document.querySelector(".show-americas");
const showOceaniaBtn = document.querySelector(".show-oceania");

const addCountry = function (data) {
  const data_imgSrc = Object.values(data.flags)[1];
  const data_countryName = Object.values(data.name)[0];
  const data_region = data.region || "Undefined";
  const data_capital = data.capital || "Undefined";
  const data_languages = data.languages
    ? Object.values(data.languages).slice(0, 2)
    : ["Undefined"];
  const data_population = (+data.population / 100000).toFixed(1);
  const data_currencies = data.currencies
    ? Object.values(Object.values(data.currencies)[0])[0]
    : ["No Currency"];

  const html = `<a href="country.html" class="country">
    <img class="country-img" src="${data_imgSrc}" />
    <div class="country-data">
      <h3 class="country-name">${data_countryName}</h3>
      <h4 class="country-region">${data_region}</h4>
      <p class="country-row"><span>📍</span>${data_capital}</p>
      <p class="country-row"><span>🗣️</span>${data_languages}</p>
        <p class="country-row"><span>👫</span>${data_population}M people</p>
      <p class="country-row"><span>💰</span>${data_currencies}</p>
    </div>
  </a>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};

const fetchCountry = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then((response) => response.json())
    .then(([data]) => addCountry(data));
};

// const printAllCountries = function () {
//   countriesContainer.textContent = "";
//   fetch("https://restcountries.com/v3.1/all")
//     .then((response) => response.json())
//     .then((data) => {
//       const countries = data;
//       if (countries) {
//         for (let country of countries) {
//           if (country) {
//             addCountry(country);
//           }
//         }
//       }
//     });
// };

const printCountries = function (region) {
  countriesContainer.textContent = "";
  fetch(`https://restcountries.com/v3.1/${region}`)
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
};

printCountries("all");

showAllBtn.addEventListener("click", () => printCountries("all"));
showAsiaBtn.addEventListener("click", () => printCountries("region/asia"));
showAfricaBtn.addEventListener("click", () => printCountries("region/africa"));
showEuropeBtn.addEventListener("click", () => printCountries("region/europe"));
showOceaniaBtn.addEventListener("click", () =>
  printCountries("region/oceania")
);
showAmericasBtn.addEventListener("click", () =>
  printCountries("region/americas")
);
