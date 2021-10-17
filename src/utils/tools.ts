export const replaceConsole = () => {
	const oldLog = (() => console.log)();
	const newLog: typeof console.log = (msg, ...opt) => {
		oldLog(msg, ...opt);
		// console.trace(msg, ...opt);
	};

	console.log = newLog;
};
