import React, { Component } from "react";
import { withRouter } from "react-router";
import api from "../utils/api";
import moment from "moment";

class EventList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            loading: true,
            attendees: [],
            username: props.user && props.user.username ? props.user.username : ""
        };
    }

    componentDidMount() {
        api.get("/api/event/list").then(events => {
            this.setState({
                events: events,
                loading: false,
                attendees: events.attendees
            });
        });
    }

    render() {
        if (this.state.loading) {
            return <div>loading.....</div>;
        }

        const mappedEvents = this.state.events.map((el, index) => {
            const isAttending = this.props.user && el.attendees.includes(this.props.user._id);

            return (
                <div className="event__card" key={el._id}>
                    <p>When: {moment(el.date).format("DD.MM.YYYY HH:m m")}</p>
                    <p>Where: {el.location}</p>
                    <p>Details: {el.detailEvent}</p>
                    <p>Who's going:</p>
                    <p>Initiated by {this.state.username} </p>
                    <button onClick={() => this.handleJoinClick(el._id)}>
                        {isAttending ? "Cancel" : "Join"}
                    </button>
                </div>
            );
        });
        return <div className="event-list">{mappedEvents}</div>;
    }

    handleJoinClick(eventId) {
        api.post(`/api/event/${eventId}/attend`).then(data => {
            this.setState({
                events: this.state.events.map(el => {
                    if (el._id === data._id) return data;
                    else return el;
                })
            });
        });
    }
}

export default withRouter(EventList);
