async function getWeather() {
    try{

      var city = document.getElementById("cityInput").value;
      var api = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e82d0923a7081d0f35531a65c51b4d83&units=metric`;
      var response = await fetch(api);

      if(!response.ok)
      {
        if(response.status===404){
            throw new Error("City not found. Please enter a valid City name.");
        } else {
            throw new Error("Unable to fetch weather data. Please try again later.");
        }
      }

      var data = await response.json();

      var timezoneOffset = data.timezone;
      var utcSeconds = data.dt;
      var localTime = new Date((utcSeconds + timezoneOffset) * 1000);

      var hours = localTime.getUTCHours();
      var minutes = localTime.getUTCMinutes();
      var ampm = hours>=12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      var formattedTime = hours.toString().padStart(2,'0')+ ":" + minutes.toString().padStart(2,'0') + " " + ampm;

      var temperature = data.main.temp;
      var wind = data.wind.speed;
      var humidity = data.main.humidity;
      var pressure = data.main.pressure;
      let weather = data.weather[0].main;
      //var description = data.weather[0].description;
     // var iconCode = data.weather[0].icon;
     // var iconUrl = 'https://openweathermap.org/img/wn/${iconCode}@2x.png';
     var iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
     
      let bd = document.querySelector("#body-main");
      
     // document.querySelector(".timezone").innerHTML="Local Time:" +formattedTime;
      document.getElementById("result").innerHTML = `
          <h3 style="color:red;" >Weather in ${city}</h3>
          <p><strong>Local Time:</strong> ${formattedTime}</p>
          <p><strong>Temperature:</strong> ${temperature}°C</p>
          <p><strong>Wind Speed:</strong> ${wind} m/s</p>
          <p><strong>Humidity:</strong> ${humidity}%</p>
          <p><strong>Pressure:</strong> ${pressure} hPa</p>
          <p class="weather-line"><strong>Weather:</strong> ${weather}
          <img src="${iconUrl}" alt="Weather icon"></p>
          `;

          if (weather == "Clouds") {
        bd.style.backgroundImage = 'url(https://images.unsplash.com/photo-1594652010347-788d009508c3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFpbnklMjBza3l8ZW58MHx8MHx8fDA%3D)';
        //bd.style.backgroundImage = 'url()';
        bd.style.backgroundRepeat='no-repeat';

      }
       else if (weather == "Rain") {
        bd.style.backgroundImage = 'url(https://images.pexels.com/photos/304875/pexels-photo-304875.jpeg?cs=srgb&dl=pexels-veeterzy-304875.jpg&fm=jpg)';
        bd.style.backgroundRepeat='no-repeat';
      }
       else if (weather == "Clear") {
        bd.style.backgroundImage = 'url(https://plus.unsplash.com/premium_photo-1727730047398-49766e915c1d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Y2xlYXIlMjBza3l8ZW58MHx8MHx8fDA%3D)';
         bd.style.backgroundRepeat='no-repeat';
      }
    } catch (error) {
        document.getElementById("result").innerHTML=`<p style="color:red;">${error.message}</p>`;
        }
    }