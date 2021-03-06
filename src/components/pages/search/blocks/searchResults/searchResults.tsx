import * as React from "react";
import { IArtist, ITrack } from "src/models";

import { Preview } from "src/components/organisms/preview";
import { Tracks } from "src/components/tracks";

import "./searchResults.scss";

interface ISearchResultsComponentProps {
    tracksLimit?: number,
    artistsLimit?: number,
    tracks?: ITrack[],
    artists?: IArtist[],
}

const SearchResults: React.FC<ISearchResultsComponentProps> = ({ tracksLimit, artistsLimit, tracks, artists }) => {
    const renderTracks = (): JSX.Element | null => {
        if (!tracks || tracks.length === 0) {
            return null;
        }
        const isResultsPage = tracks.length && artists && artists.length;
        const previewTrack = tracks[0];

        return (
            <>
                {
                    isResultsPage && <div className="search_tracks">
                        <Preview
                            className="search_tracks_top-result"
                            id={previewTrack.id}
                            title={previewTrack.title}
                            artist={previewTrack.artist}
                            artistId={previewTrack.artistId}
                            cover={previewTrack.coverBigTrack}
                            type="album"
                        />
                        <Tracks tracks={tracks} limit={tracksLimit} className="search_tracks_items" />
                    </div>
                }
                {!isResultsPage && <Tracks tracks={tracks} limit={tracksLimit} className="search_tracks_items" />}
            </>

        );
    }

    const renderAlbums = (): JSX.Element | null => {
        if (!artists || artists.length === 0) {
            return null;
        }

        const isShowTitle = tracks && tracks.length > 0;

        return (
            <>
                {isShowTitle && <p className="search_artists_title">Artists</p>}
                <div className="search_artists">
                    {
                        artists.slice(0, artistsLimit).map((artist) => {
                            return (
                                <Preview
                                    id={artist.id}
                                    key={artist.id}
                                    artist={artist.name}
                                    cover={artist.picture}
                                    artistId={artist.id}
                                    type="artist"
                                />
                            )
                        })
                    }
                </div>
            </>
        );
    }

    return (
        <div className="search_content">
            {renderTracks()}
            {renderAlbums()}
        </div>
    )
};

export default SearchResults;
