import fs from "fs";
import path from "path";

const controllerDir = "../controller";

const getControllers = async (): Promise<Promise<any>> => {
	try {
		console.log(path.resolve(__dirname, controllerDir));

		const files = await new Promise<string[]>((res, rej) =>
			fs.readdir(path.resolve(__dirname, controllerDir), (err, files) => {
				if (err) {
					rej(err);
				}
				res(files);
			})
		);
		return files
			.map((file) => {
				const controllerPath = `${controllerDir}/${file}`;
				if (path.extname(controllerPath) !== ".js") {
					return null;
				}
				return import(`${controllerDir}/${file}`);
			})
			.filter((item) => item !== null);
	} catch (error) {
		console.error(error);
		throw new Error("Controllers load failure");
	}
};

export default getControllers;
