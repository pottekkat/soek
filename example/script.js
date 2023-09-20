import { soekSearch } from "../dist/soek.min.js";

const search = async () => {
    const key = "Kubernetes";
    const indexURL = "./small_search_index.json";
  const matches = await soekSearch(key, indexURL);
  console.log("search results for", key, "in", indexURL);
  if (matches.length === 0) {
    console.log("no matches found");
  } else {
    for (let i = 0; i < matches.length; i++) {
      console.log(matches[i]);
    }
  }
};

search();
