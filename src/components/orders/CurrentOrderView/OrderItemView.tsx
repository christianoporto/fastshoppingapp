import React from "react";
import { formatMoney } from "../../../utils";

export default function OrderItemView({ price, name }: any) {
    return (
        <div className=" display-flex p-2 border-bottom">
            <div className="display-center-vertical ">
                <div className="fixed-size-sm rounded-sm bg-secondary mr-2">
                    <img className="image-cover" src="https://picsum.photos/200/300" alt="" />
                </div>
            </div>
            <div className="display-flex w-100">
                <div className="display-center-vertical">
                    <div>
                        <h4 className="m-0 text-overflow-ellipsis-2">{name}</h4>
                        <p className="m-0">cateoria</p>
                    </div>
                </div>
                <div className="ml-auto">
                    <div className="display-flex">
                        <div className="display-center-vertical mr-2  w-fixed-desk">
                            <div>
                                <p className="m-0 font-md text-secondary">Unit Price</p>
                                <p className="m-0">$34.345</p>
                            </div>
                        </div>
                        <div className="display-center-vertical mr-2">
                            <div className="input-control mr-2 overflow-hidden rounded-all w-fixed-110">
                                <button className="btn btn-circle min-height-auto w-100">
                                    <span className="wahioicon-minus"></span>
                                </button>
                                <input
                                    type="text"
                                    className="input-item text-center p-min font-md"
                                    style={{ maxWidth: "30px" }}
                                />
                                <button className="btn btn-circle min-height-auto w-100">
                                    <span className="wahioicon-plus"></span>
                                </button>
                            </div>
                        </div>
                        <div className="display-center-vertical mr-2 w-fixed-desk">
                            <h4>{price}</h4>
                        </div>
                        <div className="display-center-vertical ">
                            <button>
                                <span className="wahioicon-trash"></span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
