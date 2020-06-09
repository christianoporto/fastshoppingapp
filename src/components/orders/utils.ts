import { IOrder } from "../../store/types/orderType";

export const getTotalAmount = (order: IOrder) => {
    return order.items.reduce((a, b) => a + (b.product ? b.product.price * b.quantity : 0), 0);
};

export const getContainerWidth = (containerId: string) => {
    let element = document.getElementById(containerId);
    if (element) return element.clientWidth;
    return 700;
};
export const lisetenerContainerResize = (setContainerWidth: (value: number) => void, containerId: string) => {
    window.addEventListener("resize", containerResize);
    function containerResize() {
        let element = document.getElementById(containerId);
        if (element) setContainerWidth(element?.clientWidth);
    }
};