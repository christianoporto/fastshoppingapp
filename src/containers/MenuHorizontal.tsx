import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { CurrentOrderContext } from "../store/contexts/CurrentOrderContext";
import { updateAllOrder } from "../store/actions/currentOrderActions";
import { IOrder } from "../store/types/orderType";

const MainLogo = require("../assets/images/mainlogo.png");

export const GLOBAL_CARTID = "GLOBAL_CARTID";
export const GLOBAL_HOMEID = "GLOBAL_HOMEID";
const animationTheme = () => {
    const currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null;
    if (currentTheme) {
        document.documentElement.setAttribute("data-theme", currentTheme);
    }
};

const setNewTheme = (setCurrentTheme: (value: string) => void) => {
    const current = localStorage.getItem("theme");
    if (current === "light") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark"); //add this
        setCurrentTheme("dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light"); //add this
        setCurrentTheme("light");
    }
};
export const MenuHorizontal = () => {
    const [cartCounter, setCartCounter] = useState(0);
    const { currentOrderState, dispatch } = useContext(CurrentOrderContext);
    useEffect(() => {
        animationTheme();
        const memoryValue = localStorage.getItem("order");
        if (memoryValue) {
            const order: IOrder = JSON.parse(memoryValue);
            updateAllOrder(order, dispatch);
        }
    }, [dispatch]);

    useEffect(() => {
        const counter = currentOrderState.order.items.reduce((a, b) => a + (b.product ? b.quantity : 0), 0);
        setCartCounter(counter);
        localStorage.setItem("order", JSON.stringify(currentOrderState.order));
    }, [currentOrderState.order, currentOrderState.order.items, currentOrderState.order.customer]);

    const [currentTheme, setCurrentTheme] = useState(localStorage.getItem("theme"));
    const switchTheme = () => setNewTheme(setCurrentTheme);

    const themeIcon = currentTheme === "dark" ? "wahioicon-sun" : "wahioicon-moon";
    return (
        <header className="menu-horizontal">
            <ul className="ml-3 menu-horizontal-block">
                <li>
                    <NavLink to="/">
                        <img src={MainLogo} alt="" width="25px" />
                    </NavLink>
                </li>
                <li className="ml-2">
                    <NavLink id={GLOBAL_HOMEID} to="/">
                        Fast shopping
                    </NavLink>
                </li>
            </ul>

            <ul className="ml-auto mr-4 menu-horizontal-block">
                <li className="mr-2">
                    <button onClick={switchTheme} className="btn btn-circle">
                        <span className={themeIcon}></span>
                    </button>
                </li>
                <li>
                    <NavLink id={GLOBAL_CARTID} to="/myorder">
                        <div className="p-2 floating-value-container font-2">
                            {cartCounter > 0 && <span className="floating-value">{cartCounter}</span>}
                            <span className="wahioicon-shopping-cart"></span>
                        </div>
                    </NavLink>
                </li>
            </ul>
        </header>
    );
};
export default MenuHorizontal;
