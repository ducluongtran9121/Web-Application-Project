import { sortLocationItems } from './location'
import { Folder } from '../models'
import type { Deadline, LocationItem } from '../models'

function sortDeadlines(deadlines: Deadline[]): Deadline[] {
  const currentDate = new Date()
  const inTimeDeadline = deadlines.filter((deadline) => deadline.end > currentDate)
  const overdueDeadline = deadlines.filter((deadline) => deadline.end <= currentDate)

  function compare(a: Deadline, b: Deadline) {
    if (a.end < b.end) return -1
    if (a.end > b.end) return 1
    return 0
  }

  inTimeDeadline.sort(compare)
  overdueDeadline.sort(compare)

  return inTimeDeadline.concat(overdueDeadline)
}

function getLimitInTimeDeadline(deadlines: Deadline[], limit: number): Deadline[] {
  const currentDate = new Date()
  const inTimeDeadline = deadlines.filter((deadline) => deadline.end > currentDate && !deadline.isFinished)

  function compare(a: Deadline, b: Deadline) {
    if (a.end < b.end) return -1
    if (a.end > b.end) return 1
    return 0
  }

  inTimeDeadline.sort(compare)

  if (limit >= inTimeDeadline.length) return inTimeDeadline
  return inTimeDeadline.slice(0, limit)
}

function addSubmitFileDeadline(deadline: Deadline | undefined, file: LocationItem, isSortLocationItem = true): Deadline | undefined {
  if (!deadline || !deadline.submitItems) return undefined

  if (!file.inFolder) {
    deadline.submitItems.push(file)
  } else {
    const folderIndex = deadline.submitItems.findIndex((item) => item.type === 'folder' && item.name === file.inFolder)
    if (folderIndex > -1) {
      deadline.submitItems[folderIndex].children?.push(file)
    } else {
      const newFolder = new Folder(-(deadline.submitItems.length + 1), file.inFolder, '', [file])
      deadline.submitItems.push(newFolder)
    }
  }

  if (isSortLocationItem) deadline.submitItems = sortLocationItems(deadline.submitItems)

  return Object.create(deadline)
}

function deleteSubmitFileDeadline(deadline: Deadline | undefined, fileId: number, isSortLocationItem = true): Deadline | undefined {
  if (!deadline || !deadline.submitItems) return undefined

  let file: LocationItem | undefined = undefined
  const fileIndex = deadline.submitItems.findIndex((item) => item.type !== 'folder' && item.id === fileId)
  if (fileIndex < 0) {
    for (const folder of deadline.submitItems.filter((item) => item.type === 'folder')) {
      if (folder.children) {
        const tempIndex = folder.children.findIndex((item) => item.id === fileId)
        if (tempIndex >= 0) {
          file = folder.children[tempIndex]
          break
        }
      }
    }
  } else {
    file = deadline.submitItems[fileIndex]
  }

  if (file && !file.inFolder) deadline.submitItems.splice(fileIndex, 1)
  else {
    const folderIndex = deadline.submitItems.findIndex((item) => item.type === 'folder' && item.name === file?.inFolder)
    const folder = deadline.submitItems[folderIndex]
    if (folder.children) {
      if (folder.children.length === 1) deadline.submitItems.splice(folderIndex, 1)
      else deadline.submitItems[folderIndex].children = folder.children.filter((item) => item.id !== file?.id)
    }
  }

  if (isSortLocationItem) deadline.submitItems = sortLocationItems(deadline.submitItems)

  return Object.create(deadline)
}

function addCourseAndLessonNameToDeadline(deadlines: Deadline[], courseName: string, lessonName: string): Deadline[] {
  const newDeadlines: Deadline[] = []
  for (let i = 0; i < deadlines.length; i++) {
    newDeadlines.push({
      ...deadlines[i],
      courseName: courseName,
      lessonName: lessonName
    })
  }

  return newDeadlines
}

export { addSubmitFileDeadline, deleteSubmitFileDeadline, addCourseAndLessonNameToDeadline, sortDeadlines, getLimitInTimeDeadline }
