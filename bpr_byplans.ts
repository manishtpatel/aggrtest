import * as mongo from 'mongodb'
import * as data from './loadData'

const createIndexes = async (db: mongo.Db, tempColl: mongo.Collection) => {
    // setup indexes on temp collection
    await tempColl.createIndex({
        surveyid: 1,
        ispublished: 1,
        participantid: 1,
    }, {
            name: "aggindex"
        }
    )
}

export const runTests = async (db: mongo.Db) => {
    let coll = db.collection(data.COLLECTION_SRESPONSES)
    // await createIndexes(db, coll)

    let result = await coll.aggregate([
        {
            $match: {
                surveyid: "5a8bbcc3dc75a5280825fc2b",
                ispublished: 0,
                participantid: { $nin: [""] },
            },
        },
        {
            $project: {
                responses: {
                    $filter: {
                        input: "$responses",
                        as: "response",
                        cond: {
                            $and: [
                                {
                                    $or: [
                                        {
                                            $and: [
                                                { $eq: ["$$response.qt", 103] },
                                                { $ne: ["$$response.a", null] },
                                            ]
                                        }, {
                                            $and: [
                                                { $eq: ["$$response.qt", 101] },
                                                { $ne: ["$$response.a", null] },
                                            ]
                                        },
                                    ],
                                },
                                {
                                    $or: [
                                        { $in: ["EL2", "$$response.s"] },
                                        { $in: ["EL3", "$$response.s"] },
                                    ]
                                }
                            ]
                        }
                    }
                }
            }
        },
        {
            $unwind: "$responses"
        },
        {
            $sort: {
                'responses.a': 1,
            }
        },
        {
            $group: {
                _id: {
                    qi: '$responses.q',
                },
                count: { $sum: 1 }, // sum of total plans
                avg: { $avg: "$responses.a" },
                all: { $push: "$responses.a" },
                sum: { $sum: "$responses.a" },
                min: { $min: "$responses.a"},
                max: { $min: "$responses.a"},
            }
        },
        // // add (f + (c-f)*0.2)
        // // 0.2 = (actualmedian - f)
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
                                    { $multiply: [{ $subtract: [{ $size: "$all" }, 1] }, 0.75] },
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
        //         "all": false,
        //     }
        // },
        { $out: "test_bpr_byplans" },
    ], {
            explain: false,
            allowDiskUse: true,
        }).toArray()
}