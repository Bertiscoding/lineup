import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import EventList from "./EventList";
import api from "../utils/api";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            loading: true
        };
    }

    componentDidMount() {
        api.get("/api/list/creator").then(events => {
            this.setState({
                events: events,
                loading: false
            });
        });
        console.log("EVENTS", this.state.events);
    }

    render() {
        if (this.state.loading) {
            return <div>loading.....</div>;
        }

        console.log("props", this.props);
        if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection

        return (
            <div>
                <div className="profile">
                    <img src={this.props.user.profilePicture} width="250px" alt="" />
                    <br />
                    <p>Name: {this.props.user.username}</p>
                    <p>Age: {this.props.user.age} </p>
                    <p>Fun fact: {this.props.user.description}</p>
                    <p>You usually find me around the {this.props.user.skilllevel} of the lineup.</p>
                </div>
                <div className="profile__events">{this.state.events}</div>
            </div>
        );
    }
}

export default Profile;
