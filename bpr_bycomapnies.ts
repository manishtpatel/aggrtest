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
                participantid: true,
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
            $group: {
                _id: {
                    participantid: '$participantid',
                    qi: '$responses.q',
                },
                sum: { $sum: "$responses.a" },
                avg: { $avg: "$responses.a" },
                plancountperpart: { $sum: 1},
            }
        },
        {
            $sort: {
                '_id.qi': 1,
                'avg': 1,
            }
        },
        {
            $group: {
                _id: {
                    qi: '$_id.qi',
                },
                compcount: { $sum: 1 },
                plancount: { $sum: "$plancountperpart" },
                avg: { $avg: "$avg" },
                all: { $push: "$avg" },
                sum: { $sum: "$sum" },
                min: { $min: "$avg"},
                max: { $max: "$avg"},
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
        //         "all": false
        //     }
        // },
        { $out: "test_bpr_bycomp" },
    ], {
            explain: false,
            allowDiskUse: true,
        }).toArray()
}