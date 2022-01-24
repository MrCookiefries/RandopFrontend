const formatName = name =>
	name.split("-")
		.map(word =>
			word[0].toUpperCase() + word.slice(1)
		).join(" ");

export default formatName;
