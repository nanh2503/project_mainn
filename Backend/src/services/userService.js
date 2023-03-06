import db from "../models/index";
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

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

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};

            let isExist = await checkUserEmail(email);
            if (isExist) {

                //user already exist
                let user = await db.User.findOne({

                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],
                    raw: true
                });
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'Login success';
                        delete user.password;   //Ẩn password 
                        userData.user = user;
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'Password is not true';
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = "User is not found";

                }

            } else {
                //return error
                userData.errCode = 1;
                userData.errMessage = "Your Email isn't exist in the system. Please try again!";

            }
            resolve(userData)
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (email) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: email }
            })
            if (user) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = '';
            if (userId === 'All') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            if (userId && userId !== 'All') {
                users = await db.User.findOne({
                    where: { id: userId },
                    attributes: {
                        exclude: ['password']
                    }
                })
            }
            resolve(users)

        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist?
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'This email is already used. Please try another email!'
                })

            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    fullname: data.fullname,
                    code: data.code,
                    node: data.node,
                    roleid: data.roleid,
                    phonenum: data.phonenum
                })

                resolve({
                    errCode: 0,
                    message: 'Successfully'
                })
            }
        } catch (e) {
            reject(e);
        }
    })
}

let deleteUser = (idInput) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { id: idInput }
        })

        if (!user) {
            resolve({
                errCode: 2,
                errMessage: 'The user is not exist'
            })
        }

        await db.User.destroy({
            where: { id: idInput }
        })
        resolve({
            errCode: 0,
            message: 'The user is deleted'
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.id) {
                resolve({
                    errCode: 2,
                    errMessage: "Missing requied parameters"
                })
            }
            let user = await db.User.findOne({
                where: { id: data.id },
                raw: false
            })
            if (user) {
                user.email = data.email;
                user.fullname = data.fullname;
                user.phonenum = data.phonenum;
                user.code = data.code;
                user.node = data.node;

                await user.save();

                resolve({
                    errCode: 0,
                    message: 'Update the user successful!'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User is not found!'
                });
            }
        } catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData,
}