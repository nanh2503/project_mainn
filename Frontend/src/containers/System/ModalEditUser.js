// import { suppressDeprecationWarnings } from 'moment/moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import './ModalEditUser.scss';
import { LANGUAGES, CommonUtils } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import _ from 'lodash';     //work with array more easily
import { Buffer } from 'buffer';

class ModalEditUser extends Component {
    /**initialize the variables*/
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            fullname: '',
            code: '',
            node: '',
            phonenum: '',
            isOpen: false,
            image: '',
            previewImgURL: '',
            isOpenImage: false,
        }
        this.toggleImage = this.toggleImage.bind(this)
    }

    changeLanguage = (language) => {
        /**fire redux event: actions */
        this.props.changeLanguageAppRedux(language)
    }

    /**set avatar */
    componentDidMount() {
        let users = this.props.currentUser;
        if (users && !_.isEmpty(users)) {
            let imageBase64 = '';
            if (users.image) {
                imageBase64 = new Buffer(users.image, 'base64').toString('binary');
            }
            this.setState({
                id: users.id,
                email: users.email,
                password: 'hashcode',
                fullname: users.fullname,
                code: users.code,
                node: users.node,
                phonenum: users.phonenum,
                image: '',
                previewImgURL: imageBase64
            })
        }
    }

    /**set up toggle of form*/
    toggle = () => {
        this.props.toggleEditUserModal();
    }

    /**set toggle of image */
    toggleImage() {
        this.setState({
            isOpenImage: !this.state.isOpenImage
        })
    }

    /**set state value for variables */
    hanleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }

    /**check validity of input */
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


    /**get values */
    handleSaveUser = () => {
        let isValid = this.checkValidInput();
        if (isValid === true) {
            //call API
            this.props.editUser(this.state);
        }
    }

    /**get image from input */
    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectUrl,
                image: base64
            })
        }

    }

    render() {
        let language = this.props.language;

        return (

            <Modal
                isOpen={this.props.isOpen}
                toggle={() => { this.toggle() }}
                className={'modal-users-container'}
                size="lg"
            >
                <ModalHeader toggle={() => { this.toggle() }}>Edit a User</ModalHeader>
                <ModalBody>
                    <div className='modal-users-body'>
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
                            <label><FormattedMessage id="homeheader.password" /></label>
                            <input
                                type="password"
                                onChange={(event) => { this.hanleOnChangeInput(event, "password") }}
                                value={this.state.password}
                                disabled        //không sửa được password
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id="homeheader.fullname" /></label>
                            <input
                                type="text"
                                onChange={(event) => { this.hanleOnChangeInput(event, "fullname") }}
                                value={this.state.fullname}
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id="homeheader.code" /></label>
                            <input
                                type="text"
                                onChange={(event) => { this.hanleOnChangeInput(event, "code") }}
                                value={this.state.code}
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id="homeheader.node" /></label>
                            <input
                                type="text"
                                onChange={(event) => { this.hanleOnChangeInput(event, "node") }}
                                value={this.state.node}
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id="homeheader.phone" /></label>
                            <input
                                type="text"
                                onChange={(event) => { this.hanleOnChangeInput(event, "phonenum") }}
                                value={this.state.phonenum}
                            />
                        </div>
                        <div className='col-6'>
                            <label><FormattedMessage id="homeheader.image" /></label>
                            <div className='preview-img-container'>
                                <input id="previewImg"
                                    type="file" hidden
                                    onChange={(event) => this.handleOnchangeImage(event)}
                                />
                                <label className='upload' htmlFor='previewImg'> <FormattedMessage id="homeheader.upload" /><i class="fas fa-upload"></i></label>
                                <div className='preview-image'
                                    style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                    onClick={this.toggleImage}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <Modal
                        isOpen={this.state.isOpenImage}
                        toggle={this.toggleImage}
                    >
                        <ModalBody>
                            <img className='expand-image' src={this.state.previewImgURL} />
                        </ModalBody>
                    </Modal>

                </ModalBody>

                <ModalFooter>

                    <Button color='primary' className='px-3' onClick={() => { this.handleSaveUser() }}><FormattedMessage id="homeheader.save" /> </Button>{' '}
                    <Button color='secondary' className='px-3' onClick={() => { this.toggle() }}> <FormattedMessage id="homeheader.close" /> </Button>
                </ModalFooter>


            </Modal>
        )
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
export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);