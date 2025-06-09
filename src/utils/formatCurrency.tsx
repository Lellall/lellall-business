export function formatCurrency(
    amount,
    currencySymbol = "₦",
    decimalDigits = 2,
    decimalSeparator = ".",
    thousandSeparator = ","
) {
    if (amount === undefined || amount === null) {
        return currencySymbol + "0.00";
    }

    const fixedAmount = parseFloat(amount).toFixed(decimalDigits);
    const parts = fixedAmount.split(".");
    const integerPart = parts[0].replace(
        /\B(?=(\d{3})+(?!\d))/g,
        thousandSeparator
    );
    const decimalPart = parts[1] ? decimalSeparator + parts[1] : "";
    return currencySymbol + integerPart + decimalPart;
}
