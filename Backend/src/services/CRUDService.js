import bcrypt from 'bcryptjs';
import db from '../models/index';

/**format to hash password */
const salt = bcrypt.genSaltSync(10);

/**create a new user */
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            /**get data user from request */
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

/**hash password */
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

/**get all users */
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.users.findAll({
                raw: true,      //only get the info from table
            });
            resolve(users)
        } catch (e) {
            reject(e);
        }
    })
}

/**get user by id */
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

/**update user data after edit 
 * get user info by id
 * update user data
*/
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

/**delete user by id
 * get user by id
 * delete user
 */
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

/**export all functions */
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInforById: getUserInforById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById
}