import { PlayerActionType } from "src/actions/player";
import { getItemFromLocalStorage } from "src/helpers/fromLocalStorage";
import { ITrack } from "src/models";
import { PLAY_PAGE } from "../../constants/actions/artist";
import * as constants from "../../constants/actions/player";

export interface IPlayerStoreState {
    playlist: ITrack[];
    prevPlaylist: ITrack[],
    source: ITrack | null;
    timing: number;
    isLoading: boolean;
    isShuffled: boolean;
    isPlaying: boolean;
    isPausing: boolean;
    isRepeat: boolean,
    volume: number;
}

const initialState: IPlayerStoreState = {
    playlist: getItemFromLocalStorage<ITrack[]>("playlist") || [],
    prevPlaylist: [],
    source: getItemFromLocalStorage<ITrack>("audio"),
    timing: getItemFromLocalStorage<number>("timingAudio") || 0,
    isLoading: false,
    isPlaying: false,
    isShuffled: false,
    isPausing: true,
    isRepeat: false,
    volume: 100,
};

interface IPlayerAction {
    type: PlayerActionType | PLAY_PAGE;
    payload: ITrack[] & ITrack & number;
}


export default function playerReducer(
    state: IPlayerStoreState = initialState, action: IPlayerAction): IPlayerStoreState {
    switch (action.type) {
        case PLAY_PAGE: {
            const playlist = action.payload;
            return {
                ...state,
                isPausing: false,
                isPlaying: true,
                playlist,
                source: playlist[0],
                timing: 0,
            }
        }

        case constants.SHUFFLE_PLAYLIST: {
            const tracks =  !state.isShuffled ? [...state.playlist] : [...state.prevPlaylist];
            const prevPlaylist = !state.isShuffled ? [...state.playlist]  : [];
            !state.isShuffled && tracks.sort(() => Math.random() - 0.5);

            return {
                ...state,
                isShuffled: !state.isShuffled,
                playlist: tracks,
                prevPlaylist,
            }
        }

        case constants.REPEAT_AUDIO: {
            return {
                ...state,
                isRepeat: !state.isRepeat,
            }
        }

        case constants.UPDATE_PLAYLIST: {
            const playlist = action.payload.length ? action.payload : state.playlist;
            return {
                ...state,
                isShuffled: false,
                playlist,
            }
        }

        case constants.CONTINUE_AUDIO:
            return {
                ...state,
                isPlaying: true,
                isPausing: false,
            }

        case constants.CHANGE_VOLUME:
            const volume = action.payload;
            return {
                ...state,
                volume,
            };


        case constants.SAVE_AUDIO:
            const audio = action.payload;
            return {
                ...state,
                isPausing: false,
                isPlaying: true,
                source: audio,
                timing: 0,
            };

        case constants.PAUSE_AUDIO:
            return {
                ...state,
                isPausing: true,
                isPlaying: false,
            }
        case constants.UPDATE_DURATION:
            return {
                ...state,
                timing: action.payload,
            }
        case constants.NEXT_AUDIO:
            return {
                ...state,
            };
        case constants.PREV_AUDIO:
            return {
                ...state,
            };
        default:
            return state;
    }
}
