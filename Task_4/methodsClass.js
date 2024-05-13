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


// -------------------- функция, которая наследует один класс от другого ----------------------

function extendClass(Child, Parent) {
  let parentProto = Parent.prototype;
  let childProto = Child.prototype;
  
  // Получаем все свойства из прототипа класса parent
  let parentProperties = Object.getOwnPropertyNames(parentProto);
  
  // Проходимся по всем свойствам и добавляем их в прототип класса Сhild, если их там еще нет
  parentProperties.forEach(property => {
    if (!(property in childProto)) {
      childProto[property] = parentProto[property];
    }
  });

  return Child;
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

class Employee {
  constructor(name, age, company) {
    this.name = name;
    this.age = age;
    this.company = company;
  }

  work() {
    console.log(`${this.name} работает в ${this.company}`);
  }
}

extendClass(Employee, Person);

const tom = new Person('Tom', 34);
const bob = new Employee('Bob', 36, 'Google');

bob.print(); // 'Имя: Bob  Возраст: 36'
bob.work(); // 'Bob работает в Google'
