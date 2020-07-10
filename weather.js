window.addEventListener('load', () =>{
    //Selectors
    let long;
    let lat;
    let tempDes = document.querySelector('.temperature-des')
    let tempDeg = document.querySelector('.degree-section h2')
    let location = document.querySelector('.location h2')
    let icons = document.querySelector('.icon')
    let seaLev = document.querySelector('.sea-level')
    let humid = document.querySelector('.humidity')

    //Functionalities
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position =>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const weatherapi = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=822e93251a69a0a7c66ab23391abbd2f`

            fetch(weatherapi)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    const {description, icon} = data.weather[0];
                    const {temp, humidity, sea_level} = data.main;
                    const {name, sys} = data;  
                    //DOM insertion using the data from the api call.
                    icons.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
                    location.textContent = name + ',' + ' ' + sys.country;
                    seaLev.textContent = 'Sea Level: ' + sea_level + 'm';
                    humid.textContent = humidity + '%' + ' humidity';
                    tempDeg.textContent = Math.round(temp-273.15);
                    tempDes.textContent = description;
                });
        });

    } else{
        alert('You need to allow your location to use the fnctionality of this web.')
        return
    }
})