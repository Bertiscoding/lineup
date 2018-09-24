import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import api from "../utils/api";
import moment from "moment";
import Icons from "../../assets/images/sprite.svg";

class EventList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            loading: true,
            attendees: {},
            username: props.user && props.user.username ? props.user.username : ""
        };
    }

    componentDidMount() {
        api.get("/api/event/list").then(events => {
            this.setState({
                events: events,
                loading: false,
                attendees: events
            });
        });
    }

    render() {
        if (this.state.loading) {
            return <div>loading.....</div>;
        }

        const mappedEvents = this.state.events.map((el, index) => {
            const isAttending =
                this.props.user && el.attendees.find(attendee => this.props.user._id === attendee._id);
            // if(el.isEditing) return <Edit event={el}></Edit>
            return (
                <div className="event__card" key={el._id}>
                    <p>When: {moment(el.date).format("DD.MM.YYYY HH:m m")}</p>
                    <p>Where: {el.location}</p>
                    <p>Details: {el.detailEvent}</p>
                    <div>
                        Who's going:
                        <ul>
                            {el.attendees.map(el => {
                                return <li key={el._id}>{el.username}</li>;
                            })}
                        </ul>
                    </div>
                    <p>Initiated by {el.creator.username} </p>
                    <div>
                        {/* add edit and delete */}
                        {el.creator._id === this.props.user._id && (
                            <React.Fragment>
                                <Link to="/" className="icon">
                                    <svg className="icon__edit">
                                        <use xlinkHref={`${Icons}#edit`} />
                                    </svg>
                                </Link>
                                <Link to="/" className="icon">
                                    <svg className="icon__edit">
                                        <use xlinkHref={`${Icons}#delete-button`} />
                                    </svg>
                                </Link>
                            </React.Fragment>
                        )}
                    </div>
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
