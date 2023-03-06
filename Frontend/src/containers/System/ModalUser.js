// import { suppressDeprecationWarnings } from 'moment/moment';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { Modal, Button, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { emitter } from '../../utils/emitter';
import './ModalUser.scss';
import { LANGUAGES, CommonUtils } from '../../utils';
import { changeLanguageApp } from '../../store/actions';
import { Buffer } from 'buffer';
import HomeHeader from '../HomePage/Section/HomeHeader';

class ModalUser extends Component {
    /**khởi tạo giá trị*/
    constructor(props) {
        super(props);
        this.state = {
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
        this.listenToEmitter();
    }

    changeLanguage = (language) => {
        /**fire redux event: actions */
        this.props.changeLanguageAppRedux(language)
    }

    //clear data in modal after add new users
    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            //reset state
            this.setState({
                email: '',
                password: '',
                fullname: '',
                code: '',
                node: '',
                phonenum: '',
                previewImgURL: '',
                image: '',

            })
        })
    }

    componentDidMount() {
    }

    //cài đặt toggle
    toggle = () => {
        this.props.toggleParent();
    }

    toggleImage() {
        this.setState({
            isOpenImage: !this.state.isOpenImage
        })
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
        console.log('before submit check state:', this.state)
        let isValid = this.checkValidInput();
        if (isValid === true) {
            //gọi API create modal
            this.props.createNewUser(this.state);
        }
    }

    handleOnchangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file)
            console.log('----------------------------')
            console.log('base64 image:', base64)
            let objectUrl = URL.createObjectURL(file)
            console.log('----------------------------')
            console.log('URL', objectUrl)
            console.log('----------------------------')
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
                <ModalHeader toggle={() => { this.toggle() }}>
                    <div>
                        <FormattedMessage id="homeheader.createNewUser" />
                    </div>
                </ModalHeader>
                <ModalBody>
                    <div className='modal-users-body'>
                        <div className='input-container'>
                            <label>Email</label>
                            <input
                                type="text"
                                onChange={(event) => { this.hanleOnChangeInput(event, "email") }}
                                value={this.state.email}
                            />
                        </div>
                        <div className='input-container'>
                            <label><FormattedMessage id="homeheader.password" /></label>
                            <input
                                type="password"
                                onChange={(event) => { this.hanleOnChangeInput(event, "password") }}
                                value={this.state.password}
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
                    <Button color='primary' className='px-3' onClick={() => { this.handleAddNewUser() }}> <FormattedMessage id="homeheader.add" /> </Button>{' '}
                    <Button color='secondary' className='px-3' onClick={() => { this.toggle() }}> <FormattedMessage id="homeheader.close" /> </Button>
                </ModalFooter>
            </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);