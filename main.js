//const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
//remember, make a .env file and save your key
//const api_key = 
//import axios from 'axios';
//import dotenv from 'dotenv';
//dotenv.config();
const API_KEY = process.env.API_KEY
const BASE_URL = process.env.BASE_URL
const search = document.getElementById("city")
const submitBtn = document.getElementById("getTemp")
const resDiv = document.getElementById("weatherDetails")
const list = document.querySelector("ul")
//when button is click get the value of the input field
//check if it is a city name or zipcode
//if zipcode return a string that has zip=
//if city name return a string that has q=
//call findWeather and pass it the string

submitBtn.addEventListener('click',function(event){
    event.preventDefault();
    getSearchTerm()
})

function getSearchTerm(){
    let searchString 
    let weatherCheck = search.value
    if (isNaN(weatherCheck) === true){
        // console.log(weatherCheck)
        searchString = `q=${weatherCheck}`
    }else{
        // console.log(weatherCheck)
        searchString = `zip=${weatherCheck},us`
    }
    findWeather(searchString)
}

function findWeather(searchTerm){
      axios.get(`${BASE_URL}${searchTerm}&units=imperial&appid=${API_KEY}`)
    .then(response => {
        dataToPage(response.data)
       // console.log(response.data.main.temp_max);
      
    }).catch(err => {
        console.log(err)
    })
}
findWeather()
function dataToPage(responseData){
        list.innerHTML = '';
        let temp = responseData.main.temp;
        let cityName = responseData.name;
        let weatherDecrip = responseData.weather[0].description;
        let minTemp = responseData.main.temp_min;
        let maxTemp = responseData.main.temp_max;

       
        
        const element1 = document.createElement("li");
        element1.innerHTML = temp
        element1.id = "temp"
        const element2 = document.createElement("li");
        element2.innerHTML = cityName
        const element3 = document.createElement("li");
        element3.innerHTML = weatherDecrip
        const element4 = document.createElement("li");
        element4.innerHTML = minTemp
        element1.id = "minTemp"
        const element5 = document.createElement("li");
        element5.innerHTML = maxTemp
        element1.id = "maxTemp"


        list.appendChild(element2)
        list.appendChild(element1)
        list.appendChild(element3)
        list.appendChild(element4)
        list.appendChild(element5)
        // resDiv.innerHTML += `<p>The tempiture in ${cityName} is ${temp}. With a high of ${maxTemp} and a low of ${minTemp}. The weather will be ${weatherDecrip}</p>`
        tempChange(element1,element4,element5)

    console.log(cityName)
}



function tempChange(temp,minTemp,maxTemp){
    if (isNaN(temp)===false && temp < 40){
        temp.innerHTML.style.text = "blue";
    }else if(isNaN(temp)===false && temp > 50){
        temp.innerHTML.style.text = "red";
    }
}

