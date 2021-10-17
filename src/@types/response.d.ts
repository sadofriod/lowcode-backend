//Avoid name space conflict to express.Response
declare namespace IResponse {
	/**
	 * 200: success
	 * 401: no auth
	 * 500: logic error
	 */
	type CustomizeResponseCode = 200 | 401 | 500;

	//General response structure
	interface Common<T = any> {
		data?: T;
		message: string;
		code: CustomizeResponseCode;
	}

	type AppConfigure<T = any> = Common<T>;
}
