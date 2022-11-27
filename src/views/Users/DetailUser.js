import React from "react";
import './ListUser.scss'
import { withRouter } from "react-router-dom";
import axios from 'axios';

class DetailUser extends React.Component {
    state = {
        user: []
    }
    async componentDidMount() {
        if (this.props.match && this.props.match.params) {
            let id = this.props.match.params.id;
            let res = await axios.get(`https://reqres.in/api/users/${id}`);
            this.setState({
                user: res && res.data && res.data.data ? res.data.data : []
            })
        }
    }

    handleBackButton = () => {      //Quay trở lại trang user
        this.props.history.push('/user')        //Chuyển hướng URL
    }
    render() {
        let { user } = this.state;
        let isEmptyObj = Object.keys(user).length === 0;

        return (
            <>
                <div> Hello Quy from DetailUser with id: {this.props.match.params.id}</div>
                {isEmptyObj === false &&
                    <>
                        <div className="list-user-container">
                            <div> User's name: {user.first_name} - {user.last_name}</div>
                            <div> User's email: {user.email}</div>
                            <div>
                                <img src={user.avatar} />
                            </div>
                            <div >
                                <button type="button" onClick={() => this.handleBackButton()}> Back </button>
                            </div>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default withRouter(DetailUser);