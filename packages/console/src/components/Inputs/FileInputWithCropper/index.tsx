import { LoadingOverlay, Image, CloseButton, Overlay } from '@mantine/core'
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone'
import { notifications } from '@mantine/notifications'
import { AiOutlineUpload } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'
import { MdOutlineAddPhotoAlternate } from 'react-icons/md'
import { RxCross1 } from 'react-icons/rx'
// eslint-disable-next-line import/no-named-as-default
import ReactCrop from 'react-image-crop'

import styles from './style.module.scss'
import { useCropImageInput, type FileObject } from './useCropImageInput'

import { FlexBox } from '~/components/Base/FlexBox'
import { ActionModal } from '~/components/Modals/ActionModal'

type Props = {
  value: FileObject | undefined
  onChange: (file: FileObject | undefined) => void
  error: string | undefined
  label: React.ReactNode
  storagePath: string
}

export const FileInputWithCropper = ({
  value,
  onChange,
  error,
  label,
  storagePath
}: Props): React.ReactElement => {
  const [
    { file, uncroppedImageUrl, selectedImageRef, crop },
    { onSelectImage, remove, onCrop, onChangeCrop, closeCropper },
    { isOpenCropper, isDisabled, isLoading }
  ] = useCropImageInput(storagePath, value, onChange)

  return (
    <div>
      <p className={styles.title}>{label}</p>
      {file ? (
        <ImagePreview file={file} onRemove={remove} />
      ) : (
        <>
          <Dropzone
            onDrop={onSelectImage}
            onReject={() => {
              notifications.show({
                title: 'ファイルのアップロードに失敗しました',
                message: '',
                icon: <BiErrorCircle />,
                withCloseButton: true,
                autoClose: 8000,
                color: 'red'
              })
            }}
            maxSize={100 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
            className={styles.dropzone}
            disabled={isDisabled || isLoading}
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
            </FlexBox>
            {isDisabled && <Overlay color="#fff" opacity={0.7} />}
            {isLoading && <LoadingOverlay visible />}
          </Dropzone>
          {error && <span className={styles.error}>{error}</span>}

          {uncroppedImageUrl && (
            <ActionModal
              isOpen={isOpenCropper}
              onClose={closeCropper}
              onSave={onCrop}
              title="画像を編集"
            >
              <ReactCrop
                crop={crop}
                onChange={(c) => onChangeCrop(c)}
                aspect={16 / 9}
                keepSelection={true}
              >
                <img
                  src={uncroppedImageUrl}
                  ref={selectedImageRef}
                  alt=""
                  style={{
                    height: '100%',
                    width: '100%',
                    maxWidth: 1080
                  }}
                />
              </ReactCrop>
            </ActionModal>
          )}
        </>
      )}
    </div>
  )
}

type ImagePreviewProps = {
  file: FileObject
  onRemove: () => void
}

export const ImagePreview = ({
  file,
  onRemove
}: ImagePreviewProps): React.ReactElement => (
  <div className={styles.imagePreview}>
    <Image src={file} alt="" className={styles.image} />
    <CloseButton
      size="sm"
      variant="light"
      pos="absolute"
      top={-4}
      right={-4}
      color="gray"
      onClick={onRemove}
    />
  </div>
)
