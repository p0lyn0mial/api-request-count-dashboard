// this method takes only selected (multi-select) items
function filterDataset(data, filters) {
    if (!Array.isArray(data) || !Array.isArray(filters)) {return []}
    if (data.length == 0 || filters.length == 0) {
        return []
    }
    let filterLabels = filters.map(filter => filter.label)
    return data.filter(item => filterLabels.includes(item.key))
}

// this method extracts keys except the indexKey
// data: [ {key:"foo", "x":"y"}, {"key":"bar", "x":"y"} ]
function getOnlyKeys(data, indexKey) {
    if (!Array.isArray(data)) {return []}
    if (data.length == 0) {return []}
    let arrays = data.map(item => Object.keys(item))
    let keys = mergeArrays(arrays)
    return keys.filter(key => key != indexKey)
}

function mergeArrays(arrays) {
    let mergedArray = []

    arrays.forEach(array => {
        mergedArray = [...mergedArray, ...array]
    })

    let uniqueArr = [...new Set(mergedArray)];
    return uniqueArr
}

export {filterDataset, getOnlyKeys, mergeArrays}