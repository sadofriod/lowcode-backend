import { Request, Response } from "express";
import { Controller, Get, Put } from "src/decorators/response";
import DBCollection from "src/db";

@Controller("/admin")
export default class Config {
	@Get("/appcfg")
	public async getAppConfigure(req: Request<Service.GetAppConfigure>, res: Response<IResponse.AppConfigure>) {
		try {
			console.log("trigger get");
			const { app } = req.query;
			const collection = (await DBCollection).config;
			const configData = await collection
				?.find<IResponse.AppConfigure>({
					"canvas.appId": Number(app),
				})
				.toArray();

			if (!configData) {
				return res.json({
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
		} catch (error) {
			console.log(error);
			res.json({
				message: "system error",
				code: 500,
			});
		}
	}

	@Put("/appcfg")
	public async updateAppConfigure(req: Request<any, any, Service.CompInstEditReqData>, res: Response<IResponse.Common>) {
		console.log(" trigger put");
		const { code, key, value } = req.body;
	}
}
