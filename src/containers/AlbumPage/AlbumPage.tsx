import * as React from "react";

import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IStore } from "src/redux/store";

import { RouteComponentProps } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import { albumActions, albumSelectors } from "src/redux/album";

import { artistActions } from "src/redux/artist";

import { Album } from "src/components/pages/album";
import { useBackground } from "src/containers/hooks/useBackground";

import { IAlbum, ITrack } from "src/models";

// import { getAlbumData, getAlbumLoadingStatus } from "src/reducers/album/selectors";

interface IRouteProps {
  id: string;
}

interface IAlbumContainerProps extends RouteComponentProps<IRouteProps> {
  album?: IAlbum;
  isLoading?: boolean;
  onFetchAlbumData?: (id: string) => void;
  onPlayPage: (t: ITrack[]) => void;
}

const AlbumPage: React.FC<IAlbumContainerProps> = ({
  album,
  onFetchAlbumData,
  onPlayPage,
  isLoading,
  match,
}) => {
  React.useEffect(() => {
    onFetchAlbumData && onFetchAlbumData(match.params.id);
  }, [match.params.id]);

  useBackground(match.params.id);

  const handlePlayPage = () => {
    album && album.tracks && onPlayPage(album.tracks);
  };

  return (
    <CSSTransition in={!isLoading} timeout={500} classNames="album-transition">
      <Album album={album} onPlayAlbum={handlePlayPage} />
    </CSSTransition>
  );
};

const mapStateToProps = (state: IStore) => ({
  album: albumSelectors.getAlbumData(state),
  isLoading: albumSelectors.getAlbumLoadingStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onFetchAlbumData: (id: string) => dispatch(albumActions.fetchAlbumData(id)),
  onPlayPage: (tracks: ITrack[]) => dispatch(artistActions.playPage(tracks)),
});

export default connect<{}, {}, IAlbumContainerProps>(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumPage);
