import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextInput, Title } from '@mantine/core'
import { addDoc, collection } from 'firebase/firestore'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'

import { LoadingState } from '~/atoms/states'
import { FlexBox } from '~/components/Base/FlexBox'
import { FileInputWithCropper } from '~/components/Inputs/FileInputWithCropper'
import { ImageUrlInputWithCropper } from '~/components/Inputs/ImageUrlInputWithCropper'
import {
  EditZiraiInputType,
  EditZiraiSchema,
  ziraisCollection
} from '~/entities/Zirai'
import { useToast } from '~/hooks/useToast'
import { db, serverTimestamp } from '~/lib/firebase'
import { errorMessage } from '~/utils/errorMessage'

export const EditZiraiForm = (): React.ReactNode => {
  const setLoading = useSetRecoilState(LoadingState)
  const { showErrorToast, showSuccessToast } = useToast()
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isValid }
  } = useForm<EditZiraiInputType>({
    resolver: zodResolver(EditZiraiSchema),
    mode: 'all',
    defaultValues: {
      uploadedImageUrl: undefined,
      inputImageUrl: undefined,
      twitterId: undefined,
      tweetUrl: undefined
    }
  })

  const onSubmit: SubmitHandler<EditZiraiInputType> = async (data) => {
    try {
      let twitterId = data.twitterId
      if (data.tweetUrl) {
        // get user id from tweet url
        // sample URL: https://x.com/andmohiko/status/1501184876136972300
        twitterId = data.tweetUrl.split('/')[3]
      }
      if (!data.uploadedImageUrl && !data.inputImageUrl) {
        showErrorToast('画像をアップロードしてください')
        return
      }
      setLoading(true)
      await addDoc(collection(db, ziraisCollection), {
        createdAt: serverTimestamp,
        imageUrl: data.uploadedImageUrl
          ? data.uploadedImageUrl
          : data.inputImageUrl,
        publishStatus: 'draft',
        twitterId: twitterId ? twitterId : null,
        updatedAt: serverTimestamp,
        useAt: null,
        usedCount: 0
      })
      showSuccessToast('地雷女子を保存しました')
      reset()
    } catch (e) {
      showErrorToast('地雷女子の保存に失敗しました', errorMessage(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: 400
      }}
    >
      <FlexBox align="stretch" gap={64}>
        <Title order={2}>地雷女子の追加</Title>
        <FlexBox gap={32}>
          <Controller
            name="inputImageUrl"
            control={control}
            render={({ field }) => (
              <ImageUrlInputWithCropper
                label="地雷女子画像"
                value={field.value}
                onChange={field.onChange}
                error={errors.inputImageUrl?.message}
                storagePath="/images/zirais"
              />
            )}
          />
          <Controller
            name="uploadedImageUrl"
            control={control}
            render={({ field }) => (
              <FileInputWithCropper
                label="地雷女子画像"
                value={field.value}
                onChange={field.onChange}
                error={errors.uploadedImageUrl?.message}
                storagePath="/images/zirais"
              />
            )}
          />
          <TextInput
            label="ツイッターID"
            {...register('twitterId')}
            error={errors.twitterId?.message}
            w="100%"
          />
          <TextInput
            label="ツイートURL"
            {...register('tweetUrl')}
            error={errors.tweetUrl?.message}
            w="100%"
          />
        </FlexBox>
        <Button type="submit" loading={isSubmitting} disabled={!isValid}>
          保存する
        </Button>
      </FlexBox>
    </form>
  )
}
