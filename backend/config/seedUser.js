/**
 * * Archivo para crear datos de prueba.
 * * Borrar antes de subir a producción.
 */

import User from "../models/userModel.js";

const users = [
  {
    name: "Fairfax",
    email: "fdenidge0@skyrock.com",
    password: "iM1'0tDEf$v#",
    rut: "3.745.511-3",
  },
  {
    name: "Harriott",
    email: "halabastar1@shop-pro.jp",
    password: 'kV4"d#ElNJA',
    rut: "10.255.064-1",
  },
  {
    name: "Gussie",
    email: "gtunnock2@europa.eu",
    password: "hX8.WWsb'",
    rut: "11.263.603-K",
  },
  {
    name: "Lorenza",
    email: "lkenyam3@pbs.org",
    password: "gK8(cb",
    rut: "11.913.941-4"
  },
  {
    name: "Siusan",
    email: "spossel4@theguardian.com",
    password: "jX8?&1&`gHMt",
    rut: "15.250.528-0"
  },
  {
    name: "Cherry",
    email: "cwoolner5@wufoo.com",
    password: "dM5,$Ft",
    rut: "18.915.957-9",
  },
  {
    name: "Lucina",
    email: "lnuth6@moonfruit.com",
    password: "aP1{34@f&",
    rut: "19.116.179-3",
  },
  {
    name: "Antonie",
    email: "asex7@vistaprint.com",
    password: "eQ6?,D{9E&",
    rut: "23.891.853-7",
  },
  {
    name: "Lia",
    email: "llehr8@geocities.com",
    password: "pN6?*,gOr",
    rut: "26.594.724-7",
  },
  {
    name: "Lesya",
    email: "lfrake9@hubpages.com",
    password: "eY3(kGL'A",
    rut: "28.656.850-5",
  },
];

for (const user of users) {
  await User.create(user);
}