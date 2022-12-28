window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree= document.querySelector('.temperature-degree');
    let temperature = document.querySelector('.temperature')
    let temperatureDegreeSpan= document.querySelector('.temperature Span');
    let locationTimezone= document.querySelector('.location-timezone');
    let weathericon= document.querySelector('.weather-icon');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;
            
            const APIkey = '364fe76dc43c22a9c80763e0de06c373'
            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&lang=es&appid=${APIkey}`;
            
            fetch(api)
            .then(response =>{
                return response.json();
            })
            .then(data =>{
                console.log(data);
                const {temp, weather } = data.current;

            
                if((temp - 273.15) - parseInt(temp - 273.15) > 0.49){
                    temperatureDegree.textContent = parseInt((temp - 273.15) + 1) + 'º';
                }else{
                    temperatureDegree.textContent = parseInt(temp - 273.15) + 'º';
                }
                temperatureDescription.textContent = weather[0].description
                locationTimezone.textContent = data.timezone.replace('_', ' ');
                weathericon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`

                temperature.addEventListener('click', ()=>{
                    if(temperatureDegreeSpan.textContent === 'C'){
                        temperatureDegreeSpan.textContent = 'F';
                        if((temp - 273.15) * 9/5 + 32 - parseInt((temp - 273.15) * 9/5 + 32) > 0.49){
                            temperatureDegree.textContent = parseInt((temp - 273.15) * 9/5 + 32 + 1) + 'º';
                        }else{
                            temperatureDegree.textContent = parseInt((temp - 273.15) * 9/5 + 32) + 'º';
                        }
                    }else{
                        temperatureDegreeSpan.textContent = 'C'
                        if((temp - 273.15) - parseInt(temp - 273.15) > 0.49){
                            temperatureDegree.textContent = parseInt((temp - 273.15) + 1) + 'º';
                        }else{
                            temperatureDegree.textContent = parseInt(temp - 273.15) + 'º';
                        }
                    }
                });
            })
        });
    }
});