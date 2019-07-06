
const APIXU_URL = (cityname) => (`http://api.apixu.com/v1/forecast.json?key=01b1d58699d7441eb7133613191006&q=${cityname}&days=5`);

export const getCityData = (err, res, cityname) => {
    fetch(APIXU_URL(cityname))
        .then(response => {
            if (response.ok) return response.json();
            throw Error("Communication error");
        })
        .then(json => {
            res(json);
        })
        .catch(e => err(e));
}

