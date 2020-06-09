const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
};
export const dateUTC = date => {
    if (!date) return new Date(0, 0, 0);
    return new Date(date.replace("T", " ") + " UTC");
};
export const getLocalDate = date => {
    return dateUTC(date).toLocaleDateString("es-ES", options);
};
export const dateInputFormat = date => {
    if (typeof date.getMonth !== "function") {
        date = new Date(date);
        if (typeof date.getMonth !== "function") {
            return "";
        }
    }
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!

    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = "0" + dd;
    }
    if (mm < 10) {
        mm = "0" + mm;
    }
    return yyyy + "-" + mm + "-" + dd;
};
export const getTime12 = date => {
    date = new Date(date);
    if (typeof date.getMonth !== "function") return "---";
    var hour = date.getHours();
    var min = date.getMinutes();
    var ext = hour >= 12 ? "pm" : "am";
    if (hour > 12) {
        hour = hour % 12;
    }
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    return hour + ":" + min + " " + ext;
};
export function getTime(date) {
    date = new Date(date);
    if (typeof date.getMonth !== "function") return "";
    var hour = date.getHours();
    var min = date.getMinutes();
    if (hour < 10) hour = "0" + hour;
    if (min < 10) min = "0" + min;
    return hour + ":" + min;
}
