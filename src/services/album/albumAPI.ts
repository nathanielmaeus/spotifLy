import { IAlbum, ITrack } from "src/models";
import { getData } from "../api";

export interface IAlbumData {
  response?: IAlbum;
  error?: object;
}

export const fetchAlbumDataApi = (id: number): Promise<IAlbumData | void> => {
  const promise = getData({ url: `/album/${id}` })
    .then((response) => {
      const { data } = response;

      const tracks = data.tracks.data.map(
        (item: any): ITrack => ({
          id: item.id,
          title: item.title,
          artist: item.artist.name,
          artistId: item.artist.id,
          duration: item.duration,
          preview: item.preview,
        }),
      );

      const album: IAlbum = {
        id: data.id,
        title: data.title,
        artist: data.artist.name,
        coverSmallTrack: data.cover_small,
        coverBigTrack: data.cover_big,
        tracks,
        recordType: data.record_type,
        releaseDate: new Date(data.release_date).getFullYear(),
      };

      return {
        response: album,
      };
    })
    .catch((error) => ({
      error,
    }),
    );

  return promise;
};
