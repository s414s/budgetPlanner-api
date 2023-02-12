const assert = require('assert');
const browser = require('./config/browser');

describe('Test GET /folders/list', function () {

    it('should return a list of folders', async function () {
        const budgetId = 1;
        const result = await browser.get(`folders/list/${budgetId}`);

        assert.strictEqual(result?.status, true);
        assert.strictEqual(Array.isArray(result.data), true);
    });

});

describe('Test GET /folders/description', function () {

    it('should return the description of a given folder', async function () {
        const folderId = 1;
        const result = await browser.get(`folders/description/${folderId}`);

        assert.strictEqual(result?.status, true);
        assert.strictEqual(Array.isArray(result.data), true);
    });

});

describe('Test POST /folders/add', function () {

    it('should create a new budget', async function () {
        const result = await browser.post('folders/add', {
            id_budget: "1",
            code: "TestCode1111",
            name: "Test name"
        });

        assert.strictEqual(result?.status, true);
    });

});

describe('Test PUT /folders/update/', function () {

    it('should update an existing folder', async function () {
        const folderId = 25;
        const result = await browser.put(`folders/update/${folderId}`, {
            code: "TestCode111",
            name: "test name"
        });

        assert.strictEqual(result?.status, true);
    });

    it('should not allow to update a non existing folder', async function () {
        const folderId = 7;
        const result = await browser.put(`folders/update/${folderId}`, {
            code: "TestCode111",
            name: "test name"
        });

        assert.strictEqual(result?.status, false);
    });

});

describe('Test DELETE /folders/del/', function () {

    it('should not allow to delete folder as user is not editor', async function () {
        const folderId = 22;
        const result = await browser.del(`folders/del/${folderId}`);
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result.status, false);
    });

    it('should not allow to delete a non existing folder', async function () {
        const folderId = 22;
        const result = await browser.del(`folders/del/${folderId}`);

        assert.strictEqual(result?.status, false);
    });

});