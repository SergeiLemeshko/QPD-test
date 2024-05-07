function Calculator(x) {
  if (!(this instanceof Calculator)) {
    throw new Error("Калькулятор вызван без ключевого слова 'new'!");
  }
  //x сразу отправляем в this.result
  this.result = [x];

  //при вызове plus() и minus() добавляем value в конец this.result
    this.plus = function(value) {
    this.result.push(value);
    return this;
  };

  this.minus = function(value) {
    this.result.push(-value);
    return this;
  };

  //при вызове multiply() умножаем последний элемент массива this.result на value
  this.multiply = function(value) {
    this.result[this.result.length - 1] *= value;
    return this;
  };

  //при вызове divide() делим последний элемент массива this.result на value
  this.divide = function(value) {
    this.result[this.result.length - 1] = this.result[this.result.length - 1] / value;
    return this;
  };
  //сворачиваем массив this.result к одному значению
  this.calculate = function() {
    return this.result.reduce((sum, elem) => sum + elem); //прим: -2 + -5,46 + - 4 = -11,46
  };

  return this;
}

console.log(
  new Calculator(-2)
  .plus(2.1)
  .multiply(-2.6)
  .minus(4)        
  .calculate()
);
