"use strict";

const countriesContainer = document.querySelector(".country-list");
const searchInput = document.getElementById("searchInput");
const filterBtn = document.querySelector(".region-filter-btn");
const regions = document.querySelector(".region-filter");
const regionFilters = regions.querySelectorAll("li");

searchInput.value = "";

const addCountry = function (data) {
  //countryDetailsDiv.textContent = "";
  const data_imgSrc = Object.values(data.flags)[1];
  const data_countryName = data.name.common;
  const data_region = data.region ? data.region : "Undefined";
  const data_capital = data.capital ? data.capital[0] : "Undefined";
  const data_population =
    data.population > 100000
      ? (+data.population / 100000).toFixed(1) + "M"
      : data.population > 1000
      ? (+data.population / 1000).toFixed(1) + "K"
      : data.population;
  const data_currencies = data.currencies
    ? Object.values(data.currencies)[0].name
    : ["No Currency"];
  const html = `<article class="country">
      <img class="country-img" src="${data_imgSrc}" />
      <div class="country-data">
        <h3 class="country-name">${data_countryName}</h3>
        <h4 class="country-region">${data_region}</h4>
        <p class="country-row"><span>📍</span>${data_capital}</p>
        <p class="country-row"><span>👫</span>${data_population} people</p>
        <p class="country-row"><span>💰</span>${data_currencies}</p>
      </div>
    </article>`;
  countriesContainer.insertAdjacentHTML("beforeend", html);
};

const fetchCountries = async function () {
  countriesContainer.textContent = "";
  const response = await fetch(`https://restcountries.com/v3.1/all`);
  const data = await response.json();
  data.forEach((country) => {
    addCountry(country);
  });
};

fetchCountries();

searchInput.addEventListener("input", (e) => {
  //console.log(e.target.value);
  const { value } = e.target;
  const countryNames = document.querySelectorAll(".country-name");
  //console.log(...countryNames);
  countryNames.forEach((country) => {
    // console.log(country.textContent);
    if (country.textContent.toLowerCase().includes(value.toLowerCase())) {
      country.parentElement.parentElement.style.display = "block";
    } else {
      country.parentElement.parentElement.style.display = "none";
    }
  });
});

filterBtn.addEventListener("click", () => {
  regions.classList.toggle("open");
});

regionFilters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const value = filter.innerText;
    const countryRegion = document.querySelectorAll(".country-region");
    countryRegion.forEach((region) => {
      if (
        region.innerText.toLowerCase().includes(value.toLowerCase()) ||
        value === "All"
      ) {
        region.parentElement.parentElement.style.display = "block";
      } else {
        region.parentElement.parentElement.style.display = "none";
      }
    });
  });
});
