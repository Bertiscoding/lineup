import React, { Component } from "react";
import api from "../utils/api";
import moment from "moment";

class EventList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: []
        };
    }

    componentDidMount() {
        api.get("/api/event/list").then(events => {
            console.log(events);
            this.setState({
                events: events
            });
        });
    }

    render() {
        const mappedEvents = this.state.events.map(el => {
            return (
                <div className="event" key={el._id}>
                    <p>When: {moment(el.date).format("DD.MM.YYYY HH:mm")}</p>
                    <p>Where: {el.location}</p>
                    <p>Details: {el.detailEvent}</p>
                    <p>Who's going:</p>
                    <button>Join us!</button>
                    <hr />
                </div>
            );
        });
        return <div className="event-list">{mappedEvents}</div>;
    }
}

export default EventList;
