import React, { useState } from "react";
import "./style.scss";

interface IInputFieldd {
    onChange?: (e: any) => void;
    id: string;
    name: string;
    value?: string;
    placeholder: string;
    inputClass?: string;
    containerClass?: string;
    type?: string;
}

export default function InputTextField(props: IInputFieldd) {
    const inittext = props.value ? props.value : "";
    const [valueContent, setValueContent] = useState(inittext);

    const onChange = (e: any) => {
        setValueContent(e.target.value);
        if (props.onChange) props.onChange(e);
    };
    const setFocusInput = () => {
        var element = document.getElementById(props.id);
        if (element) element.focus();
    };
    return (
        <>
            <div className={`form__group field ${props.containerClass}`}>
                <input
                    type={props.type ? props.type : "text"}
                    className={`form__field ${props.inputClass}`}
                    placeholder={props.name}
                    onChange={onChange}
                    value={valueContent}
                    id={props.id}
                    name={props.name}
                    required
                />
                <label onClick={setFocusInput} htmlFor={props.name} className="form__label text-secondary">
                    {props.placeholder}
                </label>
            </div>
        </>
    );
}
