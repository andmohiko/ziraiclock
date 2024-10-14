import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/notifications/styles.css'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import App from 'next/app'
import { RecoilRoot, RecoilEnv } from 'recoil'

import '~/styles/reset.css'

import type { AppProps, AppContext } from 'next/app'

import basicAuthCheck from '~/utils/basicAuthCheck'

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <MantineProvider>
        <Notifications position="bottom-right" />
        <Component {...pageProps} />
      </MantineProvider>
    </RecoilRoot>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const { req, res } = appContext.ctx
  if (req && res) {
    await basicAuthCheck(req, res)
  }
  const appProps = await App.getInitialProps(appContext)
  return {
    ...appProps
  }
}

export default MyApp
