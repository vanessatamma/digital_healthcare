
export const capitalizeString = (word: string) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
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