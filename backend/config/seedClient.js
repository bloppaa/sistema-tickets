/**
 * * Archivo para crear datos de prueba.
 * * Borrar antes de subir a producción.
 */

import Client from "../models/clientModel.js";

const clients = [
  {
    name: "Abel",
    email: "aedmonds0@columbia.edu",
    password: "vM1'{!~DVi",
    rut: "4.668.989-5",
    companyRut: "2.309.037-6"
  },
  {
    name: "Teddie",
    email: "ttwigge1@bloglines.com",
    password: "gC9?LeF!>Iu",
    rut: "10.123.369-3",
    companyRut: "8.247.743-8"
  },
  {
    name: "Anestassia",
    email: "abricklebank2@canalblog.com",
    password: "iW5|3U",
    rut: "10.853.081-2",
    companyRut: "10.103.465-8"
  },
  {
    name: "Bobbee",
    email: "bsquirrell3@fda.gov",
    password: "eR9@3LW",
    rut: "11.981.816-8",
    companyRut: "15.136.340-7"
  },
  {
    name: "Lionel",
    email: "lhartwright4@google.it",
    password: "rT5\\/D",
    rut: "13.251.312-0",
    companyRut: "16.622.053-K"
  },
  {
    name: "Jacobo",
    email: "jdrummond5@uol.com.br",
    password: "mK8.H/52eQ",
    rut: "17.000.862-6",
    companyRut: "18.696.870-0"
  },
  {
    name: "Shandie",
    email: "sbazoche6@about.com",
    password: "lM9,(X9",
    rut: "20.649.110-8",
    companyRut: "19.535.846-K"
  },
  {
    name: "Katharina",
    email: "khastilow7@wordpress.org",
    password: "sS0'!d{3By",
    rut: "21.691.266-7",
    companyRut: "23.159.809-K"
  },
  {
    name: "Lucina",
    email: "ldecoursey8@ibm.com",
    password: "jP9!RWD1/lM2",
    rut: "21.959.847-5",
    companyRut: "27.728.020-5"
  },
  {
    name: "Reginald",
    email: "rmoody9@economist.com",
    password: "yX6<o7",
    rut: "24.289.237-2",
    companyRut: "34.089.132-5"
  },
];

for (const client of clients) {
  await Client.create(client);
}