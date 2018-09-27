import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";
import Forecast from "./Components/Forecast";
import EventList from "./Components/EventList";
import ActivityList from "./Components/ActivityList";
import api from "./utils/api";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            spot: undefined,
            country: undefined,
            chart: undefined,
            temperature: undefined,
            minHeight: undefined,
            maxHeight: undefined,
            wave: undefined,
            waveHeight: undefined,
            wavePeriod: undefined,
            wind: undefined,
            windSpeed: undefined,
            error: "",
            username: props.user && props.user.username ? props.user.username : ""
        };
    }

    getForecast = val => {
        val.preventDefault();
        const spot = val.target.elements.spot.value; // taking "name" from form-input, value is whatever will be passed
        api.get(`/api/forecast/${this.state.spot}`).then(data => {
            console.log("DATA", data);

            if (spot) {
                // setState here, coz using SCOPE 'const=data'
                this.setState({
                    data: data,
                    spot: data.spot,
                    chart: data[0].charts.swell, //https://hist-1.msw.ms/wave/750/4-1537401600-1.gif
                    temperature: data[0].condition.temperature,
                    minHeight: data[0].swell.absMinBreakingHeight,
                    maxHeight: data[0].swell.absMaxBreakingHeight,
                    wave: data[0].swell.components.combined.compassDirection,
                    waveHeight: data[0].swell.components.combined.height,
                    wavePeriod: data[0].swell.components.combined.period,
                    wind: data[0].wind.compassDirection,
                    windSpeed: data[0].wind.speed,
                    error: ""
                });
            } else {
                this.setState({
                    spot: undefined,
                    chart: undefined,
                    temperature: undefined,
                    minHeight: undefined,
                    maxHeight: undefined,
                    wave: undefined,
                    waveHeight: undefined,
                    wavePeriod: undefined,
                    wind: undefined,
                    windSpeed: undefined,
                    error: "Please enter valid values!"
                });
            }
        });
    };
    render() {
        if (!this.props.user) {
            return <Redirect to="/auth/sign-in" />;
        }
        return (
            <div className="home">
                <div className="home__forecast">
                    {/* {this.state.data.map((el, index) => {
                        if(index > 2) return null
                        return (
                            // el.irgendwas und für jedes wahrscheinlich einen <Forecast /> zurückgeben
                        )
                    })} */}
                    <div className="forecast__form">
                        <h1>Check out the forecast:</h1>
                        <form onSubmit={this.getForecast}>
                            <select
                                name="spot"
                                value={this.state.spot}
                                onChange={evt => this._inputChangeHandler("spot", evt.target.value)}
                            >
                                <option disabled key="n" selected={true}>
                                    Choose a surf spot
                                </option>
                                <option value="88">Jeffery's Bay, South Africa</option>
                                <option value="224">Punta Blanca K16, Tenerife</option>
                            </select>

                            <button type="submit" className="btn__ghost">
                                See surf forecast
                            </button>
                        </form>
                    </div>
                </div>
                <Forecast
                    spot={this.state.spot}
                    country={this.state.country}
                    chart={this.state.chart}
                    temperature={this.state.temperature}
                    minHeight={this.state.minHeight}
                    maxHeight={this.state.maxHeight}
                    wave={this.state.wave}
                    waveHeight={this.state.waveHeight}
                    wavePeriod={this.state.wavePeriod}
                    wind={this.state.wind}
                    windSpeed={this.state.windSpeed}
                    error={this.state.error}
                />

                <div className="list">
                    <div className="list__event">
                        <h1>Let's go surfing</h1>
                        <EventList
                            location={this.state.location}
                            date={this.state.date}
                            detailEvent={this.state.detailEvent}
                            user={this.props.user}
                        />
                    </div>
                    <div className="list__activity">
                        <h1>
                            No swell? No sorrow! <br /> Here are some more activities:
                        </h1>
                        <ActivityList
                            location={this.state.location}
                            date={this.state.date}
                            detailEvent={this.state.detailEvent}
                            user={this.props.user}
                        />
                    </div>
                </div>
            </div>
        );
    }

    _inputChangeHandler(key, newValue) {
        this.setState({
            [key]: newValue
        });
    }
}

export default Home;
