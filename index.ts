import * as mongo from 'mongodb'
import * as data from './loadData'
import * as tests from './tests'
import * as bpr_byplans from './bpr_byplans'
import * as bpr_bycomapnies from './bpr_bycomapnies'

let mongoClient = mongo.MongoClient

const client = new mongoClient("mongodb://localhost:27017", { useNewUrlParser: true })

let exec = new Promise(async (resolve, reject) => {
    try {
        // Use connect method to connect to the Server
        await client.connect()
        const db = client.db("MBMFE_DEV");

        // await bpr_byplans.runTests(db)
        await bpr_bycomapnies.runTests(db)

        resolve()
    }
    catch (err) {
        reject(err)
    } finally {
        client.close()
    }
})

exec.then(_ => console.log('done')).catch(err => console.error(err))