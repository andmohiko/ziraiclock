import { useState, useCallback, useEffect, useRef, RefObject } from 'react'

import { useDisclosure } from '@mantine/hooks'
import { type Crop } from 'react-image-crop'
import { v4 as uuid } from 'uuid'

import { uploadImage } from '~/lib/storage'

type FileUrl = string
export type FileObject = FileUrl

export const useCropImageFromUrl = (
  storagePath: string,
  file: FileObject | undefined,
  setFile: (file: FileObject | undefined) => void,
  setInputImageUrl: (url: string | undefined) => void
): [
  {
    file: FileObject | undefined
    selectedImageRef: RefObject<HTMLImageElement>
    uncroppedImageUrl: string | undefined
    crop: Crop
  },
  {
    setUncroppedImageUrl: (fileUrl: string) => void
    remove: () => void
    onChangeCrop: (crop: Crop) => void
    onCrop: () => void
    closeCropper: () => void
  },
  {
    isOpenCropper: boolean
    isDisabled: boolean
    isLoading: boolean
  }
] => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const isDisabled = Boolean(file)
  const [isOpen, handlers] = useDisclosure()
  const imageRef = useRef<HTMLImageElement>(null)
  const [uncroppedImageUrl, setUncroppedImageUrl] = useState<
    string | undefined
  >()
  const [crop, setCrop] = useState<Crop>({
    unit: 'px',
    x: 0,
    y: 0,
    width: 1080,
    height: 607
  })

  // canvasで画像を扱うため、アップロードした画像のuncroppedImageUrlをもとに、imgのHTMLElementを作る
  const loadImage = (src: string): Promise<HTMLImageElement> => {
    return new Promise((resolve) => {
      const img: HTMLImageElement = document.createElement('img')
      img.crossOrigin = 'anonymous'
      img.src = src
      img.onload = () => resolve(img)
    })
  }

  // 切り取った画像のObjectUrlを作成し、フォームに保存する
  const createCroppedImageUrl = async () => {
    if (uncroppedImageUrl && imageRef.current) {
      const img = await loadImage(uncroppedImageUrl)
      const scaleX = img.naturalWidth / imageRef.current.width
      const scaleY = img.naturalHeight / imageRef.current.height

      const canvas = document.createElement('canvas')
      canvas.width = crop.width
      canvas.height = crop.height
      const ctx = canvas.getContext('2d') as CanvasRenderingContext2D
      ctx.beginPath()
      ctx.rect(0, 0, crop.width, crop.height)
      ctx.clip()

      ctx.drawImage(
        img,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      )

      canvas.toBlob(async (result) => {
        if (result instanceof Blob) {
          setIsLoading(true)
          const filename = uuid()
          const remoteFileUrl = await uploadImage(
            `${storagePath}/${filename}`,
            result
          )
          setFile(remoteFileUrl)
          setInputImageUrl(undefined)
          setIsLoading(false)
        }
      })
    }
  }

  const onCrop = async () => {
    await createCroppedImageUrl()
    handlers.close()
  }

  useEffect(() => {
    if (uncroppedImageUrl) {
      handlers.open()
    } else {
      setUncroppedImageUrl(undefined)
    }
  }, [uncroppedImageUrl])

  const remove = useCallback(() => {
    setFile(undefined)
  }, [setFile])

  return [
    {
      file,
      selectedImageRef: imageRef,
      uncroppedImageUrl,
      crop
    },
    {
      setUncroppedImageUrl,
      onChangeCrop: setCrop,
      remove,
      closeCropper: handlers.close,
      onCrop
    },
    {
      isDisabled,
      isLoading,
      isOpenCropper: isOpen
    }
  ]
}
