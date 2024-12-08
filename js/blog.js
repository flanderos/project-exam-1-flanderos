
const postContainer = document.querySelector(".blogpost");
const searchInput = document.querySelector("#searchinput");
const loadMoreButton = document.querySelector(".loadmore");

let pageNumber = 1;
let perPage = 10;
let allBlogPosts = []; // Lagrer alle bloggposter for søk og visning


async function fetchBlogPosts() {
  try {
    const response = await fetch(`${blogUrl}?per_page=${perPage}&page=${pageNumber}`);
    if (!response.ok) throw new Error("Failed to fetch blog posts");
    const results = await response.json();
    allBlogPosts = [...allBlogPosts, ...results];
    renderBlogPosts(results);
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    postContainer.innerHTML = `<p class="error-message">Could not load blog posts. Please try again later.</p>`;
  }
}


function renderBlogPosts(posts) {
  if (!posts || posts.length === 0) {
    postContainer.innerHTML = `<p class="no-results">No blog posts found.</p>`;
    return;
  }

  posts.forEach((post) => {
    const blogHeading = post.title.rendered;
    const blogDate = new Date(post.date).toLocaleDateString();
    const blogText = post.excerpt.rendered;
    const blogId = post.id;

    if (postContainer) {
      postContainer.innerHTML += `
      <div class="blogright">
        <h1 class="blogheading">${blogHeading}</h1>
        <div class="bloginfo">
          <i class="fa-regular fa-clock"></i>
          <p class="blogdate">${blogDate}</p>
        </div>
        <div class="blogtext">
          ${blogText}
        </div>
        <a class="blogspecifcbtn" href="blog.specific.html?id=${blogId}">READ MORE</a>
      </div>`;
    }
  });
}

// Searhfunction
function handleSearch() {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    renderAllBlogPosts(); // render all posts if searchfield is empty
    return;
  }

  const filteredPosts = allBlogPosts.filter((post) =>
    post.title.rendered.toLowerCase().includes(query)
  );

  postContainer.innerHTML = ""; // Empty container 
  renderBlogPosts(filteredPosts);

  if (filteredPosts.length === 0) {
    postContainer.innerHTML = `<p class="no-results">No results found for "${query}".</p>`;
  }
}


function renderAllBlogPosts() {
  postContainer.innerHTML = "";
  renderBlogPosts(allBlogPosts);
}


function handleLoadMore() {
  pageNumber++;
  fetchBlogPosts();
}


if (searchInput) {
  searchInput.addEventListener("input", handleSearch);
}

if (loadMoreButton) {
  loadMoreButton.addEventListener("click", handleLoadMore);
}


fetchBlogPosts();
