export const apiHandler = {
    get(url) {
        const opts = { method: "GET" };
        return doApiCall(url, opts);
    },
};

const doApiCall = (url, options) => {
    const headers = {
        Accept: "application/json",
    };

    const opts = {
        ...options,
        headers: { ...headers, ...options.headers },
    };

    return fetch(url, opts).then((response) => responseHandler(response));
};

const responseHandler = (response) => {
    const { ok, status, url } = response;

    if (!ok) {
        console.error(`HTTP Error! STATUS: ${status}, URL: ${url}`);
    } else {
        return response.json();
    }
};
