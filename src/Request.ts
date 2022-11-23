export const Request = (url: string, params: any, updatedParams: any) => new Promise((resolve, reject) => {
    const preparedParams = Object.keys(params).reduce((a, x) => {
        a += `${x}=${updatedParams[x]}&`;
        return a;
    }, "");

    fetch(url + '?' + preparedParams)
        .then((response) => response.json())
        .then((response) => {
            if (!response.response) {
                console.log({
                    type: 'error',
                    url,
                    params,
                    response: JSON.stringify(response),
                });
                return reject(response.error);
            }

            return resolve(response.response);
        })
        .catch((e) => reject(e));
});