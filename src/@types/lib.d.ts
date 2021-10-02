declare type MethodDecorator = <T = (...args: any[]) => void>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

declare interface RouteDefinition {
	// Path to our route
	path: string;
	// HTTP Request method (get, post, ...)
	requestMethod: "get" | "post" | "put" | "delete";
	// Method name within our class responsible for this route
	methodName: string | Symbol;
}
