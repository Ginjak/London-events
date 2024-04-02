import React, { useState } from "react";

const apiKey = "be6276a6cae66ea084423e5f81347f34";

const Play = () => {
  const [artistName, setArtistName] = useState("");
  const [trackName, setTrackName] = useState("");
  const [trackUrl, setTrackUrl] = useState("");

  const getRandomTrack = async () => {
    try {
      // Fetching a random track
      const response = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`
      );
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.tracks.track.length);
      const randomTrack = data.tracks.track[randomIndex];
      setArtistName(randomTrack.artist.name);
      setTrackName(randomTrack.name);
      getTrackInfo(randomTrack.artist.name, randomTrack.name);
    } catch (error) {
      console.error("Error fetching random track:", error);
    }
  };

  const getTrackInfo = async (artist, track) => {
    try {
      // Fetching track information
      const response = await fetch(
        `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&artist=${artist}&track=${track}&api_key=${apiKey}&format=json`
      );
      const data = await response.json();
      const trackInfo = data.track;
      if (trackInfo && trackInfo.url) {
        setTrackUrl(trackInfo.url);
      } else {
        console.error("Track URL not found");
      }
    } catch (error) {
      console.error("Error fetching track info:", error);
    }
  };

  const handlePlayTrack = () => {
    if (trackUrl) {
      const audioPlayer = new Audio(trackUrl);
      audioPlayer.play();
    } else {
      console.error("Track URL not available");
    }
  };

  return (
    <div>
      <h1>Play a Random Track</h1>
      <button onClick={getRandomTrack}>Get Random Track</button>
      <div>
        <strong>Artist:</strong> {artistName}
      </div>
      <div>
        <strong>Track:</strong> {trackName}
      </div>
      <button onClick={handlePlayTrack}>Play Track</button>
    </div>
  );
};

export default Play;
