import React from "react";

//STATELESS component:
const Forecast = props => (
    <div>
        {props.chart && <img src="{props.chart}" alt="" />}

        {props.temperature && (
            <p>
                Temperature:&nbsp;
                <span>
                    {props.temperature}
                    °C
                </span>
            </p>
        )}
        {props.minHeight && (
            <p>
                Wave min height:&nbsp;
                <span>{props.minHeight}m</span>
            </p>
        )}

        {props.maxHeight && (
            <p>
                Wave max height:&nbsp;
                <span>{props.maxHeight}m</span>
            </p>
        )}

        {props.wave && (
            <p>
                Wave direction:&nbsp;
                <span>{props.wave}</span>
            </p>
        )}

        {props.waveHeight && (
            <p>
                Wave height:&nbsp;
                <span>{props.waveHeight}m</span>
            </p>
        )}

        {props.wavePeriod && (
            <p>
                Wave period:&nbsp;
                <span>{props.wavePeriod}m</span>
            </p>
        )}

        {props.wind && (
            <p>
                Winddirection:&nbsp; <span>{props.wind}</span>
            </p>
        )}
        {props.windSpeed && (
            <p>
                Wind speed:&nbsp; <span>{props.windSpeed}</span>
            </p>
        )}

        {/* in case of error/invalid value: */}
        {props.error && <p>{props.error}</p>}
    </div>
);

export default Forecast;
