import React, { useState } from "react";
import { IProduct, IProductCategory } from "../../store/types/productTypes";
import { formatMoney, stringIsNullOrEmpty } from "../../utils";
import "../../animations/fadeEffects/fadeInLeft.css";
const EmptyImage = require("../../assets/images/emptyimage.png");

interface IProductCard {
    product: IProduct;
    onClickProduct: (product: IProduct) => void;
}
interface ICategoryView {
    categories: IProductCategory[];
}
const CategoriesView = ({ categories }: ICategoryView) => {
    if (categories && categories.length > 0) {
        let categoryNames: string[] = [];
        categories.forEach((element) => {
            if (element.category) {
                categoryNames.push(element.category.name);
            }
        });
        return <span className="font-md text-secondary">{categoryNames.join(" ")}</span>;
    }
    return <span className="font-sm text-secondary">Not category</span>;
};
const ProductCardView = ({ product, onClickProduct }: IProductCard) => {
    const [addCounter, setAddCounter] = useState(0);
    const image = stringIsNullOrEmpty(product.image) ? EmptyImage : product.image;
    return (
        <div className="sancrisoft-responsive-col p-2 selectable-card border rounded-md">
            <div className="card-image display-center-vertical ">
                <div className="image-size rounded-sm border position-relative">
                    <img className="image-cover" src={image} alt={product.name} />
                </div>
            </div>
            <div className="card-content position-relative">
                <h4 className="m-0 text-overflow-ellipsis-2">{product.name}</h4>
                <p className="m-0">
                    <CategoriesView categories={product.categories} />
                </p>
                <p className="m-0 font-md text-overflow-ellipsis-2 pt-2">{product.description}</p>
                <div className="mt-auto">
                    <div className="mt-2 display-flex flex-flow-wrap position-relative">
                        {addCounter > 0 && (
                            <button key={addCounter} className="floating-value-top btn btn-circle fade-in-left">
                                <span className="wahioicon-check-fill"></span>
                            </button>
                        )}
                        <button
                            onClick={() => {
                                onClickProduct(product);
                                setAddCounter(addCounter + 1);
                            }}
                            className="btn rounded-all btn-primary-outline  mr-2"
                        >
                            <span className="wahioicon-cart"></span> <span>Add to cart</span>
                        </button>

                        <h4 className="m-0 display-center-vertical ml-auto">{formatMoney(product.price)}</h4>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ProductCardView;
