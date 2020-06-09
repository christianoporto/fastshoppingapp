import React, { useContext, useEffect, useState } from "react";
import ViewContainer from "../../containers/ViewContainer";
import ReactPaginate from "react-paginate";
import { ProductContext } from "../../store/contexts/ProductContext";
import { fetchProductsInPages } from "../../store/actions/productActions";
import LoadingDualRing from "../../animations/LoadingDualRing";
import ProductListView from "./ProductListView";
import CardAlert from "../controls/CardAlert";
import { orderItems } from "./utils";
import ButtonOrderList from "./ButtonOrderList";
require("dotenv").config();

const PAGESIZE = 20;

const orderOptions = ["Lower price", "Higher price", "Alphabetical"];

export default function ProductListViewContainer() {
    const { productState, dispatch } = useContext(ProductContext);
    const [orderOption, setOrderOption] = useState<string | undefined>(undefined);

    useEffect(() => {
        document.title = "Fast shopping | Product list";
        if (productState.pagination.items.length === 0) {
            fetchProductsInPages({ currentPage: 1, pageSize: PAGESIZE }, dispatch);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleChangePage = (page: number) => {
        if (productState.pagination.totalPages) {
            page += 1;
            if (page <= productState.pagination.totalPages && page > 0) {
                fetchProductsInPages({ currentPage: page, pageSize: PAGESIZE }, dispatch);
            }
        }
    };

    if (productState.isFetchError) {
        const message = productState.errorMessage
            ? productState.errorMessage
            : "Sorry, there was an unexpected error trying to load the product list, we are working hard to fix the problem";
        return (
            <ViewContainer>
                <CardAlert className="m-2" message={message} type="danger" />
            </ViewContainer>
        );
    }
    const pagination = productState.pagination;
    let printItems = pagination.items;

    if (!productState.isFetching && printItems.length === 0) {
        return (
            <div className="p-3 bg-secondary rounded-md m-2">
                <span className="wahioicon-cart"></span> <small>No products in inventory yet</small>
            </div>
        );
    }
    if (orderOption) {
        printItems = orderItems(printItems, orderOption);
    }
    const sortTitle = orderOption ? orderOption : "";
    let pageCount = 0;
    const showPagination = (): boolean => {
        if (pagination.totalPages) {
            pageCount = pagination.totalPages;
            return pagination.totalPages > 1;
        } else {
            return false;
        }
    };

    return (
        <ViewContainer>
            <div className="p-3">
                {printItems.length > 0 && (
                    <ButtonOrderList orderOptions={orderOptions} setOrderOption={setOrderOption} title={sortTitle} />
                )}
                {productState.isFetching ? (
                    <LoadingDualRing center={true} className="mt-3" />
                ) : (
                    <ProductListView items={printItems} />
                )}
                {showPagination() && (
                    <div className="mt-4">
                        <ReactPaginate
                            previousLabel={<span className="wahioicon-arrow-left"></span>}
                            nextLabel={<span className="wahioicon-arrow-right"></span>}
                            breakLabel={"..."}
                            breakClassName={"break-me"}
                            pageCount={pageCount}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={(page) => handleChangePage(page.selected)}
                            containerClassName={"sancrisoft-pagination"}
                            activeClassName={"active"}
                        />
                    </div>
                )}
            </div>
        </ViewContainer>
    );
}
