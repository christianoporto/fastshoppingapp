import React, { useContext } from "react";
import { IProduct } from "../../store/types/productTypes";
import ProductCardView from "./ProductCardView";
import { CurrentOrderContext } from "../../store/contexts/CurrentOrderContext";
import { addProductToOrder } from "../../store/actions/currentOrderActions";

interface IProductList {
    items: IProduct[];
}

export default function ProductListView(props: IProductList) {
    const { dispatch } = useContext(CurrentOrderContext);
    const onClickProduct = (product: IProduct) => {
        addProductToOrder(product, dispatch);
    };
    return (
        <div>
            <div className="sancrisoft-responsive-row-md">
                {props.items.map((item, key) => (
                    <ProductCardView onClickProduct={onClickProduct} key={key} product={item} />
                ))}
            </div>
        </div>
    );
}
