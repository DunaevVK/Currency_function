const URL_API = 'https://robinsonbangrak.valueplusexchange.com/api/index.php?route=currency';
const METOD = 'GET';
let curB = {};
let parseCurB = 0;

function fetch(METOD, URL) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === xhr.DONE && xhr.status === 200) {
            curB = JSON.parse(xhr.response);
            return parseCurB = +(curB.result[0].crate);
        }
    }
    xhr.open(METOD, URL_API);

    xhr.send();
}
fetch(METOD, URL_API);

