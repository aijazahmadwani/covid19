covidSummary = "https://api.covid19api.com/summary";
// SELECT GLOBAL ELEMENTS
const totalCases = document.getElementById("totalCases");
const newCases = document.getElementById("newCases");
const totalRecovered = document.getElementById("totalRecovered");
const newRecovered = document.getElementById("newRecovered");
const totalDeaths = document.getElementById("totalDeaths");
const newDeaths = document.getElementById("newDeaths");
const lastUpdatedDate = document.getElementById("last-updated");
const allCountries = document.getElementById("allCountries");

async function getData() {
  const a = await fetch(covidSummary);
  const res = await (a.json());
  return res;
}

getData().then(res => {
  lastUpdatedDate.innerHTML = formatDate(res.Date);
  totalCases.innerHTML += res.Global.TotalConfirmed;
  newCases.innerHTML += res.Global.NewConfirmed;
  totalRecovered.innerHTML = res.Global.TotalRecovered;
  newRecovered.innerHTML += res.Global.NewRecovered;
  totalDeaths.innerHTML = res.Global.TotalDeaths;
  newDeaths.innerHTML += res.Global.NewDeaths;
  // LENGTH OF COUNTRIES
  const totalNoOfCountries = res.Countries.length;


  for (let i = 0; i < res.Countries.length; i++) {
    allCountries.innerHTML += `
    
      <tr>
 
      <th scope="row" onclick="storeVariable('${res.Countries[i].Country}')"><a href="./country.html">${res.Countries[i].Country}</a></th>
      <td>${res.Countries[i].TotalConfirmed}</td>
      <td>${res.Countries[i].TotalDeaths}</td>
      <td>${res.Countries[i].TotalRecovered}</td>
    
    </tr>
    `;
  }



}).catch(error => {
  console.log(error)
});

// SET SESSION VARIABLE

function storeVariable(country) {
  sessionStorage.setItem("countryName", country);
  return;
}


// FORMAT DATES
const monthsNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function formatDate(dateString) {
  let date = new Date(dateString);
  return date;
  //return `${date.getDate()} ${monthsNames[date.getMonth() - 1]} ${date.getFullYear()}`;
}

