const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const dateTimeElement = document.getElementById('date-time');

search.addEventListener('click', () => {
    const APIKey = '8f988dfba1484cd74e9d70b9bcaca8cd';
    const city = document.getElementById('search-btn').value;
    if (city == '') {
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`).then(response => response.json()).then(json => {
    
        if (json.cod == '404') {
            container.style.height = '450px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            error404.classList.add('active');
            return;
        }

        container.style.height = '560px';
        weatherBox.classList.add('active');
        weatherDetails.classList.add('active');
        error404.classList.remove('active');

        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');
        
        // Format date and time
        const now = new Date();
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        
        const day = days[now.getDay()];
        const month = months[now.getMonth()];
        const date = now.getDate();
        const year = now.getFullYear();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // The hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;

        const formattedTime = `${day}, ${month} ${date}, ${year} - ${hours}:${minutes} ${ampm}`;
        dateTimeElement.textContent = formattedTime;

        // Set weather info
        switch (json.weather[0].main) {
            case 'Clear':
                image.src = 'clear.jpeg';
                break;
            case 'Rain':
                image.src = 'rain.jpg';
                break;
            case 'Snow':
                image.src = 'snow.png';
                break;
            case 'Clouds':
                image.src = 'cloud.png';
                break;
            case 'Mist':
                image.src = 'mist.png';
                break;
            case 'Haze':
                image.src = 'mist.png';
                break;
            default:
                image.src = 'clear.jpeg';
        }

        temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
    });

});
