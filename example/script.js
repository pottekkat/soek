import { soekSearch } from "../dist/soek.min.js";

const search = async () => {
  const config = {
    key: "Kubernetes",
    indexURL: "./small_search_index.json",
  };
  const matches = await soekSearch(config);
  console.log("search results for", config.key, "in", config.indexURL);
  if (matches.length === 0) {
    console.log("no matches found");
  } else {
    for (let i = 0; i < matches.length; i++) {
      console.log(matches[i]);
    }
  }
};

search();
