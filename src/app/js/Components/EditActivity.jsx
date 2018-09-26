import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import api from "../utils/api";

class EditActivity extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activity: {},
            date: undefined,
            location: undefined,
            detailEvent: undefined,
            title: undefined,

            username: props.user && props.user.username ? props.user.username : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this._submitData = this._submitData.bind(this);
    }

    componentDidMount() {
        console.log("cdm", this.props);
        api.get(`/api/activity/${this.props.params.id}`).then(activity => {
            this.setState({
                date: moment(activity.date, "YYYY-MM-DDTHH:mm"),
                location: activity.location,
                title: activity.title,
                detailEvent: activity.detailEvent
            });
        });
    }

    render() {
        return (
            <div className="create__activity">
                <h1>Edit your activity:</h1>
                <form onSubmit={this._submitData}>
                    <input
                        type="text"
                        name="title"
                        value={this.state.title}
                        onChange={evt => this.handleChange("title", evt.target.value)}
                        // placeholder="title"
                    />

                    <textarea
                        type="text"
                        name="detailActivity"
                        // placeholder="Change details..."
                        value={this.state.detailActivity}
                        onChange={evt => this.handleChange("detailActivity", evt.target.value)}
                    />

                    <input
                        type="text"
                        name="location"
                        // placeholder="What is the place or address?"
                        value={this.state.location}
                        onChange={evt => this.handleChange("location", evt.target.value)}
                    />

                    <DatePicker
                        className="datepicker"
                        selected={this.state.date}
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

                    {/* onClick={this._submitData} */}
                    <button type="submit">Let's do it!</button>
                </form>
            </div>
        );
    }
    handleChange(key, newValue) {
        this.setState({
            [key]: newValue
        });
    }

    changeDate(date) {
        this.setState({
            date: date
        });
    }

    _submitData(e) {
        e.preventDefault();

        const data = { ...this.state, date: this.state.date };

        api.post(`/api/activity/${this.props.params.id}/update`, data)
            .then(result => {
                this.setState({
                    activity: {
                        date: this.state.date,
                        location: this.state.location,
                        title: this.state.title,
                        detailActivity: this.state.detailActivity
                    }
                });
                this.props.history.push("/dashboard");
            })
            .catch(error => console.log("something went wrong", error));
    }
}

export default withRouter(EditActivity);
