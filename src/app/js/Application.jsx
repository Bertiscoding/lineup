import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Auth from "./Auth";
import Home from "./Home";
import Create from "./Create";
import Navigation from "./Navigation";
import Profile from "./Components/Profile";
import SignUp from "./Auth/SignUp";
import NotFound from "./NotFound";
import EventList from "./Components/EventList";

class Application extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: this._setUser(true)
        };

        this._setUser = this._setUser.bind(this);
        this._resetUser = this._resetUser.bind(this);
    }

    componentDidMount() {
        this._setUser();
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <Navigation user={this.state.user} />
                    <Switch>
                        {/* <Route exact path="/" render={() => <SignUp />} /> */}
                        <Route exact path="/dashboard" render={() => <Home user={this.state.user} />} />
                        <Route
                            exact
                            path="/profile"
                            render={() => (
                                <Profile
                                    user={this.state.user}
                                    // date={this.state.date}
                                    // location={this.state.location}
                                    // detailEvent={this.state.detailEvent}
                                    username={this.state.username}
                                />
                            )}
                        />
                        <Route
                            path="/auth"
                            render={() => (
                                <Auth
                                    setUser={this._setUser}
                                    resetUser={this._resetUser}
                                    user={this.state.user}
                                />
                            )}
                        />

                        <Route
                            exact
                            path="/event/list"
                            render={() => (
                                <EventList
                                    date={this.state.date}
                                    location={this.state.location}
                                    detailEvent={this.state.detailEvent}
                                    user={this.state.user}
                                    username={this.state.username}
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/activity/list"
                            render={() => (
                                <ActivityList
                                    date={this.state.date}
                                    location={this.state.location}
                                    detailEvent={this.state.detailEvent}
                                    user={this.state.user}
                                    username={this.state.username}
                                />
                            )}
                        />

                        <Route exact path="/create" render={() => <Create user={this.state.user} />} />

                        <Route component={NotFound} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }

    _resetUser() {
        this.setState({
            user: null
        });
    }

    _setUser(init) {
        const token = localStorage.getItem("identity");
        if (token) {
            const decoded = jwtDecode(token);
            delete decoded.iat;
            if (init) return decoded;
            this.setState({ user: decoded });
        } else {
            return null;
        }
    }
}

export default Application;
