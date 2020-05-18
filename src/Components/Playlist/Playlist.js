import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleNameChange(e) {
        console.log(e.target.value);
        this.props.onNameChange(e.target.value);
    }

    render() {
      return (
          <div className="Playlist">
              <input onChange={this.handleNameChange} defaultValue={this.props.playlistName}/>
              <TrackList isRemoval={true} onRemove={this.props.onRemove} tracks={this.props.playlistTracks} />
              <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
          </div>
      );
    }
}

export default Playlist;