//Fetch Request function
const usersRequest = (fetchURL, elem) => {
  const $fetch = document.getElementById(elem);
  const $fragment = document.createDocumentFragment();

  fetch(fetchURL)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
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
    })
    .catch((err) => {
      let msg = err.statusText || "An error has ocurred";
      $fetch.innerHTML = `${err.status}: Error${msg}`;
    });
};

//Clicks events
const clickBtn = (openBtn, closeBtn, elem, cb) => {
  document.addEventListener("click", (e) => {
    if (e.target.matches(openBtn)) {
      document.querySelector(openBtn).classList.toggle("hidden");
      document.querySelector(closeBtn).classList.toggle("hidden");
      cb("https://jsonplaceholder.typicode.com/users", "main");
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
  clickBtn("#open-btn", "#close-btn", "main", usersRequest);
});
