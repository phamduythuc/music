import View from "./views";
class AlbumList extends View {
  _parentElementAlbum = document.querySelector(".album__list");

  _dataAlbumList() {
    return this.album.map(this._renderAlbum).join("");
  }
  _renderAlbum(al) {
    return `
       
        <li class="album__item">
          <a href="${al.linkAlbum}" target="_blank" class="album__link">
             <figure class="album__img">
                <img src="${al.img}" alt="${al.nameAlbum}">
            </figure>
            <h3 class="album__title">
                ${al.nameAlbum}
            </h3>
            <p class="album__text">
                ${al.type}
            </p>
          </a>
        </li>
        
    `;
  }
  _typeMusic() {
    const albumType = `
      <h2 class="album__h2">Top 5 Album</h2>
    `;
    const type = document.querySelector(".name-album");
    type.innerHTML = "";
    type.insertAdjacentHTML("afterbegin", albumType);
  }
}
export default new AlbumList();
