import React from 'react';
import './Demo.scss'
class ChildComponent extends React.Component {

    state = {
        showJobs: false
    }

    handleShowHide = () => {
        this.setState({
            showJobs: !this.state.showJobs
        })
    }

    handleOnclickDelete = (job) => {
        console.log('>> Delete: ', job)
        this.props.deleteAJob(job)
        alert('Delete completed')
    }
    render() {
        console.log('check props:', this.props);
        let { arrJobs } = this.props;
        let { showJobs } = this.state;
        let check = showJobs === true ? 'showJobs=true' : 'showJobs=false';
        console.log('>> check:', check)
        return (
            <>
                {showJobs === false ?
                    <div>
                        <button className="btn-show"
                            onClick={() => this.handleShowHide()}> Show </button>
                    </div>
                    :
                    <>
                        <div>
                            {
                                arrJobs.map((item, index) => {
                                    return (
                                        <div key={item.id}>
                                            {item.id} - {item.title} - {item.salary}   <button onClick={() => this.handleOnclickDelete(item)}>x</button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div>
                            <button onClick={() => this.handleShowHide()}>Hide</button>
                        </div>
                    </>
                }
            </>
        )
    }
}

export default ChildComponent;