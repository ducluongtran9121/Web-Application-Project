import { Folder } from '../models'
import type { Lesson, LocationItem } from '../models'

function sortLocationItems(locationItems: LocationItem[]) {
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

function addFileToLessons(lessons: Lesson[] | undefined, lessonId: number, file: LocationItem, isSortLocationItem = true) {
  if (!lessons) return undefined

  const newLessons = lessons
  const lessonIndex = newLessons.findIndex((lesson) => lesson.id === lessonId)

  if (!file.inFolder) {
    newLessons[lessonIndex].locationItems.push(file)
  } else {
    const folderIndex = newLessons[lessonIndex].locationItems.findIndex((item) => item.type === 'folder' && item.name === file.inFolder)
    if (folderIndex > -1) {
      newLessons[lessonIndex].locationItems[folderIndex].children?.push(file)
    } else {
      const newFolder = new Folder(-(newLessons[lessonIndex].locationItems.length + 1), file.inFolder, '', [file])
      newLessons[lessonIndex].locationItems.push(newFolder)
    }
  }

  if (isSortLocationItem) newLessons[lessonIndex].locationItems = sortLocationItems(newLessons[lessonIndex].locationItems)

  return [...newLessons]
}

function deleteLessonsFile(lessons: Lesson[] | undefined, lessonId: number, fileId: number, isSortLocationItem = true) {
  if (!lessons) return undefined

  const newLessons = lessons
  const lessonIndex = newLessons.findIndex((lesson) => lesson.id === lessonId)

  let file: LocationItem | undefined = undefined
  const fileIndex = newLessons[lessonIndex].locationItems.findIndex((item) => item.type !== 'folder' && item.id === fileId)
  if (fileIndex < 0) {
    for (const folder of newLessons[lessonIndex].locationItems.filter((item) => item.type === 'folder')) {
      if (folder.children) {
        const tempIndex = folder.children.findIndex((item) => item.id === fileId)
        if (tempIndex >= 0) {
          file = folder.children[tempIndex]
          break
        }
      }
    }
  } else {
    file = newLessons[lessonIndex].locationItems[fileIndex]
  }

  if (file && !file.inFolder) newLessons[lessonIndex].locationItems.splice(fileIndex, 1)
  else {
    const folderIndex = newLessons[lessonIndex].locationItems.findIndex((item) => item.type === 'folder' && item.name === file?.inFolder)
    const folder = newLessons[lessonIndex].locationItems[folderIndex]
    if (folder.children) {
      if (folder.children.length === 1) newLessons[lessonIndex].locationItems.splice(folderIndex, 1)
      else newLessons[lessonIndex].locationItems[folderIndex].children = folder.children.filter((item) => item.id !== file?.id)
    }
  }

  if (isSortLocationItem) newLessons[lessonIndex].locationItems = sortLocationItems(newLessons[lessonIndex].locationItems)

  return [...newLessons]
}

export { sortLocationItems, addFileToLessons, deleteLessonsFile }
