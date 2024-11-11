let box = document.getElementById("cont");
let loader = document.querySelector(".loader");
let postCount = 0;
const POSTS_PER_LOAD = 5;
let loading = false;

async function loadData() {
  if (loading) return;
  loading = true;
  loader.style.display = "block";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts = await response.json();

    const nextPosts = posts.slice(postCount, postCount + POSTS_PER_LOAD);
    nextPosts.forEach((post) => show(post.title, post.body));

    postCount += POSTS_PER_LOAD;
  } catch (error) {
    console.error("Error loading posts:", error);
  } finally {
    loading = false;
    loader.style.display = "none";
  }
}

function show(title, body) {
  const postElement = document.createElement("div");
  postElement.classList.add("box");
  postElement.innerHTML = `
        <div class="title">${title}</div>
        <div class="main">${body}</div>
    `;
  box.appendChild(postElement);
}

window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
    !loading
  ) {
    loadData();
  }
});

loadData();
