const feedContainer = document.getElementById("letterboxd-feed");
const username = "pudding";
const rssFeed = `https://letterboxd.com/${username}/rss/`;
const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssFeed)}`;
const itemsPerPage = 20;
let currentPage = 1;
let allItems = [];

function renderPage(page) {
  feedContainer.innerHTML = '<div class="movies-grid"></div><div id="pagination"></div>';
  const grid = feedContainer.querySelector('.movies-grid');
  const pagination = document.getElementById("pagination");

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = allItems.slice(start, end);

  pageItems.forEach(item => {
    const entry = document.createElement("div");
    entry.classList.add("movie-entry");

    entry.innerHTML = `
      <h3><a href="${item.link}" target="_blank">${item.title}</a></h3>
      <p>${item.pubDate.split(" ")[0]}</p>
      <p>${item.description}</p>
    `;

    grid.appendChild(entry);
  });

  // Pagination buttons
  const totalPages = Math.ceil(allItems.length / itemsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.classList.add("page-btn");
    if (i === page) btn.classList.add("active");
    btn.addEventListener("click", () => renderPage(i));
    pagination.appendChild(btn);
  }
}

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    allItems = data.items;
    renderPage(currentPage);
  })
  .catch(error => {
    feedContainer.innerHTML = "<p>Unable to load feed.</p>";
    console.error("Feed error:", error);
  });