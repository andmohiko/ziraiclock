import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Title } from '@mantine/core'
import { addDoc, collection } from 'firebase/firestore'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'

import { LoadingState } from '~/atoms/states'
import { FlexBox } from '~/components/Base/FlexBox'
import { FileInput } from '~/components/Inputs/FileInput'
import {
  AddMultipleZiraisInputType,
  AddMultipleZiraisSchema,
  ziraisCollection
} from '~/entities/Zirai'
import { useToast } from '~/hooks/useToast'
import { db, serverTimestamp } from '~/lib/firebase'
import { errorMessage } from '~/utils/errorMessage'

export const AddMultipleZiraiForm = (): React.ReactNode => {
  const setLoading = useSetRecoilState(LoadingState)
  const { showErrorToast, showSuccessToast } = useToast()
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid }
  } = useForm<AddMultipleZiraisInputType>({
    resolver: zodResolver(AddMultipleZiraisSchema),
    mode: 'all',
    defaultValues: {
      imageUrls: []
    }
  })

  const onSubmit: SubmitHandler<AddMultipleZiraisInputType> = async (data) => {
    try {
      setLoading(true)
      data.imageUrls.forEach(async (imageUrl) => {
        await addDoc(collection(db, ziraisCollection), {
          createdAt: serverTimestamp,
          imageUrl,
          twitterId: null,
          updatedAt: serverTimestamp,
          useAt: null
        })
      })
      showSuccessToast('地雷女子を保存しました')
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
        <Title order={2}>地雷女子の一括追加</Title>
        <Controller
          name="imageUrls"
          control={control}
          render={({ field }) => (
            <FileInput
              label="地雷女子画像"
              defaultValue={field.value}
              setFiles={field.onChange}
              maxFiles={100}
              storagePath="/images/zirais"
              error={errors.imageUrls?.message}
            />
          )}
        />
        <Button type="submit" loading={isSubmitting} disabled={!isValid}>
          保存する
        </Button>
      </FlexBox>
    </form>
  )
}
