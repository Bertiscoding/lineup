import React from "react";
import { Link } from "react-router-dom";
import Icons from "./../../assets/images/sprite.svg";

class SignUp extends React.Component {
    componentDidMount() {
        this.props.handleInputChange("email", "");
        this.props.handleInputChange("password", "");
    }

    render() {
        return (
            <div className="container">
                <h1>Sign Up</h1>
                <input
                    type="email"
                    value={this.props.email}
                    onChange={evt => this.props.handleInputChange("email", evt.target.value)}
                    className="input"
                    placeholder="E-Mail"
                />
                <br />
                <br />
                <input
                    type="password"
                    value={this.props.password}
                    onChange={evt => this.props.handleInputChange("password", evt.target.value)}
                    className="input"
                    placeholder="Password"
                />

                {/* here was the picture upload */}

                <br />
                <br />

                <Link to="/auth/newuser">
                    <button className="button" onClick={() => this.props.sign("up")}>
                        <svg className="icon__edit">
                            <use xlinkHref={`${Icons}#cool`} />
                        </svg>
                        Sign Up
                    </button>
                </Link>
                <br />
                <br />
                <p>{this.props.error}</p>
                <div className="separator" />
                <Link className="link" to="/auth/sign-in">
                    Do you have an account already? Sign in instead!
                </Link>
            </div>
        );
    }
}

export default SignUp;
