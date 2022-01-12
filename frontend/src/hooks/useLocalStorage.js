import { useEffect, useState } from "react";

// uses useState - but with a useEffect to update
// localStorage every time the state is changed
const useLocalStorage = key => {
	const [state, setState] = useState(() => {
		return window.localStorage.getItem(key);
	});

	useEffect(() => {
		window.localStorage.setItem(key, state);
	}, [state, key]);

	return [state, setState];
};

export default useLocalStorage;
