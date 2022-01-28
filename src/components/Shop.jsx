import React, {useContext, useEffect} from 'react';
import {API_KEY, URL_API} from "../config";
import Preloader from "./Preloader";
import GoodsList from "./GoodsList";
import Cart from "./Cart";
import BasketList from "./BasketList";
import Alert from "./Alert";
import {ShopContext} from "../context";

const Shop = () => {
    const {setGoods, loading, order, isBasketShow, alertName} = useContext(ShopContext)

    useEffect(() => {
        fetch(URL_API, {
            headers: {
                Authorization: API_KEY
            }
        })
            .then(response => response.json())
            .then(data => {
                setGoods(data.shop);
            })
        // eslint-disable-next-line
    }, [])

    return (
        <main className="container content">
            <Cart quantity={order.length} />
            {loading
                ? <Preloader/>
                : <GoodsList

                />
            }
            {isBasketShow && <BasketList/>}
            {alertName && <Alert />}
        </main>
    );
};

export default Shop;