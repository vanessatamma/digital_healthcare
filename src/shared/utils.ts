
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
  //  return date.getHours() + ":" + date.getMinutes() + ", "+ date.toDateString();
}