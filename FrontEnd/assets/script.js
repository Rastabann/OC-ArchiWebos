let gallery = document.querySelector(".gallery");
gallery.classList.add("gallery");

const fetchGallery = function () {
  fetch("http://localhost:5678/api/works")
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      gallery.innerHTML = "";
      for (i = 0; i < value.length; i++) {
        let galleryFigure = document.createElement("figure");

        let figureImage = document.createElement("img");
        let image = value[i].imageUrl;
        figureImage.src = image;

        let figureText = document.createElement("figcaption");
        let figcaption = value[i].title;
        figureText.classList.add("galleryFigcaption");
        figureText.textContent = figcaption;

        galleryFigure.appendChild(figureImage);
        galleryFigure.appendChild(figureText);
        galleryFigure.classList.add("category" + value[i].category.id);
        galleryFigure.classList.add("all");
        gallery.appendChild(galleryFigure);
      }
    });
};

window.onload = fetchGallery();

// **** Filtres

let filters = document.querySelector(".filterContainer");

fetch("http://localhost:5678/api/categories")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (data) {
    for (i = 0; i < data.length; i++) {
      let filterButton = document.createElement("button");
      filterButton.classList.add("filter");
      filterButton.innerHTML = data[i].name;
      filterButton.dataset.category = "category" + data[i].id;
      filters.appendChild(filterButton);
    }

    for (const button of filters.children) {
      button.addEventListener("click", () => {
        filterWorks(button.dataset.category);
      });
    }
  });

function filterWorks(category) {
  // console.log(category);
  for (const child of gallery.children) {
    if (child.classList.contains(category)) {
      child.style.display = "Block";
    } else {
      child.style.display = "None";
    }
  }
}
