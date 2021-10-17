declare namespace Service {
	interface GetAppConfigure {
		app: number;
	}

	interface CompInstEditReqData {
		code: string;
		key: keyof LC.CompInsts | "staticData";
		value: any;
	}
}
