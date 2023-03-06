// import { suppressDeprecationWarnings } from 'moment/moment';
import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter';

class ModalUser extends Component {
    //khởi tạo giá trị
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fullname: '',
            code: '',
            node: '',
            phonenum: ''
        }

        this.listenToEmitter();
    }

    //clear data in modal after add new user
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset state
            this.setState({
                email: '',
                password: '',
                fullname: '',
                code: '',
                node: '',
                phonenum: ''
            })
        })
    }

    componentDidMount() {
    }

    //cài đặt toggle
    toggle = () => {
        this.props.toggleParent();
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
    handleAddNewUser = () => {
        let isValid = this.checkValidInput();
        if (isValid === true) {
            //gọi API create modal
            this.props.createNewUser(this.state);
        }
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-user-container'}
                size="lg"

            >
                <ModalHeader toggle={() => { this.toggle() }}>Create a New User</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => { this.hanleOnChangeInput(event, "email") }}
                                value={this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Password</label>
                            <input
                                type="password"
                                onChange={(event) => { this.hanleOnChangeInput(event, "password") }}
                                value={this.state.password}
                            />
                        </div>
                        <div className='input-container'>
                            <label>Full Name</label>
                            <input
                                type="text"
                                onChange={(event) => { this.hanleOnChangeInput(event, "fullname") }}
                                value={this.state.fullName}
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
                                value={this.state.phoneNum}
                            />
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color='primary' className='px-3' onClick={() => { this.handleAddNewUser() }}> Add New </Button>{' '}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);