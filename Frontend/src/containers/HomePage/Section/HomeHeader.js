import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import avatar from '../../../assets/images/na.jpg';
import { getAllUsers } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from "../../../utils";
import { changeLanguageApp } from "../../../store/actions";
import * as actions from "../../../store/actions";
import { adminMenu } from '../../Header/menuApp';
import UserManage from '../../System/UserManage';
import { handleAddNewUser } from '../../System/UserManage'

class HomeHeader extends Component {
    changeLanguage = (language) => {
        /**fire redux event: actions */
        this.props.changeLanguageAppRedux(language)
    }

    render() {
        const { processLogout } = this.props;
        let language = this.props.language;
        return (
            <>
                <div className='home-container'>
                    <div className='home-header-container'>
                        <div className='left-header'>
                            <p><FormattedMessage id="homeheader.usermanagement" /></p>
                        </div>
                        <div className='center-header'>
                            <i class="fas fa-bars"></i>

                            <div className='logo-right'>
                                <i className="fas fa-suitcase"></i>
                                <i class="fas fa-tags"></i>
                                <i class="fas fa-envelope-open"></i>
                                <i class="fas fa-bell"></i>
                                <i class="fas fa-flag"></i>
                                <i class="fas fa-users"></i>
                                <i class="fas fa-user-md"></i>
                                <i class="fas fa-map"></i>
                            </div>
                        </div>
                        <div className='right-header'>
                            <img src={avatar} className='avatar' />
                            <p className='name'>Ngoc Anh</p>
                            <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'} onClick={() => { this.changeLanguage(LANGUAGES.VI) }}><span>VN</span></div>
                            <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'} onClick={() => { this.changeLanguage(LANGUAGES.EN) }}><span>EN</span></div>
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
                            <div className='welcome'> WELCOME TO MY WEBSITE</div>

                            <UserManage />
                        </div>
                    </div>
                </div>
            </>


        );
    }

}

/**state of Redux */
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,       //state of redux
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