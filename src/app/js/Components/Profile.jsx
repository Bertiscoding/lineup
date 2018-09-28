import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import api from "../utils/api";
import moment from "moment";

import Icons from "../../assets/images/sprite.svg";

class Profile extends Component {
    constructor(props) {
        super(props);

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
    }

    render() {
        if (this.state.loading) {
            return <div>🏄🏽</div>;
        }

        console.log("props", this.props);
        if (!this.props.user) return <Redirect to="/auth/sign-in" />; // this is actually the protection

        return (
            <div className="profile">
                <div className="profile__info">
                    <h3>Hi, this is me:</h3>
                    <img src={this.props.user.profilePicture} />
                    <div className="profile__info-about">
                        <p className="profile__info-name">{this.props.user.username}</p>
                        <p>
                            <span>About: </span> {this.props.user.description}
                        </p>
                        <p>
                            <span>Age: </span>
                            {this.props.user.age}
                        </p>
                        <p>
                            You usually find me around the <span>{this.props.user.skilllevel}</span> of
                            the lineup.
                        </p>
                    </div>
                </div>

                <div className="profile__events">
                    <h3>My surf events:</h3>
                    {this.state.events.map(el => {
                        return (
                            <div key={el._id} className="profile__events-card">
                                <span>{moment(el.date).format("DD.MM.YYYY HH:mm")}</span>

                                <p>
                                    <span>Where: </span>
                                    {el.location}
                                </p>
                                <p>
                                    <span>Details: </span>
                                    {el.detailEvent}
                                </p>
                                <React.Fragment>
                                    <Link to={`/event/${el._id}/update`} className="icon">
                                        <svg className="icon__edit">
                                            <use xlinkHref={`${Icons}#edit`} />
                                        </svg>
                                    </Link>

                                    <div onClick={() => this.handleDelete(el._id)} className="icon">
                                        <svg className="icon__edit">
                                            <use xlinkHref={`${Icons}#delete-button`} />
                                        </svg>
                                    </div>
                                </React.Fragment>
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
