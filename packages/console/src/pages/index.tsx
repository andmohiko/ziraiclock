import type { NextPage } from 'next'

import { EditZiraiForm } from '~/components/Base/Forms/EditZiraiForm'
import { DefaultLayout } from '~/components/Layouts/DefaultLayout'

const Home: NextPage = () => {
  return (
    <DefaultLayout>
      <EditZiraiForm />
    </DefaultLayout>
  )
}

export default Home
