const { MongoClient } = require("mongodb");

const url = `mongodb://${process.env.HOST}:${process.env.PORT}`
const client = new MongoClient(url);
