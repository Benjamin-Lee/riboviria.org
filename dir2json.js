const fs = require('fs')
const dirTree = require('directory-tree')
const tree = dirTree(process.argv[2], { exclude: /.*\/\..*/ })

/** Removes the `path` key anywhere in the object tree it appears
 *
 * Modified from https://stackoverflow.com/a/31729267
 *
 * We want this so that the JSON we ship to the client doesn't have any more than we need.
 *
 * Note: this function mutates the object tree in place.
 */
function removePath(obj) {
  for (prop in obj) {
    if (prop === 'path') delete obj[prop]
    else if (typeof obj[prop] === 'object') removePath(obj[prop])
  }
}

// delete all children that have empty arrays
function removeEmptyChildren(obj) {
  for (prop in obj) {
    if (prop === 'children' && obj[prop].length === 0) delete obj[prop]
    else if (typeof obj[prop] === 'object') removeEmptyChildren(obj[prop])
  }
}

removeEmptyChildren(tree)

removePath(tree)

fs.writeFileSync(process.argv[3], JSON.stringify(tree))
