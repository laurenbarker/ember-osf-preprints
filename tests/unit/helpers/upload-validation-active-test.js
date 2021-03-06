
import { uploadValidationActive } from 'preprint-service/helpers/upload-validation-active';
import { module, test } from 'qunit';

module('Unit | Helper | upload validation active');

test('edit mode upload validation active', function(assert) {
    var editMode = true;
    var nodeLocked = true;
    var hasOpened = true;
    let result = uploadValidationActive([editMode, nodeLocked, hasOpened]);
    assert.equal(result, true);
});

test('edit mode upload validation not active', function(assert) {
    var editMode = true;
    var nodeLocked = false;
    var hasOpened = true;
    let result = uploadValidationActive([editMode, nodeLocked, hasOpened]);
    assert.equal(result, false);
});

test('add mode upload validation active', function(assert) {
    var editMode = false;
    var nodeLocked = true;
    var hasOpened = true;
    let result = uploadValidationActive([editMode, nodeLocked, hasOpened]);
    assert.equal(result, true);
});


test('add mode upload validation not active', function(assert) {
    var editMode = false;
    var nodeLocked = false;
    var hasOpened = true;
    let result = uploadValidationActive([editMode, nodeLocked, hasOpened]);
    assert.equal(result, false);
});
