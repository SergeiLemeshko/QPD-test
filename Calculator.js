
function Calculator(x) {
    this.num = x;

    this.plus = function(y) {
        this.num += y;
        return this;
    };
    this.minus = function(y) {
        this.num -= y;
        return this;
    };
    this.multiply = function(y) {
        this.num *= y;
        return this;
    };
    this.divide = function(y) {
        this.num /= y;
        return this;
    };
    this.calculate = function() {
        return this.num;
    };
}

console.log(new Calculator(2)
    .plus(2)
    .multiply(2)
    .minus(1)
    .calculate()
);