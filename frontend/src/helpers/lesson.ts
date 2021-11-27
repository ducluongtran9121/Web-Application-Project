import { Folder } from '../models'
import type { Lesson, LocationItem, Deadline } from '../models'

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

function addDeadlineToLessons(lessons: Lesson[] | undefined, lessonId: number, deadline: Deadline) {
  if (!lessons) return undefined

  const newLessons = lessons
  const lessonIndex = newLessons.findIndex((lesson) => lesson.id === lessonId)
  newLessons[lessonIndex].deadlines.push(deadline)

  return [...newLessons]
}

function editLessonsDeadline(lessons: Lesson[] | undefined, lessonId: number, deadlineId: number, deadline: Deadline): Lesson[] | undefined {
  if (!lessons) return undefined

  const newLessons = lessons
  const lessonIndex = newLessons.findIndex((lesson) => lesson.id === lessonId)
  newLessons[lessonIndex].deadlines = newLessons[lessonIndex].deadlines.map((dl) => (dl.id === deadlineId ? deadline : dl))

  return [...newLessons]
}

function deleteLessonsDeadline(lessons: Lesson[] | undefined, lessonId: number, deadlineId: number): Lesson[] | undefined {
  if (!lessons) return undefined

  const newLessons = lessons
  const lessonIndex = newLessons.findIndex((lesson) => lesson.id === lessonId)
  newLessons[lessonIndex].deadlines = newLessons[lessonIndex].deadlines.filter((deadline) => deadline.id !== deadlineId)

  return [...newLessons]
}

function addFileToLessonsDeadline(
  lessons: Lesson[] | undefined,
  lessonId: number,
  deadlineId: number,
  file: LocationItem,
  isSortLocationItem = true
) {
  if (!lessons) return undefined

  const newLessons = lessons
  const lessonIndex = newLessons.findIndex((lesson) => lesson.id === lessonId)
  const deadlineIndex = newLessons[lessonIndex].deadlines.findIndex((deadline) => deadline.id === deadlineId)
  const deadlines = newLessons[lessonIndex].deadlines[deadlineIndex]

  if (!file.inFolder) {
    deadlines.locationItems.push(file)
  } else {
    const folderIndex = deadlines.locationItems.findIndex((item) => item.type === 'folder' && item.name === file.inFolder)
    if (folderIndex > -1) {
      deadlines.locationItems[folderIndex].children?.push(file)
    } else {
      const newFolder = new Folder(-(deadlines.locationItems.length + 1), file.inFolder, '', [file])
      deadlines.locationItems.push(newFolder)
    }
  }

  if (isSortLocationItem) newLessons[lessonIndex].deadlines[deadlineIndex].locationItems = sortLocationItems(deadlines.locationItems)

  return [...newLessons]
}

function deleteLessonsDeadlineFile(lessons: Lesson[] | undefined, lessonId: number, deadlineId: number, fileId: number, isSortLocationItem = true) {
  if (!lessons) return undefined

  const newLessons = lessons
  const lessonIndex = newLessons.findIndex((lesson) => lesson.id === lessonId)
  const deadlineIndex = newLessons[lessonIndex].deadlines.findIndex((deadline) => deadline.id === deadlineId)
  const deadlines = newLessons[lessonIndex].deadlines[deadlineIndex]

  let file: LocationItem | undefined = undefined
  const fileIndex = deadlines.locationItems.findIndex((item) => item.type !== 'folder' && item.id === fileId)
  if (fileIndex < 0) {
    for (const folder of deadlines.locationItems.filter((item) => item.type === 'folder')) {
      if (folder.children) {
        const tempIndex = folder.children.findIndex((item) => item.id === fileId)
        if (tempIndex >= 0) {
          file = folder.children[tempIndex]
          break
        }
      }
    }
  } else {
    file = deadlines.locationItems[fileIndex]
  }

  if (file && !file.inFolder) deadlines.locationItems.splice(fileIndex, 1)
  else {
    const folderIndex = deadlines.locationItems.findIndex((item) => item.type === 'folder' && item.name === file?.inFolder)
    const folder = deadlines.locationItems[folderIndex]
    if (folder.children) {
      if (folder.children.length === 1) deadlines.locationItems.splice(folderIndex, 1)
      else deadlines.locationItems[folderIndex].children = folder.children.filter((item) => item.id !== file?.id)
    }
  }

  if (isSortLocationItem) newLessons[lessonIndex].deadlines[deadlineIndex].locationItems = sortLocationItems(deadlines.locationItems)

  return [...newLessons]
}

export {
  sortLocationItems,
  addFileToLessons,
  deleteLessonsFile,
  addDeadlineToLessons,
  editLessonsDeadline,
  deleteLessonsDeadline,
  addFileToLessonsDeadline,
  deleteLessonsDeadlineFile
}
