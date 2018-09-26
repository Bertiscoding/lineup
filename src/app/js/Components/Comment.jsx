import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import api from "../utils/api";
import moment from "moment";
import Icons from "../../assets/images/sprite.svg";

class Comment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            comment: props.comment,
            newComment: ""
        };

        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    render() {
        return (
            <div>
                {/* TODO: LIST ALL COMMENTS */}

                <h4>comment:</h4>
                <form onSubmit={this.submitComment}>
                    <input
                        type="text"
                        name="comment"
                        value={this.state.newComment}
                        placeholder="Your message for the group chat"
                        onChange={evt => this.inputChangeHandler("newComment", evt.target.value)}
                    />
                    <button type="submit">Add that new comment, britney</button>
                </form>
            </div>
        );
    }

    inputChangeHandler(key, newValue) {
        this.setState({
            [key]: newValue
        });
    }

    submitComment(evt) {
        evt.preventDefault();
        api.post(`/api/event/${this.props.eventId}/chat`, { comment: this.state.newComment }).then(
            comment => {
                console.log(comment);
            }
        );
    }
}

export default withRouter(Comment);