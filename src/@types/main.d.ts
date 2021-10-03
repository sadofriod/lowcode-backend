declare namespace LC {
	interface CompInstsDataConfig {
		autoRefresh?: boolean;
		dataParams: { name: string; value: any }[];
		//Source type range 0 | 1 | 2 | 3 | 4 corresponding to 'static data' | 'api' | 'sql' | 'csv' | 'data-group'
		dataSourceType: 0 | 1 | 2 | 3 | 4;
		//Map source data to usage data
		fieldMap: {
			sourceFieldName: string;
			compFieldName: string;
		}[];
		//Data updating frequency
		frequency: number;
		//Cache data
		mockData: any[];
		specScript?: string;
	}

	interface CompInsts {
		//Component name
		alias: string;
		//Component rect info
		attr: Partial<{
			top: number;
			left: number;
			width: number;
			angle: number;
			scale: number[];
			lock: boolean;
			opacity: number;
			height: number;
		}>;
		//Component unique code
		code: string;
		// Component template name
		compCode: string;
		// Component template file name
		compTempCode: string;
		// Detail configure
		conifg: any;
		// Component origin data info
		dataConfig: CompInstsDataConfig;
		//Component can be display if locked is false
		hided: boolean;
		//Component can be update if locked is false
		locked: boolean;
		//Default name
		title: string;
	}

	interface Canvas {
		// Page id (unique code)
		appId: number;
		// Page base backgroundColor
		backgroundColor: string;
		// Page base backgroundImg
		backgroundImg: string;
		// All components
		compInsts: CompInsts[];

		createTime: number;
		createUser: string;
		//Canvas visitable height
		height: number;
		modifyTime: number;
		modifyUser: string;
		thumbnail: string;
		//Canvas visitable width
		width: number;
		//Canvas visitable scale ratio
		zoomType: number;
	}

	interface Config {
		canvas: Canvas;
		createTime: number;
		createUser: string;
		id: number;
		modifyTime: number;
		modifyUser: string;
	}
}
