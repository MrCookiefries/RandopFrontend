/**
 * converts a camel/pascal case name to a lower snake one
 * firstName -> first_name
 * https://stackoverflow.com/questions/54246477/how-to-convert-camelcase-to-snake-case-in-javascript
 * Adapted from ^ December 20th, 2021
 */
const jsToSqlConverter = str => (
	// lowercase 1st letter, then replace all other capitals
	// with a lowercase version prepended by an underscore
	str[0].toLowerCase() + str.slice(1).replace(/[A-Z]/g, char => (
		`_${char.toLowerCase()}`
	))
);

module.exports = jsToSqlConverter;
