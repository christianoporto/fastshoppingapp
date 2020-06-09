import customNumeral from "./numberFormat/moneyFormat";
import customMoment from "./momentFormat/dateFormat";

export const getUtcDate = (stringDate: string) => {
    if (stringDate[stringDate.length - 1] === "Z") return new Date(stringDate);
    return new Date(`${stringDate}Z`);
};
export const datetime7FormatUtc = `YYYY-MM-DDTHH:mm:ss:sssssssZ`;

export const getDateFromNow = (value: Date) => {
    const dateutc = getUtcDate(value.toString());
    return customMoment(dateutc).fromNow();
};
export const getDateFormatL = (value?: Date) => {
    if (!value) return "Invalid date";
    return customMoment(getUtcDate(value.toString())).format("LLLL");
};
export const getDateFormat = (value: Date, format: string) => {
    if (!value) return "Invalid date";
    return customMoment(getUtcDate(value.toString())).format(format);
};
export const joinUrl = (base: string, value: string) => {
    if (base && base.charAt(base.length - 1) === "/") {
        return base + value;
    } else return `${base}/${value}`;
};

export const capitalize = (value: string) => {
    if (typeof value !== "string") return "";
    return value.charAt(0).toUpperCase() + value.slice(1);
};
export const stringIsNullOrEmpty = (value?: string) => {
    return !value || value === "" || value === null;
};

export const formatMoney = (value: string | number) => {
    var number = customNumeral(value);
    return number.format("$0,0.[00]");
};

export const getRandomString = () => {
    let r = Math.random().toString(36).substring(7);
    return r;
};
export const getElementYPosition = (containerId: string, plus: number, defaultValue: number) => {
    let element = document.getElementById(containerId);
    var posi = element?.getBoundingClientRect();
    if (posi) {
        let topposition = posi?.y;
        topposition = topposition === 0 ? defaultValue - plus : topposition;
        return topposition + plus;
    }
    return defaultValue;
};

export const wahioStringFormat = (value: string, ...params: any[]) => {
    return value.replace(/{(\d+)}/g, function (match, number) {
        return typeof params[number] != "undefined" ? params[number] : match;
    });
};
export function formatPhoneNumber(phoneNumberString: string) {
    var cleaned = ("" + phoneNumberString).replace(/\D/g, "");
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
    if (match) {
        var intlCode = match[1] ? "+1 " : "";
        return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
    }
    return phoneNumberString;
}
export const getFirstWord = (value: string) => {
    value = value.trim();
    if (value.includes(" ")) {
        const arr = value.split(" ");
        return arr[0];
    }
    return value;
};
