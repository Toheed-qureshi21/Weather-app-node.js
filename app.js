import readline from "readline/promises";
import dotenv from "dotenv";
dotenv.config();
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});
// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const base_url = "https://api.openweathermap.org";
const city = await rl.question("Enter the city name\n");
rl.close();
const fetchdata = async (city) => {
    try {
        if (!city.trim()) throw new Error("City name cannot be empty.");
        const response = await fetch(`${base_url}/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=metric`);
        if (!response.ok) {
            throw new Error("Invalid city name")
        }
        const data = await response.json();
        if (data) {        
        console.log("City Name : ",data.name);
        console.log("Condition: ",data.weather[0].main);
        console.log("Temprature",data.main.temp,"°C");
        console.log("Humidity: ",data.main.humidity);
        console.log("Wind speed : ",data.wind.speed);
        console.log("Clouds Coverage: ",data.clouds.all,"%");
       
    }
} catch (error) {
        console.log(error);
        
    }
  
    return;  
    
     
}
await fetchdata(city);