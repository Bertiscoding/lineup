import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import api from "../utils/api";

class Activity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: moment(),
            location: undefined,
            detailActivity: undefined,
            title: undefined,
            username: props.user && props.user.username ? props.user.username : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this._submitData = this._submitData.bind(this);
    }

    render() {
        return (
            <div>
                <h1>No swell? No sorrow!</h1>
                <form onSubmit={this._submitData}>
                    <input
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={evt => this.handleChange("title", evt.target.value)}
                        placeholder="title"
                    />

                    <textarea
                        type="text"
                        name="detailActivity"
                        placeholder="More information..."
                        value={this.state.detailActivity}
                        onChange={evt => this.handleChange("detailActivity", evt.target.value)}
                    />

                    <input
                        type="text"
                        name="location"
                        placeholder="What is the place or address?"
                        value={this.state.location}
                        onChange={evt => this.handleChange("location", evt.target.value)}
                    />

                    <DatePicker
                        selected={this.state.startDate}
                        // onSelect={this.handleSelect}
                        onChange={this.changeDate}
                        showTimeSelect
                        timeFormat="HH:mm"
                        injectTimes={[
                            moment()
                                .hours(0)
                                .minutes(1),
                            moment()
                                .hours(12)
                                .minutes(5),
                            moment()
                                .hours(23)
                                .minutes(59)
                        ]}
                        dateFormat="LLL"
                    />

                    <button onClick={this._submitData}>Let's do it!</button>
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
    changeDate(date) {
        this.setState({
            startDate: date
        });
    }

    // onClickOutside(evt) {
    //     // function
    // }

    _submitData(e) {
        e.preventDefault();
        const data = { ...this.state, date: this.state.startDate };
        console.log("data : ", data);

        api.post("/api/activity/create", data)
            .then(result => {
                // this.props.setUser();
                this.props.history.push("/");
            })
            .catch(error => console.log("something went wrong", error));
    }
}

export default Activity;
