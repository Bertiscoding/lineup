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
                        type="text"
                        onChange={this.handleChange}
                        value={this.state.roomName}
                        placeholder="new chat"
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
    }
}

export default NewChatForm;
