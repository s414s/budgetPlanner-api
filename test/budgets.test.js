const assert = require('assert');
const browser = require('./config/browser');

describe('Test GET /budgets/list', function () {

    it('should return the list of budgets', async function () {
        const result = await browser.get('budgets/list');

        assert.strictEqual(result?.status, true);
        assert.strictEqual(Array.isArray(result.data), true);
    });

});

describe('Test GET /budgets/get', function () {

    it('should get a budget by its ID', async function () {
        const budgetId = 1;
        const result = await browser.get(`budgets/get/${budgetId}`);

        assert.strictEqual(result?.status, true);
    });

});

describe('Test POST /budgets/assign', function () {

    it('should try to assign a budget to a non existing user', async function () {
        const result = await browser.post('budgets/assign', {
            ID_budget: 2,
            ID_user: 4,
            role: "editor"
        });

        assert.strictEqual(result?.status, false);
    });

});

describe('Test POST /budgets/add', function () {

    it('should create a new budget', async function () {
        const result = await browser.post('budgets/add', {
            title: "Test Budget"
        });

        assert.strictEqual(result?.status, true);
    });

});

describe('Test PUT /budgets/update/', function () {

    it('should update an existing budget', async function () {
        const budgetId = 34;
        const result = await browser.put('budgets/update/34', {
            title: "Test Budget renamed"
        });

        assert.strictEqual(result?.status, true);
    });

    it('should not allow to update the budget as user is not editor', async function () {
        const result = await browser.put('budgets/update/13', {
            title: "Test Budget"
        });

        assert.strictEqual(result?.status, false);
    });

    it('should not allow to update a non existing budget', async function () {
        const result = await browser.put('budgets/update/15', {
            title: "Test Budget"
        });

        assert.strictEqual(result?.status, false);
    });

});

describe('Test DELETE /budgets/del/', function () {

    it('should not allow to delete the budget as user is not editor', async function () {
        const budgetId = 12;
        const result = await browser.del(`budgets/del/${budgetId}`);
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result.status, false);
    });

    it('should not allow to delete a non existing budget', async function () {
        const budgetId = 15;
        const result = await browser.del(`budgets/del/${budgetId}`);

        assert.strictEqual(result?.status, false);
    });

});