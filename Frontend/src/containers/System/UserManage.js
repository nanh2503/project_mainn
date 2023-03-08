import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';
import { getAllUsers, createNewUserService, deleteUserService, editUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import { emitter } from '../../utils/emitter';
import ModalEditUser from './ModalEditUser';
import { changeLanguageApp } from '../../store/actions';
import { toast } from 'react-toastify';

class UserManage extends Component {

    /**initialize the variables*/
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

    /**fire redux event: actions */
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    /**Show list of users  */
    getAllUserFromReact = async () => {
        let response = await getAllUsers('All');
        if (response && response.errCode === 0) {
            this.setState({
                arrUsers: response.users
            })
        }
    }

    /**set up show modal add new users*/
    handleAddNewUser = () => {
        this.setState({
            isOpenModalUser: true,
        })
    }

    /**set up toggle of form add new user */
    toggleUserModal = (data) => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }

    /**save user info*/
    createNewUser = async (data) => {
        try {
            let response = await createNewUserService(data)
            if (response && response.errCode !== 0) {
                alert(response.errMessage)
            } else {
                await this.getAllUserFromReact();
                toast.success('Create new user succeed!')
                this.setState({
                    isOpenModalUser: false
                })

                //clear data in modal after add new users
                emitter.emit('EVENT_CLEAR_MODAL_DATA')
            }
        } catch (e) {
            console.log(e)
        }
    }

    /**Delete user */
    handleDeleteUser = async (users) => {
        try {
            let res = await deleteUserService(users.id)
            if (res && res.errCode === 0) {
                await this.getAllUserFromReact();
                toast.success("Delete user succeed!")
            } else {
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }

    }

    /**set up modal edit users and get user info*/
    handleEditUser = (users) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: users
        })
    }

    /**set up toggle form edit user */
    toggleEditUserModal = (data) => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    /**Edit users function */
    editUser = async (users) => {
        try {
            let res = await editUserService(users)
            if (res && res.errCode === 0) {
                this.setState({
                    isOpenModalEditUser: false
                })
                await this.getAllUserFromReact();
                toast.success('Edit user succeed!')
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
                            ><i className="fas fa-plus"></i><FormattedMessage id="homeheader.button" /> </button>
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

/**state of redux */
const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};

/**events of redux */
const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
    };
};

/**connect between react and redux */
export default connect(mapStateToProps, mapDispatchToProps)(UserManage);