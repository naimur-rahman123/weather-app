const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.getElementById('message-one');
const messageTwo = document.getElementById('message-two');

weatherForm.addEventListener('submit', e => {
    e.preventDefault();
    const location = search.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=327631087ba542505a6640f364e5e83b&units=metric`;
    axios
        .get(url)
        .then(res => {
            if (res.status === 200) {
                messageOne.textContent = `Location: ${location.toUpperCase()}`;
                messageTwo.textContent = `The temperature is ${res.data.main.temp}. Weather description: ${res.data.weather[0].description}`;
            }
            console.log(res.data);
        })
        .catch(e => {
            messageOne.textContent = 'Unable to find location. Try another search.';
            messageTwo.textContent = '';
        });
});
