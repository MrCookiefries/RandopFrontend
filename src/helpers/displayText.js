// takes JS style named text & transforms it into a displable manner
// example firstName -> First Name
const displayText = text => {
	const words = text.split(/(?=[A-Z])/);
	// https://stackoverflow.com/questions/7888238/javascript-split-string-on-uppercase-characters
	// Regex taken from ^ on January 9th, 2022
	const phrase = words.join(" ");
	return phrase[0].toUpperCase() + phrase.substring(1);
};

export default displayText;
