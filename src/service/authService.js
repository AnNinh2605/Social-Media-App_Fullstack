import db from '../models/index.js'
import bcrypt from 'bcryptjs';
import { createJWT } from '../middleware/JWTAction.js'
import 'dotenv/config'


const salt = bcrypt.genSaltSync(10);
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const findEmail = async (email) => {
    let result = await db.User.findOne({
        where: {
            email: email
        }
    })
    if (result) {
        return true;
    }
    return false;
}

const findPhone = async (phone) => {
    let result = await db.User.findOne({
        where: {
            phone: phone
        }
    })
    if (result) {
        return true;
    }
    return false
}

const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
}

const decryptPassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword);
}

const creatUseService = async (userData) => {
    try {
        let checkEmail = await findEmail(userData.email);

        if (checkEmail) {
            return ({
                EM: "Email is existing",
                EC: 2
            })
        }
        else {
            let hashPass = hashPassword(userData.password);
            await db.User.create({
                email: userData.email,
                username: userData.username,
                password: hashPass,
            });

            return ({
                EM: 'Create new user successfully',
                EC: 0
            })
        }
    } catch (e) {
        console.log("Error ", e)
        return ({
            EM: 'Something wrong in service',
            EC: 5
        })
    }
}

const loginService = async (userData) => {
    try {
        let results = await db.User.findOne({
            where: {
                username: userData.username
            },
            raw: true
        })
        if (results) {
            let dataPassword = results.password;
            let checkMatchPassword = decryptPassword(userData.password, dataPassword)
            if (checkMatchPassword === true) {
                let payload = {
                    email: results.email,
                    id: results.id,
                    expiresIn: process.env.JWT_EXPIRESIN,
                    data: ''
                }
                let token = createJWT(payload);
                return ({
                    EM: 'Login successfully',
                    EC: '0',
                    DT: {
                        data: results,
                        accessToken: token
                    }
                })
            }
            else {
                return ({
                    EM: 'Email/phone or password is wrong',
                    EC: 3,
                    DT: ''
                })
            }
        }
        else {
            return ({
                EM: 'User is not existing',
                EC: 3,
                DT: ''
            })
        }
    } catch (e) {
        console.log("Error ", e)
        return ({
            EM: 'Something wrong in service',
            EC: 5
        })
    }
}

module.exports = { creatUseService, loginService }