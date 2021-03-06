import * as React from "react";
import { IAlbum, IArtist, ITrack } from "src/models";

import "./artist.scss";

import { MediaList } from "src/components/mediaList";
import { Cover } from "src/components/organisms/cover";
import { Tracks } from "src/components/tracks";

interface IArtistComponentProps {
  artist: IArtist;
  tracks: ITrack[];
  albums: IAlbum[];
  singles: IAlbum[];
  onPlayPage: () => void;
}

const Artist: React.FC<IArtistComponentProps> = ({
  artist,
  tracks,
  albums,
  singles,
  onPlayPage,
}) => {
  if (!artist) {
    return null;
  }

  return (
    <Cover
      title={artist.name}
      withActions={{
        onPlay: onPlayPage,
      }}
      image={artist.picture}
      listeners={artist.fans}
    >
      <div className="artist_tracks">
        <div className="artist_tracks_title">Popular</div>
        <Tracks className="artist_tracks_wrapper" tracks={tracks} />
      </div>
      {tracks.length > 0 && (
        <>
          {albums && albums.length > 0 && (
            <div className="artist_albums">
              <div className="artist_albums_title">Albums</div>
              <MediaList className="artist_albums_wrapper" type="album" list={albums} />
            </div>
          )}
          {singles && singles.length > 0 && (
            <div className="artist_albums">
              <div className="artist_albums_title">Singles and EP's</div>
              <MediaList className="artist_albums_wrapper" type="album" list={singles} />
            </div>
          )}
        </>
      )}
    </Cover>
  );
};

export default Artist;
