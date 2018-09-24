import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import api from "../utils/api";
import moment from "moment";
import Icons from "../../assets/images/sprite.svg";

class ActivityList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activities: [],
            loading: true,
            attendees: [],
            username: props.user && props.user.username ? props.user.username : ""
        };
    }

    componentDidMount() {
        // this is what was send from backend
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
                <div key={el._id}>
                    <p>{el.title}</p>
                    <p>Details: {el.detailActivity}</p>
                    <p>When: {moment(el.date).format("DD.MM.YYYY HH:mm")}</p>
                    <p>Where: {el.location}</p>
                    <p>
                        <div>
                            Who's going:
                            <ul>
                                {el.attendees.map(el => {
                                    return <li key={el._id}>{el.username}</li>;
                                })}
                            </ul>
                        </div>
                    </p>
                    <p>Initiated by {el.creator.username} </p>
                    <div>
                        {/* EDIT and DELETE */}
                        {el.creator._id === this.props.user._id && (
                            <React.Fragment>
                                <Link to="/activity/edit" className="icon">
                                    <svg className="icon__edit">
                                        <use xlinkHref={`${Icons}#edit`} />
                                    </svg>
                                </Link>
                                <Link to="/activity/delete" className="icon">
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
        return <div>{mappedActivities}</div>;
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
}

export default withRouter(ActivityList);
