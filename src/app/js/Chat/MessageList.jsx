import React, { Component } from "react";
import Message from "./Message";

class MessageList extends React.Component {
    render() {
        return (
            <div className="message-list">
                {this.props.messages.map(message => {
                    return <Message key={message.id} username={message.senderId} text={message.text} />;
                })}
            </div>
        );
    }
}

export default MessageList;
