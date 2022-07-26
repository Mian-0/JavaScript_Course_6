window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temparatureDescription = document.querySelector('.temperature-description');
    let temparatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temparatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // console.log(data);
                    const {temperature, summary, icon } = data.currently;
                    //Set Dom Elements from the Api
                    temparatureDegree.textContent = temperature;
                    temparatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //FOURMULA FOR CELSIUS
                    let celsius = (temperature - 32) * (5 / 9);
                    //Set Icon
                    setIcons(icon, document.querySelector(".icon"));

                    //Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () =>{
                        if(temparatureSpan.textContent === "F"){
                            temparatureSpan.textContent = "C";
                            temparatureDegree.textContent = Math.floor(celsius)
                        } else {
                            temparatureSpan.textContent = "F"
                            temparatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});