import * as mongo from 'mongodb'

export const COLLECTION_RESPONSES = "test_responses"
export const COLLECTION_PEERGROUPS = "test_peergroups"

export const loadData = async (db: mongo.Db) => {
    // Clean slate
    db.dropCollection(COLLECTION_RESPONSES)
    db.dropCollection(COLLECTION_PEERGROUPS)

    // Load test data
    await db.collection(COLLECTION_RESPONSES).insertMany(getResponsesDocs())
    await db.collection(COLLECTION_PEERGROUPS).insertMany(getPeersDocs())
}

const getResponsesDocs = () => {
    return [
        { key: '1', bucket: 'a', sort: '2', numValue: 10, boolValue: false, },
        { key: '2', bucket: 'b', sort: '1', numValue: 20, boolValue: true, },
        { key: '3', bucket: 'a', sort: '3', numValue: 30, boolValue: true, },
    ]
}

const getPeersDocs = () => {
    return [
        { key: '1', peer: "p1", entry: 1 },
        { key: '2', peer: "p1", entry: 2 },
        { key: '3', peer: "p2", entry: 3 },
    ]
}

// LOAD MBM DEV Data
export const loadData2 = async (client: mongo.MongoClient, db: mongo.Db) => {
    // Clean slate
    db.dropCollection(COLLECTION_RESPONSES)

    // Load test data
    let data = await client.db('MBMFE_DEV').collection('surveyresponses').find({}).toArray()

    // answers must be number
    for (const value of data) {
        if(value.questionanswer === "") value.questionanswer = -1
        if(value.questionanswer === "Y") value.questionanswer = 1
        if(value.questionanswer === "N" ) value.questionanswer = 0
        if(value.questionanswer.length > 0) value.questionanswer = Number(value.questionanswer)
    }

    await db.collection(COLLECTION_RESPONSES).insertMany(data)
}