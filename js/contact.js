const url = "https://skole.vorsbrothers.no/wp-json/";
const headerlogo = document.querySelector(".headerlogo");

async function getBlogPosts() {
  const response = await fetch(url);
  const data = await response.json();

  headerlogo.innerHTML = `<h1>${data.name}</h1>`;
}

getBlogPosts(url);
