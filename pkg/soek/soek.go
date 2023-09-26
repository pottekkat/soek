package soek

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
			} else if list, ok := v.([]interface{}); ok {
				listContainsKey := false
				for _, j := range list {
					if li, ok := j.(string); ok {
						if strings.Contains(li, key) {
							listContainsKey = true
							break
						}
					}
				}
				if listContainsKey {
					matches = append(matches, i)
					break
				}
			} else {
				println("unsupported key type found in index: ", k)
			}

		}
	}
	return matches
}
