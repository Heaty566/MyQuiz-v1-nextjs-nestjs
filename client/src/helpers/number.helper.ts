export const isNumeric = (str: string) => {
        if (typeof str != "string") return false;
        return !isNaN(Number(str)) && !isNaN(parseFloat(str));
};
