package soek

import (
	"strings"
)

var matches []map[string]interface{}

// Search looks for the given key in the index and returns a list of matched titles
func Search(key string, index []map[string]interface{}) []map[string]interface{} {
	for _, i := range index {
		for k, v := range i {
			if str, ok := v.(string); ok {
				str = strings.ToLower(str)
				if strings.Contains(str, key) {
					matches = append(matches, i)
					break
				}
			} else if list, ok := v.([]interface{}); ok {
				listContainsKey := false
				for _, j := range list {
					if li, ok := j.(string); ok {
						li = strings.ToLower(li)
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
