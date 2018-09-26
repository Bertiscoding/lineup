import React from "react";
import Event from "./Components/Event";
import Activity from "./Components/Activity";

import { Route, withRouter, Redirect } from "react-router-dom";

class Create extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.user) {
            return <Redirect to="/auth/sign-in" />;
        }

        return (
            <div className="create">
                <Event />

                <Activity />
            </div>
        );
    }
}

export default withRouter(Create);
