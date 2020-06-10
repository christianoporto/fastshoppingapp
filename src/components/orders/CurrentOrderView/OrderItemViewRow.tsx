import React from "react";
import { IOrderItem } from "../../../store/types/orderType";
import { formatMoney, stringIsNullOrEmpty } from "../../../utils";
const EmptyImage = require("../../../assets/images/emptyimage.png");

interface IProps {
    tableWidth: number;
    index: number;
    onRemove: (value: IOrderItem) => void;
    onQuantityChange: (value: IOrderItem, sum: number) => void;
    orderItem: IOrderItem;
}

export default function OrderItemViewRow(props: IProps) {
    const { tableWidth, orderItem, onQuantityChange } = props;
    const { product } = orderItem;
    const image = stringIsNullOrEmpty(product.image) ? EmptyImage : product.image;
    const btnAdd = () => {
        return (
            <div>
                <div style={{ width: "100px" }} className="input-control overflow-hidden rounded-all w-fixed-110">
                    <button onClick={() => onQuantityChange(orderItem, -1)} className="btn btn-circle min-height-auto w-100">
                        <span className="wahioicon-minus"></span>
                    </button>
                    <span className="text-center w-100">{orderItem.quantity}</span>
                    <button onClick={() => onQuantityChange(orderItem, 1)} className="btn btn-circle min-height-auto w-100">
                        <span className="wahioicon-plus"></span>
                    </button>
                </div>
            </div>
        );
    };
    const isRow = tableWidth > 615;
    const total = product.price * orderItem.quantity;
    return (
        <tr className=" ">
            {isRow && <td className="pl-2 fitwidth font-md text-secondary">{props.index}</td>}
            <td className="fitwidth">
                <div className="fixed-size-sm rounded-sm mr-2">
                    <img className="image-cover" src={image} alt={product.name} />
                </div>
            </td>
            <td>
                {product.name}
                <div>
                    <p className="m-0 text-secondary show-mobile font-md">
                        categories {!isRow && <span className="font-md">• {formatMoney(product.price)}</span>}
                    </p>
                    {!isRow && (
                        <div className="mt-2 display-flex">
                            {btnAdd()}
                            <div className="display-center-vertical ml-2">
                                <p className="m-0">{formatMoney(total)}</p>
                            </div>
                        </div>
                    )}
                </div>
            </td>
            {isRow && (
                <td className="hide-mobile">
                    <div>
                        <p className="m-0 font-sm text-secondary">Unit Price</p>
                        <p className="m-0">{formatMoney(product.price)}</p>
                    </div>
                </td>
            )}
            {isRow && <td className="fitwidth text-secondary hide-mobile">{btnAdd()}</td>}
            {isRow && <td className="fitwidth text-secondary hide-mobile">{formatMoney(total)}</td>}
            <td className="fitwidth">
                <button onClick={() => props.onRemove(orderItem)} className="btn btn-circle">
                    <span className="wahioicon-trash"></span>
                </button>
            </td>
        </tr>
    );
}
