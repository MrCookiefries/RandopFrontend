const ExpressError = require("../ExpressError");
const jsToSqlConverter = require("./jsToSqlConverter");

/**
 * takes a data object of columns and new values for a row,
 * returning an SQL string of the columns to set,
 * and an array of values for the set string
 */
const sqlPartialUpdate = (dataObj) => {
	const keys = Object.keys(dataObj);
	if (!keys.length) {
		throw new ExpressError("No data to update", 400);
	}
	const columns = keys.map((column, idx) => (
		`"${jsToSqlConverter(column)}"=$${idx + 1}`
	));

	return {
		setColumns: columns.join(", "),
		values: Object.values(dataObj)
	};
};

module.exports = sqlPartialUpdate;
