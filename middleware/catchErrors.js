/*
HOF wrapper for async functions
catches errors & sends them to next error handler
https://stackoverflow.com/questions/49664134/express-and-async-await-shall-i-wrap-the-lot-with-try-catch
Adapted from ^ December 23rd, 2021
*/
const catchErrors = func => (req, res, next) =>
	func(req, res).catch(err => next(err));

module.exports = catchErrors;
