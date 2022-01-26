import React from 'react';

const BasketItem = (props) => {
    const {
        mainId,
        displayName,
        regularPrice,
        quantity,
        removeFromBasket,
        incQuantity,
        decQuantity,
    } = props
    return (
            <li className="collection-item">
                {displayName}
                <i className="material-icons basket-quantity" onClick={() => decQuantity(mainId)}>remove</i>
                x {quantity}
                <i className="material-icons basket-quantity" onClick={() => incQuantity(mainId)}>add</i>
                = {regularPrice * quantity} rub
                <span className="secondary-content" onClick={() => removeFromBasket(mainId)}>
                    <i className="material-icons" style={{cursor: "pointer"}}>delete</i>
                </span>
            </li>
    );
};

export default BasketItem;