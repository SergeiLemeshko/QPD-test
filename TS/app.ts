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

f(user);
f(admin);