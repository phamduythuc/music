class UserView {
  _parent = document.querySelector("body");
  _parentElm = document.querySelector(".nav__image");

  //   data;
  renderUser(data) {
    this.data = data;
    console.log(data);
    const boxUser = this.boxUser();
    const viewUser = this.iconUser();
    this._parentElm.insertAdjacentHTML("afterbegin", viewUser);
    this._parent.insertAdjacentHTML("afterbegin", boxUser);
    this._handleShowUser();
    this._handleHiddenUser();
  }
  iconUser() {
    return ` <img src="${this.data.images[0].url}" alt="">`;
  }
  _handleShowUser() {
    this._parentElm.addEventListener("click", (e) =>
      this._addHandleUser("open")
    );
  }
  _handleHiddenUser() {
    const boxClear = this._parent.querySelectorAll(".user__clear");
    boxClear.forEach((box) =>
      box.addEventListener("click", () => this._addHandleUser("closed"))
    );
  }
  _addHandleUser(user) {
    if (user === "open") {
      document.querySelector(".user").classList.remove("hidden");
      document.querySelector(".overlay").classList.remove("hidden");
    } else if (user === "closed") {
      document.querySelector(".user").classList.add("hidden");
      document.querySelector(".overlay").classList.add("hidden");
    }
  }

  boxUser() {
    return `
        <div class="user hidden">
            <figure class="user__img">
                <img src="${this.data.images[0].url}" alt="">
            </figure>
            <div class="user__box">

                <div class="user__title">Quoc gia: <span>${this.data.country}</span></div>
                <div class="user__title">Ten: <span>${this.data.display_name}</span></div>
                <div class="user__title">Emali: <span>${this.data.email}</span></div>
            </div>
            <button class="btn btn__user user__clear"> OK </button>
        </div>
        <div class="overlay hidden user__clear"></div>
      `;
  }
}

export default new UserView();
