"use strict";

const countriesContainer = document.getElementById("countries");

const regionContainer = document.getElementById("region-btns");

const regionBtns = document.querySelectorAll(".btn");

const searchBar = document.getElementById("search-bar");

let dataCountries = null;

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
  const html = `<div class="card mb-5" style="width: 18rem">
    <img src="${data_imgSrc}" class="card-img-top" alt="..." style="height:170px; object-fit:cover;"/>
    <div class="card-body pb-1">
      <h3 class="card-title fw-bold mb-0 country-name">${data_countryName}</h3>
      <p class="card-text text-secondary fw-semibold fs-5 text-uppercase country-region">${data_region}</p>
    </div>
    <ul class="list-group border-0 list-group-flush">
      <li class="list-group-item border-0 pb-0">📍${data_capital}</li>
      <li class="list-group-item border-0 pb-0">🗣️${data_languages}</li>
      <li class="list-group-item border-0 pb-0">👫${data_population}</li>
      <li class="list-group-item border-0 pb-0">💰${data_currencies}</li>
      <li class="list-group-item border-0">©️${data.cca3}</li>
    </ul>
   <!-- <div class="card-body pt-2">
      <a href="#" class="card-link">Read More</a>
    </div>-->
  </div>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};

const fetchCountries = async function () {
  countriesContainer.textContent = "";
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  dataCountries = await response.json();
  printCountries("all");
};

const printCountries = function () {
  countriesContainer.textContent = "";
  for (let country of dataCountries) {
    addCountry(country);
  }
};

const toggleButtonColor = function () {
  [...regionContainer.children].forEach((box) => {
    box.classList.remove("btn-primary");
    box.classList.add("btn-outline-primary");
  });
};

regionBtns.forEach((filter) => {
  filter.addEventListener("click", () => {
    // console.log(region.innerText);
    toggleButtonColor();
    filter.classList.remove("btn-outline-primary");
    filter.classList.add("btn-primary");
    const regionFilter = filter.innerText;
    const countryRegion = document.querySelectorAll(".country-region");
    // console.log(countryRegion.parentElement.parentElement);
    countryRegion.forEach((region) => {
      if (regionFilter === region.innerHTML || regionFilter === "All") {
        region.parentElement.parentElement.classList.remove("d-none");
      } else {
        region.parentElement.parentElement.classList.add("d-none");
      }
    });
  });
});

searchBar.addEventListener("input", (e) => {
  //console.log(e.target.value);
  const { value } = e.target;
  const countryNames = document.querySelectorAll(".country-name");
  //console.log(...countryNames);
  countryNames.forEach((country) => {
    // console.log(country.textContent);
    if (country.textContent.toLowerCase().includes(value.toLowerCase())) {
      country.parentElement.parentElement.classList.remove("d-none");
    } else {
      country.parentElement.parentElement.classList.add("d-none");
    }
  });
});

function clearInp() {
  document.getElementById("search-bar").value = "";
}

clearInp();
fetchCountries();
