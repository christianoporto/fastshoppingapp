import React, { useState, useContext } from "react";
import InputTextField from "../../controls/InputTextField";
import { fetchCusmtomerByEmail } from "../../../store/actions/customerActions";
import { updateAllOrder } from "../../../store/actions/currentOrderActions";
import { CurrentOrderContext } from "../../../store/contexts/CurrentOrderContext";
import WelcomeBack from "./WelcomeBack";
import { IOrder } from "../../../store/types/orderType";
import LoadingDualRing from "../../../animations/LoadingDualRing";

interface IProps {
    order: IOrder;
}

export default function ExistingCustomerForm(props: IProps) {
    const { order } = props;
    const { dispatch } = useContext(CurrentOrderContext);
    const [searchEmail, setSearchEmail] = useState("");
    const [notFoundCustomer, setNotFoundCustomer] = useState(false);
    const [isFetchingEmail, setIsFetchingEmail] = useState(false);
    const onSubmitEmail = (e: any) => {
        e.preventDefault();
        if (searchEmail.length === 0) return;
        setIsFetchingEmail(true);
        fetchCusmtomerByEmail(searchEmail, (result) => {
            if (result) {
                let neworder = order;
                neworder.customerId = result.id;
                neworder.customer = result;
                updateAllOrder(neworder, dispatch, true);
                setIsFetchingEmail(false);
            } else {
                setNotFoundCustomer(true);
                setIsFetchingEmail(false);
            }
        });
    };

    const onChange = (e: any) => {
        setNotFoundCustomer(false);
        setSearchEmail(e.target.value);
    };

    const { customer, customerId } = order;
    return (
        <div>
            {!customerId && (
                <form onSubmit={onSubmitEmail}>
                    <InputTextField
                        containerClass="mb-2"
                        onChange={onChange}
                        type="email"
                        id="customeremail"
                        name="email"
                        placeholder="Email"
                    />
                    <div className="display-flex">
                        {isFetchingEmail && <LoadingDualRing />}
                        {notFoundCustomer && (
                            <p className="m-0 text-danger display-center-vertical">No record found with email</p>
                        )}
                        <button disabled={searchEmail.length === 0} type="submit" className="btn btn-primary ml-auto">
                            Lookup
                        </button>
                    </div>
                </form>
            )}
            {customerId && customer && <WelcomeBack customer={customer} />}
        </div>
    );
}
