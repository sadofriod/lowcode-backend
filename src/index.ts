import express, { NextFunction, Request, Response } from "express";
import "reflect-metadata";
// import moduleAlias from "module-alias";
import sourceMapSupport from "source-map-support";
import "module-alias/register";
import Test from "src/controller/Test";
import { json, urlencoded } from "body-parser";
import db from "src/db";
//JS error message mapping
sourceMapSupport.install();

const app = express();

const jsonParser = json();

const urlencodedParser = urlencoded({ extended: false, limit: 1024 * 1024 * 5 });

[Test].forEach((controller) => {
	const instance = new controller();
	const prefix = Reflect.getMetadata("prefix", controller);
	const routes: RouteDefinition[] = Reflect.getMetadata("routes", controller);
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

app.listen(3002, "0.0.0.0", () => {
	console.log("Started express on port 3002");
});
