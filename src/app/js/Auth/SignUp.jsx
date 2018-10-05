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
            <div>
                <div className="sign sign__in">
                    <div className="sign__in-card">
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

                        <br />
                        <br />

                        <button className="btn btn__full" onClick={() => this.props.sign("up")}>
                            <Link to="/auth/newuser">
                                <svg className="icon__edit">
                                    <use xlinkHref={`${Icons}#cool`} />
                                </svg>
                                Sign Up
                            </Link>
                        </button>
                        <br />

                        <p>{this.props.error}</p>
                        <div className="sign__instead">
                            <Link className="link" to="/auth/sign-in">
                                Got an account already? Sign in instead!
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="sign__up-copy">
                    <p>
                        <span>Lineup</span> is an app that connects surfers all over the world. Just
                        sign-up and see all the upcoming surf sessions and other activities in your area.
                        Simply join one, or create your own session. And if there are no waves, don't
                        worry: Just initiate another activity, like board and wet suit repairs, going for
                        coffee or watching surf movies together. A great way to make some new friends
                        with like-minded people who whare the same deep passion for surfing like you do.
                    </p>
                </div>
            </div>
        );
    }
}

export default SignUp;
