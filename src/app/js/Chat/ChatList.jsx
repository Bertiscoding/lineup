import React, { Component } from "react";

class ChatList extends React.Component {
    render() {
        console.log("chatlist:", this.props.rooms);

        return (
            <div>
                <ul>
                    <h3>Your chats:</h3>
                    {this.props.rooms.map(room => {
                        return (
                            <li key={room.id}>
                                {/* change it for react LINK */}
                                <a href="#">{room.name}</a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ChatList;
