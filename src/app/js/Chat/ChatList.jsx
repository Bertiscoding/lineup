import React, { Component } from "react";

class ChatList extends React.Component {
    render() {
        // to keep chats in order when they change state (from 'join' to 'joined')
        const orderedChats = [...this.props.rooms].sort((a, b) => {
            a.id - b.id;
        });

        return (
            <div>
                <ul>
                    <h3>Your chats:</h3>
                    {orderedChats.map(room => {
                        // set active class for css
                        const active = this.props.roomId === room.id ? "active" : "";

                        return (
                            <li key={room.id} className={"room " + active}>
                                {/* change it for react LINK */}
                                <a
                                    onClick={() => {
                                        this.props.subscribeToRoom(room.id);
                                    }}
                                    href="#"
                                >
                                    <h6> {room.name}</h6>
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ChatList;
