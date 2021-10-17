import { Request, Response } from "express";
import { Controller, Get, Put } from "src/decorators/response";
import DBCollection from "src/db";

@Controller("/admin")
export default class Config {
	@Get("/appcfg")
	public async getAppConfigure(req: Request<{ app: number }>, res: Response<IResponse.AppConfigure>) {
		const { app } = req.query;
		const collection = (await DBCollection).config;
		const configData = await collection
			?.find<IResponse.AppConfigure>({
				"canvas.appId": Number(app),
			})
			.toArray();
		if (!configData) {
			return res.json({
				data: null,
				message: "not find data",
				code: 500,
			});
		}
		const result: any = configData[0];
		delete result._id;
		return res.json({
			data: configData[0],
			message: "success",
			code: 200,
		});
	}

	// @Put("/appcfg")
	// public async updateAppConfigure(req,res){

	// }
}
