import type { NextPage } from 'next'
import Link from 'next/link'

import { FlexBox } from '~/components/Base/FlexBox'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'
import { useZirais } from '~/hooks/useZirais'

const Settings: NextPage = () => {
  const { ziraiCount, uniqueUserCount } = useZirais()
  return (
    <DefaultLayout>
      <FlexBox gap={120}>
        <div>
          <h1>地雷女子一覧</h1>
          <p>地雷女子の数: {ziraiCount}</p>
          <p>ユニークなユーザー数: {uniqueUserCount}</p>
        </div>
        <Link href="/">ホーム画面</Link>
      </FlexBox>
    </DefaultLayout>
  )
}

export default Settings
