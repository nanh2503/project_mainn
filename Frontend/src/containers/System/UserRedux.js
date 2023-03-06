import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { render } from 'node-sass';
import * as actions from "../../store/actions"

class UserRedux extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
}

componentDidMount(){

}

render(){
    return (
        <div className='users-redux-container'>hello</div>
    )
}

/**state of Redux */
const mapStateToProps = state => {
    return {
        isLoggedIn: state.users.isLoggedIn,
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
export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);