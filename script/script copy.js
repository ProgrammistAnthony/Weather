const APIkey = `e02b7308485038b3527e580f3e4bf55f`;

const arrData = [];
const btnFind = document.querySelector(`.main__btn`);
const mainContent = document.querySelector(`.main__content`);



let getForm = () =>{
    mainContent.innerHTML = `
        <form action="" class="main__form">
            <input type="text" class="main__input" placeholder="Type your city here">
            <hr class="main__hr">
            <input type="button" value="Find"  class="main__btn">
        </form>`;
    
    const formMain = document.querySelector(`.main__form`);
    const city = document.querySelector(`.main__input`).value;
    console.log(city);

    formMain.addEventListener(`submit`, (evt)=>{
        evt.preventDefault();
            getData(city);
        })
}
getForm();

let getErrorContent = (error) =>{
    mainContent.innerHTML =``;
    const box = document.createElement(`div`);
    box.innerHTML = `<div class="main__error">
        <p class="error__text">Ooops. Something went wrong.</p>
        <p class="error__text-mini">${error}</p>
        <input type="button" value="Try again"  class="main__btn error__btn">
        </div>`
        mainContent.append(box);
}


let getPogodaContent = (arrData) =>{
    console.log(arrData);
    mainContent.innerHTML = `
        <div class="content__main">
        <p class="pogoda__c">8°С</p>
        <p class="pogoda__city">Windy in ${arrData}</p>
        <a href="#" class="pogoda__link">Change city</a>
        </div>
    `
}



// const getWeather = async () => {
//     const city = document.getElementById("cityInput").value;
//     const requestUrl = `${APIUrl}?q=${city}&appid=${APIKEY}&units=metric`;

//     const response = await fetch(requestUrl);
//     const data = await response.json();
// };


const getData = async (city) =>{
    // const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=ufa&appid=e02b7308485038b3527e580f3e4bf55f&units=metric`
    try{
        const response = await fetch(apiURL);
        if (!response.ok) throw new Error(`Network response was not ok`);
        arrData = await response.json();
        getPogodaContent(arrData);
    } catch (error) {
        getErrorContent(error);
    }
}