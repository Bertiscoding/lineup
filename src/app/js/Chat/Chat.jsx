import React, { Component } from "react";
import Chatkit from "@pusher/chatkit";
import { ChatManager, TokenProvider } from "@pusher/chatkit";

import ChatList from "./ChatList";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";

const instanceLocator = "v1:us1:d8364135-943d-41a7-b1e3-be2e3a649d64";
const testToken =
    "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d8364135-943d-41a7-b1e3-be2e3a649d64/token";
const username = "lineup-chat";
const roomId = 17043651;

class Chat extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            joinableRooms: [],
            joinedRooms: []
        };

        this.sendMessage = this.sendMessage.bind(this);
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: instanceLocator,
            userId: username,
            tokenProvider: new Chatkit.TokenProvider({
                url: testToken
            })
        });

        chatManager
            .connect()
            .then(currentUser => {
                this.currentUser = currentUser;

                this.currentUser
                    .getJoinableRooms()
                    .then(joinableRooms => {
                        this.setState({
                            joinableRooms, // chats we have NOT joined yet
                            joinedRooms: this.currentUser.rooms // chats user HAS joined
                        });
                    })
                    .catch(err => console.log("error in joinable rooms", err));

                currentUser.subscribeToRoom({
                    roomId: roomId,
                    hooks: {
                        // new messages is being added to the end of this.state.message
                        onNewMessage: message => {
                            console.log("got message:", message);

                            this.setState({
                                messages: [...this.state.messages, message]
                            });
                        }
                    }
                });
            })
            .catch(err => console.log("error on connecting", err));
    }

    render() {
        return (
            <div className="chat">
                <ChatList rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]} />
                <MessageList messages={this.state.messages} />
                <SendMessageForm sendMessage={this.sendMessage} />
            </div>
        );
    }

    // passing it into SendMessageForm
    sendMessage(text) {
        this.currentUser.sendMessage({
            text,
            roomId: roomId
        });
    }
}

export default Chat;
