import { LoadingOverlay, Image, Box, CloseButton, Overlay } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { AiOutlineUpload } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'

import styles from './style.module.scss'
import { useFileInput, FileObject } from './useFileInput'

import { FlexBox } from '~/components/Base/FlexBox'

type Props = {
  label: React.ReactNode
  defaultValue: Array<FileObject>
  setFiles: (files: Array<FileObject>) => void
  maxFiles?: number
  error: string | undefined
  storagePath: string
  disabled?: boolean
}

export const FileInput = ({
  label,
  defaultValue,
  setFiles,
  maxFiles = 1,
  error,
  storagePath,
  disabled = false,
}: Props): React.ReactElement => {
  const [files, handlers, states] = useFileInput(
    storagePath,
    defaultValue,
    setFiles,
    maxFiles,
    disabled,
  )

  return (
    <FlexBox gap={8} align="flex-start">
      <p className={styles.title}>{label}</p>
      <FlexBox gap={8}>
        {files.map((file, index) => (
          <ImagePreview
            key={file}
            index={index}
            file={file}
            onRemove={handlers.remove}
          />
        ))}
      </FlexBox>
      <Dropzone
        onDrop={handlers.add}
        onReject={() => {
          notifications.show({
            title: 'ファイルのアップロードに失敗しました',
            message: '',
            icon: <BiErrorCircle />,
            withCloseButton: true,
            autoClose: 8000,
            color: 'red',
          })
        }}
        maxSize={100 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        multiple
        maxFiles={maxFiles - files.length}
        disabled={states.disabled}
        className={styles.dropzone}
      >
        <FlexBox gap={16} justify="center">
          <Dropzone.Accept>
            <AiOutlineUpload color="#777" size={50} />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <RxCross1 color="#777" size={50} />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <MdOutlineAddPhotoAlternate color="#777" size={50} />
          </Dropzone.Idle>
          <span className={styles.label}>
            クリックしてファイルを選択、
            <br />
            もしくはドラッグ＆ドロップしてください
          </span>
          {states.loading && <LoadingOverlay visible />}
        </FlexBox>
        {states.disabled && <Overlay color="#fff" opacity={0.7} />}
      </Dropzone>
      {error && <span className={styles.error}>{error}</span>}
    </FlexBox>
  )
}

type ImagePreviewProps = {
  file: FileObject
  index: number
  onRemove: (index: number) => void
}

export const ImagePreview = ({
  file,
  index,
  onRemove,
}: ImagePreviewProps): React.ReactElement => (
  <Box pos="relative">
    <Image src={file} alt="" />
    <CloseButton
      size="sm"
      variant="light"
      pos="absolute"
      top={4}
      right={4}
      color="gray"
      onClick={() => onRemove(index)}
    />
  </Box>
)
