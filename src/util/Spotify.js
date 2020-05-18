import API_KEYS from '../keys';

const CLIENT_ID = API_KEYS.SPOTIFY.CLIENT_ID;
const REDIRECT_URI = 'http://localhost:3000';
let accessToken;
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
        } else {
            const accessURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
            window.location = accessURL;
        }
    },
    search(term) {
        const accessToken = Spotify.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(response => response.json())
            .then(jsonResponse => {
                if(!jsonResponse.tracks) {
                    return [];
                } else {
                    return jsonResponse.tracks.items.map(track => ({
                       id: track.id,
                       name: track.name,
                       artist: track.artist[0].name,
                       album: track.album.name,
                       uri: track.uri
                    }));
                }
            })
    },
    savePlaylist(name, trackURIs) {
        if(!name || !trackURIs) {
            return;
        } else {
            const accessToken = Spotify.getAccessToken();
            const headers = { Authorization: `Bearer ${accessToken}` };
            let userId;

            return fetch(`https://api.spotify.com/v1/me`, { headers: headers })
                .then(response => response.json())
                .then(jsonResponse => {
                    userId = jsonResponse.id;
                    return fetch(`https://api.spotify/com/v1/users/${userId}/playlists`, {
                        headers: headers,
                        method: 'POST',
                        body: JSON.stringify({ name: name })
                    })
                        .then(response => response.json())
                        .then(jsonResponse => {
                            const playlistId = jsonResponse.id;
                            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                                headers: headers,
                                method: 'POST',
                                body: JSON.stringify({ uris: trackURIs})
                            });
                        })
                })
        }
    }
};


export default Spotify;