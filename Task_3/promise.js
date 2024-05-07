//---------------------- delay ----------------------------

function delay(ms) {
  return new Promise(resolve => {
    setTimeout(resolve(`Старт через ${ms} секунд`), ms);
  });
}

delay(2000).then(
  result => {
    console.log(result);
  }
);

//---------------------- promiseAll ----------------------------

// URLs трех изображений с JSONPlaceholder
const urlsImg = [
  'https://jsonplaceholder.typicode.com/photos/1',
  'https://jsonplaceholder.typicode.com/photos/2',
  'https://jsonplaceholder.typicode.com/photos/3'
];

// Добавляет изображения на страницу
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Не удалось загрузить изображение по URL: ${url}`));
    img.src = url;
    document.body.appendChild(img);
    img.classList.add('image');
  });
}

// Дожидаемся выполнения всех промисов с использованием Promise.all
function promiseAll(urls) {
  return Promise.all(urls.map(url => fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`Ошибка загрузки изображения: ${response.status}`);
      }
      return response.json();
    })
    .then(data => data.url)
    .then(imageUrl => loadImage(imageUrl)) // Добавляем на страницу
  ))
  .catch(error => {
    console.error('Ошибка загрузки изображений:', error);
  });
}

promiseAll(urlsImg);

//---------------------- promiseRace ----------------------------

// массив промисов
const promises = [
  promiseOne = new Promise((resolve) => { setTimeout(resolve, 1000, "Hello") }),
  promiseTwo = new Promise((resolve) => { setTimeout(resolve, 2000, "World") })
];

// Принимает несколько промисов и возвращает первый завершенный промис
function promiseRace(promises) {
  Promise.race(promises)
      .then(value => console.log(value))
      .catch(error => console.log(error));
}

promiseRace(promises);