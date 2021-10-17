import { Request, Response } from "express";
import { Controller, Get, Put } from "src/decorators/response";
import DBCollection from "src/db";
import { Collection, UpdateFilter } from "mongodb";

@Controller("/admin")
export default class Config {
	private collection: Collection | null = null;

	constructor() {
		DBCollection.then((items) => {
			this.collection = items.config;
		});
	}

	@Get("/appcfg")
	public async getAppConfigure(req: Request<Service.GetAppConfigure>, res: Response<IResponse.AppConfigure>) {
		try {
			const { app } = req.query;
			// const collection = (await DBCollection).config;
			const configData = await this.collection
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

	@Put("/appcfg/compInst")
	public async updateAppConfigure(req: Request<any, any, Service.CompInstEditReqData[]>, res: Response<IResponse.Common>) {
		console.log(" trigger put");
		try {
			const compInsts = req.body;
			const filter: { code: string[] } = { code: [] };
			const updater: UpdateFilter<any>[] = [];
			for (let index = 0; index < compInsts.length; index++) {
				const { code, key, value } = compInsts[index];
				// filter.push({
				// 	"canvas.compInsts.code": code,
				// });
				// updater["$set"] = [
				// 	...updater["$set"],
				// 	[`canvas.compInsts.${key}`]: value,
				// ];

				filter.code.push;

				updater.push({
					$set: { [`canvas.compInsts.${key}`]: value },
				});
			}
			console.log(updater);

			await this.collection?.updateMany(filter, updater);
			res.json({
				code: 200,
				message: "SUCCESS",
			});
		} catch (error) {
			console.log(error);

			res.json({
				code: 500,
				message: "update failure",
			});
		}
	}
}
