const myMap = L.map('map')
  .on('load', () => {
    console.log('Карта инициализирована');
  })
  .setView({
    lat: 59.92749,
    lng: 30.31127,
  },
    10
  );


// const myMap = L.map('map');

// myMap.setView({
//   lat: 45.031865,
//   lng: 35.099316,
// },
//   10
// );

// почему не работает?
// myMap.on('load', () => {
//  console.log('Карта инициализирована');
// })

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(myMap);

const myIcon = L.icon({
  iconUrl: './main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// создание маркера
const myMarker = L.marker(
  {
    lat: 59.92749,
    lng: 30.31127,
  },
  {
    draggable: true,
    icon: myIcon,
  }
);

myMarker.addTo(myMap);

myMarker.on('moveend', (evt) => {
  const address = evt.target.getLatLng();
  console.log(address);

  console.log(address.lat);
});


const points = [
  {
    title: 'Футура',
    lat: 59.96925,
    lng: 30.31730,
  },
  {
    title: 'Шаверма',
    lat: 59.96783,
    lng: 30.31258,
  },
  {
    title: 'Франк',
    lat: 59.95958,
    lng: 30.30228,
  },
  {
    title: 'Ginza',
    lat: 59.97292,
    lng: 30.31982,
  },
];

const icon = L.icon({
  iconUrl: './pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// const createCustomPopup = (point) => {
//   const balloonTemplate = document.querySelector('#balloon').content.querySelector('.balloon');
//   const popupElement = balloonTemplate.cloneNode(true);

//   popupElement.querySelector('.balloon__title').textContent = point.title;
//   popupElement.querySelector('.balloon__lat-lng').textContent = `Координаты: ${point.lat}, ${point.lng}`;

//   return popupElement;
// };

const createCustomPopup = ({lat, lng, title}) => `<section class="balloon">
<h2>Шаблонная строка!<h2>
  <h3 class="balloon__title">${title}</h3>
  <p class="balloon__lat-lng">Координаты: ${lat}, ${lng}</p>
</section>`;


// points.forEach((point) => {
//   const {lat, lng} = point;

//   const marker = L.marker({
//     lat,
//     lng,
//   },
//   {icon},
// );

//   marker.addTo(myMap)
//   .bindPopup(createCustomPopup(point));
// });

const markerGroup = L.layerGroup().addTo(myMap);

const createMarker = (point) => {
  const {lat, lng} = point;
  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(createCustomPopup(point));
};

points.forEach((point) => {
  createMarker(point)
});

points.slice(0, points.length / 2).forEach((point) => {
  createMarker(point);
});

const nextButton = document.querySelector('#next');
nextButton.addEventListener('click', () => {
  markerGroup.clearLayers();
  points.slice(points.length / 2).forEach((point) => {
    createMarker(point);
  });
  nextButton.remove();
});