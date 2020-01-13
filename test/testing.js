// This is purely for testing that mocha is working correctly and can be deleted upon starting development.
// Simply run the command npm test to riun the test.
var assert = require('assert')

describe('Array', function() {
	describe('#indexOf()', function() {
		it('should return -1 when the value is not present', function() {
			assert.equal([1, 2, 3].indexOf(4), -1)
		})
	})
})
