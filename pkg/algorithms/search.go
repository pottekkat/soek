package algorithms

import (
	"encoding/json"
	"strings"
)

var index []map[string]interface{}
var matches []map[string]interface{}

// Search looks for the given key in the index and returns a list of matched titles
func Search(key string, indexJSONString string) []map[string]interface{} {
	err := json.Unmarshal([]byte(indexJSONString), &index)
	if err != nil {
		println("could not unmarshal JSON: %s\n", err)
		return nil
	}

	for _, i := range index {
		for k, v := range i {
			if str, ok := v.(string); ok {
				if strings.Contains(str, key) {
					matches = append(matches, i)
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
