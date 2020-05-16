import API_KEYS from '../keys';

let accessToken;
const clientId = API_KEYS.SPOTIFY.CLIENT_ID;
const redirectURI = 'http://localhost:3000';
const Spotify = {
    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }

        //check for accessToken match if it hasn't been set
        const path = window.location.href
        const tokenMatch = path.match(/access_token=([^&]*)/);
        const expiresMatch = path.match(/expires_in=([^&]*)/);

        if(tokenMatch && expiresMatch) {
            accessToken = tokenMatch[1];
            const expiresIn = Number(expiresMatch[1]);
            //clear token in order to grab new token when current expires
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        }
    }
};

export default Spotify;