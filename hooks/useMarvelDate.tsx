import { ComicDate } from "../models/comic";

const useComicDate = (dates?: ComicDate[], type = "onsaleDate"): string => {
    if (!dates || !dates.length) { return "No date available"; }

    const locale = 'en-us';
    const formatOptions: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' }
    const dateObj = dates.find(date => date.type === type) || dates[0];

    // IE11 has trouble with the TimeZone part of the date, so remove the time entirely
    const date = dateObj.date ? new Date(dateObj.date.split('T')[0]) : null;

    return date ? date.toLocaleDateString(locale, formatOptions) : "No date available";
}

export default useComicDate;