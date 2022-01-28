import React, {useContext} from 'react';
import BasketItem from "./BasketItem";
import {ShopContext} from "../context";

const BasketList = () => {

    const {order, handleBasketShow} = useContext(ShopContext)

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