const pathRootRegex = /^([0-9]{1,})\.([0-9]{1,}\.?)+$/

export const extractRootFromPath = (path: string) : string | null => {
  const found = path.match(pathRootRegex)

  if (!found || typeof found[0] === 'undefined') {
    return null
  }

  return found[1]
}

export const getAllLeavesFromRoot = (path: string) : string[] | null => {
  const found = path.match(/^([0-9]{1,}\.?)+$/)

  if (!found || typeof found[0] === 'undefined') {
    return null
  }

  const parts = path.split('.')
  const leaves = []

  var lastLeaf = ''

  for (var part of parts) {
    if (!lastLeaf) {
      leaves.push(part)
      lastLeaf = part
      continue
    }

    lastLeaf = lastLeaf + '.' + part
    leaves.push(lastLeaf)
  }

  return leaves
}
