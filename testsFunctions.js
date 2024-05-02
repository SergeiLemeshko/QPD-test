
describe("Функция Calculator", function () {
 
  it("5 * 5 * 5 - 1 * 12 / 4 + 1 + 5 = 128", function () {
    assert.deepEqual(
      new Calculator(5)
        .multiply(5)
        .multiply(5)
        .minus(1)
        .multiply(12)
        .divide(4)
        .plus(1)
        .plus(5)
        .calculate(), 128);
  });

  it("2 + 2 * 2 - 1 = 5", function () {
    assert.deepEqual(
      new Calculator(2)
        .plus(2)
        .multiply(2)
        .minus(1)
        .calculate(), 5.00);
  });

  it("2 - 2 * 2 - 49.3 = -51.3", function () {
    assert.deepEqual(
      new Calculator(2)
        .minus(2)
        .multiply(2)
        .minus(49.3)        
        .calculate(), -51.3);
  });

  it("-2 + 2.1 * -2.6 -4  = -11.46", function () {
    assert.deepEqual(
      new Calculator(-2)
        .plus(2.1)
        .multiply(-2.6)
        .minus(4)        
        .calculate(), -11.46);
  });

  it("-2 + 2 * -2 +6 -4 +5 -4 +9 = 6", function () {
    assert.deepEqual(
      new Calculator(-2)
        .plus(2)
        .multiply(-2)
        .plus(6)
        .minus(4) 
        .plus(5) 
        .minus(4)  
        .plus(9)      
        .calculate(), 6);
  });


  it("Калькулятор вызван без ключевого слова 'new'", function () {
    assert.throws(function () {
      Calculator(2)
        .plus(2)
        .calculate()
    }, "Калькулятор вызван без ключевого слова 'new'!");
  });
});
