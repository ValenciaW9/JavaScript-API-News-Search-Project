//Set API key and blog container
const apiKey = "e0891d1c50c54a0588ec4f6199b920d7";
const blogsContainer = document.getElementById("blogs-container");

// Set search field and button
const searchField = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Fetch random news articles
async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}&pageSize=10`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    if(provess.env.NODE_ENV !== 'production')
    
    return [];
  }
}

// Fetch news articles matching a query
async function fetchNewsQuery(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news by query", error);
    return [];
  }
}

// Display news articles
function displayBlogs(articles) {
  blogsContainer.innerHTML = "";
  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "...." : article.title;
    title.textContent = truncatedTitle;
    const description = document.createElement("p");
    const truncatedDes = article.description.length > 120 ? article.description.slice(0, 120) + "...." : article.description;
    description.textContent = truncatedDes;

    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });

    blogsContainer.appendChild(blogCard);
  });
}

// Display random news articles on page load
(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error fetching random news", error);
  }
})();

// Display news articles matching a query when search button is clicked
searchButton.addEventListener("click", async () => {
  try {
    const query = searchField.value.trim();
    if (query !== "") {
      const articles = await fetchNewsQuery(query);
      displayBlogs(articles);
    }
  } catch (error) {
    console.error("Error fetching news by query", error);
  }
});