const getAxiosConfig = () => {
    return {
        headers: {
            'x-api-key': process.env.POSTMAN_API_KEY,
            Accept: 'application/vnd.api.v10+json',
            'Content-Type': 'application/json',
        }
    }
}

module.exports = {getAxiosConfig};
