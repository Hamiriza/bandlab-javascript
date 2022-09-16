window.onload = () => {
  const tab_switchers = document.querySelectorAll("[data-switcher]");

  for (let i = 0; i < tab_switchers.length; i++) {
    const tab_switcher = tab_switchers[i];
    const page_id = tab_switcher.dataset.tab;

    tab_switcher.addEventListener("click", () => {
      document
        .querySelector(".tabs .tab.is-active")
        .classList.remove("is-active");
      tab_switcher.parentNode.classList.add("is-active");

      switchPage(page_id);
    });
  }
};

function switchPage(page_id) {
  const current_page = document.querySelector(".pages .page.is-active");
  current_page.classList.remove("is-active");

  const next_page = document.querySelector(
    `.pages .page[data-page="${page_id}"]`
  );
  next_page.classList.add("is-active");
}

// Page 1 contents
const content1 = document.querySelector(".content1");
const button1 = document.querySelector(".button1");
const button2 = document.querySelector(".button2");
const button3 = document.querySelector(".button3");
const button4 = document.querySelector(".button4");
const list1 = document.querySelector(".list1");
let contents;

button1.addEventListener("click", () => {
  content1.innerHTML = "<p>Fetching resources.....</p>";
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => {
      return response.json();
    })
    .then((posts) => {
      contents = posts;
      content1.innerHTML = posts
        .map(
          (post) =>
            `<li>
                userId: ${post.userId}<br>
                id: ${post.id}<br>
                title: ${post.title}<br>
                body: ${post.body}
            </li><br>`
        )
        .join("");
    });
});

button2.addEventListener("click", () => {
  if (!contents) {
    content1.innerHTML = "No contents";
  } else {
    contents.sort((curr, next) => curr.title.localeCompare(next.title));
    content1.innerHTML = contents
      .map(
        (content) =>
          `<li>
                    userId: ${content.userId}<br>
                    id: ${content.id}<br>
                    title: ${content.title}<br>
                    body: ${content.body}
                </li><br>`
      )
      .join("");
  }
});

button3.addEventListener("click", () => {
  if (!contents) {
    content1.innerHTML = "No contents";
  } else {
    contents.sort((curr, next) => next.title.localeCompare(curr.title));
    content1.innerHTML = contents
      .map(
        (content) =>
          `<li>
                      userId: ${content.userId}<br>
                      id: ${content.id}<br>
                      title: ${content.title}<br>
                      body: ${content.body}
                  </li><br>`
      )
      .join("");
  }
});

let order = "asc";

button4.addEventListener("click", () => {
  if (!contents) {
    content1.innerHTML = "No contents";
  } else {
    if (order == "asc") {
      contents.sort((curr, next) => curr.userId - next.userId);
      order = "desc";
    } else if (order == "desc") {
      contents.sort((curr, next) => next.userId - curr.userId);
      order = "asc";
    }
    content1.innerHTML = contents
      .map(
        (content) =>
          `<li>
                        userId: ${content.userId}<br>
                        id: ${content.id}<br>
                        title: ${content.title}<br>
                        body: ${content.body}
                    </li><br>`
      )
      .join("");
  }
});

// Page 2

const button5 = document.querySelector(".button1.page2");
const button6 = document.querySelector(".button2.page2");
const button7 = document.querySelector(".button3.page2");
const urlText = document.querySelector(".urlText");

const content2 = document.querySelector(".content2");
const ctx = new AudioContext();
let audio;
let playSound;

/* Sample audio url
let uri1 = "https://static.bandlab.com/soundbanks/previews/new-wave-kit.ogg";
let uri2 = "https://static.bandlab.com/soundbanks/previews/synth-organ.ogg";
*/

button5.addEventListener("click", () => {
  const uri = urlText.value;

  fetch(uri)
    .then((data) => data.arrayBuffer())
    .then((arrayBuffer) => ctx.decodeAudioData(arrayBuffer))
    .then((decodedAudio) => {
      audio = decodedAudio;
      content2.innerHTML = "<p>Audio is ready</p>";
    })
    .catch((error) => {
      console.log(error);
    });
});

button6.addEventListener("click", () => {
  content2.innerHTML = "";
  playSound = ctx.createBufferSource();
  playSound.buffer = audio;
  playSound.connect(ctx.destination);
  playSound.start(ctx.currentTime);
  button6.setAttribute("disabled", "disabled");
});

button7.addEventListener("click", () => {
  playSound.stop(0);
  button6.removeAttribute("disabled");
});
