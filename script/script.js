const APIkey = `e02b7308485038b3527e580f3e4bf55f`;
let arrData = [];
const btnFind = document.querySelector(`.main__btn`);
const mainContent = document.querySelector(`.main__content`);

const getForm = () =>{
    mainContent.innerHTML = `
        <form action="" class="main__form">
            <input type="text" class="main__input" placeholder="Type your city here">
            <hr class="main__hr">
            <input type="submit" value="Find"  class="main__btn">
        </form>`;
    
    const formMain = document.querySelector(`.main__form`);
    
    formMain.addEventListener(`submit`, async (evt)=>{
        evt.preventDefault();
        const city = document.querySelector(`.main__input`).value;
        console.log(city);
        await getData(city);
        })
}
// getForm();

const getErrorContent = (error) =>{
    mainContent.innerHTML =``;
    mainContent.innerHTML = `<div class="main__error">
        <p class="error__text">Ooops. Something went wrong.</p>
        <p class="error__text-mini">${error}</p>
        <input type="button" value="Try again"  class="main__btn error__btn">
        </div>`

        const btnTry = document.querySelector(`.error__btn`);
        btnTry.addEventListener(`click`, ()=>{
            mainContent.innerHTML =``;
            console.log('Button clicked'); 
            getForm();
        })
}

const getPogodaContent = (arrData) =>{
    if(arrData.weather && arrData.weather.length > 0) {
        const iconCode = arrData.weather[0].icon;
        const weatherIconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
    mainContent.innerHTML = `
        <div class="content__main">
        <img src="${weatherIconUrl}" alt="Weather icon" class="main__img">
        <p class="pogoda__c">${Math.ceil(arrData.main.temp)}°С</p>
        <p class="pogoda__city">Windy in ${arrData.name}</p>
        <a href="#" class="pogoda__link">Change city</a>
        </div>
    `

    const linkReverse = document.querySelector(`.pogoda__link`);
    linkReverse.addEventListener(`click`, ()=>{
        mainContent.innerHTML =``;
        getForm();
    
    })
}
}

const getData = async (city) =>{
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`
    try{
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error(`Network response was not ok`);
        arrData = await response.json();
        getPogodaContent(arrData);
    } catch (error) {
        getErrorContent(error.message);
    }
}

const getPogodaIP = async () => {
    try {
        const ipResponse = await fetch('https://ipapi.co/json/');// ссылка для получения местоположения по айпи
        if (!ipResponse.ok) throw new Error('Cannot fetch IP location');
        const { latitude, longitude } = await ipResponse.json();

        const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIkey}&units=metric`;
        const weatherResponse = await fetch(weatherURL);
        if (!weatherResponse.ok) throw new Error('Network response was not ok');
        arrData = await weatherResponse.json();
        getPogodaContent(arrData);
    } catch (error) {
        getErrorContent(error.message);
    }
};

const getPogodaAPI = () => {
    navigator.geolocation.getCurrentPosition(async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiURLAnother = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}&units=metric`;

        try {
            const response = await fetch(apiURLAnother);
            if (!response.ok) throw new Error(`Network response was not ok`);
            arrData = await response.json();
            getPogodaContent(arrData);
        } catch (error) {
            getErrorContent(error.message);
        }
    }, error => {
        console.error("Error getting location: ", error);
        // getErrorContent("Error getting location");
        getPogodaIP();
    });
};
getPogodaAPI();


