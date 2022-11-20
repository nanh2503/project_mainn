import React from 'react';
import ChildComponent from './ChildComponent';
import AddComponent from './AddComponent';

class Mycomponent extends React.Component {

    state = {
        arrJobs: [
            { id: '20205143', title: 'Programmer', salary: '5000' },
            { id: '20215238', title: 'Programmer design', salary: '7000' }
        ]
    }

    addNewJob = (job) => {
        let currentJobs = this.state.arrJobs; //Cập nhật dữ liệu từ State
        currentJobs.push(job)   //Đẩy dữ liệu job vào
        this.setState({
            // arrJobs: [...this.state.arrJobs, job]    //Toán tử copy
            arrJobs: currentJobs        //Cập nhật lại dữ liệu
        })
        console.log('check job from parent', job)

    }

    deleteAJob = (job) => {
        let currentJobs = this.state.arrJobs;
        currentJobs = currentJobs.filter(item => item.id !== job.id)  //Lọc tất cả các id khác với id cần xóa
        this.setState({
            arrJobs: currentJobs
        })
    }
    render() {
        console.log(this.state);
        return (
            <>
                <AddComponent
                    addNewJob={this.addNewJob}
                />

                <ChildComponent

                    arrJobs={this.state.arrJobs}
                    deleteAJob={this.deleteAJob}
                />
            </>
        )
    }
}

export default Mycomponent;