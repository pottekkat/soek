package algorithms

import (
	"encoding/json"
	"strings"
)

var index []map[string]interface{}
var matches []string

// Search looks for the given key in the index and returns a list of matched titles
func Search(key string, indexJSONString string) []string {
	err := json.Unmarshal([]byte(indexJSONString), &index)
	if err != nil {
		println("could not unmarshal JSON: %s\n", err)
		return []string{}
	}

	for _, i := range index {
		for k, v := range i {
			if str, ok := v.(string); ok {
				if strings.Contains(str, key) {
					matches = append(matches, i["title"].(string))
					break
				}
			} else {
				// TODO: handle non-string values
				println("non-string value for key: ", k)
			}
		}
	}
	return matches
}
