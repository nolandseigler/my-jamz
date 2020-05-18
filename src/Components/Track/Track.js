import React from 'react';
import './Track.css';

class Track extends React.Component {

    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }


    //this modifies app.state.playlistTracks
    addTrack(e) {
        this.props.onAdd(this.props.track);
    }

    removeTrack(e) {
        this.props.onRemove(this.props.track);
    }

    renderAction() {
        return this.props.isRemoval ? <button onClick={this.removeTrack} className={"Track-action"}>-</button> : <button onClick={this.addTrack} className={"Track-action"}>+</button>;
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

export default Track;