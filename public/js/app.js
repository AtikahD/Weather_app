var fetchWeather = "/weather";
const weatherform = document.querySelector('form');
const search = document.querySelector('input');

const weatherIcon = document.querySelector('.weatherIcon i');
const weatherCondition = document.querySelector('.weatherCondition');
const tempElement = document.querySelector('.temperature span');
const locationElement = document.querySelector('.place');
const dateElement = document.querySelector('.date');


const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
dateElement.textContent= new Date().getDate() +" " +monthNames[new Date().getMonth()].substring(0,3);


weatherform.addEventListener('submit', (event) => {
    event.preventDefault();
    locationElement.textContent= "Loading...";
    tempElement.textContent ="";
    weatherCondition.textContent= "";
    const locationApi = fetchWeather + "?address=" + search.value;
    fetch(locationApi).then(response => {
        response.json().then(data => {
            if(data.error){
                locationElement.textContent= "Please enter the correct city in search box!";
                weatherIcon.className = "wi-na"
                tempElement.textContent ="";
                weatherCondition.textContent= "";
            }else{
                console.log()
                if(data.description === "light rain" || data.description === "moderate rain"){
                    weatherIcon.className = "wi wi-rain-mix" 
                }else if(data.description === "clear sky" ){
                    weatherIcon.className = "wi wi-cloud" 
                }else if(data.description === "fog" ){
                    weatherIcon.className = "wi wi-fog" 
                }else{
                    weatherIcon.className = "wi wi-cloudy" 
                }
                locationElement.textContent= data.cityName;
                tempElement.textContent =(data.temperature - 273.5).toFixed(2) + String.fromCharCode(176);
                weatherCondition.textContent= data.description.toUpperCase();
            }
        })
        

    });

})