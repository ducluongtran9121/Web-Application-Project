import lodash from 'lodash'
import Constants from '../constants'
import { File, Folder } from '../models/location'
import type { LocationItem, LocationPayload } from '../models/location'

function fromLocationPayloads(locationResponses: LocationPayload[]): LocationItem[] {
  const locations: LocationItem[] = []
  const fileExtensionPattern = /\.[0-9a-z]+$/i

  const groupedFolder = lodash.groupBy(locationResponses, (i) => i.in_folder)

  let folderId = -1
  for (const folderName in groupedFolder) {
    if (folderName === '') {
      groupedFolder[folderName].forEach((file) => {
        const match = file.file_upload.match(fileExtensionPattern)
        locations.push(new File(file.id, file.name, match ? match[0] : 'binary', Constants.Api.Base + file.file_upload))
      })
    } else {
      const folder = new Folder(folderId, folderName, '', [])
      folderId -= 1

      groupedFolder[folderName].forEach((file) => {
        const match = file.file_upload.match(fileExtensionPattern)
        folder.children?.push(new File(file.id, file.name, match ? match[0] : 'binary', Constants.Api.Base + file.file_upload))
      })
      locations.push(folder)
    }
  }
  return locations
}

export { fromLocationPayloads }
