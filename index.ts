import * as mongo from 'mongodb'
import * as data from './loadData'
import * as tests from './tests'

let mongoClient = mongo.MongoClient

const client = new mongoClient("mongodb://localhost:27017", { useNewUrlParser: true })

// Use connect method to connect to the Server
client.connect(function (err) {
    if (err) throw err

    const db = client.db("statstest");

    data.loadData2(db).then(async () => {
        // await tests.runTests(db)

        client.close();
    }).catch((err) => {
        client.close();
        throw err
    })
});