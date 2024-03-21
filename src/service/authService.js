import db from '../models/index.js'
import bcrypt from 'bcryptjs';
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
                email: userData.email
            },
            raw: true
        })
        if (results) {
            let dataPassword = results.password;
            let checkMatchPassword = decryptPassword(userData.password, dataPassword)
            if (checkMatchPassword === true) {
                return ({
                    EM: 'Login successfully',
                    EC: '0',
                    DT: ''
                })
            }
            else {
                return ({
                    EM: 'Email/phone or password is wrong',
                    EC: 3
                })
            }
        }
        else {
            console.log("not found user with email/ phone: ", userData.value);
            return ({
                EM: 'Email or phone is not existing',
                EC: 3
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