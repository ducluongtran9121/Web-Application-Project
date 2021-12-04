import type { LocationItem } from '../models'

function sortLocationItems(locationItems: LocationItem[]): LocationItem[] {
  const folderArray = locationItems.filter((item) => item.type === 'folder')
  const fileArray = locationItems.filter((item) => item.type !== 'folder')

  function compare(a: LocationItem, b: LocationItem) {
    if (a.name < b.name) return -1
    if (a.name > b.name) return 1
    return 0
  }

  folderArray.sort(compare)
  fileArray.sort(compare)
  return folderArray.concat(fileArray)
}

export { sortLocationItems }
