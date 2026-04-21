const chai = require("chai");
const expect = chai.expect;
const Usuario = require("../models/Usuario");

describe("Modelo Usuario", () => {

it("Crear usuario válido", () => {

const usuario = new Usuario({
nombre: "Ana",
email: "ana@email.com",
saldoEmocional: 200
});

expect(usuario.nombre).to.equal("Ana");

});

it("Saldo emocional por defecto", () => {

const usuario = new Usuario({
nombre: "Luis",
email: "luis@email.com"
});

expect(usuario.saldoEmocional).to.equal(100);

});

it("Estado mental válido", () => {

const usuario = new Usuario({
nombre: "Mario",
email: "mario@email.com",
estadoMental: "estable"
});

expect(usuario.estadoMental).to.equal("estable");

});

it("Error si falta nombre", () => {

const usuario = new Usuario({
email: "test@email.com"
});

const error = usuario.validateSync();

expect(error.errors.nombre).to.exist;

});

it("Error nombre muy corto", () => {

const usuario = new Usuario({
nombre: "A",
email: "test@email.com"
});

const error = usuario.validateSync();

expect(error.errors.nombre).to.exist;

});

});