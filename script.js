"use strict";

const countriesContainer = document.querySelector(".countries");
const countryDetailsDiv = document.querySelector(".country-details");

//Btn Selectors
const showAllBtn = document.querySelector(".show-all");
const showAsiaBtn = document.querySelector(".show-asia");
const showAfricaBtn = document.querySelector(".show-africa");
const showEuropeBtn = document.querySelector(".show-europe");
const showAmericasBtn = document.querySelector(".show-americas");
const showOceaniaBtn = document.querySelector(".show-oceania");

const searchContent = document.querySelector(".searchtype");

const addCountry = function (data) {
  countryDetailsDiv.textContent = "";
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
  const html = `<div class="country">
    <a class="${data.cca3}"><img class="country-img" src="${data_imgSrc}" /></a>
    <div class="country-data">
      <h3 class="country-name">${data_countryName}</h3>
      <h4 class="country-region">${data_region}</h4>
      <p class="country-row"><span>📍</span>${data_capital}</p>
      <p class="country-row"><span>🗣️</span>${data_languages}</p>
      <p class="country-row"><span>👫</span>${data_population} people</p>
      <p class="country-row"><span>💰</span>${data_currencies}</p>
      <p class="country-row country-cca3"><span>©️</span>${data.cca3}</p>
    </div>
  </div>`;
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
  //console.log(data);
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

const fetchCountrCode = async function (countryCode) {
  //countriesContainer.textContent = "";
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${countryCode}`
  );
  const data = await response.json();
  //console.log(...data);
  printCountryDetails(data[0]);
};

const printCountryDetails = function (data) {
  countriesContainer.textContent = "";
  countryDetailsDiv.textContent = "";
  let bordershtml = "";
  if (data.borders) {
    for (let borderCountry of data.borders) {
      bordershtml =
        bordershtml + `<a class="border-country">${borderCountry}</a>, `;
    }
  }
  //console.log(data);
  const html = `<div class="mycountrydiv">
    <div class="col">
      <h2>${data.name.common}</h2>
      <img class="country-img" src="${Object.values(data.flags)[1]}" />
    </div>
    <div class="col">
        <h1>Names</h1>
        <table>
          <tbody>
            <tr><th>Common Name</th><td>${data.name.common}</td></tr>
            <tr><th>Official Name</th><td>${data.name.official}</td></tr> 
            <tr><th>Common(Native) Name</th><td>${
              Object.values(data.name.nativeName)[0].common
            }</td></tr>
            <tr><th>Official(Native) Name</th><td>${
              Object.values(data.name.nativeName)[0].official
            }</td></tr> 
            <tr><th>CAA3 Code</th><td>${data.cca3}</td></tr>
          </tbody>
        </table>
    </div>
    <div class="col">
        <h1>Geography</h1>
        <table>
          <tbody>
            <tr><th>Capital</th><td>${data.capital}</td></tr>
            <tr><th>Region</th><td>${data.region}</td></tr>
            <tr><th>Sub Region</th><td>${data.subregion}</td></tr>
            <tr><th>Google Maps</th>
              <td>
                <a href="${data.maps.googleMaps}">${data.maps.googleMaps}</a>
              </td>
            </tr>
            <tr><th>Lat/Lng</th><td>${data.latlng}</td></tr>
            <tr><th>Area</th><td>${data.area}km²</td></tr>
          </tbody>
        </table>
    </div>
    <div class="col">
      <section>
        <h1>Others</h1>
        <table>
          <tbody>
            <tr><th>Language</th><td>${Object.values(data.languages)}</td></tr>
            <tr><th>Time Zone</th><td>${data.timezones}</td></tr> 
            <tr><th>Land Locked</th><td>${
              data.landlocked ? "Yes" : "No"
            }</td></tr>
            <tr class="land-borders"><th>Land Borders</th><td>${bordershtml}</td></tr> 
            <tr><th>UN Member</th><td>${data.unMember ? "Yes" : "No"}</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>`;

  //console.log(html);
  countryDetailsDiv.insertAdjacentHTML("beforeend", html);
};

const mouseClick = function (e) {
  //console.log(e.target.parentElement.classList);
  const countryCode = e.target.parentElement.classList[0];
  if (countryCode.length == 3) fetchCountrCode(countryCode);
};

document.addEventListener("click", mouseClick);

clearInp();
