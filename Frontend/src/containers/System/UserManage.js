import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
import HomeHeader from '../HomePage/Section/HomeHeader';
import { LANGUAGES } from '../../utils';
import { changeLanguageApp } from '../../store/actions';

class UserManage extends Component {

    /**khởi tạo các state muốn dùng trong class*/
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,     //check open Modal or not
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUserFromReact();
    }

    changeLanguage = (language) => {
        /**fire redux event: actions */
        this.props.changeLanguageAppRedux(language)
    }

    /**Hiển thị danh sách all users  */
    getAllUserFromReact = async () => {
        let response = await getAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    /**Kiểm soát hiển thị modal add new users*/
    handleAddNewUser = () => {
        console.log("Add new")
        this.setState({
            isOpenModalUser: true,
        })
        console.log("add")
    }

    /**Ẩn modal add new users */
    toggleUserModal = (data) => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    /**lưu thông tin người dùng mới*/
    createNewUser = async (data) => {
        console.log("go")
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                this.setState({
                    isOpenModalUser: false
                })

                /**clear data in modal after add new users*/
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }

    /**Xóa người dùng */
    handleDeleteUser = async (users) => {
        try {
            let res = await deleteUserService(users.id)
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }

    }

    /**cài đặt modal edit users và lấy thông tin users  */
    handleEditUser = (users) => {
        console.log('check edit users', users.id)
        this.setState({
            isOpenModalEditUser: true,
            userEdit: users
        })
    }

    /**Ẩn modal edit users  */
    toggleEditUserModal = (data) => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    /**Edit users function */
    editUser = async (users) => {
        console.log('hello')
        try {
            let res = await editUserService(users)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUserFromReact();
            } else {
                alert(res.errCode)
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let arrUsers = this.state.arrUsers;
        let language = this.props.language;

        return (
            <>
                <div className="users-container">

                    <ModalUser
                        isOpen={this.state.isOpenModalUser}
                        toggleParent={this.toggleUserModal}
                        createNewUser={this.createNewUser}
                    />

                    {
                        this.state.isOpenModalEditUser &&
                        <ModalEditUser
                            isOpen={this.state.isOpenModalEditUser}
                            toggleEditUserModal={this.toggleEditUserModal}
                            currentUser={this.state.userEdit}
                            editUser={this.editUser}
                        />
                    }

                    <div className='add'>
                        <div className='mx-3'>
                            <button className='btn btn-success px-3'
                                onClick={() => this.handleAddNewUser()}
                            ><i class="fas fa-plus"></i><FormattedMessage id="homeheader.button" /> </button>
                        </div>


                    </div>

                    <div className='users-table mt-3 mx-3'>
                        <table id="customers">
                            <tr>
                                <th>Email</th>
                                <th><FormattedMessage id="homeheader.fullname" /></th>
                                <th><FormattedMessage id="homeheader.phone" /></th>
                                <th><FormattedMessage id="homeheader.code" /></th>
                                <th><FormattedMessage id="homeheader.node" /></th>
                                <th><FormattedMessage id="homeheader.action" /></th>

                            </tr>

                            {
                                arrUsers && arrUsers.map((item, index) => {
                                    return (
                                        <tr>
                                            <td>{item.email}</td>
                                            <td>{item.fullname}</td>
                                            <td>{item.phonenum}</td>
                                            <td>{item.code}</td>
                                            <td>{item.node}</td>
                                            <td>
                                                <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                                <button className='btn-delete' onClick={() => this.handleDeleteUser(item)}><i className="fas fa-trash-alt"></i></button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }



                        </table>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,       //state of redux
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);