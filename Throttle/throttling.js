const someCalc = function(a) {
  console.log(a + this.b);
};

function throttle(callback, wait, context = this) {
  let timeout = null; // идентификатор, который используется для предотвращения множественных вызовов функции callback
  let callbackArgs = null; // аргументы для вызова первой функции
  let otherСallbackArgs = null; // аргументы для вызова последней функции

  // вызывает callback с аргументами callbackArgs через заданное время (wait)
  const later = () => {
    callback.apply(context, callbackArgs);
    timeout = null; // чистим timeout после вызова callback (сообщаем, что вызов функции был завершен)

    // вызываем callback с аргументами otherСallbackArgs и помещаем результат в lastResult
    let lastResult = callback.apply(context, otherСallbackArgs); // результат последней вызванной функции
    console.log(lastResult);
  }
  // возвращаем анонимную функцию, которая будет вызывать callback в случае, если прошло время wait с момента последнего вызова.
  return function() {
    if(!timeout) {
      callbackArgs = arguments;
      timeout = setTimeout(later, wait);
    } 
    else if(timeout && arguments) { // пока timeout, собираем остальные аргументы в otherСallbackArgs
      otherСallbackArgs = arguments;
    }
  }
};

const f1000 = throttle(someCalc, 2000, {b: 'call'});
f1000(1); // выведет 1 call
f1000(2); // (тормозим, не прошло 1000 мс)
f1000(3); // (тормозим, не прошло 1000 мс)