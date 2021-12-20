/**
 * taking an object, and target keys
 * mutates the obj values at the keys
 * to be parsed into numbers
 */
const parseStringNums = (obj, keys) => {
	for (const key of keys) {
		if (key in obj) {
			obj[key] = +obj[key];
		}
	}
};

module.exports = parseStringNums;
