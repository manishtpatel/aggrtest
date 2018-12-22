import * as mongo from 'mongodb'
import * as data from './loadData'
import * as tests from './tests'

let mongoClient = mongo.MongoClient

const client = new mongoClient("mongodb://localhost:27017", { useNewUrlParser: true })

new Promise(async (resolve, reject) => {
    try {
        // Use connect method to connect to the Server
        await client.connect()
        const db = client.db("statstest");

        // await data.loadData2(client, db)
        await tests.runTests(db)

        client.close()

        console.log('done')

        resolve()
    }
    catch (err) {
        reject(err)
        console.log(err)
        throw err
    }
})