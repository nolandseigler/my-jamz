import React from 'react';
import logo from './logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults;';
import PlayList from '../Playlist/Playlist';

class App extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
          searchResults: [],
          playlistName: '',
          playlistTracks: []
      }
  }

  render() {
    return (
        <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar />
            <div className="App-playlist">
              <SearchResults searchResults={this.state.searchResults} />
              <PlayList playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
