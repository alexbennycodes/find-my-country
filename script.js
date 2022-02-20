// "use strict";

// const countriesContainer = document.querySelector(".countries");

// const request = new XMLHttpRequest();
// request.open("GET", "https://restcountries.com/v3.1/name/india");
// request.send();

// request.addEventListener("load", function () {
//   const [data] = JSON.parse(this.responseText);
//   console.log(data);

//   const html = `<article class="country">
//   <img class="country-img" src="${Object.values(data.flags)[1]}" />
//   <div class="country-data">
//     <h3 class="country-name">${Object.values(data.name)[0]}</h3>
//     <h4 class="country-region">${data.region}</h4>
//     <p class="country-row"><span>👫</span>${(+data.population / 100000).toFixed(
//       1
//     )}M people</p>
//     <p class="country-row"><span>🗣️</span>${
//       Object.values(data.languages)[0]
//     }</p>
//     <p class="country-row"><span>💰</span>${
//       Object.values(Object.values(data.currencies)[0])[0]
//     }</p>
//   </div>
// </article>`;
//   countriesContainer.insertAdjacentHTML("beforeend", html);
// });
