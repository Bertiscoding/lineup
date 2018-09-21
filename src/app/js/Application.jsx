import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

import Auth from "./Auth";
import Home from "./Home";
import Navigation from "./Navigation";
import Profile from "./Components/Profile";
import Event from "./Components/Event";
import NotFound from "./NotFound";
import Activity from "./Components/Activity";
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
                        <Route exact path="/" render={() => <Home user={this.state.user} />} />
                        <Route exact path="/profile" render={() => <Profile user={this.state.user} />} />
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
                            path="/event/create"
                            render={() => (
                                <Event
                                    handleInputChange={this._handleInputChange}
                                    date={this.state.startDate}
                                    location={this.state.location}
                                    details={this.state.details}
                                    setUser={this.props.setUser}
                                    username={this.state.username}
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
                                />
                            )}
                        />
                        <Route
                            exact
                            path="/activity/create"
                            render={() => (
                                <Activity
                                    handleInputChange={this._handleInputChange}
                                    date={this.state.startDate}
                                    location={this.state.location}
                                    title={this.state.title}
                                    details={this.state.details}
                                    setUser={this.props.setUser}
                                    username={this.state.username}
                                />
                            )}
                        />

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
