import { AnyError, Collection, Db, Document, MongoClient } from "mongodb";

const url = `mongodb://localhost:27017`;

const client = new MongoClient(url);

const dbName = "test";

const collections = ["config", "user"];

const createCollection = (db: Db, name: string) => {
	return new Promise<boolean | AnyError | Collection<Document>>((res, rej) =>
		db.listCollections({ name }).next((err, collinfo) => {
			if (collinfo) {
				res(true);
			} else {
				db.createCollection(name).then((val) => res(val));
			}
			if (err) {
				rej(err);
			}
		})
	);
};

const db = async () => {
	try {
		await client.connect();
		console.log("Connected successfully to server", client);
		const db = client.db(dbName);
		const result: { [name: string]: Collection<Document> } = {};
		for (const item of collections) {
			const collection = await createCollection(db, item);
			if (!(collection instanceof Collection)) {
				continue;
			}
			result[item] = collection;
		}
		return result;
	} catch (error) {
		console.error(error);
		throw new Error("DB connect has error");
	}
};

export default db;
