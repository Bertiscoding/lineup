import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Profile extends Component {
    render() {
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
                <div className="profile__events">{this.props.event}</div>
            </div>
        );
    }
}

export default Profile;
