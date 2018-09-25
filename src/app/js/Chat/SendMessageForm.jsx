import React, { Component } from "react";

class SendMessageForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    render() {
        return (
            <div>
                <form className="chat__sendForm" onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        disabled={this.props.disabled} // disables inputfield until you join a chat
                        onChange={this.handleChange}
                        value={this.state.message}
                        placeholder="Type your message and hit ENTER"
                    />
                </form>
            </div>
        );
    }

    // update input field
    handleChange(e) {
        this.setState({
            message: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.sendMessage(this.state.message);
        this.setState({
            message: "" // clear input field after submit
        });
    }
}

export default SendMessageForm;
