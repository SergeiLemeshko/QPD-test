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

const promises = [
  promiseOne = new Promise((resolve, reject) => {setTimeout(() => {resolve("Resolved-1")}, 1000)}),
  promiseTwo = new Promise((resolve, reject) => {setTimeout(() => {resolve("Resolved-2")}, 500)}),
  promiseThree = new Promise((resolve, reject) => {resolve("Resolved-3")})
];

function promiseAll(promises) {
  if(!promises.length) return;
  let result = new Array(promises.length); // массив длиной, как и массив promises
  let totalResolved = 0;

  return new Promise((resolve, reject) => {
    promises.forEach((promise, index) => {
      promise
      .then((val) => {
        result[index] = val; // сохраняем результат promise с тем же индексом
        totalResolved++;
        if (totalResolved === promises.length) {
          resolve(result); // если все promises выполнены, показываем результат
          console.log(result, "promiseAll");
        }
      }).catch((err) => {
        reject(err); // если какой-либо promise отклонён, вызываем reject
        console.log(err);
      });
    });
  });
};

promiseAll(promises);

//---------------------- promiseRace ----------------------------

function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise
        .then(resolve) // как только будет выполнен какой-либо из входных promises
        .catch(reject); // как только будет отклонен какой-либо из входных promises
    });
  });
}

promiseRace(promises)
  .then(res => console.log(res, "promiseRace"))
  .catch(err => console.log(err));

