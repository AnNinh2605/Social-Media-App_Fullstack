const loginController = (req, res) => {
    res.send('Login')
}

const logoutController = (req, res) => {
    res.send('logout')
}

const registerController = (req, res) => {
    res.send('register')
}
module.exports = { loginController, logoutController, registerController }