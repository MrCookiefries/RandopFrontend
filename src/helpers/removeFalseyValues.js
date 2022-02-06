// takes an object & returns a new one without keys to a falsey value
const removeFalseyValues = obj => Object.entries(obj).reduce(
	(acc, [k, v]) => {
		if (v) acc[k] = v;
		return acc;
	}, {}
);

export default removeFalseyValues;
