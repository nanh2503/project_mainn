// import { suppressDeprecationWarnings } from 'moment/moment';
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import _ from 'lodash';     //làm việc với mảng dễ dàng hơn

class ModalEditUser extends Component {
    /**khởi tạo giá trị*/
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            fullname: '',
            code: '',
            node: '',
            phonenum: ''
        }
    }

    componentDidMount() {
        let user = this.props.currentUser;
        if (user && !_.isEmpty(user)) {
            this.setState({
                id: user.id,
                email: user.email,
                password: 'hashcode',
                fullname: user.fullname,
                code: user.code,
                node: user.node,
                phonenum: user.phonenum,

            })
        }
        console.log('didmount edit model', this.props.currentUser)
    }

    //cài đặt toggle
    toggle = () => {
        this.props.toggleEditUserModal();
    }

    //set state giá trị cho các biến
    hanleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    //check giá trị nhập vào
    checkValidInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'fullname', 'code', 'node', 'phonenum'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter:' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    //lấy giá trị được lưu
    handleSaveUser = () => {
        let isValid = this.checkValidInput();
        if (isValid === true) {
            //gọi API edit user  modal
            this.props.editUser(this.state);
        }
    }

    render() {
        console.log('check props:', this.props)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit a User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => { this.hanleOnChangeInput(event, "email") }}
                                value={this.state.email}
                                disabled        //không sửa được email
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => { this.hanleOnChangeInput(event, "password") }}
                                value={this.state.password}
                                disabled        //không sửa được password
                            />
                        </div>
                        <div className='input-container'>
                            <label>Full Name</label>
                            <input
                                type="text"
                                onChange={(event) => { this.hanleOnChangeInput(event, "fullname") }}
                                value={this.state.fullname}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Code</label>
                            <input
                                type="text"
                                onChange={(event) => { this.hanleOnChangeInput(event, "code") }}
                                value={this.state.code}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Node</label>
                            <input
                                type="text"
                                onChange={(event) => { this.hanleOnChangeInput(event, "node") }}
                                value={this.state.node}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Phone Number</label>
                            <input
                                type="text"
                                onChange={(event) => { this.hanleOnChangeInput(event, "phonenum") }}
                                value={this.state.phonenum}
                            />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color='primary' className='px-3' onClick={() => { this.handleSaveUser() }}> Save Changes </Button>{' '}
                    <Button color='secondary' className='px-3' onClick={() => { this.toggle() }}> Close </Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);