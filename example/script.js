import { soekSearch } from "../dist/soek.min.js";

document.addEventListener("DOMContentLoaded", (event) => {
  const searchBar = document.getElementById("search-bar");
  const indexURL = "./search_index.json";

  searchBar.addEventListener("input", async () => {
    const matchesDiv = document.getElementById("matches");

    matchesDiv.innerHTML = ""; // clear previous matches
    if (!searchBar.value) {
      return; // don't search if the search bar is empty
    }

    const index = JSON.stringify(await (await fetch(indexURL)).json()); // fetch the index file and convert it to JSON string

    const config = {
      key: searchBar.value,
      index: index,
    };

    const matches = await soekSearch(config);

    displayMatches(matches, matchesDiv);
  });
});

function displayMatches(matches, matchesDiv) {
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];

    if (match.categories.includes("Daily Dose of Pottekkat")) {
        continue; // optional: if match has the category "Daily Dose of Pottekkat", skip it
    }

    // Display the title of the match as a link
    const matchElement = document.createElement("h2");
    const anchorElement = document.createElement("a");
    anchorElement.href = match.permalink;
    anchorElement.textContent = match.title;
    anchorElement.target = "_blank";
    anchorElement.className = "list-group-item";
    matchElement.appendChild(anchorElement);
    matchesDiv.appendChild(matchElement);
  }
}
