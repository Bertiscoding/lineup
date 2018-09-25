import React, { Component } from "react";

class NewChatForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roomName: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (
            <div>
                <form className="chat__newChat" onSubmit={this.handleSubmit}>
                    <input
                        onChange={this.handleChange}
                        value={this.state.roomName}
                        type="text"
                        placeholder="Start a new chat"
                    />
                    <button type="submit">+</button>
                </form>
            </div>
        );
    }

    handleChange(e) {
        this.setState({
            roomName: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createRoom(this.state.roomName);
        this.setState({
            roomName: ""
        });
    }
}

export default NewChatForm;
