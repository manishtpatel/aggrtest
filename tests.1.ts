import * as mongo from 'mongodb'
import * as data from './loadData'

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
    let coll = db.collection(data.COLLECTION_RESPONSES_BYPART_TEST)
    // await createIndexes(db, coll)

    let result = await coll.aggregate([
        // {
        //     $match: {
        //         // surveyid: "5a8bbcc3dc75a5280825fc2b",
        //         // participantid: {
        //         //     $in: [
        //         //         "5b5740598f44d72378d9d3a2",
        //         //         "5b2bb4d8480709107040a370",
        //         //         "5b2bb53b4dd7c81bd0c8bb88",
        //         //         "5b337c6169c4511fec8078b7",]
        //         // },
        //         // staffcategorycode: {
        //         //     $in: [
        //         //         "EL4", "EL2", "EL5", "EL3", "EL6"
        //         //     ]
        //         // },
        //         // ispublished: 0,
        //         // subbenefitid: {
        //         //     $in: [
        //         //         "EL4", "EL2", "EL5", "EL3", "EL6"
        //         //     ]
        //         // },
        //         // questiondatatype: {
        //         //     $in: [101, 103]
        //         // },
        //         // questionanswer: {
        //         //     $gt: -1
        //         // },
        //         // TODO: use $ne for filtering out null or empty values
        //     },
        // },
        // {
        //     $sort: {
        //         // surveyid: 1,
        //         // participantid: 1,
        //         // staffcategorycode: 1,
        //         // questioncode: 1,
        //         // questiondatatype: 1,
        //         // questionanswer_temp: 1,
        //     }
        // },
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
            $unwind: "$responses"
        },
        {
            $sort: {
                'responses.ans': 1
            }
        },
        {
            $group: {
                _id: {
                    qi: '$responses.qi',
                    pl: "$responses.pl",
                },
                count: { $sum: 1 },
                avg: { $avg: "$responses.ans" },
                sum: { $sum: "$responses.ans" },
                all: { $push: "$responses.ans" },
            }
        },
        // add (f + (c-f)*0.2)
        // 0.2 = (actualmedian - f)
        {
            $addFields: {
                med75: {
                    $add: [
                        { $arrayElemAt: ["$all", { $floor: { $multiply: [{ $subtract: [{ $size: "$all" }, 1] }, 0.75] } }] },
                        {
                            $multiply: [{
                                $subtract: [
                                    { $arrayElemAt: ["$all", { $ceil: { $multiply: [{ $subtract: [{ $size: "$all" }, 1] }, 0.75] } }] },
                                    { $arrayElemAt: ["$all", { $floor: { $multiply: [{ $subtract: [{ $size: "$all" }, 1] }, 0.75] } }] },
                                ]
                            }, {
                                $subtract: [
                                    { $multiply: [{ $subtract: [{ $size: "$all" }, 1] }, 0.75]},
                                    { $floor: { $multiply: [{ $subtract: [{ $size: "$all" }, 1] }, 0.75] } },
                                ]
                            }],
                        }
                    ]
                },
            },
        },
        // {
        //     $project: {
        //         "all": -1
        //     }
        // },
        // {
        //     $group: {
        //         _id: {
        //             qi: '$responses.qi',
        //             pl: "$responses.pl",
        //         },
        //         count: { $sum: 1 },
        //         avg: { $avg: "$responses.ans" },
        //         sum: { $sum: "$responses.ans" },
        //         all: { $push: "$responses.ans" },
        //     }
        // },
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
        { $out: "test_aggr_results_bypart" },
    ], {
            explain: false,
            allowDiskUse: true,
        }).toArray()

    // db.collection('explains').insertOne(result)

    console.log(result)

    // console.log(await db.collection('test_aggr_results').countDocuments())
    // console.log(await db.collection(data.COLLECTION_RESPONSES).countDocuments())
}