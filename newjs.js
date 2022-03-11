"use strict";

const containerDiv = document.querySelector(".container");
//console.log(containerDiv);

const printCountryDetails = function (data) {
  // const data_imgSrc = Object.values(data.flags)[1];
  // const data_countryName = data.name.common;
  // const data_region = data.region ? data.region : "Undefined";
  // const data_capital = data.capital ? data.capital[0] : "Undefined";
  // const data_languages = data.languages
  //   ? Object.values(data.languages).slice(0, 2)
  //   : ["Undefined"];
  // const data_population =
  //   data.population > 100000
  //     ? (+data.population / 100000).toFixed(1) + "M"
  //     : data.population > 1000
  //     ? (+data.population / 1000).toFixed(1) + "K"
  //     : data.population;
  // const data_currencies = data.currencies
  //   ? Object.values(data.currencies)[0].name
  //   : ["No Currency"];

  // console.log(data.maps.googleMaps);
  //console.log(Object.entries(data.nativeName)[0]);
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
            <tr><th>Land Borders</th><td>${data.borders}</td></tr> 
            <tr><th>UN Member</th><td>${data.unMember ? "Yes" : "No"}</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  </div>`;

  //console.log(html);
  containerDiv.insertAdjacentHTML("beforeend", html);
};

const fetchCountry = async function (countryCode) {
  //countriesContainer.textContent = "";
  const response = await fetch(
    `https://restcountries.com/v3.1/alpha?codes=${countryCode}`
  );
  const data = await response.json();
  console.log(...data);
  printCountryDetails(data[0]);
};

fetchCountry("MYS");
