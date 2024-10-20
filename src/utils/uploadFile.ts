import { storage } from "@/firebase/firebaseConfig"
import { replaceName } from "./replaceName"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const uploadFile = async (file: any) => {
  const filename = replaceName(file.name)

  const storageRef = ref(storage, `image/${filename}`)

  const res = await uploadBytes(storageRef, file)

  if (res) {
    if (res.metadata.size === file.size) {
      return getDownloadURL(storageRef)
    } else {
      return 'Uploading file'
    }
  } else {
    return 'Error uploading file'
  }
}