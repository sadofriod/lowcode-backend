import { AnyError, Collection, Db, Document, MongoClient } from "mongodb";
import configMockData from "src/mockdata/config.json";

const url = `mongodb://localhost:27017`;

const client = new MongoClient(url);

const dbName = "test";

type CollectionName = "config" | "user";

const collections: CollectionName[] = ["config", "user"];

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
		console.log("Connected successfully to server");
		const db = client.db(dbName);
		const result: { [name in CollectionName]: Collection<Document> | null } = {
			config: null,
			user: null,
		};
		for (const item of collections) {
			const collection = await createCollection(db, item);
			console.log(collection);
			if (!(collection instanceof Collection)) {
				continue;
			} else {
				result[item] = collection;
			}
			collection.insertMany([configMockData]);
			result[item] = collection;
		}
		return result;
	} catch (error) {
		console.error(error);
		throw new Error("DB connect has error");
	}
};

const DBCollection = () => db();

export default DBCollection();
