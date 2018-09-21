import React, { Component } from "react";
import api from "../utils/api";
import moment from "moment";

class ActivityList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activities: []
        };
    }

    componentDidMount() {
        // this is what was send from backend
        api.get("api/activity/list").then(activities => {
            this.setState({
                activities: activities
            });
        });
    }
    render() {
        const mappedActivities = this.state.activities.map(el => {
            return (
                <div key={el._id}>
                    <p>{el.title}</p>
                    <p>Details: {el.detailActivity}</p>
                    <p>When: {moment(el.date).format("DD.MM.YYYY HH:mm")}</p>
                    <p>Where: {el.location}</p>
                    <hr />
                </div>
            );
        });
        return <div>{mappedActivities}</div>;
    }
}

export default ActivityList;
