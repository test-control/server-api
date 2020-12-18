const pathRootRegex = /^([0-9]{1,})\.([0-9]{1,}\.?)+$/

export const extractRootFromPath = (path: string) : string | null => {
  const found = path.match(pathRootRegex)

  if (!found || typeof found[0] === 'undefined') {
    return null
  }

  return found[1]
}
