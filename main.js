window.onload = () => {
  const tabSwitchers = document.querySelectorAll("[data-switcher]");

  for (let i = 0; i < tabSwitchers.length; i++) {
    const tabSwitcher = tabSwitchers[i];
    const pageId = tabSwitcher.dataset.tab;

    tabSwitcher.addEventListener("click", () => {
      document
        .querySelector(".tabs .tab.is-active")
        .classList.remove("is-active");
      tabSwitcher.parentNode.classList.add("is-active");

      switchPage(pageId);
    });
  }
};

function switchPage(pageId) {
  const currentPage = document.querySelector(".pages .page.is-active");
  currentPage.classList.remove("is-active");

  const nextPage = document.querySelector(
    `.pages .page[data-page="${pageId}"]`
  );
  nextPage.classList.add("is-active");
}

// Page 1 contents
const contentArea1 = document.querySelector(".content1");
const fetchButton = document.querySelector(".fetch-button");
const sortAscButton = document.querySelector(".sort-asc-button");
const sortDescButton = document.querySelector(".sort-desc-button");
const toggleSortButton = document.querySelector(".toggle-sort-button");
let postContents;

fetchButton.addEventListener("click", () => {
  contentArea1.innerHTML = "<p>Fetching resources...</p>";
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((posts) => {
      postContents = posts;
      displayPosts(posts);
    });
});

sortAscButton.addEventListener("click", () => {
  if (!postContents) {
    contentArea1.innerHTML = "No contents";
  } else {
    const sortedPosts = [...postContents].sort((a, b) =>
      a.title.localeCompare(b.title)
    );
    displayPosts(sortedPosts);
  }
});

sortDescButton.addEventListener("click", () => {
  if (!postContents) {
    contentArea1.innerHTML = "No contents";
  } else {
    const sortedPosts = [...postContents].sort((a, b) =>
      b.title.localeCompare(a.title)
    );
    displayPosts(sortedPosts);
  }
});

let sortOrder = "asc";
toggleSortButton.addEventListener("click", () => {
  if (!postContents) {
    contentArea1.innerHTML = "No contents";
  } else {
    if (sortOrder === "asc") {
      postContents.sort((a, b) => a.userId - b.userId);
      sortOrder = "desc";
    } else {
      postContents.sort((a, b) => b.userId - a.userId);
      sortOrder = "asc";
    }
    displayPosts(postContents);
  }
});

function displayPosts(posts) {
  contentArea1.innerHTML = posts
    .map(
      (post) => `
      <li>
        userId: ${post.userId}<br>
        id: ${post.id}<br>
        title: ${post.title}<br>
        body: ${post.body}
      </li><br>
    `
    )
    .join("");
}

// Page 2 contents
const fetchAudioButton = document.querySelector(".fetch-audio-button");
const playAudioButton = document.querySelector(".play-audio-button");
const stopAudioButton = document.querySelector(".stop-audio-button");
const audioUrlInput = document.querySelector(".audio-url-input");

const contentArea2 = document.querySelector(".content2");
const audioContext = new AudioContext();
let audioBuffer;
let audioSource;

fetchAudioButton.addEventListener("click", () => {
  const audioUrl = audioUrlInput.value;

  fetch(audioUrl)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
    .then((decodedAudio) => {
      audioBuffer = decodedAudio;
      contentArea2.innerHTML = "<p>Audio is ready</p>";
    })
    .catch((error) => {
      console.log(error);
    });
});

playAudioButton.addEventListener("click", () => {
  if (audioBuffer) {
    contentArea2.innerHTML = "";
    audioSource = audioContext.createBufferSource();
    audioSource.buffer = audioBuffer;
    audioSource.connect(audioContext.destination);
    audioSource.start(audioContext.currentTime);
    playAudioButton.setAttribute("disabled", "disabled");
  }
});

stopAudioButton.addEventListener("click", () => {
  if (audioSource) {
    audioSource.stop(0);
    playAudioButton.removeAttribute("disabled");
  }
});
