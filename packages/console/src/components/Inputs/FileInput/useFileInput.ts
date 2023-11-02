import { useState, useCallback } from 'react'

import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { v4 as uuid } from 'uuid'

import type { FileWithPath } from '@mantine/dropzone'

import { useToast } from '~/hooks/useToast'
import { storage } from '~/lib/firebase'
import { errorMessage } from '~/utils/errorMessage'

type FileUrl = string
export type FileObject = FileUrl

export const useFileInput = (
  storagePath: string,
  files: Array<FileObject>,
  setFiles: (files: Array<FileObject>) => void,
  max: number,
  isDisabled: boolean
): [
  Array<FileObject>,
  {
    add: (files: Array<File>) => void
    remove: (index: number) => void
  },
  {
    disabled: boolean
    loading: boolean
  }
] => {
  const [loading, setLoading] = useState<boolean>(false)
  const { showErrorToast } = useToast()
  const disabled = files.length >= max || isDisabled

  const removeFile = useCallback(
    (index: number) => {
      const newFiles = files.slice()
      newFiles.splice(index, 1)
      setFiles(newFiles)
    },
    [files, setFiles]
  )

  const onChange = useCallback(
    async (inputFiles: Array<FileWithPath>): Promise<string> => {
      if (!inputFiles || inputFiles.length === 0) {
        return ''
      }

      try {
        setLoading(true)
        const newFiles: Array<FileObject> = []
        await Promise.all(
          inputFiles.map(async (file) => {
            const filename = uuid()
            const fileUrl = await uploadImage(
              `${storagePath}/${filename}`,
              file
            )
            await new Promise<string>((resolve) => {
              newFiles.push(fileUrl)
              resolve(fileUrl)
            })
          })
        )
        setFiles([...files, ...newFiles])
      } catch (e) {
        showErrorToast('error upload file', errorMessage(e))
      } finally {
        setLoading(false)
      }
      return ''
    },
    [files, setFiles, storagePath]
  )

  return [
    files,
    {
      add: onChange,
      remove: removeFile
    },
    {
      disabled,
      loading
    }
  ]
}

const uploadImage = async (path: string, blob: Blob): Promise<string> => {
  const imageRef = ref(storage, path)
  const snapShot = await uploadBytesResumable(imageRef, blob)
  return getDownloadURL(snapShot.ref)
}
