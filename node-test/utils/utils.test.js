const utils = require('./utils')
const assert = require('assert')

it('should add two number', () => {
				let res = utils.add(33, 11)
				expect(res).toBe(44).toBeA('number');
})

it('should add sub number', () => {
				let res = utils.sub(10, 11)
				expect(res).toBe(1).toBeA('number');
})
