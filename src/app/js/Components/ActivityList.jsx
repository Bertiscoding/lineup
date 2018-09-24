import React, { Component } from "react";
import { withRouter } from "react-router";
import api from "../utils/api";
import moment from "moment";

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
                attendees: activities.attendees
            });
        });
    }
    render() {
        if (this.state.loading) {
            return <div>loading...</div>;
        }

        const mappedActivities = this.state.activities.map((el, index) => {
            const isAttending = this.props.user && el.attendees.includes(this.props.user._id);
            return (
                <div key={el._id}>
                    <p>{el.title}</p>
                    <p>Details: {el.detailActivity}</p>
                    <p>When: {moment(el.date).format("DD.MM.YYYY HH:mm")}</p>
                    <p>Where: {el.location}</p>
                    <p>Who's going:</p>
                    <p>Initiated by {this.state.username} </p>
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
