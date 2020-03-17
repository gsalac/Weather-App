window.addEventListener('load', () => {
  let long;
  let lat;
  const temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  const temperatureDegree = document.querySelector('.degree');
  const timezone = document.querySelector('.timezone');
  const degreeSection = document.querySelector('.degree-section');
  const degreeSpan = document.querySelector('.degree-section span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = 'https://cors-anywhere.herokuapp.com/';
      const api = `${proxy}https://api.darksky.net/forecast/5b341ba58b52c45f418a6bac45caea69/${lat},${long}`;

      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data);
          const { temperature, summary, icon } = data.currently;
          //API DOM ELEMENTS
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = `We are experiencing some ${summary} weather!`;
          timezone.textContent = data.timezone;

          //SET ICONS
          setIcons(icon, document.querySelector('.icon'));

          //CHANGING UNITS FROM FAHRENHEIT TO CELCIUS
          degreeSection.addEventListener('click', () => {
            if (degreeSpan.textContent === 'F') {
              const celcius = (temperature - 32) * (5 / 9);
              degreeSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celcius);
            } else {
              degreeSpan.textContent = 'F';
              temperatureDegree.textContent = temperature;
            }
          });
        });
    });
  } else {
    alert('You must accept location services to use this App');
  }

  function setIcons(icon, iconID) {
    const skycons = new Skycons({ color: 'white' });
    const currentIcon = icon.replace(/-/g, '_').toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }
});

//BACKGROUND CHANGES FROM DAY TO NIGHT
function bgChanger() {
  let currentTime = new Date().getHours();
  if (currentTime > 16 && currentTime <= 18) {
    document.body.classList.add('duskBg');
  } else if (currentTime > 18) {
    document.body.classList.remove('duskBg');
    document.body.classList.add('nightBg');
  } else {
    document.body.classList.remove('nightBg');
  }
}
bgChanger();
