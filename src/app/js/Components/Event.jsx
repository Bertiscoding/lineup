import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { Link } from "react-router-dom";
import api from "../utils/api";

class Event extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: moment(),
            location: undefined,
            details: undefined,
            username: props.user && props.user.username ? props.user.username : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this._submitData = this._submitData.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Create a surf session:</h2>
                <form onSubmit={this._submitData}>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={evt => this.handleChange("date", evt.target.value)}
                        showTimeSelect
                        dateFormat="LLL"
                    />
                    <input
                        type="text"
                        name="location"
                        placeholder="Place/Break"
                        value={this.state.location}
                        onChange={evt => this.handleChange("location", evt.target.value)}
                    />
                    <textarea
                        type="text"
                        name="details"
                        placeholder="More information..."
                        value={this.state.detail}
                        onChange={evt => this.handleChange("details", evt.target.value)}
                    />
                    <Link to="/profile">
                        <button onClick={this._submitData}>Let's go surfing</button>
                    </Link>
                </form>
            </div>
        );
    }

    handleChange(key, newValue) {
        this.setState({
            [key]: newValue
        });
    }

    // setState only for date
    // handleChange(date) {
    //     this.setState({
    //       startDate: date
    //     });
    //   }

    _submitData(e) {
        e.preventDefault();
        const data = { ...this.state };

        api.post("/api/event/create", data)
            .then(res => {
                console.log("EVENT res", result);
                this.props.setUser();
            })
            .catch(error => console.log("something went wrong", error));
    }
}

export default Event;
