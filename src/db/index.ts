import { AnyError, Collection, Db, Document, MongoClient } from "mongodb";
import configMockData from "src/mockdata/config.json";

const url = `mongodb://127.0.0.1:27017`;
//mongodb://admin:pass@localhost:27017/db?ssl=false
// const url = `mongodb://admin:pass@localhost:27017/db?ssl=false`;

const client = new MongoClient(url);

const dbName = "test";

type CollectionName = "config" | "user";

const collections: CollectionName[] = ["config", "user"];

const createCollection = (db: Db, name: string) => {
	return new Promise<AnyError | Collection<Document>>((res, rej) =>
		db.listCollections({ name }).next((err, collinfo) => {
			if (collinfo) {
				res(db.collection(collinfo.name));
			} else {
				db.createCollection(name).then((val) => {
					//Set default val
					val.insertMany([configMockData]);
					res(val);
				});
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
		console.log("Connected successfully to server");
		const db = client.db(dbName);
		const result: { [name in CollectionName]: Collection<Document> | null } = {
			config: null,
			user: null,
		};
		for (const item of collections) {
			const collection = await createCollection(db, item);
			if (!(collection instanceof Collection)) {
				continue;
			} else {
				result[item] = collection;
			}
		}
		return result;
	} catch (error) {
		console.error(error);
		throw new Error("DB connect has error");
	}
};

const DBCollection = async () => await db();

export default DBCollection();
