
export const capitalizeString = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

export const formattedShortDate = (date: string) => {
    function pad(s: string | number) { return (s < 10) ? '0' + s : s; }
    const d = new Date(date)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
}

export const formattedLastLoginDate = (timeStamp: string) => {
    const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    return new Date(Number(timeStamp)).toLocaleString('it-IT', options as any);
}

export const isEmptyObject = (obj: any) => {
    if(obj !== undefined && obj) {
        return Object.keys(obj).length === 0;
    }
}

export const checkIfNull = (value: string) => {
    if(!value || value === 'undefined') return '-';

    return value;
}

export const recursivelyNullifyUndefinedValues = (obj: any) => {
    Object
        .entries(obj)
        .forEach(([key, value]) => {
            if (!!value && (typeof value === 'object')) {
                recursivelyNullifyUndefinedValues(value);
            } else if (value === undefined) {
                obj[key] = null;
            }
        });
    return obj;
}

export const inverseRecursivelyNullifyUndefinedValues = (obj: any, valueToWrite?: string) => {
    Object
        .entries(obj)
        .forEach(([key, value]) => {
            if (!!value && (typeof value === 'object')) {
                recursivelyNullifyUndefinedValues(value);
            } else if (value === null) {
                if(valueToWrite) {
                    obj[key] = valueToWrite;
                } else {
                    obj[key] = undefined;
                }
            }
        });
    return obj;
}