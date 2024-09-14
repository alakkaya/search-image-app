const formWrapper = document.querySelector(".form-wrapper");
const form = document.querySelector("#form");
const searchInput = document.querySelector("#searchInput");
const buttonWrapper = document.querySelector(".button-wrapper");
const searchButton = document.querySelector("#searchButton");
const clearButton = document.querySelector("#clearButton");
const imageListWrapper = document.querySelector(".imagelist-wrapper");
const loader = document.querySelector("#loader");

runEventListeners();

function runEventListeners() {
  form.addEventListener("submit", search);
  clearButton.addEventListener("click", clear);
}

function clear() {
  searchInput.value = "";
  //   Array.from(imageListWrapper.children).forEach((child) => child.remove());
  imageListWrapper.innerHTML = "";
}

function search(e) {
  // Yükleniyor ikonunu göster
  loader.style.display = "block";

  // Eğer daha önce görseller varsa, bunları temizler
  if (imageListWrapper.hasChildNodes()) {
    imageListWrapper.innerHTML = "";
  }

  const value = searchInput.value.trim();
  fetch(`https://api.unsplash.com/search/photos?query=${value}`, {
    method: "GET",
    headers: {
      Authorization: "Client-ID XjYhgXr2wzpnvW7Hh6PSS4xEfZRsxyCLUycDjRRgZs4",
    },
  })
    .then((result) => result.json())
    .then((data) => {
      Array.from(data.results).forEach((image) => {
        // console.log();
        addImageToUI(image.urls.small);
      });
      loader.style.display = "none";
    })
    .catch((err) => console.log(err));

  e.preventDefault();
}

function addImageToUI(url) {
  // <div class="card">
  //     <img src="" alt="">
  // </div>
  const div = document.createElement("div");
  div.className = "card";

  const img = document.createElement("img");
  img.setAttribute("src", url);
  img.height = "400";
  img.width = "400";

  div.append(img); //img etiketi div etiketinin içinde
  imageListWrapper.append(div); //div.card da imagelist-wrapper içinde
}
