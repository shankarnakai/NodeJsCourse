const add = (a,b) =>  a + b
const sub = (a,b) =>  a - b
const square = (a) => a * a

const asyncAdd = (a, b, callback) => {
				setTimeout(() => {
								callback(a +b)
				}, 1000)
}

module.exports = {
				add,
				sub, 
				square,
				asyncAdd
}
