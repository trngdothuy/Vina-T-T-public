// const URL = `http://localhost:3040`;

const URL =
    window.location.hostname === `localhost`
        ? `http://localhost:3040` // 3040 should be replaced with your server port
        : `http://159.89.11.31`; // it should be replaced with actual domain during the deployment

export { URL };
