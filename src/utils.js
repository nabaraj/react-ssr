import moment from "moment";

export const shortenUrl = () => {
    var url = "http://scratch99.com/web-development/javascript/";
    return url.replace('http://', '').replace('https://', '').split(/[/?#]/)[0];
}

export const timeDiff = (time) => {
    return moment(time).toNow(true)
}