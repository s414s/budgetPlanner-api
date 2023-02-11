const assert = require('assert');
const browser = require('./config/browser');

describe('Test GET /groups/list', function () {

    it('should return a list of groups', async function () {
        const folderId = 1;
        const result = await browser.get(`groups/list/${folderId}`);

        assert.strictEqual(result?.status, true);
        assert.strictEqual(Array.isArray(result.data), true);
    });

});

describe('Test GET /groups/description', function () {

    it('should return the description of a given folder', async function () {
        const folderId = 5;
        const result = await browser.get(`folders/description/${folderId}`);

        assert.strictEqual(result?.status, true);
        assert.strictEqual(Array.isArray(result.data), true);
    });

});

describe('Test POST /groups/add', function () {

    it('should create a new budget', async function () {
        const result = await browser.post('groups/add', {
                id_folder : 1,
                code : "Testing Code",
                id_typeunit : 1,
                name : "Testing Group Name"
        });

        assert.strictEqual(result?.status, true);
    });

});

describe('Test PUT /groups/update/', function () {

    it('should update an existing group', async function () {
        const groupId = 11;
        const result = await browser.put(`groups/update/${groupId}`, {
            code: "TestGroupCode",
            name: "test group name"
        });

        assert.strictEqual(result?.status, true);
    });

    it('should not allow to update a non existing group', async function () {
        const groupId = 3;
        const result = await browser.put(`groups/update/${groupId}`, {
            code: "TestGroupCode"
        });

        assert.strictEqual(result?.status, false);
    });

});

describe('Test DELETE /groups/del/', function () {

    it('should not allow to delete group as user is not editor', async function () {
        const folderId = 12;
        const result = await browser.del(`groups/del/${folderId}`);
        assert.strictEqual(typeof result, 'object');
        assert.strictEqual(result.status, false);
    });

    it('should not allow to delete a non existing folder', async function () {
        const folderId = 15;
        const result = await browser.del(`groups/del/${folderId}`);

        assert.strictEqual(result?.status, false);
    });

});