import React, { useContext } from "react";
import { ICustomer } from "../../../store/types/customerTypes";
import { getFirstWord, formatPhoneNumber } from "../../../utils";
import { CurrentOrderContext } from "../../../store/contexts/CurrentOrderContext";
import { updateAllOrder } from "../../../store/actions/currentOrderActions";
interface IWelcomeBackProps {
    customer: ICustomer;
}
interface ILabel {
    title: string;
    value: string;
}

const InfoLabel = ({ title, value }: ILabel) => {
    return (
        <tr>
            <td className="text-secondary font-md fitwidth white-space-nowrap pr-2">{title}</td>
            <td>{value}</td>
        </tr>
    );
};
export default function WelcomeBack({ customer }: IWelcomeBackProps) {
    const simpleName = getFirstWord(customer.fullName);
    const { currentOrderState, dispatch } = useContext(CurrentOrderContext);
    const removeCustomer = () => {
        const { order } = currentOrderState;
        order.customer = undefined;
        order.customerId = undefined;
        updateAllOrder(order, dispatch, true);
    };
    return (
        <div>
            <h4>Welcome back, {simpleName}</h4>
            <div>
                <table>
                    <tbody>
                        <InfoLabel title="ID" value={customer.idNumber} />
                        <InfoLabel title="Address" value={customer.address} />
                        <InfoLabel title="Phone Number" value={formatPhoneNumber(customer.phoneNumber)} />
                        <InfoLabel title="Email" value={customer.email} />
                    </tbody>
                </table>
            </div>
            <div className="pt-3">
                <p
                    onClick={removeCustomer}
                    className="font-sm text-color-primary text-underline cursor-pointer  width-fit-content"
                >
                    Not {simpleName}? Lookup again
                </p>
            </div>
        </div>
    );
}
