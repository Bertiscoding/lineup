import React, { Component } from "react";

class Events extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: undefined,
            time: undefined,
            location: undefined,
            detail: undefined
        };
    }
    render() {
        <div>
            <h2>Create a surf session:</h2>
            <form action="POST">
                <input type="date" placeholder="date" />
                <input type="time" placeholder="time" />
                <textarea type="text" name="details" placeholder="More information..." />
                <button type="submit">Let's go surfing</button>
            </form>
        </div>;
    }
}

export default Events;
