import React, { Component } from "react";
import { withRouter } from "react-router";
import api from "../utils/api";
import moment from "moment";

class EventList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            events: [],
            loading: true,
            attendees: []
        };
    }

    // api
    // .get(
    //   `/api/event/list${
    //     this.props.match.params.username
    //       ? `/${this.props.match.params.username}`
    //       : ""
    //   }`
    // )
    // .then(data => {
    //   console.log(data);
    //   this.setState({
    //     posts: data.posts,
    //     user: data.user,
    //     loading: false
    //   });
    // });

    componentDidMount() {
        api.get("/api/event/list").then(events => {
            console.log(events[0].attendees);
            this.setState({
                events: events,
                loading: false
                // set attending state here?
            });
        });
    }

    render() {
        if (this.state.loading) {
            return <div>loading.....</div>;
        }
        // const isAttending = this.props.event.attendees.includes(
        //     this.state.user._id
        // );

        const mappedEvents = this.state.events.map(el => {
            return (
                <div className="event" key={el._id}>
                    <p>When: {moment(el.date).format("DD.MM.YYYY HH:mm")}</p>
                    <p>Where: {el.location}</p>
                    <p>Details: {el.detailEvent}</p>
                    <p>Who's going:</p>

                    {/* {this.state.user._id}
                    {this.props.user._id !== this.state.user._id && (
                        <button onClick={e => this.handleJoinClick(e, this.state.user.username)}>
                            {isAttending ? "Cancel" : "Join"}
                        </button>
                    )} */}
                    <hr />
                </div>
            );
        });
        return <div className="event-list">{mappedEvents}</div>;
    }

    // handleJoinClick(e, isAttending) {
    //     api.post(`/api/event/${_id}/attend`).then(data => {
    //         localStorage.setItem("identity", data.token);
    //         this.props.setUser();
    //     });
    // }
}

export default withRouter(EventList);
