interface LocationPayload {
  id: number
  name: string
  file_upload: string
  in_folder: string
}

interface LocationItem {
  id: number
  name: string
  type: string
  fileUrl: string
  children?: LocationItem[]
}

class File implements LocationItem {
  id: number
  name: string
  type: string
  fileUrl: string

  constructor(id: number, name: string, type: string, fileUrl: string) {
    this.id = id
    this.name = name
    this.type = type
    this.fileUrl = fileUrl
  }
}

class Folder implements LocationItem {
  id: number
  name: string
  type: string
  fileUrl: string
  children?: File[]

  constructor(id: number, name: string, fileUrl: string, children?: File[]) {
    this.id = id
    this.name = name
    this.fileUrl = fileUrl
    this.children = children
    this.type = 'folder'
  }
}

export type { LocationPayload, LocationItem }
export { File, Folder }
