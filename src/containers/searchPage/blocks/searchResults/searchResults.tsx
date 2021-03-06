import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { Dispatch } from "redux";

import { IArtist, ITrack } from "src/models";
import { IStore } from "src/redux/store";

import { CSSTransition } from "react-transition-group";
import { SearchResults } from "src/components/pages/search/blocks/searchResults";
import {
  searchActions,
  searchSelectors,
} from "src/redux/search";

export interface ISearchingRouteProps {
  value: string;
}

interface ISearchResultsContainerProps extends RouteComponentProps<ISearchingRouteProps> {
  searchingValue: string;
  tracks?: ITrack[];
  artists?: IArtist[];
  isLoading?: boolean;
  onRedirectSearchingValue?: (redirectData: searchActions.IRedirectProps) => void;
}

const SearchResultsContainer: React.FC<ISearchResultsContainerProps> = ({
  searchingValue,
  tracks,
  artists,
  match,
  onRedirectSearchingValue,
}) => {
  React.useEffect(() => {
    const value = match.params.value || "";
    onRedirectSearchingValue && onRedirectSearchingValue({ tabName: "results", value });
  }, [searchingValue]);

  const hasData = !tracks || !tracks.length;

  return (
    <CSSTransition in={!hasData} timeout={500} classNames="transition">
      <SearchResults tracks={tracks} artists={artists} tracksLimit={5} artistsLimit={10} />
    </CSSTransition>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onRedirectSearchingValue:
    (data: searchActions.IRedirectProps) => dispatch(searchActions.redirectBySearchingValue(data)),
});

const mapStateToProps = (state: IStore) => ({
  searchingValue: searchSelectors.getSearchingValue(state),
  tracks: searchSelectors.getSearchTracks(state),
  artists: searchSelectors.getSearchArtists(state),
});

export default connect<{}, {}, ISearchResultsContainerProps>(
  mapStateToProps,
  mapDispatchToProps,
)(React.memo(SearchResultsContainer));
