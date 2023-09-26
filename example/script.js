import { soekSearch } from "../dist/soek.min.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const searchBar = document.getElementById("search-bar");

  searchBar.addEventListener("input", async () => {
    const matchesDiv = document.getElementById("matches");
    matchesDiv.innerHTML = ""; // clear previous matches
    if (!searchBar.value) {
      return;
    }
    const config = {
      key: searchBar.value,
      indexURL: "./search_index.json",
    };

    const matches = await soekSearch(config);

    displayMatches(matches, matchesDiv);
  });
});

function displayMatches(matches, matchesDiv) {
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const matchElement = document.createElement("h2");
    const anchorElement = document.createElement("a");
    anchorElement.href = match.permalink;
    anchorElement.textContent = match.title;
    anchorElement.target = "_blank";
    matchElement.appendChild(anchorElement);
    matchesDiv.appendChild(matchElement);
  }
}
