const assert = require('assert');
const browser = require('./config/browser');

describe('Test GET /users/list', function () {

    it('should return a list of all users', async function () {
        const result = await browser.get(`users/list/`);

        assert.strictEqual(result?.status, true);
        assert.strictEqual(Array.isArray(result.data), true);
    });

});

describe('Test GET /users/get/me', function () {

    it('should return active user', async function () {
        const result = await browser.get("users/get/me");

        assert.strictEqual(result?.status, true);
    });

});

describe('Test POST /users/add', function () {

    it('should create a new user', async function () {
        const result = await browser.post('users/add', {
            name: "Prueba Nombre Test",
            email: "prueba@email",
            password: "Prueba Contraseña"
        });

        assert.strictEqual(result?.status, true);
    });


    it('should return false as field is missing', async function () {
        const result = await browser.post('users/add', {
            name: "Prueba Nombre Test",
            password: "Prueba Contraseña"
        });

        assert.strictEqual(result?.status, false);
    });

});

describe('Test PUT /users/update/', function () {

    it('should update an existing user', async function () {
        const result = await browser.put(`users/update`, {
            email: "prueba2@email.com"
        });

        assert.strictEqual(result?.status, true);
    });

});