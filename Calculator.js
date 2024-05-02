function Calculator(x) {
  this.result = x;
  this.operations = [];

  this.plus = function(value) {
    this.operations.push({ type: 'plus', value: value, priority: 1 });
    return this;
  };

  this.minus = function(value) {
    this.operations.push({ type: 'minus', value: value, priority: 1 });
    return this;
  };

  this.multiply = function(value) {
    this.operations.push({ type: 'multiply', value: value, priority: 2 });
    return this;
  };

  this.divide = function(value) {
    this.operations.push({ type: 'divide', value: value, priority: 2 });
    return this;
  };

  this.calculate = function() {
    // Сортировка методов по приоритету
    this.operations.sort((a, b) => b.priority - a.priority);

    this.operations.forEach(operation => {
      switch (operation.type) {
        case 'plus':
          this.result += operation.value;
          console.log(`Plus: ${this.result}`);
          break;
        case 'minus':
          this.result -= operation.value;
          console.log(`minus: ${this.result}`);
          break;
        case 'multiply':
          this.result *= operation.value;
          console.log(`multiply: ${this.result}`);
          break;
        case 'divide':
          this.result /= operation.value;
          console.log(`divide: ${this.result}`);
          break;
        }
    });

    return this.result;
  };
}

console.log(new Calculator(-2)
  .plus(2.1)
  .multiply(-2.6)
  .minus(4)
  .calculate()
)

