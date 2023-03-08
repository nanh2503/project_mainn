import { response } from 'express';
import db from '../models/index'
import CRUDService from '../services/CRUDService';

/**get Home page */
let getHomePage = async (req, res) => {
    try {
        let data = await db.users.findAll();
        console.log('------------------------')
        console.log(data)
        return res.render('homePage.ejs', {
            data: JSON.stringify(data)      //convert json data to string
        });
    } catch (e) {
        console.log(e)
    }

}

/**get user in CRUD */
let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

/**create new user in CRUD*/
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.redirect('/get-crud');
}

/**display CRUD */
let displayCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render('displayCRUD.ejs', {
        data: data
    })
}

/**edit user in CRUD */
let editCRUD = async (req, res) => {
    let userId = req.query.id;
    if (userId) {
        let userData = await CRUDService.getUserInforById(userId);
        console.log('----------------------')
        console.log(userData)
        console.log('----------------------')
        return res.render('editCRUD.ejs', {
            userData: userData
        })
    } else {
        return res.send("users not found!")
    }

}

/**upadte user in CRUD */
let putCRUD = async (req, res) => {
    let data = req.body;
    await CRUDService.updateUserData(data);
    return res.redirect("/get-crud");
}

/**delete user in CRUD */
let deleteCRUD = async (req, res) => {
    let id = req.query.id;
    if (id) {
        await CRUDService.deleteUserById(id);
        return res.redirect("/get-crud")
    } else {
        return res.send("users not found!")
    }
}

/**export object:{key, value}*/
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayCRUD: displayCRUD,
    editCRUD: editCRUD,
    deleteCRUD: deleteCRUD,
    putCRUD: putCRUD
}