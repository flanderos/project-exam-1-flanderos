const postContainer = document.querySelector(".blogpost");
const footerContainer = document.querySelector(".footerdivtwo");
const blogTextContainer = document.querySelector(".blogtext");
const blogContainerLandingPage = document.querySelector(".blogright");

const authorUrl = url + "wp/v2/users";

async function getBlogData() {
  const response = await fetch(blogUrl);
  const results = await response.json();

  for (let i = 0; i < results.length; i++) {
    let blogHeading = results[i].title.rendered;
    let blogDate = results[i].date;
    let blogText = results[i].excerpt.rendered;

    postContainer.innerHTML += `
   
    <div class="blogright">
      <h1 class="blogheading">${blogHeading}</h1>
      <div class="bloginfo">
      <i class="fa-solid fa-user"></i>
      <p class="blogusername"></p>
      <i class="fa-regular fa-clock"></i>
      <p class="blogdate">${blogDate}</p>
      <i class="fa-solid fa-book"></i>
      <p class="blogcategory">Uncategorized</p>
      </div>
      <div class="blogtext">
        <p>
          ${blogText}
        </p>
      </div>
      <div class="blogtag"><i class="fa-solid fa-tag"></i>Travel</div>
      <a class="blogspecifcbtn" href="blog.specific.html?id=${results[i].id}">READ MORE</a>
    </div>`;

    footerContainer.innerHTML = `
        <h2 class="latestposts">Latest Posts</h2>
        <h3 class="footerdate">${blogDate}</h3>
        <p class="footerpostpreview">${blogHeading}</p>
      `;
  }
}

getBlogData(blogUrl);
