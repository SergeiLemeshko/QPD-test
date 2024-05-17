//------------------ Основы типизации --------------//

interface Human {
  age: number;
  name: string;
  phoneNumber: number | string;
}

type Roles = "user" | "admin" | "superadmin";

interface User extends Human {
  email: string;
  phoneNumber: number;
  role: Extract<Roles, "user">;
}

interface Admin extends Human {
  stage: string;
  role: Extract<Roles, "admin" | "superadmin">;
}

const user: User = {
  age: 30,
  name: "Alice",
  email: "alice@example.com",
  phoneNumber: 1234567890, 
  role: "user",
};

const admin: Admin = {
  age: 40,
  stage: "Senior",
  name: "Bob",
  phoneNumber: "0987654321", 
  role: "superadmin",
};

const f = (value: Human) => {
  console.log(`Я ${value.name}, мне ${value.age}. Мой телефон: ${value.phoneNumber}`);
}

// f(user);
// f(admin);

//------------------- Readonly ---------------------//

type MyReadonly<T> = {
  readonly [P in keyof T]: MyReadonly<T[P]>;
};

interface someUser {
  name: string;
  age: number;
  address: {
    city: string;
    country: string;
  };
}

type ReadonlySomeUser = MyReadonly<someUser>;

const someUser: ReadonlySomeUser = {
  name: "Alex",
  age: 30,
  address: {
    city: "Voronezh",
    country: "Russia",
  },
};

// someUser.name = "Bob";
// someUser.address.city = "Moscow";

//------------------- First of Array ---------------------//

//extends - для ограничения типа (в данном случае ограничения массива любого типа) и проверки является ли T пустым массивом
type First<T extends any[]> = T extends [] ? never : T[0];

type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3

//------------------ Get Return Type -------------------//

//extends - проверяет, является ли Type функцией с аргументами любого типа, infer - для вывода типа из выражения
type MyReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never;

  const fn = (v: boolean) => {
    if (v) return 1;
    else return 2;
  };
  
  type a = MyReturnType<typeof fn>; // should be "1 | 2"
  
//------------------------ Pick ------------------------//

// K extends keyof T - забирает имена свойств из T, которые мы указываем
type MyPick<T, K extends keyof T> = { 
  [P in K]: T[P] 
};
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

//----------------------- Exclude ----------------------//

type MyExclude<T, K> = T extends K ? never : T;

type T0 = MyExclude<"a" | "b" | "c", "a">; // expected "b" | "c"
type T1 = MyExclude<"a" | "b" | "c", "a" | "b">; // expected "c"

//------------------------ Omit -----------------------//

type MyOmit<T, K extends keyof T> = {
  [P in keyof T as P extends K ? never : P]: T[P]; // если свойство P из T === свойству из K, исключаем (never) из нового типа, иначе включаем в новый тип
};

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPrev = MyOmit<Todo, "description" | "title">;

const task: TodoPrev = {
  completed: false,
};

//------------------ Append to Object -----------------//
/*
  T - исходный объект
  K - новый ключ
  V - новое значение
*/
type AppendToObject<T, K extends string | number, I> = {
  [Property in keyof T]: T[Property]; // копируем свойства из T
} & {
  [Property in K]: I; // добавляем ключ K и значение I в новое свойство объекта
};

type Test = { id: "1" };
type Result = AppendToObject<Test, "value", 4>; // expected to be { id: '1', value: 4 }