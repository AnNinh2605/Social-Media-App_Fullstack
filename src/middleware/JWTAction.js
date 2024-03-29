import 'dotenv/config'
import jwt from 'jsonwebtoken';

//create token
const createJWT = (payload) => {
    let key = process.env.JWT_SECRET
    let token = null;
    try {
        token = jwt.sign(payload, key, {
            expiresIn: process.env.JWT_EXPIRESIN
        });
    } catch (e) {
        console.log("token error", e)
    }
    console.log(token);
    return token;
}

const verifyJWT = (token) => {
    let key = process.env.JWT_SECRET
    let data = null;

    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (e) {
        console.log("verify error", err);
    }
    return data;
}


module.exports = { createJWT, verifyJWT }