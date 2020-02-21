import React, { useEffect, useState } from 'react';
import { Button } from 'reactstrap';
import Florence from './darksky/Florence';

const PlaceOrder = (props) => {

    let [ food_data, setFood_data ] = useState([]);

    const sendOrder = id => {
        let order_details;
        food_data.map(food => {
            if (food._id == id) {
                order_details = food;
            }
            return food;
        });
        console.log(order_details)
        props.socket.emit("putOrder", order_details);
        let new_array = food_data.map(food => {
            food.order = 0;
            return food;
        })
        setFood_data(new_array);
    }

    const showFlorence = (socket) => {
        return(
            <Florence socket={socket}/>
        )
    }

    const getFoodData = () => {
        return (
            <div className="stuff">
                {showFlorence(props.socket)}
                <button onClick={() => sendOrder(1)}>Order</button>
            </div>
        );
    }

    return (
        <div className="place-order">
            {getFoodData()}
        </div>
    )
}

export default PlaceOrder;