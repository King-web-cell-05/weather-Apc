const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");

const weatherInfoSection = document.querySelector(".weather-info");
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");

const countryTxt = document.querySelector(".country-txt");
const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityValueTxt = document.querySelector(".humidity-value-txt");
const windValueTxt = document.querySelector(".wind-value-txt");
const weatherSummaryContainerImg = document.querySelector(
  ".weather-summary-container-img"
);
const currentDateTxt = document.querySelector(".current-date-txt");

const apiKey = "32626c963a0e5263efbe394766ad594d";

searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

cityInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && cityInput.value.trim() != "") {
    updateWeatherInfo(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

async function getFetchData(endPoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=${apiKey}&units=metric`;
  const response = await fetch(apiUrl);
  return response.json();
}
function getWeatherIcon(id) {
  if (id <= 232) 
    return "thunderstorm";
  if(id<= 321)
    return "drizzle";
   if(id<= 531)
    return "rain";
  if(id<= 622)
    return "snow";
  if(id<= 781)
    return "atmosphere";
  if(id<=800)
    return "clear";
  else return "clouds";
  
}
  
  
  


async function updateWeatherInfo(city) {
  const weatherData = await getFetchData("weather", city);

  if (weatherData.cod != 200) {
    showDisplaySection(notFoundSection);
    return;
  }
  console.log(weatherData);

  const {
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed },
  } = weatherData;
  countryTxt.textContent = country;
  tempTxt.textContent = Math.round(temp) +'°C'
  conditionTxt.textContent = main
  humidityValueTxt.textContent = humidity + '%'      
  windValueTxt.textContent = speed + 'M/s'
  weatherSummaryContainerImg.src= `./images/${getWeatherIcon(id)}.png`

  showDisplaySection(weatherInfoSection);
}

function showDisplaySection(section) {
  [weatherInfoSection, searchCitySection, notFoundSection].forEach(
    (section) => (section.style.display = "none")
  );
  section.style.display = "flex";
}
