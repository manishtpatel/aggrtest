import * as mongo from 'mongodb'
import * as data from './loadData'
import * as tests from './tests'
import * as tests2 from './tests.1'

let mongoClient = mongo.MongoClient

const client = new mongoClient("mongodb://localhost:27017", { useNewUrlParser: true })

let exec = new Promise(async (resolve, reject) => {
    try {
        // Use connect method to connect to the Server
        await client.connect()
        const db = client.db("MBMFE_DEV");

        // await data.loadData2(client, db)
        // await data.loadData3(client, db)
        await tests2.runTests(db)
        // await tests.runTests(db)

        resolve()
    }
    catch (err) {
        reject(err)
    } finally {
        client.close()
    }
})

exec.then(_ => console.log('done')).catch(err => console.error(err))