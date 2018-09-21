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
            attendees: []
        };
    }

    componentDidMount() {
        api.get("/api/event/list").then(events => {
            this.setState({
                events: events,
                loading: false,
                attendees: events.attendees
                // set attending state here?
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
                <div className="event" key={el._id}>
                    <p>When: {moment(el.date).format("DD.MM.YYYY HH:mm")}</p>
                    <p>Where: {el.location}</p>
                    <p>Details: {el.detailEvent}</p>
                    <p>Who's going:</p>

                    <button onClick={() => this.handleJoinClick(el._id)}>
                        {isAttending ? "Cancel" : "Join"}
                    </button>

                    <hr />
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
