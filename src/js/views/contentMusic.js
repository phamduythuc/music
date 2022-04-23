import View from "./views";
import icon from "../../img/icon-music-s/symbol-defs.svg";
class MainContent extends View {
  _parentElemanent = document.querySelector(".results");
  _parentEl = document.querySelector(".search");

  _error = "";

  getQuery() {
    const query = this._parentEl.querySelector(".search__input").value;
    // this._clearInput();
    return query;
  }
  addHandleRender(hashchange) {
    ["hashchange", "load"].forEach((ev) =>
      window.addEventListener(ev, hashchange)
    );
  }
  searchHandle(handler) {
    this._parentEl.addEventListener("submit", (e) => {
      e.preventDefault();
      handler();
    });
  }
  _clearInput() {
    return (this._parentEl.querySelector(".search__input").value = "");
  }

  _dataSearch() {
    return this._data.map(this._resultsView).join("");
  }
  _exportNameSong() {
    const id = window.location.hash.slice(1);
    return this._data
      .map((it) => {
        if (it.id === id) {
          return this._NameSongView(it);
        }
      })
      .join("");
  }

  _resultsView(results) {
    const id = window.location.hash.slice(1);
    return `<li class="preview">
          <a href="#${results.id}" class="preview__link">
              <figure class="preview__fig">
                  <img src="${results.images}" alt="">
              </figure>
              <div class="preview__data">
                  <h4 class="preview__title">${results.nameSong}</h4>
                  <p class="preview__publisher">${results.nameArtists}</p>
              </div>
          </a>
      </li>
      `;
  }

  _NameSongView(item) {
    const dateSong = new Date(item.albumDate);
    const dateFomat = dateSong.toLocaleDateString("en-US");
    return `
      <figure class="content__fig">
        <div class="content__infor">
          <div class="content__image">
            <img src="${item.images}" alt="" class="content__img">
          </div>
                <div class="content__text">
                    <div class="content__album">
                      <svg class="content__icon">
                        <use
                          href="${icon}#icon-album"
                        ></use>
                      </svg>
                      <span>${item.album_type}</span>
                    </div>
                    <div class="content__name">
                    <h2>${item.nameSong}</h2>
                    </div>
                    <div class="content__date">
                    <svg class="content__icon">
                        <use
                          href="${icon}#icon-clock"
                        ></use>
                      </svg>
                    <span>${dateFomat}</span>
                    </div>
                </div>
          </div>
      </figure>
    `;
  }
}
export default new MainContent();
