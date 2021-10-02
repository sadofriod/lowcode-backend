import { Request, Response } from "express";
import { Controller, Get } from "src/decorators/response";

@Controller("/test")
export default class Test {
	@Get("/testPath")
	public testGet(req: Request, res: Response) {
		res.send("get test");
	}
}
