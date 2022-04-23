import View from "./views";
import icon from "../../img/icon-music-s/symbol-defs.svg";
class Artist extends View {
  _inforArtistView(itemAt) {
    return `
          <div class="details">
            <div class="singer">
              <div class="singer__content">
                <h3 class="singer__h3">
                    ${itemAt.type}
                </h3>
                <h1 class="singer__h1">
                    ${itemAt.name}
                </h1>
                <div class="singer__fowlower">
                      <svg class="fowlower__icon">
                        <use href="${icon}#icon-heart"></use>
                      </svg>
                  <p> Fowlower: ${itemAt.followers.total.toLocaleString()} </p>
                </div>
                <div class="singer__top">
                    <svg class="fowlower__icon">
                    <use href="${icon}#icon-fire"></use>
                  </svg>
                   <p> Thịnh hành: ${itemAt.popularity} </p>
                </div>
                <div class="singer__type">
                    <svg class="fowlower__icon">
                      <use href="${icon}#icon-headphones"></use>
                    </svg>
                   <p> Thể loại: ${itemAt.genres[0]} </p>
                </div>
                <a href="${
                  itemAt.external_urls.spotify
                }" class="btn singer__btn" target="_blank" >Xem Thêm</a>
              </div>
              <figure class="singer__img">
                  <img src="${
                    itemAt.images[1].url
                  }" alt="" class="singer__photo">
              </figure>
            </div>
          </div>
    `;
  }
}
export default new Artist();
