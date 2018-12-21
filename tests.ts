import * as mongo from 'mongodb'
import * as data from './loadData'

export const runTests = async (db: mongo.Db) => {
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
    ],{
        explain: false
    }).toArray()

    console.log('test', dataArray)
}