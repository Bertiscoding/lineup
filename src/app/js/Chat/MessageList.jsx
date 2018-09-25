import React, { Component } from "react";
import ReactDOM from "react-dom";
import Message from "./Message";

class MessageList extends React.Component {
    render() {
        // check if it exist already
        if (!this.props.roomId) {
            return (
                <div>
                    <h1>Join a room</h1>
                </div>
            );
        } else {
            return (
                <div className="message-list">
                    {this.props.messages.map(message => {
                        return (
                            <Message key={message.id} username={message.senderId} text={message.text} />
                        );
                    })}
                </div>
            );
        }
    }
}

export default MessageList;
