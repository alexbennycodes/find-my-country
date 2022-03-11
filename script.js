"use strict";

const countriesContainer = document.querySelector(".countries");

//Btn Selectors
const showAllBtn = document.querySelector(".show-all");
const showAsiaBtn = document.querySelector(".show-asia");
const showAfricaBtn = document.querySelector(".show-africa");
const showEuropeBtn = document.querySelector(".show-europe");
const showAmericasBtn = document.querySelector(".show-americas");
const showOceaniaBtn = document.querySelector(".show-oceania");

const searchContent = document.querySelector(".searchtype");

const addCountry = function (data) {
  const data_imgSrc = Object.values(data.flags)[1];
  const data_countryName = data.name.common;
  const data_region = data.region ? data.region : "Undefined";
  const data_capital = data.capital ? data.capital[0] : "Undefined";
  const data_languages = data.languages
    ? Object.values(data.languages).slice(0, 2)
    : ["Undefined"];
  const data_population =
    data.population > 100000
      ? (+data.population / 100000).toFixed(1) + "M"
      : data.population > 1000
      ? (+data.population / 1000).toFixed(1) + "K"
      : data.population;
  const data_currencies = data.currencies
    ? Object.values(data.currencies)[0].name
    : ["No Currency"];
  const html = `<a href="" class="country">
    <img class="country-img" src="${data_imgSrc}" />
    <div class="country-data">
      <h3 class="country-name">${data_countryName}</h3>
      <h4 class="country-region">${data_region}</h4>
      <p class="country-row"><span>📍</span>${data_capital}</p>
      <p class="country-row"><span>🗣️</span>${data_languages}</p>
      <p class="country-row"><span>👫</span>${data_population} people</p>
      <p class="country-row"><span>💰</span>${data_currencies}</p>
      <p class="country-row country-cca3"><span>©️</span>${data.cca3}</p>
    </div>
  </a>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};

const printCountries = async function (region) {
  countriesContainer.textContent = "";
  const response = await fetch(`https://restcountries.com/v3.1/${region}`);
  const data = await response.json();
  for (let country of data) {
    //console.log(country);
    addCountry(country);
  }
};

const fetchCountry = async function (countryName) {
  countriesContainer.textContent = "";
  const response = await fetch(
    `https://restcountries.com/v3.1/name/${countryName}`
  );
  const data = await response.json();
  console.log(data);
  // addCountry(...data);
  for (let country of data) {
    //console.log(country);
    addCountry(country);
  }
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

const searchCountry = function () {
  if (searchContent.value) fetchCountry(searchContent.value);
  else printCountries("all");
};

function clearInp() {
  document.querySelector(".searchtype").value = "";
}

clearInp();
