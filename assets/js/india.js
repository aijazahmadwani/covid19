indiaURL = "https://api.covid19india.org/state_district_wise.json";
let totalCasesIndia = 0, totalDeathsIndia = 0, totalRecoveredIndia = 0;
// indiaURL = "./indiaData.json";
// SELECT GLOBAL ELEMENTS
const totalCases = document.getElementById("totalCases");
// const newCases = document.getElementById("newCases");
const totalRecovered = document.getElementById("totalRecovered");
// const newRecovered = document.getElementById("newRecovered");
const totalDeaths = document.getElementById("totalDeaths");
// const newDeaths = document.getElementById("newDeaths");
// const lastUpdatedDate = document.getElementById("last-updated");
const allStates = document.getElementById("allStates");

async function getData() {
  const a = await fetch(indiaURL);
  const res = await (a.json());
  return res;
}
states = []
getData().then(res => {
  keys = Object.keys(res);
  // console.log(keys);

  // console.log(res[keys[1]].districtData);
  // console.log(Object.keys(res[keys[1]].districtData));
  for (i = 1; i < keys.length; i++) {
    let active = [],
      confirmed = [],
      recovered = [],
      deceased = [];
    // console.log(res[keys[i]].statecode);
    for (let key of Object.keys(res[keys[i]].districtData)) {
      // console.log(key);
      active.push(res[keys[i]].districtData[key].active);
      confirmed.push(res[keys[i]].districtData[key].confirmed);
      recovered.push(res[keys[i]].districtData[key].recovered);
      deceased.push(res[keys[i]].districtData[key].deceased);
    }
    // Getting sum of numbers
    var activeSum = active.reduce(function (a, b) {
      return a + b;
    }, 0);
    var confirmedSum = confirmed.reduce(function (a, b) {
      return a + b;
    }, 0);
    var recoveredSum = recovered.reduce(function (a, b) {
      return a + b;
    }, 0);
    var deceasedSum = deceased.reduce(function (a, b) {
      return a + b;
    }, 0);
    totalCasesIndia += confirmedSum;
    totalDeathsIndia += deceasedSum;
    totalRecoveredIndia += recoveredSum;
    allStates.innerHTML += `
        <tr>
          <th scope="row">${keys[i]}</th>
          <td>${confirmedSum}</td>
          <td>${activeSum}</td>
          <td>${deceasedSum}</td>
          <td>${recoveredSum}</td>
      </tr>
      `;
    // add data to map
    if (res[keys[i]].statecode != 'LA') {
      sc = res[keys[i]].statecode;
      ele = document.getElementById(sc);
      if (sc != "LD") {
        ele.setAttribute("data-info", `<strong>${keys[i]}</strong><br><div>Cases: ${confirmedSum}</div><div>Active: ${activeSum}</div><div>Deaths: ${deceasedSum}</div><div>Recoveries: ${recoveredSum}</div>`);

      }

    }


  }

  // console.log(keys[1]);
  // for (let key of Object.keys(res[keys[1]].districtData)) {
  //   // console.log(key);
  //   active.push(res[keys[1]].districtData[key].active);
  //   confirmed.push(res[keys[1]].districtData[key].confirmed);
  //   recovered.push(res[keys[1]].districtData[key].recovered);
  //   deceased.push(res[keys[1]].districtData[key].deceased);
  // }
  // // Getting sum of numbers
  // var activeSum = active.reduce(function (a, b) {
  //   return a + b;
  // }, 0);
  // var confirmedSum = confirmed.reduce(function (a, b) {
  //   return a + b;
  // }, 0);
  // var recoveredSum = recovered.reduce(function (a, b) {
  //   return a + b;
  // }, 0);
  // var deceasedSum = deceased.reduce(function (a, b) {
  //   return a + b;
  // }, 0);

  //     allStates.innerHTML += `
  //     <tr>
  //       <th scope="row">${keys[1]}</th>
  //       <td>${confirmedSum}</td>
  //       <td>${activeSum}</td>
  //       <td>${deceasedSum}</td>
  //       <td>${recoveredSum}</td>
  //   </tr>
  //   `;
  //   for (let i = 0; i < res.Countries.length; i++) {
  //   allStates.innerHTML += `

  //     <tr>

  //     <th scope="row" onclick="storeVariable('${res.Countries[i].Country}')"><a href="./country.html">${res.Countries[i].Country}</a></th>
  //     <td>${res.Countries[i].TotalConfirmed}</td>
  //     <td>${res.Countries[i].TotalDeaths}</td>
  //     <td>${res.Countries[i].TotalRecovered}</td>

  //   </tr>
  //   `;
  // }

  // console.log(res);
  // lastUpdatedDate.innerHTML = formatDate(res.Date);
  totalCases.innerHTML += totalCasesIndia;
  //   newCases.innerHTML += res.Global.NewConfirmed;
  totalRecovered.innerHTML = totalRecoveredIndia;
  //   newRecovered.innerHTML += res.Global.NewRecovered;
  totalDeaths.innerHTML = totalDeathsIndia;

  //   newDeaths.innerHTML += res.Global.NewDeaths;
  //   // LENGTH OF COUNTRIES
  //   const totalNoOfCountries = res.Countries.length;


  //   for (let i = 0; i < res.Countries.length; i++) {
  //     allCountries.innerHTML += `

  //       <tr>

  //       <th scope="row" onclick="storeVariable('${res.Countries[i].Country}')"><a href="./country.html">${res.Countries[i].Country}</a></th>
  //       <td>${res.Countries[i].TotalConfirmed}</td>
  //       <td>${res.Countries[i].TotalDeaths}</td>
  //       <td>${res.Countries[i].TotalRecovered}</td>

  //     </tr>
  //     `;
  //   }



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


a = "aijaz"
$("path, circle").hover(function (e) {
  $('#info-box').css('display', 'block');
  $('#info-box').html($(this).data('info'));
});

$("path, circle").mouseleave(function (e) {
  $('#info-box').css('display', 'none');
});
$(document).mousemove(function (e) {
  $('#info-box').css('top', e.pageY - $('#info-box').height() - 30);
  $('#info-box').css('left', e.pageX - ($('#info-box').width()) / 2);
}).mouseover();


