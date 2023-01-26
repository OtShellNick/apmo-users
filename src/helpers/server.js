import axios from "axios";

const baseURI = 'https://retoolapi.dev/eqsQ4S/'

export const Server = (method, uri, data) => {
    const fullURI = `${baseURI}${uri}`;
    return axios({
        method,
        url: fullURI,
        data
    })
    .then(({data}) => data);
}