import type { NextPage } from 'next'

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
      </FlexBox>
    </DefaultLayout>
  )
}

export default Home
