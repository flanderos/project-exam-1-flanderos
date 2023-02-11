const postContainer = document.querySelector(".blogpost");
const blogTextContainer = document.querySelector(".blogtext");
const blogContainerLandingPage = document.querySelector(".blogright");
const blogCategory = document.querySelector(".blogcategory");
const loadMoreButton = document.querySelector(".loadmore");
const loadMoreUrl = blogUrl + "?per_page=20";

let pageNumber = 1;
let perPage = 10;

async function getBlogData() {
  const response = await fetch(
    `${blogUrl}?per_page=${perPage}&page=${pageNumber}`
  );
  const results = await response.json();

  for (let i = 0; i < results.length; i++) {
    let blogHeading = results[i].title.rendered;
    let blogDate = results[i].date;
    let blogText = results[i].excerpt.rendered;

    if (postContainer !== null) {
      postContainer.innerHTML += `
   
    <div class="blogright">
      <h1 class="blogheading">${blogHeading}</h1>
      <div class="bloginfo">
      <i class="fa-regular fa-clock"></i>
      <p class="blogdate">${blogDate}</p>
      </div>
      <div class="blogtext">
        <p>
          ${blogText}
        </p>
      </div>
      <a class="blogspecifcbtn" href="blog.specific.html?id=${results[i].id}">READ MORE</a>
    </div>`;

      footerContainer.innerHTML = `
        <h2 class="latestposts">Latest Posts</h2>
        <h3 class="footerdate">${blogDate}</h3>
        <a href="blog.specific.html?id=${results[i].id}"<p class="footerpostpreview">${blogHeading}</p></a>
      `;

      const searchInput = document.querySelector("#searchinput");
      const searchButton = document.querySelector(".searchicon");

      searchButton.addEventListener("click", function () {
        if (searchInput.value === blogHeading) {
          postContainer.innerHTML = `
        <div class="blogright">
          <h1 class="blogheading">${blogHeading}</h1>
          <div class="bloginfo">
            <i class="fa-regular fa-clock"></i>
            <p class="blogdate">${blogDate}</p>
          </div>
          <div class="blogtext">
            <p>
              ${blogText}
            </p>
          </div>
          <a class="blogspecifcbtn" href="blog.specific.html?id=${results[i].id}">READ MORE</a>
        </div>`;
        }
      });
    }
  }
}

getBlogData(pageNumber);

if (loadMoreButton !== null) {
  loadMoreButton.addEventListener("click", function () {
    pageNumber++;
    getBlogData(pageNumber);
  });
}
