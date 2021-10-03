import { Request, Response } from "express";
import { Controller, Get } from "src/decorators/response";
import DBCollection from "src/db";

@Controller("/admin")
export default class Config {
	@Get("/appcfg")
	public async getAppConfigure(req: Request<{ app: number }>, res: Response<IResponse.AppConfigure>) {
		const { app } = req.params;
		const collection = (await DBCollection).config;
		console.log(collection);
		const configData = await collection?.find<IResponse.AppConfigure>({ code: 200 });
		if (!configData) {
			return res.json({
				data: null,
				message: "not find data",
				code: 500,
			});
		}
		return res.json({
			data: configData,
			message: "success",
			code: 200,
		});
	}
}
