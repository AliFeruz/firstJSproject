//! Here is starting my Cards with life Fetching

let data = [];

const url = "http://api.citybik.es/v2/networks";

function fetchData(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let result = response.json();
      console.log("result", result);
      return result;
    })
    .then((myData) => {
      console.log("data", myData);
      document.getElementById("card-container").addEventListener('click', createCards)
      createCards(myData.networks);
      data = myData;
      initialisePage(myData);
    })
    .catch((error) => {
      console.log("error :>> ", error);
    });
}

function handleClick(e) {
  console.log("e.currentTarget :>> ", e.currentTarget);
  const id = e.currentTarget.id;
  console.log("id :>> ", id);
  const newurl = "http://api.citybik.es/v2/networks/" + id;

  fetch(newurl)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      let result = response.json();
      console.log("result", result);
      return result;
    })
    .then((myData) => {
      console.log("data", myData);
      createwindow(myData);
    })
    .catch((error) => {
      console.log("error :>> ", error);
    });
   
}

function createLocationCards(location) {
  console.log("locations :>> ", location);

  const array = location;

  const myContainer = document.getElementById("newwindow");
  myContainer.innerHTML = ""; // Clear the container first

  for (let i = 0; i < array.length; i++) {
    const myDiv = document.createElement("div");
    myDiv.setAttribute("class", "container");

    const myH3 = document.createElement("h2");
    myH3.innerText = array[i].name;
    myDiv.appendChild(myH3);

    const newH3 = document.createElement("h3");
    newH3.innerText = "Empty Slots: " + array[i].empty_slots;
    myDiv.appendChild(newH3);

    const anotherH3 = document.createElement("h3");
    anotherH3.innerText = "Free Bikes: " + array[i].free_bikes;
    myDiv.appendChild(anotherH3);

    myContainer.appendChild(myDiv); // Append the location card to the container
  }
}

function createwindow(data) {
  const array = data.network;
  console.log("array :>> ", array);
  const myContainer = document.getElementById("card-container");
  myContainer.innerHTML = "";

  // myContainer.setAttribute("class", "info");
  const myH1 = document.createElement("h1");
  const myH2 = document.createElement("h2");

  myH1.innerText = array.name;
  myH2.innerText = "available stations:";
  myContainer.appendChild(myH1);

  myContainer.appendChild(myH2);
  // myH2.setAttribute("class", "companyName")

  const stationsArray = array.stations;
  console.log("stationsArray :>> ", stationsArray);
  createLocationCards(stationsArray);

  
}

function createCards(array) {
  console.log("array :>> ", array);
  const myOtherContainer = document.getElementById("newwindow");
  myOtherContainer.innerHTML="";


  const myContainer = document.getElementById("card-container");
  myContainer.setAttribute("class","shops");

  console.log('myContainer :>> ', myContainer);
  myContainer.innerHTML = "";

  for (let i = 0; i < array.length; i++) {
    const myDiv = document.createElement("div");
    myDiv.setAttribute("class", "infoContainer");
    myDiv.setAttribute("id", array[i].id);
    myDiv.addEventListener("click", handleClick);

    const myH2 = document.createElement("h2");
    myH2.innerText = array[i].name;
    myDiv.appendChild(myH2);

    myContainer.appendChild(myDiv);

    const myH3 = document.createElement("h3");
    myH3.innerText = array[i].location.city;
    myDiv.appendChild(myH3);

    myContainer.appendChild(myDiv);

    const myH4 = document.createElement("h4");
    myH4.innerText = array[i].location.country;
    myDiv.appendChild(myH4);

    myContainer.appendChild(myDiv);
  }
}

//! Here is starting my dropdown

function filtercountries(chosenValue) {
  const filteredcountries = data.networks.filter((item) => {
    if (chosenValue === item.location.country) {
      return item;
    }
  });
  createCards(filteredcountries);
}

function filtercity(chosenValue) {
  const filteredcities = data.networks.filter((item) => {
    if (chosenValue === item.location.city) {
      return item;
    }
  });

  createCards(filteredcities);
}

