import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
// import moduleAlias from "module-alias";
import sourceMapSupport from "source-map-support";
import "module-alias/register";
import { json, urlencoded } from "body-parser";
import getControllers from "src/common/getControllers";
import { replaceConsole } from "src/utils/tools";
//JS error message mapping
sourceMapSupport.install();

//Replace console log content
replaceConsole();

const app = express();

const jsonParser = json();

const urlencodedParser = urlencoded({ extended: false, limit: 1024 * 1024 * 5 });

const cros = (req: Request, res: Response, next: NextFunction) => {
	/**
	 * Access-Control-Allow-Origin: https://foo.example
	 * Access-Control-Allow-Methods: POST, GET, OPTIONS
	 * Access-Control-Allow-Headers: X-PINGOTHER, Content-Type
	 */
	res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
	res.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	next();
};

const main = async () => {
	const controllers = await getControllers();
	controllers.forEach(async (controller: Promise<any>) => {
		const defaultClass = (await controller).default;
		const instance = new defaultClass();
		const prefix = Reflect.getMetadata("prefix", defaultClass);
		const routes: RouteDefinition[] = Reflect.getMetadata("routes", defaultClass);
		routes.forEach((route) => {
			app[route.requestMethod](prefix + route.path, (req: Request, res: Response, next: NextFunction) => {
				if (typeof route.methodName !== "string") {
					return;
				}
				(instance as any)[route.methodName](req, res, next);
			});
		});
	});
	app.use(jsonParser);
	app.use(urlencodedParser);
	// const dbconnect = db();
	// Allow cross domain request
	app.use(cros);
	app.listen(3002, "0.0.0.0", () => {
		console.log("Started express on port 3002");
	});
};

main();
