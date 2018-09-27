import React from "react";

//STATELESS component:
const Forecast = props => (
    <div className="forecast__result">
        <div className="forecast__result-one">{props.chart && <img src={props.chart} alt="" />}</div>

        <div className="forecast__result-two">
            {props.temperature && (
                <p>
                    <span>Temperature:&nbsp;</span>
                    {props.temperature} °C
                </p>
            )}
            {props.minHeight && (
                <p>
                    <span> Wave min height:&nbsp;</span>
                    {props.minHeight}m
                </p>
            )}

            {props.maxHeight && (
                <p>
                    <span> Wave max height:&nbsp;</span>
                    {props.maxHeight}m
                </p>
            )}
        </div>

        <div className="forecast__result-three">
            {props.wave && (
                <p>
                    <span>Wave direction:&nbsp;</span>
                    {props.wave}
                </p>
            )}

            {props.waveHeight && (
                <p>
                    <span> Wave height:&nbsp;</span>
                    {props.waveHeight}m
                </p>
            )}

            {props.wavePeriod && (
                <p>
                    <span> Wave period:&nbsp;</span>
                    {props.wavePeriod}m
                </p>
            )}
        </div>

        <div className="forecast__result-four">
            {props.wind && (
                <p>
                    <span>Winddirection:&nbsp;</span>
                    {props.wind}
                </p>
            )}
            {props.windSpeed && (
                <p>
                    <span>Wind speed:&nbsp;</span>
                    {props.windSpeed} km/h
                </p>
            )}
            {props.windSpeed && (
                <p>
                    <span>Wind speed:&nbsp;</span>
                    {props.windSpeed} km/h
                </p>
            )}
        </div>

        {/* in case of error/invalid value: */}
        {props.error && <p>{props.error}</p>}
    </div>
);

export default Forecast;
