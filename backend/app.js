const express = require("express");

const app = express();

// enable CORS
const cors = require("cors");
app.use(cors());
// parse JSON in request body
app.use(express.json());

// generate custom errors
const ExpressError = require("./ExpressError");

// handle 404s AKA unmatched requests
app.use((req, res, next) =>
	next(new ExpressError("Not found.", 404))
);

// generic error handler catch all
app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || "Something went wrong.";

	return res.status(statusCode).json({ error: { statusCode, message } });
});

module.exports = app;
