import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import api from "../utils/api";
import moment from "moment";
import CommentActivity from "./CommentActivity";
import Icons from "../../assets/images/sprite.svg";

class ActivityList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: props.user && props.user.username ? props.user.username : "",
            activities: [],
            loading: true,
            attendees: []
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        // send from backend:
        api.get("api/activity/list").then(activities => {
            this.setState({
                activities: activities,
                loading: false,
                attendees: activities
            });
        });
    }
    render() {
        if (this.state.loading) {
            return <div>loading...</div>;
        }

        const mappedActivities = this.state.activities.map((el, index) => {
            const isAttending =
                this.props.user && el.attendees.find(attendee => this.props.user._id === attendee._id);
            return (
                <div className="event__card" key={el._id}>
                    <p>{el.title}</p>
                    <p>Details: {el.detailActivity}</p>
                    <p>When: {moment(el.date).format("DD.MM.YYYY HH:mm")}</p>
                    <p>Where: {el.location}</p>
                    <div>
                        <span>
                            Who's going:
                            <ul>
                                {el.attendees.map(el => {
                                    return (
                                        <Link key={el._id} to={`/user/${el._id}`}>
                                            <li>{el.username} </li>
                                        </Link>
                                    );
                                })}
                            </ul>
                        </span>
                    </div>
                    <p>
                        Initiated by
                        <Link to={`/user/${el.creator._id}`}>
                            <span>{el.creator.username} </span>
                        </Link>
                    </p>

                    <div>
                        {/* EDIT and DELETE */}
                        {el.creator._id === this.props.user._id && (
                            <React.Fragment>
                                <Link to={`/activity/${el._id}/update`} className="icon">
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
                    </div>

                    <button onClick={() => this.handleJoinClick(el._id)}>
                        {isAttending ? "Cancel" : "Join"}
                    </button>

                    <CommentActivity activityId={el._id} comment={el.comment} />
                </div>
            );
        });
        return <div className="event-list">{mappedActivities}</div>;
    }

    handleJoinClick(activityId) {
        api.post(`/api/activity/${activityId}/attend`).then(data => {
            this.setState({
                activities: this.state.activities.map(el => {
                    if (el._id === data._id) return data;
                    else return el;
                })
            });
        });
    }

    handleDelete(id) {
        api.post(`api/activity/${id}/delete`).then(data => {
            this.setState({
                activities: this.state.activities.filter(el => el._id !== id)
            });
        });
    }
}

export default withRouter(ActivityList);
