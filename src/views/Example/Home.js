import React from "react";
import { withRouter } from "react-router";
import Color from "../HOC/Color";
import cute from '../../assets/images/cute.png'

class Home extends React.Component {

    //HOC: higher order component
    // componentDidMount() {       //delay code
    //     setTimeout(() => {
    //         this.props.history.push('/todo')

    //     }, 3000)    //run after 3s
    // }
    render() {
        console.log('>> check props:', this.props)
        return (
            <>
                <div> How's it going </div>
                <div>
                    <img width='200px' src={cute} />
                </div>
            </>
        )
    }
}

// export default withRouter(Home);
export default Color(Home);