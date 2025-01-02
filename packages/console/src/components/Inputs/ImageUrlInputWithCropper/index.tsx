import { Image, CloseButton, TextInput } from '@mantine/core'
// eslint-disable-next-line import/no-named-as-default
import ReactCrop from 'react-image-crop'

import styles from './style.module.scss'
import { useCropImageFromUrl, type FileObject } from './useCropImageFromUrl'

import { FlexBox } from '~/components/Base/FlexBox'
import { ActionModal } from '~/components/Modals/ActionModal'
import { useState } from 'react'
import { BasicButton } from '~/components/Buttons/BasicButton'

type Props = {
  value: FileObject | undefined
  onChange: (file: FileObject | undefined) => void
  error: string | undefined
  label: React.ReactNode
  storagePath: string
}

export const ImageUrlInputWithCropper = ({
  value,
  onChange,
  error,
  label,
  storagePath
}: Props): React.ReactElement => {
  const [inputImageUrl, setInputImageUrl] = useState<string | undefined>(
    undefined
  )
  const [
    { file, uncroppedImageUrl, selectedImageRef, crop },
    { setUncroppedImageUrl, remove, onCrop, onChangeCrop, closeCropper },
    { isOpenCropper, isDisabled, isLoading }
  ] = useCropImageFromUrl(storagePath, value, onChange, setInputImageUrl)

  const onStartCrop = () => {
    if (inputImageUrl) {
      setUncroppedImageUrl(inputImageUrl)
    }
  }

  return (
    <div>
      <FlexBox
        direction="row"
        justify="flex-start"
        align="flex-end"
        gap={8}
        width="400px"
        mb={16}
      >
        <TextInput
          label={label}
          value={inputImageUrl}
          onChange={(e) => setInputImageUrl(e.currentTarget.value)}
          disabled={isLoading}
          error={error}
          w="100%"
        />
        <BasicButton onClick={onStartCrop}>適用</BasicButton>
      </FlexBox>
      {file ? (
        <ImagePreview file={file} onRemove={remove} />
      ) : (
        <>
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
