import React from "react";
import api from "../utils/api";
import axios from "axios";

class NewUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            username: "",
            age: "",
            description: "",
            skilllevel: "",
            picture: ""
        };

        this._inputChangeHandler = this._inputChangeHandler.bind(this);
        this._submitData = this._submitData.bind(this);
    }

    componentDidMount() {
        console.log("cdm");
        api.get("http://localhost:3000/api/auth/newuser/")
            .then(userId => {
                console.log("userId", userId);
                this.setState({ id: userId });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        // if statement on the id
        return (
            <div>
                <h1>
                    Create you profile
                    {this.state.picture}
                </h1>
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
                    <p>What is your skill level?</p>
                    <label>
                        <input
                            type="radio"
                            // name="skilllevel"
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
                            // name="skilllevel"
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
                            // name="skilllevel"
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
                        value={this.props.picture}
                        onChange={evt => this.props.handleInputChange("picture", evt.target.files[0])}
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
        const data = this.state;
        console.log(data);
        api.post(
            `/api/auth/newuser/${this.state.id}`, // insert id
            data
        )
            .then(result => {
                console.log("happy : ", result);
            })
            .catch(err => console.log("something is wrong ", err));
    }
}

export default NewUser;
