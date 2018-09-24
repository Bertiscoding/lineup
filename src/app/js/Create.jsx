import React from "react";
import Event from "./Components/Event";
import { withRouter } from "react-router";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Activity from "./Components/Activity";

class Create extends React.Component {
    render() {
        return (
            <Switch>
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
            </Switch>
        );
    }
}

export default withRouter(Create);
