import React, { Component } from "react";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import api from "../utils/api";
import moment from "moment";
import Icons from "../../assets/images/sprite.svg";

class CommentEvent extends React.Component {
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
        let commentList = this.state.comment.map(el => {
            return (
                <div key={el._id} className="comment__list-entry">
                    <p className="comment__name">{el.user.username}</p>
                    <p className="comment__content">{el.content}</p>
                </div>
            );
        });
        return (
            <div className="comment">
                <h4>Group chat:</h4>
                <div className="comment__list">{commentList}</div>
                <div className="comment__form">
                    <form onSubmit={this.submitComment}>
                        <input
                            type="text"
                            name="comment"
                            value={this.state.newComment}
                            placeholder="Your message..."
                            onChange={evt => this.inputChangeHandler("newComment", evt.target.value)}
                        />
                        <button type="submit" className="btn__ghost">
                            Say it, lil grom
                        </button>
                    </form>
                </div>
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
            res => {
                console.log(res);
                this.setState({ comment: res.comment });
            }
        );
        this.setState({
            newComment: ""
        });
    }
}

export default withRouter(CommentEvent);
