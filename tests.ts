import * as mongo from 'mongodb'
import * as data from './loadData'

// qid&scid = id, count(truecount), count(totalanswers), unique companies, avg, 25, 50, 70, %yes, 
// number of plans, comapnies: 
//      A plan1&2, 2 ans, observation 1 ()
// asia & non-asia  

function isEmptyOrSpaces(str: string) {
    return str === null || str.match(/^ *$/) !== null;
}

// const copytotemp = async (db: mongo.Db, tempColl: mongo.Collection) => {
//     let collOrig = db.collection(data.COLLECTION_RESPONSES)

//     // Insert into new collection
//     try {
//         db.dropCollection(tempColl.collectionName)
//     } catch{ }

//     await collOrig.find().forEach((doc) => {
//         console.log(doc._id)

//         tempColl.insertOne(doc, {
//             w: 0
//         })
//     })
// }
const copytotemp = async (db: mongo.Db, tempColl: mongo.Collection) => {
    let collOrig = db.collection(data.COLLECTION_RESPONSES)

    await collOrig.aggregate([{
        $out: tempColl.collectionName
    }]).toArray()
}

const tempUpdates = async (db: mongo.Db, tempColl: mongo.Collection) => {
    // update temp collection to expected data
    await tempColl.find({ questiondatatype: { $in: [101, 103] } }, {
        projection: { questionanswer: 1, questiondatatype: 1 }
    }).forEach((doc) => {
        console.log(doc.questionanswer)

        if (doc.questiondatatype == 101) {
            tempColl.updateOne({ _id: doc._id }, {
                $set:
                    { questionanswer_temp: isEmptyOrSpaces(doc.questionanswer) ? null : parseInt(doc.questionanswer) }
            }, {
                    w: 0
                })
        } else if (doc.questiondatatype == 103) {
            let answer: string = doc.questionanswer
            let newAnswer = null

            if (!isEmptyOrSpaces(answer)) {
                if (answer.trim().toLowerCase() == 'y') {
                    newAnswer = 1
                } else if (answer.trim().toLowerCase() == 'n') {
                    newAnswer = 0
                } else {
                    console.log('found bool answer:->', answer, "<-")
                    throw "unknon bool answer"
                }

                tempColl.updateOne({ _id: doc._id }, {
                    $set:
                        { questionanswer_temp: newAnswer }
                }, {
                        w: 0
                    })
            }
        }
    })
}

const createIndexes = async (db: mongo.Db, tempColl: mongo.Collection) => {
    await tempColl.createIndex({
        questiondatatype: 1,
    })

    // setup indexes on temp collection
    await tempColl.createIndex({
        surveyid: 1,
        participantid: 1,
        staffcategorycode: 1,
        questioncode: 1,
        questiondatatype: 1,
        // questionanswer_temp: 1,
        // questioncode: 1,
        // staffcategorycode: 1,
        // participantid: 1,
    }, {
            // partialFilterExpression: { questiondatatype: 101 }, 
            name: "aggindex"
        }
    )
}

export const runTests = async (db: mongo.Db) => {
    let coll = db.collection(data.COLLECTION_RESPONSES_TEST)

    // await copytotemp(db, coll)
    // await createIndexes(db, coll)
    // await tempUpdates(db, coll)
    // return

    // TODO: all numerics should be numbers and and denorm asia-method and other-method
    let result = await coll.aggregate([
        {
            $match: {
                surveyid: "5a8bbcc3dc75a5280825fc2b",
                // participantid: {
                //     $in: [
                //         "5b5740598f44d72378d9d3a2",
                //         "5b2bb4d8480709107040a370",
                //         "5b2bb53b4dd7c81bd0c8bb88",
                //         "5b337c6169c4511fec8078b7",]
                // },
                staffcategorycode: {
                    $in: [
                        "EL4", "EL2", "EL5", "EL3", "EL6"
                    ]
                },
                // ispublished: 0,
                // subbenefitid: {
                //     $in: [
                //         "EL4", "EL2", "EL5", "EL3", "EL6"
                //     ]
                // },
                questiondatatype: {
                    $in: [101, 103]
                },
                // questionanswer: {
                //     $gt: -1
                // },
                // TODO: use $ne for filtering out null or empty values
            },
        }, {
            $sort: {
                surveyid: 1,
                participantid: 1,
                staffcategorycode: 1,
                questioncode: 1,
                questiondatatype: 1,
                // questionanswer_temp: 1,
            }
        },
        // {
        //     $project: {
        //         questioncode: 1,
        //         staffcategorycode: 1,
        //         participantid: 1,
        //         questionanswer_temp: 1,
        //         questiondatatype: 1,
        //     }
        // },
        // {
        //     $group: {
        //         _id: {
        //             surveyid: "$surveyid"
        //         },
        //         count: { $sum: 1 }
        //     }
        // },
        {
            $group: {
                _id: {
                    participantid: '$participantid',
                    questioncode: "$questioncode",
                    staffcategorycode: "$staffcategorycode",
                },
                // count: { $sum: 1 },
                // avg: { $avg: "$questionanswer_temp" },
                // sum: { $sum: "$questionanswer_temp" },
                // all: { $push: "$questionanswer_temp" },
            }
        },
        // {
        //     $group: {
        //         _id: {
        //             questioncode: "$_id.questioncode",
        //             staffcategorycode: "$_id.staffcategorycode",
        //         },
        //         count: { $sum: 1 },
        //         avg: { $avg: "$avg" },
        //         sum: { $sum: "$sum" },
        //         // all: { $push: "$all" },
        //     }
        // },
        // {
        //     $match: {
        //         count: { $gt: 0 } // for validations
        //     }
        // },
        { $out: "test_aggr_results" },
    ], {
            explain: false,
            allowDiskUse: true,
        }).toArray()

    // db.collection('explains').insertOne(result)

    console.log(result, 'done2')

    // console.log(await db.collection('test_aggr_results').countDocuments())
    // console.log(await db.collection(data.COLLECTION_RESPONSES).countDocuments())
}

export const runTests_Sample = async (db: mongo.Db) => {
    let dataArray = await db.collection(data.COLLECTION_RESPONSES).aggregate([
        // {
        //     $match: { bucket: 'a' },
        // },
        // {
        //     $sort: { sort: 1 },
        // },
        // {
        //     $skip: 1
        // },
        // {
        //     $sortByCount: "$bucket",
        // },
        // {
        //     $project : {
        //         numValue: 1,
        //         _id: 0
        //     }
        // },
        // { $out: "outputCollection" }
        {
            $lookup: {
                from: data.COLLECTION_PEERGROUPS,
                localField: "key",
                foreignField: "key",
                as: "foundPeerGroups"
            }
        }
    ], {
            explain: false
        }).toArray()

    console.log('test2', dataArray)
}