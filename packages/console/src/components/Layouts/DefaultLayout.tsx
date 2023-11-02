import { ReactElement, ReactNode } from 'react'

import { useRecoilValue } from 'recoil'

import { LoadingState } from '~/atoms/states'
import { BaseHead } from '~/components/Base/BaseHead'
import { FlexBox } from '~/components/Base/FlexBox'
import { LoadingOverlay } from '~/components/Base/Loading'

type Props = {
  children?: ReactNode
}

export const DefaultLayout = ({ children }: Props): ReactElement => {
  // recoilなどに移してローディングをグローバルで管理する
  const loading = useRecoilValue(LoadingState)

  return (
    <>
      <BaseHead />
      <FlexBox
        style={{
          position: 'relative'
        }}
      >
        {loading && <LoadingOverlay />}
        <FlexBox px={32} py={16}>
          {children}
        </FlexBox>
      </FlexBox>
    </>
  )
}
