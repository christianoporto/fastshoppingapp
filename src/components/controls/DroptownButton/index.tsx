import React, { useEffect } from "react";
import "./style.css";

const ignoreInternalClick = (element: any, result: Result) => {
    let child = element.parentElement;
    if (child) {
        if (child.matches(".dropdown-content")) {
            result.status = true;
            return;
        } else ignoreInternalClick(child, result);
    }
};
class Result {
    status: boolean = false;
}
const dropdownClickEvent = (options: IProps) => {
    window.onclick = function (event: any) {
        if (!event.target.matches(".dropbtn") && !event.target.matches(".dropbtnspan")) {
            if (options.ignoreInputClick && event.target.tagName === "INPUT") {
                return;
            }
            if (options.ignoreInternalClicks) {
                let value: Result = new Result();
                ignoreInternalClick(event.target, value);
                if (value.status) return;
            }

            var dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains("show")) {
                    openDropdown.classList.remove("show");
                }
            }
        }
    };
};
interface IProps {
    id: string;
    right?: boolean;
    ignoreInputClick?: boolean;
    ignoreInternalClicks?: boolean;
    dropdownClass?: string;
    btnClass?: string;
    children: any;
    icon?: string;
    name?: string;
    value: string;
    iconName?: string;
    nameNowrap?: boolean;
}
export default function DropdownButton(props: IProps) {
    useEffect(() => {
        dropdownClickEvent(props);
    }, [props]);
    const dropdownId = `dropdown-${props.id}`;
    const onClickShow = () => {
        const resultDocument = window.document.getElementById(dropdownId);
        if (resultDocument) {
            resultDocument.classList.toggle("show");
        }
    };
    const showToRight = props.right ? "right-0" : "";
    const dropdownclass = props.dropdownClass ? props.dropdownClass : "";
    const icon = props.iconName ? props.iconName : "wahioicon-arrow-down-chevron";
    const nowrapname = props.nameNowrap ? "white-space-nowrap" : "";
    return (
        <div className={`dropdown ${dropdownclass}`}>
            <button
                type="button"
                className={`dropbtn btn-dropdown cursor-pointer ${props.btnClass}`}
                onClick={onClickShow}
            >
                {props.icon && <span className={`${props.icon} mr-2`}></span>}
                {props.name && <span className="dropbtnspan mr-2">{props.name}:</span>}
                {props.value && <span className={`dropbtnspan mr-1 ${nowrapname}`}>{props.value}</span>}
                <span className={`dropbtnspan display-center-vertical ${icon}`}></span>
            </button>
            <div id={dropdownId} className={`dropdown-content ${showToRight}`}>
                {props.children}
            </div>
        </div>
    );
}
