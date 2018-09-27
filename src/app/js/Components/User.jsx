import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import api from "../utils/api";

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
            <div className="user">
                <div className="user__img">
                    <img src={this.state.profilePicture} alt="" />
                </div>
                <div className="user__about">
                    <p className="profile__info-name">{this.state.username}</p>
                    <p>
                        <span>About: </span>
                        {this.state.description}
                    </p>
                    <p>
                        <span>Age: </span>
                        {this.state.age}{" "}
                    </p>
                    <p>
                        You usually find me around the
                        <span> {this.state.skilllevel} </span>
                        of the lineup.
                    </p>
                </div>
            </div>
        );
    }
}

export default User;
