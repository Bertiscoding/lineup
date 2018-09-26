import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";

import api from "../utils/api";

import SignUp from "./SignUp";
import NewUser from "./NewUser";
import Logout from "./Logout";
import SignIn from "./SignIn";
import NotFound from "../NotFound";

class Auth extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            picture: undefined,
            error: ""
        };

        this._handleInputChange = this._handleInputChange.bind(this);
        this._sign = this._sign.bind(this);
    }

    render() {
        return (
            <Switch>
                <Route
                    exact
                    path="/auth/sign-up"
                    render={() => (
                        <SignUp
                            handleInputChange={this._handleInputChange}
                            email={this.state.email}
                            password={this.state.password}
                            error={this.state.error}
                            sign={this._sign}
                        />
                    )}
                />

                <Route
                    exact
                    path="/auth/sign-in"
                    render={() => (
                        <SignIn
                            handleInputChange={this._handleInputChange}
                            email={this.state.email}
                            password={this.state.password}
                            error={this.state.error}
                            sign={this._sign}
                        />
                    )}
                />

                <Route
                    exact
                    path="/auth/newuser"
                    render={() => (
                        <NewUser
                            user={this.props.user}
                            handleInputChange={this._handleInputChange}
                            username={this.state.username}
                            age={this.state.age}
                            description={this.state.description}
                            skilllevel={this.state.skilllevel}
                            picture={this.state.picture}
                            setUser={this.props.setUser}
                        />
                    )}
                />

                <Route
                    exact
                    path="/auth/logout"
                    render={() => <Logout resetUser={this.props.resetUser} />}
                />
                <Route component={NotFound} />
            </Switch>
        );
    }

    _handleInputChange(key, newValue) {
        this.setState({
            [key]: newValue
        });
    }

    _sign(type) {
        this.setState({
            error: ""
        });

        const pictureDeclaration = type === "up" && { picture: this.state.picture };

        api.post(
            `/api/auth/sign-${type}`,
            { email: this.state.email, password: this.state.password },
            pictureDeclaration
        )
            .then(data => {
                localStorage.setItem("identity", data.token);
                this.props.setUser();
                if (type === "up") return this.props.history.push(`newuser/`);
                else return this.props.history.push("/dashboard");
            })
            .catch(err => {
                this.setState({
                    error: err.description
                });
            });
    }
}

export default withRouter(Auth);
