import React from "react";

class AddComponent extends React.Component {

    state = {
        title: '',
        salary: ''
    }

    //Cập nhật dữ liệu Title
    handleChangetitle = (event) => {
        this.setState({
            title: event.target.value
        })
    }

    //Cập nhật dữ liệu Salary
    handleChangeSalary = (event) => {
        this.setState({
            salary: event.target.value
        })
    }

    //Quản lí lệnh Submit
    handleSubmit = (event) => {
        event.preventDefault()      //Không load lại trang Web khi submit

        if (!this.state.title || !this.state.salary) {      //Check nhập đủ thông tin
            alert('Missing information')
            return;
        }
        this.props.addNewJob({          //Truyền dữ liệu đến file cha - Mycomponent
            id: Math.floor(Math.random() * 100),        //Random number 
            title: this.state.title,
            salary: this.state.salary
        })

        this.setState({         //Xóa dữ liệu sau submit
            title: '',
            salary: ''
        })
    }

    render() {
        return (
            <form>
                <label>Job's title:</label><br />
                <input type="text" value={this.state.title}
                    onChange={(event) => this.handleChangetitle(event)}
                /><br />
                <label>Salary:</label><br />
                <input type="text" value={this.state.salary}
                    onChange={(event) => this.handleChangeSalary(event)}
                />

                <br /><br />
                <input type="button" value="Submit"
                    onClick={(event) => this.handleSubmit(event)}
                />
            </form>

        )
    }
}

export default AddComponent;