import * as model from "./model";
import SpotifyWebApi from "spotify-web-api-node";
import MainContent from "./views/contentMusic";
import UserView from "./views/UserView";
import icon from "../img/icon-music-s/symbol-defs.svg";
import Artist from "./views/artistView";
import AlbumList from "./views/albumReview";

if (module.hot) {
  module.hot.accept();
}
var spotifyApi = new SpotifyWebApi({
  clientId: "239c05afa4404e779097533795b6b3d2",
  clientSecret: "eb0d6976b21249bc8310bd8bef70987e",
  redirectUri: "http://localhost:1234/",
});
spotifyApi.setAccessToken(model.token);

const state = {
  search: {
    results: [],
    page: 1,
    pageResults: 10,
  },
  inforArtist: {},
  albumArtists: [],
};

const searchMusic = function () {
  const query = MainContent.getQuery();
  if (!query) return;
  MainContent.renderLoading();
  spotifyApi
    .searchTracks(query)
    .then((data) => {
      const dataMusic = data.body.tracks.items;
      state.search.results = dataMusic.map((album) => {
        return {
          id: album.id,
          album_type: album.album.album_type,
          images: album.album.images[1].url,
          nameSong: album.album.name,
          albumDate: album.album.release_date,
          nameArtists: album.artists[0].name,
          idArtist: album.artists[0].id,
        };
      });
      MainContent.render(resultPage(1));
      const renderPageShow = function (page) {
        if (page === 10) {
          return `
        <button class="pagination__btn--next btn">
          <svg class="search__icon">
            <use
              href="${icon}#icon-arrow-down2"
            ></use>
          </svg>
      </button>
      `;
        } else if (page === 20) {
          return `
            <button class="pagination__btn--next btn">
              <svg class="search__icon">
                <use
                  href="${icon}#icon-arrow-up2"
                ></use>
              </svg>      
          </button>
          `;
        }
      };
      const nbPage = renderPageShow(state.search.pageResults);
      const pages = document.querySelector(".pagination");
      pages.innerHTML = "";
      pages.insertAdjacentHTML("afterbegin", nbPage);

      const btnShow = document.querySelector(".pagination__btn--next");
      btnShow.addEventListener("click", (e) => {
        if (state.search.pageResults === 10) {
          state.search.pageResults = 20;
          MainContent.render(resultPage(1));
        } else if (state.search.pageResults === 20) {
          state.search.pageResults = 10;
          MainContent.render(resultPage(1));
        }
      });
      const renderIdArtist = MainContent._renderId();
      if (!renderIdArtist) return;
      inforMusic(renderIdArtist);
      albumArtists(renderIdArtist);
    })
    .catch((err) => {
      MainContent.renderError(err);
    });
};

export const inforMusic = function (idSinger) {
  spotifyApi.getArtist(idSinger).then(
    function (data) {
      state.inforArtist = data.body;
      Artist.render_Infor(state.inforArtist);
    },
    function (err) {
      console.error(err);
    }
  );
};

const albumArtists = function (album) {
  spotifyApi
    .getArtistAlbums(album, {
      limit: 5,
    })
    .then(
      function (data) {
        state.albumArtists = data.body.items.map((al) => {
          return {
            img: al.images[1].url,
            nameAlbum: al.name,
            type: al.type,
            linkAlbum: al.external_urls.spotify,
          };
        });
        AlbumList.render_albums(state.albumArtists);
      },
      function (err) {
        console.error(err);
      }
    );
};
const resultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.pageResults;
  const end = page * state.search.pageResults;
  return state.search.results.slice(start, end);
};

const controlUser = function () {
  spotifyApi.getMe().then(
    function (data) {
      const user = data.body;
      UserView.renderUser(user);
    },
    function (err) {
      MainContent.renderError(err);
    }
  );
};

const init = function () {
  MainContent.addHandleRender(searchMusic);
  MainContent.searchHandle(searchMusic);
  controlUser();
};
init();
