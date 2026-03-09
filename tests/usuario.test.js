const Usuario = require("../models/Usuario");

describe("Modelo Usuario", () => {

test("Crear usuario válido", async () => {

const usuario = new Usuario({
nombre: "Ana",
email: "ana@email.com",
saldoEmocional: 200
});

expect(usuario.nombre).toBe("Ana");

});

test("Saldo emocional por defecto", () => {

const usuario = new Usuario({
nombre: "Luis",
email: "luis@email.com"
});

expect(usuario.saldoEmocional).toBe(100);

});

test("Estado mental válido", () => {

const usuario = new Usuario({
nombre: "Mario",
email: "mario@email.com",
estadoMental: "estable"
});

expect(usuario.estadoMental).toBe("estable");

});

test("Error si falta nombre", () => {

const usuario = new Usuario({
email: "test@email.com"
});

const error = usuario.validateSync();

expect(error.errors.nombre).toBeDefined();

});

test("Error nombre muy corto", () => {

const usuario = new Usuario({
nombre: "A",
email: "test@email.com"
});

const error = usuario.validateSync();

expect(error.errors.nombre).toBeDefined();

});

});