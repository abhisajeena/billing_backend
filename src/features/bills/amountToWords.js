const { toWords } = require("number-to-words");

const amountToWords = (amount) => {

    return (
        toWords(Math.round(amount))
            .replace(/\b\w/g, char => char.toUpperCase()) +
        " Rupees Only"
    );

};

module.exports = amountToWords;