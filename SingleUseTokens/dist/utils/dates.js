"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDate = exports.compareDates = exports.getCurrentTimeAndDate = exports.addHoursToADate = void 0;
const addHoursToADate = (dateParam, hoursParam) => {
    const date = new Date(dateParam); // April 1, 2023 at 12:00:00 UTC
    const hoursToAdd = hoursParam;
    date.setHours(date.getHours() + hoursToAdd);
    return date.toISOString();
};
exports.addHoursToADate = addHoursToADate;
const getCurrentTimeAndDate = () => {
    const fechaActual = new Date();
    return fechaActual;
};
exports.getCurrentTimeAndDate = getCurrentTimeAndDate;
const compareDates = (endDate, startDate) => {
    return endDate > startDate ? true : false;
};
exports.compareDates = compareDates;
const formatDate = (date) => {
    return new Date(date);
};
exports.formatDate = formatDate;
//# sourceMappingURL=dates.js.map