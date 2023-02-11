const assert = require('assert');
const browser = require('./config/browser');

describe('Test GET /itemsall/list', function () {

    it('should return a list of all items in a budget', async function () {
        const budgetId = 1;
        const result = await browser.get(`groups/list/${budgetId}`);

        assert.strictEqual(result?.status, true);
        assert.strictEqual(Array.isArray(result.data), true);
    });

});

describe('Test GET /items/list', function () {

    it('should return a list of items', async function () {
        const groupId = 5;
        const result = await browser.get(`groups/list/${groupId}`);

        assert.strictEqual(result?.status, true);
        assert.strictEqual(Array.isArray(result.data), true);
    });

});

describe('Test POST /items/add', function () {

    it('should create a new budget', async function () {
        const result = await browser.post('items/add', {
                id_price : 1,
                id_group : 5
        });

        assert.strictEqual(result?.status, true);
    });

});

describe('Test PUT /items/update/', function () {

    it('should update an existing group', async function () {
        const itemId = 7;
        const result = await browser.put(`items/update/${itemId}`, {
            factor: 1.9
        });

        assert.strictEqual(result?.status, true);
    });

    it('should not allow to update a non existing item', async function () {
        const itemId = 6;
        const result = await browser.put(`items/update/${itemId}`, {
            factor: 1.1
        });

        assert.strictEqual(result?.status, false);
    });

});

describe('Test DELETE /items/del/', function () {

    it('should not allow to delete a non existing item', async function () {
        const itemId = 6;
        const result = await browser.del(`items/del/${itemId}`);

        assert.strictEqual(result?.status, false);
    });

});