function filterompany(chosenValue) {
  const filteredcompanies = data.networks.filter((item) => {
    if (chosenValue === item.name) {
      return item;
    }
  });
  createCards(filteredcompanies);
}

function handleChange(event) {
  console.log("event :>> ", event);

  const chosenValue = event.target.value;
  const chosenId = event.target.id;

  console.log("chosenId :>> ", chosenId);

  if (chosenId == "allcountries") {
    filtercountries(chosenValue);
  } else if (chosenId == "allcities") {
    filtercity(chosenValue);
  } else if (chosenId == "allcompanies") {
    filterompany(chosenValue);
  }
  console.log("chosenValue :>> ", chosenValue);
}

function addEventListeners() {
  const dropDownLists = document.querySelectorAll(".drop-down");
  // console.log('myDropDowns :>> ', myDropDowns);
  console.log("dropDownLists :>> ", dropDownLists);
  dropDownLists.forEach((dropdown) => {
    console.log("dropdown :>> ", dropdown);
    dropdown.addEventListener("change", handleChange);
  });
}

const array = [4, 4, 5, 4, 7, 9, 9, "RU", "RU", "UK", "FR"];

function removeDuplicates(array) {
  const mySet = new Set();
  array.forEach((item) => {
    mySet.add(item);
  });
  console.log("in remove dupes", mySet);
  const convertSetToArray = Array.from(mySet);
  console.log("convertSetToArray :>> ", convertSetToArray);
  return convertSetToArray;
}
const removedDupes = removeDuplicates(array);

console.log("removedDupes :>> ", removedDupes);

function getCountryCodes(data) {
  const dataArray = data.networks;
  console.log("dataArray :>> ", dataArray);
  const countryCodes = [];
  for (let i = 0; i < dataArray.length; i++) {
    const code = dataArray[i].location.country;
    countryCodes.push(code);
  }
  console.warn(countryCodes);

  return countryCodes;
}
function createOptions(options) {
  console.log("options :>> ", options);
  const selector = document.getElementById("allcountries");
  for (let i = 0; i < options.length; i++) {
    const newOption = document.createElement("option");
    newOption.innerText = options[i];
    selector.appendChild(newOption);
  }
}

function getCityCodes(data) {
  const dataArray = data.networks;
  console.log("dataArray :>> ", dataArray);
  const cityCodes = [];
  for (let i = 0; i < dataArray.length; i++) {
    const code = dataArray[i].location.city;
    cityCodes.push(code);
  }
  console.warn(cityCodes);

  return cityCodes;
}
function createcityOptions(options) {
  console.log("options :>> ", options);
  const selector = document.getElementById("allcities");
  for (let i = 0; i < options.length; i++) {
    const newOption = document.createElement("option");
    newOption.innerText = options[i];
    selector.appendChild(newOption);
  }
}

function getCompanyCodes(data) {
  const dataArray = data.networks;
  console.log("dataArray :>> ", dataArray);
  const companyCodes = [];
  for (let i = 0; i < dataArray.length; i++) {
    const code = dataArray[i].name;
    companyCodes.push(code);
  }
  console.warn(companyCodes);

  return companyCodes;
}

function createcompanyOptions(options) {
  console.log("options :>> ", options);
  const selector = document.getElementById("allcompanies");
  for (let i = 0; i < options.length; i++) {
    const newOption = document.createElement("option");
    newOption.innerText = options[i];
    selector.appendChild(newOption);
  }
}

function initialisePage(data) {
  addEventListeners();
  const countryCodes = getCountryCodes(data);
  const countrydropdownoptions = removeDuplicates(countryCodes);
  const alhphabeticalOrder = countrydropdownoptions.sort();
  createOptions(alhphabeticalOrder);

  const cityCodes = getCityCodes(data);
  const citydropdownoptions = removeDuplicates(cityCodes);
  const cityalphabetic = citydropdownoptions.sort();
  createcityOptions(cityalphabetic);

  const companyCodes = getCompanyCodes(data);
  const companydropdownoptions = removeDuplicates(companyCodes);
  const companyalhphabet = companydropdownoptions.sort();
  createcompanyOptions(companyalhphabet);
}

fetchData(url);
