import icon from "../../img/icon-music-s/symbol-defs.svg";
export default class View {
  _parentElemanentMusic = document.querySelector(".content-sencondery");
  _parentElementAlbum = document.querySelector(".album__list");

  _data;
  render(data, render = true) {
    this._data = data;
    const markup = this._dataSearch();
    const nameSong = this._exportNameSong();

    this._clear();
    this._parentElemanent.insertAdjacentHTML("afterbegin", markup);
    this._parentElemanentMusic.insertAdjacentHTML("beforeend", nameSong);
  }
  render_Infor(infor) {
    this.infor = infor;
    const nameInfor = this._inforArtistView(infor);
    // this._parentElemanentMusic.innerHTML = "";
    this._parentElemanentMusic.insertAdjacentHTML("beforeend", nameInfor);
  }
  render_albums(album) {
    this.album = album;
    const albumArtists = this._dataAlbumList();
    this._typeMusic();
    this._parentElementAlbum.innerHTML = "";
    this._parentElementAlbum.insertAdjacentHTML("afterbegin", albumArtists);
  }

  renderDone() {
    const done = ` 
      <div class="error">
        <div>
          <svg>
            <use href="${icon}#icon-done"></use>
          </svg>
        </div>
    </div>
    `;
    this._clear();
    this._parentElemanentMusic.insertAdjacentHTML("afterbegin", done);
  }

  renderError(message) {
    const error = `
      <div class="error">
        <div>
          <svg>
            <use href="${icon}#icon-bug"></use>
          </svg>
        </div>
        <p>${message}</p>
    </div>
    `;
    this._clear();
    this._parentElemanentMusic.insertAdjacentHTML("afterbegin", error);
  }

  _clear() {
    this._parentElemanentMusic.innerHTML = "";
    this._parentElemanent.innerHTML = "";
  }
  _renderId() {
    const id = window.location.hash.slice(1);
    return this._data
      .map((it) => {
        if (it.id === id) return it.idArtist;
      })
      .join("");
  }
  renderLoading() {
    const loading = `
    <div class="circle-loading"></div>
    `;
    this._clear();
    this._parentElemanentMusic.insertAdjacentHTML("afterbegin", loading);
  }
}
