import db from '../models/index.js'
import { verifyJWT } from '../middleware/JWTAction.js'

const getAllPost = async (token) => {
    try {
        let userId = verifyJWT(token);
        // include inside include but not work
        // let results = await db.Post.findAll({
        //     include: [{
        //         model: db.User, attributes: ["username", "id"],
        //         include: [{
        //             model: db.Relationship,
        //             where: {
        //                 followerUserId: userId.id
        //             },
        //         }]
        //     }],
        // });
        let results = await db.Post.findAll({
            include: [{
                model: db.User, attributes: ["username", "id"]
            }]
        });
        if (results) {
            return ({
                EM: 'Get all post successful',
                EC: 0,
                DT: results
            })
        }
    } catch (e) {
        return ({
            EM: 'Something wrong in service',
            EC: 5,
            DT: ''
        })
    }
}

module.exports = { getAllPost }