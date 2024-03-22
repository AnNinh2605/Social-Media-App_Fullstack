import authService from '../service/authService.js'

const loginController = async (req, res) => {
    try {
        let data = await authService.loginService(req.body);
        if (data) {
            //set jwt token for cookie 
            res.cookie('jwt', data.DT.accessToken, { expires: new Date(Date.now() + 900000), httpOnly: true })
            
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
    } catch (e) {
        return res.status(500).json({
            EM: 'Something wrong in server',
            EC: 5,
            DT: ''
        })
    }
}
const logoutController = (req, res) => {
    res.send('logout')
}

const registerController = async (req, res) => {
    try {
        let { email, username, password } = req.body;
        if (!email || !username || !password) {
            return res.status(200).json({
                EM: 'Missing required parameter',
                EC: '1',
                DT: ''
            })
        }
        if (password && password.length < 8) {
            return res.status(200).json({
                EM: 'Password must have at least 8 letters',
                EC: '1',
                DT: ''
            })
        }
        else {
            let data = await authService.creatUseService(req.body);
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: ''
            })
        }
    } catch (e) {
        return res.status(500).json({
            EM: 'Something wrong in server',
            EC: 5,
            DT: ''
        })
    }
}

module.exports = { loginController, logoutController, registerController }