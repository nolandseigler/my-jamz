import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';


class App extends React.Component {

  constructor(props) {
      super(props);
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.savePlaylist = this.savePlaylist.bind(this);
      this.search = this.search.bind(this);
      this.updatePlaylistName = this.updatePlaylistName.bind(this);
      this.state = {
          searchResults: [],
          playlistName: 'New Playlist',
          playlistTracks: []
      }
  }

  addTrack(track) {
      //check to see if the track is in playlist by track.id
      let currentPlaylist = this.state.playlistTracks;
      if (currentPlaylist.find(savedTrack => savedTrack.id === track.id)) {
          return;
      }
      currentPlaylist.push(track);
      this.setState({ playlistTracks: currentPlaylist  })
  }

  removeTrack(track) {
      let currentPlaylist = this.state.playlistTracks;
      currentPlaylist = currentPlaylist.filter(currentTrack => currentTrack.id !== track.id);
      this.setState({ playlistTracks: currentPlaylist });
  }

  savePlaylist() {
      const trackURIs = this.state.playlistTracks.map(track => track.uri);
      Spotify.savePlaylist(this.state.playlistName, trackURIs)
          .then(() => {
              this.setState({
                  playlistName: 'New Playlist',
                  playlistTracks: []
              });
          });
  }

  search(term) {
     Spotify.search(term)
         .then(searchResults => this.setState({ searchResults: searchResults }));
  }

  updatePlaylistName(name) {
      this.setState({ playlistName: name });
  }

  render() {
    return (
        <div>
          <h1>My<span className="highlight">Jamz</span></h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">
              <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
              <Playlist onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
