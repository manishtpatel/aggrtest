import * as mongo from 'mongodb'
import * as data from './loadData'

export const runTests = async (db: mongo.Db) => {
    let result = await db.collection(data.COLLECTION_RESPONSES).aggregate([
        {
            $match: {
                surveyid: "5b27ad399f86ab0d18ff9365",
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
                ispublished: 0,
                // subbenefitid: {
                //     $in: [
                //         "EL4", "EL2", "EL5", "EL3", "EL6"
                //     ]
                // },
                questiondatatype: {
                    $in: [101, 103]
                },
                questionanswer: {
                    $gt: -1
                },
            },
        },
        // {
        //     $project: {
        //         cleanquestionanswer: {
        //             $toInt: "$questionanswer"
        //          }
        //     }
        // },
        {
            $group: {
                _id: {
                    questioncode: "$questioncode",
                    staffcategorycode: "$staffcategorycode",
                },
                count: { $sum: 1 },
                avg: { $avg: "$questionanswer" },
                sum: { $sum: "$questionanswer" },
                all: { $push: "$questionanswer" },
            }
        },
        {
            $match: {
                count: { $gt: 3 }
            }
        },
        { $out: "r" },
    ], {
            explain: false
        })

    // db.collection('explains').insertOne(result)

    // console.log(result)

    console.log(await db.collection('r').countDocuments())
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

    console.log('test', dataArray)
}