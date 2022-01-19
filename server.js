const app = require("./app");
const { portNum } = require("./config");

// listen for requests
app.listen(portNum, () => {
	console.log(`Server running at http://localhost:${portNum}`);
});
