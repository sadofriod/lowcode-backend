declare namespace Service {
	interface CompInstEditReqData {
		code: string;
		key: keyof LC.CompInsts | "staticData";
		value: any;
	}
}
