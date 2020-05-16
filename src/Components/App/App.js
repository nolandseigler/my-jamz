import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults;';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {

  constructor(props) {
      super(props);
      this.addTrack = this.addTrack.bind(this);
      this.removeTrack = this.removeTrack.bind(this);
      this.updatePlaylistName = this.removeTrack.bind(this);
      this.state = {
          searchResults: [],
          playlistName: '',
          playlistTracks: []
      }
  }

  addTrack(track) {
      //check to see if the track is in playlist by track.id
      let currentPlaylist = this.playlistTracks;
      if (!currentPlaylist.find(savedTrack => savedTrack.id === track.id)) {
          currentPlaylist.push(track);
          this.setState({ playlistTracks: currentPlaylist  })
      }
  }

  removeTrack(track) {
      let currentPlaylist = this.playlistTracks;
      currentPlaylist = currentPlaylist.filter(currentTrack => currentTrack.id !== track.id);
      this.setState({ playlistTracks: currentPlaylist });
  }

  updatePlaylistName(name) {
      this.setState({ playlistName: name });
  }

  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} />
              <Playlist onRemove={this.removeTrack} playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
