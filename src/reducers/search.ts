import { IArtist, ITrack } from "src/models";
import { ISearchDataAction } from "../actions/search";
import * as constants from "../constants/actions/search";

export interface ISearchStoreState {
    tracks: ITrack[];
    artists: IArtist[],
    isLoading: boolean;
}

const initialState: ISearchStoreState = {
    tracks: [],
    artists: [],
    isLoading: false,
};

export default function searchReducer(
    state: ISearchStoreState = initialState,
    action: ISearchDataAction,
): ISearchStoreState {
    switch (action.type) {
        case constants.SEARCH_DATA_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case constants.SEARCH_DATA_SUCCESS:
            const tracks = action.payload;
            return {
                ...state,
                isLoading: false,
                tracks,
            };
        case constants.SEARCH_DATA_FAILURE:
            return {
                ...state,
                isLoading: false,
                tracks: [],
            };
        case constants.SEARCH_ARTIST_REQUEST:
            return {
                ...state,
                isLoading: true,
            };
        case constants.SEARCH_ARTIST_SUCCESS:
            const artists = action.payload;
            return {
                ...state,
                isLoading: false,
                artists,
            };
        case constants.SEARCH_ARTIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                artists: [],
            };
        default:
            return state;
    }
}
