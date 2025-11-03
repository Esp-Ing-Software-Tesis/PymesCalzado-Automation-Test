// ------------------------------
// Funciones internas
// ------------------------------

// Generar número aleatorio entre min y max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generar caracteres aleatorios
function getRandomChar(characters) {
  return characters.charAt(Math.floor(Math.random() * characters.length));
}

// ------------------------------
// Funciones exportadas
// ------------------------------

// Generar número de documento aleatorio
export function getDocumentNumber() {
  return getRandomNumber(10000000, 9999999999);
}

// Generar número de celular aleatorio (10 dígitos, empieza con 3)
export function getPhoneNumber() {
  const firstDigit = "3";
  let number = firstDigit;
  for (let i = 0; i < 9; i++) {
    number += getRandomNumber(0, 9);
  }
  return number;
}

// Generar contraseña segura
export function generatePassword() {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const special = "!#$%^&*_+-";
  const all = lower + upper + numbers + special;

  let password = "";
  password += getRandomChar(lower);
  password += getRandomChar(upper);
  password += getRandomChar(numbers);
  password += getRandomChar(special);

  // Completar hasta 8 caracteres
  while (password.length < 8) {
    password += getRandomChar(all);
  }

  // Mezclar
  return password.split("").sort(() => 0.5 - Math.random()).join("");
}

// Generar email aleatorio que termine en @yopmail.com
export function generateEmail() {
  const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  let email = "";
  for (let i = 0; i < 8; i++) {
    email += getRandomChar(chars);
  }
  return email + "@yopmail.com";
}

// Generar dos nombres aleatorios
export function generateFullName() {
  const names = ["Juan", "Miguel", "Carlos", "Ana", "Laura", "Sofia", "Victor"];
  let first = getRandomNumber(0, names.length - 1);
  let second;
  do {
    second = getRandomNumber(0, names.length - 1);
  } while (second === first);
  return `${names[first]} ${names[second]}`;
}

// Generar dos apellidos aleatorios
export function generateFullLastName() {
  const lastNames = ["Gomez", "Herrera", "Martinez", "Lopez", "Diaz", "Perez"];
  let first = getRandomNumber(0, lastNames.length - 1);
  let second;
  do {
    second = getRandomNumber(0, lastNames.length - 1);
  } while (second === first);
  return `${lastNames[first]} ${lastNames[second]}`;
}

// Generar número aleatorio dentro de un rango definido (genérica)
export function generateNumberInRange(min, max) {
  return getRandomNumber(min, max);
}

// Generar usuario aleatorio completo
export function generateRandomData() {
  return {
    documentNumber: getDocumentNumber(),
    phoneNumber: getPhoneNumber(),
    name: generateFullName(),
    lastName: generateFullLastName(),
    email: generateEmail(),
    password: generatePassword(),
    role: generateNumberInRange(1, 2),
    productionLine: generateNumberInRange(1, 7)
  };
}