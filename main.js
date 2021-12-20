//Fetch Request function WITH Remote API

//GET Request
const usersGetRequestRemoteAPI = (fetchURL, elem, id = undefined) => {
  const $fetch = document.getElementById(elem);
  const $fragment = document.createDocumentFragment();

  fetch(fetchURL)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      if (id === undefined) {
        json.forEach((e) => {
          const $card = document.createElement("div");
          $card.classList.add("card");
          $card.innerHTML = `
        <h2 class="card-title">User n° ${e.id}</h2>
        <div class="card-info">
        <p>User name: ${e.name}</p>
        <p>User Email: ${e.email}</p>
        <p>Username${e.username}</p>
        </div>
      `;
          $fragment.appendChild($card);
        });
        $fetch.appendChild($fragment);
      }
      if (id >= 0 && id <= 9) {
        const $card = document.createElement("div");
        $card.classList.add("card");
        $card.innerHTML = `
      <h2 class="card-title">User n° ${json[id].id}</h2>
      <div class="card-info">
      <p>User name: ${json[id].name}</p>
      <p>User Email: ${json[id].email}</p>
      <p>Username${json[id].username}</p>
      </div>
    `;
        $fetch.appendChild($card);
      }
    })
    .catch((err) => {
      let msg = err.statusText || "An error has ocurred";
      $fetch.innerHTML = `${err.status}: Error${msg}`;
    });
};



//----------------------------------------------------------------------------------------------------------------------------------

//EVENTS

//Clicks events
const clickBtn = (openBtn, closeBtn, elem, cb) => {
  document.addEventListener("click", (e) => {
    if (e.target.matches(openBtn)) {
      document.querySelector(openBtn).classList.toggle("hidden");
      document.querySelector(closeBtn).classList.toggle("hidden");
      cb("users.json", "main");
    }

    if (e.target.matches(closeBtn)) {
      const $fetch = document.getElementById(elem);
      document.querySelector(closeBtn).classList.toggle("hidden");
      document.querySelector(openBtn).classList.toggle("hidden");
      $fetch.innerHTML = null;
    }
  });
};

//Event delegation
document.addEventListener("DOMContentLoaded", (e) => {
  clickBtn("#open-btn", "#close-btn", "main", usersGetRequestRemoteAPI);
});
