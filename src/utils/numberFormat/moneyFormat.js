const customNumeral = require("numeral");
customNumeral.register("locale", "col", {
    delimiters: {
        thousands: ".",
        decimal: ",",
    },
    abbreviations: {
        thousand: "k",
        million: "m",
        billion: "b",
        trillion: "t",
    },
    ordinal: function (number) {
        return number === 1 ? "er" : "ème";
    },
    currency: {
        symbol: "$",
    },
});
customNumeral.locale("col");

export default customNumeral;
