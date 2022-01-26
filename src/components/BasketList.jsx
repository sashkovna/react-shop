import React from 'react';
import BasketItem from "./BasketItem";

const BasketList = (props) => {
    const {
        order = [],
        handleBasketShow,
        removeFromBasket,
        incQuantity,
        decQuantity,
    } = props
    const totalPrice = order.reduce((sum, item) => {
        return sum + item.regularPrice * item.quantity
    }, 0)
    return (
        <ul className="collection basket-list">
            <li className="collection-item active">Корзина</li>
            {order.length
                ? order.map((item) =>
                    <BasketItem
                        key={item.mainId}
                        {...item}
                        removeFromBasket={removeFromBasket}
                        incQuantity={incQuantity}
                        decQuantity={decQuantity}
                    />)
                : <li className="collection-item">Корзина пуста</li>
            }
            <li className="collection-item active">
                Общая стоимость: {totalPrice} rub
            </li>
            <li className="collection-item">
                <button className="btn btn-small">Оформить</button>
            </li>
            <li className="material-icons basket-close"
                onClick={handleBasketShow}
            >
                close
            </li>
        </ul>
    );
};

export default BasketList;