import type { NextPage } from 'next'
import Link from 'next/link'

import { FlexBox } from '~/components/Base/FlexBox'
import { AddMultipleZiraiForm } from '~/components/Forms/AddMultipleZiraiForm'
import { EditZiraiForm } from '~/components/Forms/EditZiraiForm'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <FlexBox gap={120}>
        <EditZiraiForm />
        <AddMultipleZiraiForm />
        <Link href="settings">設定画面</Link>
      </FlexBox>
    </DefaultLayout>
  )
}

export default Home
