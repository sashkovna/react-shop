import React, {useEffect, useState} from 'react';
import {API_KEY, URL_API} from "../config";
import Preloader from "./Preloader";
import GoodsList from "./GoodsList";
import Cart from "./Cart";
import BasketList from "./BasketList";
import Alert from "./Alert";

const Shop = () => {
    const [goods, setGoods] = useState([])
    const [loading, setLoading] = useState(true)
    const [order, setOrder] = useState([])
    const [isBasketShow, setIsBasketShow] = useState(false)
    const [alertName, setAlertName] = useState('')

    const addToBasket = (item) => {
        const itemIndex = order.findIndex(orderItem => orderItem.mainId === item.mainId)
        if (itemIndex < 0) {
            const newItem = {
                ...item,
                quantity: 1,
            }
            setOrder([...order, newItem])
        } else {
            const newOrder = order.map((orderItem, index) => {
                if (index === itemIndex) {
                    return {
                        ...orderItem,
                        quantity: orderItem.quantity + 1
                    }
                } else {
                    return orderItem
                }
            })
            setOrder(newOrder)
        }
        setAlertName(item.displayName)
    }

    const removeFromBasket = (itemId) => {
        const newOrder = order.filter(item => item.mainId !== itemId)
        setOrder(newOrder)
    }

    const incQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if (el.mainId === itemId) {
                const newQuanyity = el.quantity + 1
                return {
                    ...el,
                    quantity: newQuanyity
                }
            } else {
                return el
            }
        })
        setOrder(newOrder)
    }

    const decQuantity = (itemId) => {
        const newOrder = order.map(el => {
            if (el.mainId === itemId) {
                const newQuanyity = el.quantity - 1
                return {
                    ...el,
                    quantity: newQuanyity > 0 ? newQuanyity : 0
                }
            } else {
                return el
            }
        })
        setOrder(newOrder)
    }

    const handleBasketShow = () => {
        setIsBasketShow(!isBasketShow)
    }

    const closeAlert = () => {
        setAlertName('')
    }

    useEffect(() => {
        fetch(URL_API, {
            headers: {
                Authorization: API_KEY
            }
        })
            .then(response => response.json())
            .then(data => {
            data.shop && setGoods(data.shop);
            setLoading(false)
        })
    }, [])

    return (
        <main className="container content">
            <Cart quantity={order.length} handleBasketShow={handleBasketShow}/>
            {loading
                ? <Preloader/>
                : <GoodsList
                    goods={goods}
                    addToBasket={addToBasket}
                />
            }
            {isBasketShow && <BasketList order={order}
                                         handleBasketShow={handleBasketShow}
                                         removeFromBasket={removeFromBasket}
                                         incQuantity={incQuantity}
                                         decQuantity={decQuantity}
            />}
            {alertName && <Alert name={alertName} closeAlert={closeAlert}/>}
        </main>
    );
};

export default Shop;