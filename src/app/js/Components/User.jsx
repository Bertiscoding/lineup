import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import api from "../utils/api";
import moment from "moment";

import Icons from "../../assets/images/sprite.svg";

let style = {
    padding: "100px"
};

class User extends Component {
    constructor(props) {
        super(props);

        this.state = {
            profilePicture: undefined,
            username: undefined,
            age: undefined,
            description: undefined,
            skilllevel: undefined
        };
    }

    componentDidMount() {
        api.get(`/api/user/${this.props.params.id}`).then(user => {
            this.setState({
                profilePicture: user.profilePicture,
                username: user.username,
                age: user.age,
                description: user.description,
                skilllevel: user.skilllevel
            });
        });
    }

    render() {
        if (!this.props.user) return <Redirect to="/auth/sign-in" />;

        return (
            <div style={style}>
                <span>Hello, User</span>
                <div className="user__profile">
                    <img src={this.state.profilePicture} alt="" width="250px" />
                    <br />
                    <p>Name: {this.state.username}</p>
                    <p>Age: {this.state.age} </p>
                    <p>Fun fact: {this.state.description}</p>
                    <p>You usually find me around the {this.state.skilllevel} of the lineup.</p>
                </div>
            </div>
        );
    }
}

export default User;
