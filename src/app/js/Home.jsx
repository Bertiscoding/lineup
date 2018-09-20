import React from "react";
import Forecast from "./Components/Forecast";
import api from "./utils/api";

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
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
            error: ""
        };
    }

    getForecast = val => {
        val.preventDefault();
        const spot = val.target.elements.spot.value; // taking "name" from form-input, value is whatever will be passed
        const country = val.target.elements.country.value;

        api.get(`/api/forecast/88`).then(data => {
            console.log("DATA", data);

            if (spot && country) {
                // setState here, coz using SCOPE 'const=data'
                this.setState({
                    spot: data.spot,
                    country: data.country,
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
                    error: "Please enter valid values!"
                });
            }
        });
    };
    render() {
        return (
            <div>
                <form onSubmit={this.getForecast}>
                    <select
                        name="spot"
                        value={this.state.spot}
                        onChange={evt => this._inputChangeHandler("spot", evt.target.value)}
                    >
                        <option disabled key="n" selected={true}>
                            Choose a surf spot
                        </option>
                        <option value="Jeffery's Bay">Jeffery's Bay</option>
                    </select>
                    <select
                        name="country"
                        value={this.state.country}
                        onChange={evt => this._inputChangeHandler("country", evt.target.value)}
                    >
                        <option disabled key="n" selected={true}>
                            Select the country
                        </option>
                        <option value="South Africa">South Africa</option>
                    </select>

                    <button type="submit">See surf forecast</button>
                </form>

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
