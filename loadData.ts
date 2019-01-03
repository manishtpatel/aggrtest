import * as mongo from 'mongodb'

export const COLLECTION_RESPONSES = "surveyresponses"
export const COLLECTION_RESPONSES_TEST = "surveyresponses_agg_test"
export const COLLECTION_RESPONSES_BYPART_TEST = "surveyresponses_bypart_test"
export const COLLECTION_PEERGROUPS = "test_peergroups"
export const COLLECTION_SRESPONSES = "sresponses"

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
    // db.dropCollection(COLLECTION_RESPONSES_TEST)

    // copy collection
    // let result = await db.collection(COLLECTION_RESPONSES).aggregate([{ $match: {} }, { $out: COLLECTION_RESPONSES_TEST }])

    // console.log(result)

    let collection = db.collection(COLLECTION_RESPONSES)

    // collection.updateMany({questionanswer: ""}, {questionanswer})


    // // Load test data
    // let cursor = await client.db('MBMFE_DEV').collection('surveyresponses').find({})

    // cursor.




    //     for(const data of docs) {
    //     // answers must be number
    //     for (const value of data) {
    //         if (value.questionanswer === "") value.questionanswer = -1
    //         if (value.questionanswer === "Y") value.questionanswer = 1
    //         if (value.questionanswer === "N") value.questionanswer = 0
    //         if (value.questionanswer.length > 0) value.questionanswer = Number(value.questionanswer)
    //     }

    //     await db.collection(COLLECTION_RESPONSES).insertMany(data)
    // }
}

export const loadData3 = async (client: mongo.MongoClient, db: mongo.Db) => {
    let collection = db.collection(COLLECTION_RESPONSES_TEST)

    await collection.aggregate([
        {
            $match: {
                questiondatatype: {
                    $in: [101, 103]
                },
                questionanswer: { "$nin": [null, ""] }
            },
        },
        {
            $group: {
                _id: {
                    pi: "$participantid",
                    si: "$surveyid",
                    ip: "$ispublished",
                    pl: "$planid",
                    qi: "$questionid",
                },
                // responses : {
                //     $push : {
                //         pq:  {$concat: [ "$planid", " - ", "$questionid" ]}
                //     }
                // },
                ans: { $last: "$questionanswer_temp" }
                // responses: {
                //     $push: {
                //         // bi: "$benefitid",
                //         // sb: "$subbenefitid",
                //         // qi: "$questionid",
                //         // ib: {
                //         //     $eq: ["$questiondatatype", 101]
                //         // },
                //         // pl: "$planid",
                //         // sc: "$staffcategorycode",
                //         // sf: "$statisticsflag",
                //         qa: "$questionanswer",
                //     }
                // }
            }
        },
        {
            $group: {
                _id: {
                    pi: "$_id.pi",
                    si: "$_id.si",
                    ip: "$_id.ip",
                },
                responses: {
                    $push: {
                        // pq: { $concat: ["$_id.pl", " - ", "$_id.qi"] }, // TODO: build key and build object insted of push in array, o(1) lookup
                        pl: "$_id.pl",
                        qi: "$_id.qi",
                        ans: "$ans",
                    }
                },
            }
        },
        {
            $out: COLLECTION_RESPONSES_BYPART_TEST
        }
    ], {
            allowDiskUse: true,
        }).toArray()
}