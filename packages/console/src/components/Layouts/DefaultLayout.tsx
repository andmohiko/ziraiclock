import { ReactElement, ReactNode, useState } from 'react'

import { BaseHead } from '~/components/Base/BaseHead'
import { FlexBox } from '~/components/Base/FlexBox'
import { LoadingOverlay } from '~/components/Base/Loading'

type Props = {
  children?: ReactNode
}

export const DefaultLayout = ({ children }: Props): ReactElement => {
  // recoilなどに移してローディングをグローバルで管理する
  const [loading] = useState<boolean>(false)

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
