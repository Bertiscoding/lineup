import React, { Component } from "react";
import ReactDOM from "react-dom";
import Message from "./Message";

class MessageList extends React.Component {
    // componentWillMount() {
    //     // checks which position in chatrrom user is at
    //     const autoscroll = ReactDOM.findDOMNode(this);
    //     this.shouldScrollToBottom =
    //         autoscroll.scrollTop + autoscroll.clientHeight + 100 >= autoscroll.scrollHeight;
    // }

    // componentDidUpdate() {
    //     // chatroom auto scrolls all the way to the bottom
    //     const autoscroll = ReactDOM.findDOMNode(this);
    //     autoscroll.scrollTop = autoscroll.scrollHeight;
    // }

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
