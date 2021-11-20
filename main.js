//const weatherUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
//remember, make a .env file and save your key
//const api_key = 
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const API_KEY = process.env.API_KEY
const BASE_URL = process.env.BASE_URL
const search = document.getElementById("city")
const submitBtn = document.getElementById("getTemp")
const resDiv = document.getElementById("weatherDetails")

//when button is click get the value of the input field
//check if it is a city name or zipcode
//if zipcode return a string that has zip=
//if city name return a string that has q=
//call findWeather and pass it the string

submitBtn.addEventListener('click',getSearchTerm)

function getSearchTerm(){
    let searchString 
    let weatherCheck = search.value
    if (isNaN(weatherCheck) === true){
        console.log(weatherCheck)
        searchString = `q=${weatherCheck}`
    }else{
        console.log(weatherCheck)
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
        let temp = responseData.main.temp;
        let cityName = responseData.name;
        let weatherDecrip = responseData.weather[0].description;
        let minTemp = responseData.main.temp_min;
        let maxTemp = responseData.main.temp_max;

        resDiv.innerHTML += `<p>The tempiture in ${cityName} is ${temp}. With a high //of ${maxTemp} and a low of ${minTemp}. The weather will be ${weatherDecrip}</p>`

    console.log(cityName)
}

//function tempChange(num){
    //if (isNaN(num)===false && num < 40){
        //num.innerHTML.style.text = "blue";
    //}else if(isNaN(num)===false && num > 90){
       // num.innerHTML.style.text = "red";
    //}
//}
//tempChange(dataToPage())
