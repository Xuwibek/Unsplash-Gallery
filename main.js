const AccessKey = "gnXW2lrv4BEODgfltp6xYw92aW2LjX8Yh7Ukvf45wkw";

      const gallery = document.getElementById("gallery");
      const searchInput = document.getElementById("searchInput");
      const searchButton = document.getElementById("searchbtn");
      const loadMoreButton = document.getElementById("loadmorebtn");

      let query = "nature";
      let page = 1;

      const fetchImages = async () => {
        try {
          const url = `https://api.unsplash.com/search/photos?query=${query}&page=${page}&per_page=12&client_id=${AccessKey}`;
          const res = await fetch(url);

          if (!res.ok) {
            throw new Error(`API xatosi: ${res.status} - ${res.statusText}`);
          }

          const data = await res.json();

          if (data.results && data.results.length > 0) {
            displayImages(data.results);
          } else {
            console.warn("Hech qanday rasm topilmadi.");
          }
        } catch (error) {
          console.error("Xato yuz berdi:", error);
        }
      };

      const displayImages = (images) => {
        images.forEach((image) => {
          const div = document.createElement("div");
          div.classList.add("gallery-item");
          div.innerHTML = `
            <img
              src="${image.urls.small}"
              alt="${image.alt_description || "No description"}"
              title="${image.alt_description || "Unsplash Image"}"
            />
          `;
          gallery.appendChild(div);
        });

        new Masonry(gallery, {
          itemSelector: ".gallery-item",
          columnWidth: ".gallery-item",
          percentPosition: true,
        });
      };

      fetchImages()
      searchButton.addEventListener("click", () => {
        query = searchInput.value.trim();
        page = 1;
        gallery.innerHTML = "";
        fetchImages();
      });
      loadMoreButton.addEventListener("click", () => {
        page++;
        fetchImages();
      });