// create the server
const express = require("express");
const app = express();

// enable CORS
app.use(require("cors")());
// parse JSON in request body
app.use(express.json());

// apply JWT middleware
app.use(require("./middleware/auth").authenticateJWT);

// routes for resources
app.use("/auth", require("./routes/auth"));
app.use("/users", require("./routes/users"));
app.use("/products", require("./routes/products"));
app.use("/carts", require("./routes/carts"));
app.use("/cartItems", require("./routes/cartItems"));

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

	if (process.env.NODE_ENV !== "test") {
		console.error(err.stack);
	}

	return res.status(statusCode).json({ error: { statusCode, message } });
});

module.exports = app;
