import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import api from "../utils/api";

import Icons from "../../assets/images/sprite.svg";

class EditEvent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            event: {},
            date: undefined,
            location: undefined,
            detailEvent: undefined,

            username: props.user && props.user.username ? props.user.username : ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.changeDate = this.changeDate.bind(this);
        this._submitData = this._submitData.bind(this);
    }

    componentDidMount() {
        console.log("cdm", this.props);
        api.get(`/api/event/${this.props.params.id}`).then(event => {
            this.setState({
                date: moment(event.date, "YYYY-MM-DDTHH:mm"),
                location: event.location,
                detailEvent: event.detailEvent
            });
        });
    }

    render() {
        return (
            <div className="edit">
                <h2>Edit your surf session:</h2>
                <div className="edit__form">
                    <form onSubmit={this._submitData}>
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

                        <input
                            type="text"
                            name="location"
                            // placeholder="Place/Break"
                            value={this.state.location}
                            onChange={evt => this.handleChange("location", evt.target.value)}
                        />
                        <textarea
                            type="text"
                            name="detailEvent"
                            value={this.state.detailEvent}
                            onChange={evt => this.handleChange("detailEvent", evt.target.value)}
                        />

                        <button type="submit" className="btn btn__full">
                            <svg className="icon__main">
                                <use xlinkHref={`${Icons}#cool`} />
                            </svg>
                            Update
                        </button>
                    </form>
                </div>
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

        api.post(`/api/event/${this.props.params.id}/update`, data)
            .then(result => {
                this.setState({
                    event: {
                        date: this.state.date,
                        location: this.state.location,
                        detailEvent: this.state.detailEvent
                    }
                });
                this.props.history.push("/dashboard");
            })
            .catch(error => console.log("something went wrong", error));
    }
}

export default withRouter(EditEvent);
