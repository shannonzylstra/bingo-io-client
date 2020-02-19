import React from 'react';

const Florence = (props) => {
    return (
        <div style={{ textAlign: "center" }}>
        {props.response
            ? <p>
            The temperature in Florence is: {props.response} °F
            </p>
            : <p>Loading...</p>}
        </div>
    )
}