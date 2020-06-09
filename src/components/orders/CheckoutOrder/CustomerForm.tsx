import React, { useContext } from "react";
import InputTextField from "../../controls/InputTextField";
import { IPropsOrder } from ".";
import { updateAllOrder } from "../../../store/actions/currentOrderActions";
import { CurrentOrderContext } from "../../../store/contexts/CurrentOrderContext";

export default function CustomerForm({ order }: IPropsOrder) {
    const { customerNew } = order;
    const { dispatch } = useContext(CurrentOrderContext);

    const onChange = (e: any) => {
        let copyCustomer = customerNew;
        copyCustomer = {
            ...copyCustomer,
            [e.target.name]: e.target.value,
        };
        updateAllOrder({ ...order, customerNew: copyCustomer }, dispatch, true);
    };
    console.log("CUSTOMERNEW: ", order);
    return (
        <div>
            <InputTextField
                value={customerNew.fullName}
                onChange={onChange}
                containerClass="mb-3"
                id="customername"
                name="fullName"
                placeholder="Full name"
            />
            <InputTextField
                onChange={onChange}
                value={customerNew.email}
                containerClass="mb-3"
                id="customeremail"
                name="email"
                placeholder="Email"
            />
            <div className="display-flex">
                <InputTextField
                    onChange={onChange}
                    value={customerNew.idNumber}
                    containerClass="mb-3 mr-2 w-100"
                    id="customeridnumber"
                    name="idNumber"
                    placeholder="ID"
                />
                <InputTextField
                    onChange={onChange}
                    value={customerNew.phoneNumber}
                    containerClass="mb-3 w-100"
                    id="customerphone"
                    name="phoneNumber"
                    placeholder="Phone number"
                />
            </div>
            <InputTextField
                onChange={onChange}
                value={customerNew.address}
                containerClass="mb-3"
                id="customeraddress"
                name="address"
                placeholder="Address"
            />
        </div>
    );
}
