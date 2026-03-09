const Emocion = require("../models/Emocion");

describe("Modelo Emocion", () => {

test("Crear emoción válida", () => {

const emocion = new Emocion({
nombre: "Felicidad",
tipo: "felicidad",
intensidad: 80,
precioBase: 50
});

expect(emocion.nombre).toBe("Felicidad");

});

test("Rareza por defecto", () => {

const emocion = new Emocion({
nombre: "Alegria",
tipo: "felicidad",
intensidad: 60,
precioBase: 30
});

expect(emocion.rareza).toBe("comun");

});

test("Error intensidad mayor a 100", () => {

const emocion = new Emocion({
nombre: "Extrema",
tipo: "ira",
intensidad: 150,
precioBase: 20
});

const error = emocion.validateSync();

expect(error.errors.intensidad).toBeDefined();

});

test("Error tipo inválido", () => {

const emocion = new Emocion({
nombre: "Desconocida",
tipo: "random",
intensidad: 50,
precioBase: 20
});

const error = emocion.validateSync();

expect(error.errors.tipo).toBeDefined();

});

test("Error precio negativo", () => {

const emocion = new Emocion({
nombre: "Tristeza",
tipo: "nostalgia",
intensidad: 40,
precioBase: -10
});

const error = emocion.validateSync();

expect(error.errors.precioBase).toBeDefined();

});

});