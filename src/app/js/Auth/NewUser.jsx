import React from "react";
import api from "../utils/api";
import { Link, withRouter } from "react-router-dom";

class NewUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: props.user && props.user.username ? props.user.username : "",
            age: props.user && props.user.age ? props.user.age : "",
            description: props.user && props.user.description ? props.user.description : "",
            skilllevel: "",
            picture: null
        };

        this._inputChangeHandler = this._inputChangeHandler.bind(this);
        this._submitData = this._submitData.bind(this);
    }

    render() {
        return (
            <div>
                <h1>Create you profile</h1>
                <form onSubmit={this._submitData}>
                    <input
                        type="text"
                        name="username"
                        value={this.state.username}
                        placeholder="Your Username"
                        onChange={evt => this._inputChangeHandler("username", evt.target.value)}
                    />
                    <br />
                    <br />
                    <input
                        type="number"
                        min="0"
                        name="age"
                        value={this.state.age}
                        placeholder="Your age"
                        onChange={evt => this._inputChangeHandler("age", evt.target.value)}
                    />
                    <br />
                    <br />
                    <textarea
                        type="text"
                        name="description"
                        value={this.state.description}
                        placeholder="Tell us a fun fact about you..."
                        onChange={evt => this._inputChangeHandler("description", evt.target.value)}
                    />
                    <br />
                    <br />
                    <p>Where in the water are you usually to find?</p>
                    <label>
                        <input
                            type="radio"
                            value="top"
                            checked={this.state.skilllevel === "top"}
                            onChange={evt => this._inputChangeHandler("skilllevel", evt.target.value)}
                        />
                        Top of the lineup
                    </label>
                    <br />
                    <label>
                        <input
                            type="radio"
                            value="middle"
                            checked={this.state.skilllevel === "middle"}
                            onChange={evt => this._inputChangeHandler("skilllevel", evt.target.value)}
                        />
                        In the middle of the lineup
                    </label>

                    <br />
                    <label>
                        <input
                            type="radio"
                            value="bottom"
                            checked={this.state.skilllevel === "bottom"}
                            onChange={evt => this._inputChangeHandler("skilllevel", evt.target.value)}
                        />
                        At the bottom of the lineup
                    </label>
                    <br />
                    <br />
                    <br />
                    <input
                        type="file"
                        onChange={evt => this._inputChangeHandler("picture", evt.target.files[0])}
                        className="input"
                        placeholder="Profile Picture"
                    />
                    <br />
                    <br />

                    <button onClick={this._submitData}>Create Profile</button>
                </form>
            </div>
        );
    }

    _inputChangeHandler(key, newValue) {
        this.setState({
            [key]: newValue
        });
    }

    _submitData(e) {
        e.preventDefault();
        const data = { ...this.state };
        delete data.picture;

        const pictures = this.state.picture ? { picture: this.state.picture } : undefined;
        api.post("/api/auth/newuser", data, pictures)
            .then(result => {
                localStorage.setItem("identity", result.token);
                this.props.setUser();
                this.props.history.push("/profile");
            })
            .catch(err => console.log("something went wrong ", err));
    }
}

export default withRouter(NewUser);
