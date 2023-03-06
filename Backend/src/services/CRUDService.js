import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.users.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                fullname: data.fullname,
                code: data.code,
                node: data.node,
                phonenum: data.phonenum,
                image: data.image
            })

            resolve('Create a new users successfully')
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.users.findAll({
                raw: true,      //chỉ lấy những thông tin có trong bảng
            });
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

let getUserInforById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.users.findOne({
                where: {
                    id: userId
                },
                raw: true,
            })
            if (users) {
                resolve(users)
            }
            else {
                resolve([])
            }
        } catch (e) {
            reject(e);
        }
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.users.findOne({
                where: { id: data.id },
                raw: false,
            })
            if (users) {
                users.fullname = data.fullname;
                users.code = data.code;
                users.node = data.node;
                users.phonenum = data.phonenum;
                users.image = data.image;

                await users.save();
                resolve();
            } else {
                resolve();
            }
        } catch (e) {
            reject(e);
        }
    })

}

let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.users.findOne({
                where: { id: userId },
                raw: false
            })

            if (users) {
                await users.destroy();
            }

            resolve();
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInforById: getUserInforById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}