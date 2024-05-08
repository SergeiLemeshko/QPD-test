Array.prototype.first = function() {
  if (this.length === 0) {
    return null;
  }
  return this[0];
};

Array.prototype.last = function() {
  if (this.length === 0) {
    return null;
  }
  return this[this.length - 1];
};

Array.prototype.random = function() {
  if (this.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * this.length);
  return this[randomIndex];
};


const numbers = [1, 2, 3, 4, 5];

const firstNumber = numbers.first();
console.log(firstNumber, "firstNumber");

const lastNumber = numbers.last();
console.log(lastNumber, "lastNumber");

const randomNumber = numbers.random();
console.log(randomNumber, "randomNumber");