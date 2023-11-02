import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextInput, Title } from '@mantine/core'
import { addDoc, collection } from 'firebase/firestore'
import { useForm, SubmitHandler, Controller } from 'react-hook-form'
import { useSetRecoilState } from 'recoil'

import { LoadingState } from '~/atoms/states'
import { FlexBox } from '~/components/Base/FlexBox'
import { FileInput } from '~/components/Inputs/FileInput'
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
    formState: { errors, isSubmitting, isValid }
  } = useForm<EditZiraiInputType>({
    resolver: zodResolver(EditZiraiSchema),
    mode: 'all',
    defaultValues: {
      imageUrls: [],
      twitterId: undefined
    }
  })

  const onSubmit: SubmitHandler<EditZiraiInputType> = async (data) => {
    try {
      setLoading(true)
      await addDoc(collection(db, ziraisCollection), {
        createdAt: serverTimestamp,
        imageUrl: data.imageUrls[0],
        twitterId: data.twitterId !== '' ? data.twitterId : null,
        updatedAt: serverTimestamp,
        useAt: null
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
        <Title order={2}>地雷女子の追加</Title>
        <FlexBox gap={32}>
          <Controller
            name="imageUrls"
            control={control}
            render={({ field }) => (
              <FileInput
                label="地雷女子画像"
                defaultValue={field.value}
                setFiles={field.onChange}
                maxFiles={1}
                storagePath="/images/zirais"
                error={errors.imageUrls?.message}
              />
            )}
          />
          <TextInput
            label="ツイッターID"
            {...register('twitterId')}
            error={errors.twitterId?.message}
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
