const fs = require('fs')
const path = require('path')

const traverse = function (dir, result = []) {
  // list files in directory and loop through
  fs.readdirSync(dir).forEach((name) => {
    // builds full path of file
    const fPath = path.resolve(dir, name)

    // prepare stats obj
    const fileStats = { name }

    // is the file a directory ?
    // if yes, traverse it
    if (fs.statSync(fPath).isDirectory()) {
      fileStats.children = []
      result.push(fileStats)
      return traverse(fPath, fileStats.children)
    }

    if (fPath.endsWith('Info.tsv')) {
      fileStats.sequences =
        fs.readFileSync(fPath, 'utf8').trim().split('\n').length - 1
      delete fileStats.name
      result.push(fileStats)
    }
  })
  return { name: path.basename(dir), children: result }
}

fs.writeFileSync(
  process.argv[3],
  JSON.stringify(traverse(process.argv[2]), null, 2)
)
