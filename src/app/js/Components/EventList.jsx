import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import api from "../utils/api";
import moment from "moment";
import CommentEvent from "./CommentEvent";
import Icons from "../../assets/images/sprite.svg";

class EventList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: props.user && props.user.username ? props.user.username : "",
            events: [],
            loading: true,
            attendees: []
        };

        this.handleDelete = this.handleDelete.bind(this);
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
                <div className="list__event-card" key={el._id}>
                    <div>
                        <div className="list__event-card-join">
                            <p className="list__event-card-date">
                                {moment(el.date).format("DD.MM.YYYY, HH:mm")}
                            </p>
                            <button className="btn__full" onClick={() => this.handleJoinClick(el._id)}>
                                <svg className="icon__edit">
                                    <use xlinkHref={`${Icons}#cool`} />
                                </svg>
                                {isAttending ? "Cancel" : "Join"}
                            </button>
                        </div>

                        <p>
                            Where: <span>{el.location}</span>{" "}
                        </p>
                        <p>
                            Note: <span>{el.detailEvent}</span>
                        </p>
                        <div>
                            <p>
                                Who's going:
                                <span className="list__event-card-attendee">
                                    {el.attendees.map(el => {
                                        return (
                                            <Link key={el._id} to={`/user/${el._id}`}>
                                                {el.username}
                                            </Link>
                                        );
                                    })}
                                </span>
                            </p>
                        </div>
                        <div className="list__event-card-creator">
                            <p>
                                Initiated by
                                <span>
                                    <Link to={`/user/${el.creator._id}`}>{el.creator.username}</Link>
                                </span>
                            </p>

                            {/* EDIT and DELETE */}
                            <span>
                                {el.creator._id === this.props.user._id && (
                                    <React.Fragment>
                                        <Link to={`/event/${el._id}/update`} className="icon">
                                            <svg className="icon__edit">
                                                <use xlinkHref={`${Icons}#edit`} />
                                            </svg>
                                        </Link>

                                        <div onClick={() => this.handleDelete(el._id)} className="icon">
                                            <svg className="icon__edit">
                                                <use xlinkHref={`${Icons}#delete-button`} />
                                            </svg>
                                        </div>
                                    </React.Fragment>
                                )}
                            </span>
                        </div>

                        <CommentEvent eventId={el._id} comment={el.comment} />
                    </div>
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

    handleDelete(id) {
        api.post(`api/event/${id}/delete`).then(data => {
            this.setState({
                events: this.state.events.filter(el => el._id !== id)
            });
        });
    }
}

export default withRouter(EventList);
