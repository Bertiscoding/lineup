import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import EventList from "./EventList";
import api from "../utils/api";
import moment from "moment";

import Icons from "../../assets/images/sprite.svg";

class Profile extends Component {
    constructor(props) {
        super(props);

        console.log("PROPS", this.props);

        this.state = {
            events: [],
            loading: true
        };

        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        api.get("/api/event/list/creator").then(events => {
            this.setState({
                events: events,
                loading: false
            });
        });
        console.log("EVENTS", this.state.events);
    }

    render() {
        if (this.state.loading) {
            return <div>loading.....</div>;
        }

        console.log("props", this.props);
        if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection

        return (
            <div>
                <div className="profile">
                    <img src={this.props.user.profilePicture} width="250px" alt="" />
                    <br />
                    <p>Name: {this.props.user.username}</p>
                    <p>Age: {this.props.user.age} </p>
                    <p>Fun fact: {this.props.user.description}</p>
                    <p>You usually find me around the {this.props.user.skilllevel} of the lineup.</p>
                </div>

                <div className="profile__events">
                    {this.state.events.map(el => {
                        return (
                            <div>
                                <hr />
                                <p>When: {moment(el.date).format("DD.MM.YYYY HH:m m")} </p>
                                <p>Where: {el.location}</p>
                                <p>Details: {el.detailEvent}</p>
                                <div onClick={() => this.handleDelete(el._id)} className="icon">
                                    <svg className="icon__edit">
                                        <use xlinkHref={`${Icons}#delete-button`} />
                                    </svg>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    handleDelete(id) {
        api.post(`api/event/${id}/delete`).then(data => {
            this.setState({
                events: this.state.events.filter(el => el._id !== id)
            });
        });
    }
}

export default Profile;
