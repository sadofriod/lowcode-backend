import "reflect-metadata";

export enum HTTPMethod {
	get = "get",
	post = "post",
	delete = "delete",
	option = "option",
	put = "put",
	pull = "pull",
}

export const Controller = (prefix: string = ""): ClassDecorator => {
	return (target: any) => {
		Reflect.defineMetadata("prefix", prefix, target);

		// Since routes are set by our methods this should almost never be true (except the controller has no methods)
		if (!Reflect.hasMetadata("routes", target)) {
			Reflect.defineMetadata("routes", [], target);
		}
	};
};

export const Get = (path: string): MethodDecorator => {
	// `target` equals our class, `propertyKey` equals our decorated method name
	return (target, propertyKey) => {
		// In case this is the first route to be registered the `routes` metadata is likely to be undefined at this point.
		// To prevent any further validation simply set it to an empty array here.
		if (!Reflect.hasMetadata("routes", target.constructor)) {
			Reflect.defineMetadata("routes", [], target.constructor);
		}

		// Get the routes stored so far, extend it by the new route and re-set the metadata.
		const routes = Reflect.getMetadata("routes", target.constructor) as Array<RouteDefinition>;

		routes.push({
			requestMethod: HTTPMethod.get,
			path,
			methodName: propertyKey,
		});
		Reflect.defineMetadata("routes", routes, target.constructor);
	};
};
