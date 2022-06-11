export function formatDateTime(datetime, type=null) {
    if (!datetime) {
        if (type && type === "done") {
            return "Not done yet";
        }
        return "Not available";
    }

    let date = datetime.substr(0, datetime.indexOf('T'));
    datetime = datetime.substr(datetime.indexOf('T') + 1);
    let time = datetime.substr(0, 8);
    return date + '\t' + time + ' UTC';
}

export function formatDateTimeToLocal(datetime, type=null) {
    if (!datetime) {
        if (type && type.toLowerCase() === "done") {
            return "Not done yet";
        }
        return "Not available";
    }
    let localDatetime = new Date(datetime);
    localDatetime = localDatetime.toLocaleString().replace(", ", "\t");

    const indexOfSeconds = localDatetime.lastIndexOf(":");
    localDatetime = localDatetime.slice(0, indexOfSeconds) + localDatetime.slice(indexOfSeconds+3);

    return localDatetime;
}

export function formatDateTimeOnlyDate(datetime) {
    if (!datetime) {
        return "";
    }
    if (datetime.indexOf('T') >= 0) {
        return datetime.substr(0, datetime.indexOf('T'));
    }
    return datetime.substr(0, 10);
}

export function formatDisplayNameRemoveNokia(displayName) {
    if (displayName) {
        if (!displayName.includes("Nokia")) {
            return displayName;
        }
        let newDisplayName = displayName.replace("(Nokia -", "");
        newDisplayName = newDisplayName.replace(")", "");
        return newDisplayName;
    }
    return displayName;
}

export function capitalizeFirstLetter(word) {
    if (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
    } else {
        return "";
    }
}
