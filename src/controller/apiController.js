import { getAllPost, createPost } from '../service/apiService.js'

const getAllPostController = async (req, res) => {
    try {
        // get token from cookie
        let token = req.cookies['jwt'];
        if (token) {
            let data = await getAllPost();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
    } catch (error) {
        return res.status(500).json({
            EC: 5,
            EM: "Something wrong in server",
            DT: ''
        })
    }
}
const createPostController = async (req, res) => {
    try {
        // get token from cookie
        let token = req.cookies['jwt'];
        console.log("check token", req);
        let data = await createPost(req.body, token);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(500).json({
            EC: 5,
            EM: "Something wrong in server",
            DT: ''
        })
    }
}

module.exports = { getAllPostController, createPostController }