import db from '../models/index.js'
import { verifyJWT } from '../middleware/JWTAction.js'

const getAllPost = async () => {
    try {
        // let userId = verifyJWT(token);
        // console.log("check userId", userId)
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

const createPost = async (data, token) => {
    try {
        console.log("check userID", token);
        let userId = verifyJWT(token);
        let results = await db.Post.create({
            desc: data.desc,
            img: data.img,
            userId: userId.id
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

export { getAllPost, createPost }