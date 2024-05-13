//----------------------- функция, которая создает класс -------------------

function createClass(className, properties) {
  function Class() {
    // Конструктор класса
    if (typeof this.init === 'function') {
      this.init.apply(this, arguments);
    }
  }

  // Добавляем методы и свойства к прототипу класса
  if (properties && typeof properties === 'object') { //properties (свойства и методы класса)
    for (let prop in properties) {
      if (properties.hasOwnProperty(prop)) { // имеет ли этот объект указанное свойство как собственное свойство (а не наследует его)
        Class.prototype[prop] = properties[prop];
        // console.log(prop, "prop")
        // console.log(properties[prop], "properties[prop]")
      }
    }
  }

  // Устанавливаем имя класса
  Object.defineProperty(Class, 'name', { value: className });

  return Class;
}

// Пример использования
const SomeClass = createClass('SomeClass', {
    init: function(name) {
    this.name = name;
  },
  getName: function() {
    return this.name;
  },
  setName: function(newName) {
    this.name = newName;
  }
});

// Создаем экземпляр класса
const myObject = new SomeClass('John');

// Используем методы класса
console.log(myObject.getName());
myObject.setName('Alice');
console.log(myObject.getName());


//-------------------- функция, которая наследует один класс от другого ----------------------

function extendClass(Child, Parent) {
  // Создаем новый объект, прототип которого ссылается на прототип родительского класса
  Child.prototype = Object.create(Parent.prototype);

  // Конструктор для дочернего класса
  Child.prototype.constructor = Child;

  // Метод super(), который позволяет вызывать конструктор родительского класса
  Child.prototype.super = function(...args) {
    Parent.call(this, ...args);
  };
}

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  print() {
    console.log(`Имя: ${this.name}  Возраст: ${this.age}`);
  }
}

class Employee extends Person {
  constructor(name, age, company) {
    super(name, age);
    this.company = company;
  }

  work() {
    console.log(`${this.name} работает в ${this.company}`);
  }
}

extendClass(Employee, Person);

// Создание экземпляров и использование методов
const tom = new Person('Tom', 34);
tom.print(); // Name: Tom  Age: 34

const bob = new Employee('Bob', 36, 'Google');
bob.print(); // Name: Bob  Age: 36
bob.work(); // Bob works in Google