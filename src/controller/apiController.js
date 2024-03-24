import { getAllPost } from '../service/apiService.js'

const getAllPostController = async (req, res) => {
    try {
        // get token from cookie
        let token = req.cookies['jwt'];
        let data = await getAllPost(token);
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

module.exports = { getAllPostController }