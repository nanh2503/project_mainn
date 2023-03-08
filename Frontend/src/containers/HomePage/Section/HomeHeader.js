import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import { getAllUsers } from '../../../services/userService';
import * as actions from "../../../store/actions";
import UserManage from '../../System/UserManage';
import { Buffer } from 'buffer';
import _ from 'lodash';     //work with array more easily

class HomeHeader extends Component {
    /**initialize the variables */
    constructor(props) {
        super(props);
        this.state = {
            arrUsers: [],
            image: '',
            previewImgURL: '',
            isOpenImage: false,
            user: [],
        }
        /**hind image */
        this.toggleImage = this.toggleImage.bind(this)
    }

    /**fire redux event: actions 
     * change language
    */
    changeLanguage = (language) => {
        this.props.changeLanguageAppRedux(language)
    }

    /**set avatar */
    setAvatar = () => {
        let user = this.state.user;
        if (user && !_.isEmpty(user)) {
            let imageBase64 = '';
            if (user.image) {
                imageBase64 = new Buffer(user.image, 'base64').toString('binary');
            }
            this.setState({
                image: '',
                previewImgURL: imageBase64
            })
        }
    }

    /**get user by id */
    getUserFromReact = async (id) => {
        let response = await getAllUsers(id);
        if (response && response.errCode === 0) {
            this.setState({
                user: response.users
            })
        }
        this.setAvatar();
    }

    /**get id from userInfo */
    async componentDidMount() {
        let userInfo = this.props.userInfo;
        let id = userInfo.id;
        this.getUserFromReact(id);
    }

    /**set toggle of image */
    toggleImage() {
        this.setState({
            isOpenImage: !this.state.isOpenImage
        })
    }

    render() {
        const { processLogout, language, userInfo } = this.props;

        return (
            <>
                <div className='home-header-container'>
                    <div className='left-header'>
                        <p><FormattedMessage id="homeheader.usermanagement" /></p>
                    </div>
                    <div className='center-header'>
                        <i className="fas fa-bars"></i>

                        <div className='logo-right'>
                            <i className="fas fa-suitcase"></i>
                            <i className="fas fa-tags"></i>
                            <i className="fas fa-envelope-open"></i>
                            <i className="fas fa-bell"></i>
                            <i className="fas fa-flag"></i>
                            <i className="fas fa-users"></i>
                            <i className="fas fa-user-md"></i>
                            <i className="fas fa-map"></i>
                        </div>
                    </div>
                    <div className='right-header'>
                        <div className='avatar'
                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                            onClick={this.toggleImage}
                        ></div>

                        <div className='name'>
                            {userInfo && userInfo.fullname ? userInfo.fullname : ''}
                        </div>

                        <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}
                            onClick={() => { this.changeLanguage(LANGUAGES.VI) }}><span>VN</span></div>
                        <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}
                            onClick={() => { this.changeLanguage(LANGUAGES.EN) }}><span>EN</span></div>
                        {/* nút logout */}
                        <div className="btn btn-logout" onClick={processLogout}>
                            <i className="fas fa-sign-out-alt"></i>
                        </div>
                    </div>

                </div>

                <div className='home-content-container'>
                    <div className='home-content-left'>
                        <div className='blur'>
                            <div className='search'>
                                <i className="fas fa-search "></i>
                                <input type='text' placeholder='search...' />
                            </div>
                        </div>

                    </div>
                    <div className='home-content-right'>
                        <div className='welcome'>
                            <p><FormattedMessage id="homeheader.welcome" /></p>
                        </div>

                        <UserManage />
                    </div>
                </div>

            </>


        );
    }

}

/**state of Redux */
const mapStateToProps = state => {
    return {
        isLoggedIn: state.users.isLoggedIn,
        language: state.app.language,       //state of redux
        userInfo: state.users.userInfo,
    };
};

/**event of Redux */
const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

/**connect between Redux and React */
export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);