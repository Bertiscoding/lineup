import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import api from "../utils/api";

class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: moment(),
            location: undefined,
            detailEvent: undefined,
            username: props.user && props.user.username ? props.user.username : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this._submitData = this._submitData.bind(this);
    }

    render() {
        return (
            <div>
                <h2>Create a surf session:</h2>
                <form onSubmit={this._submitData}>
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

                    <input
                        type="text"
                        name="location"
                        placeholder="Place/Break"
                        value={this.state.location}
                        onChange={evt => this.handleChange("location", evt.target.value)}
                    />
                    <textarea
                        type="text"
                        name="detailEvent"
                        placeholder="More information..."
                        value={this.state.detailEvent}
                        onChange={evt => this.handleChange("detailEvent", evt.target.value)}
                    />

                    <button onClick={this._submitData}>Let's go surfing</button>
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
        const data = { ...this.state, date: this.state.startDate };

        api.post("/api/event/create", data)
            .then(result => {
                this.props.history.push("/");
            })
            .catch(error => console.log("something went wrong", error));
    }
}

export default Event;
