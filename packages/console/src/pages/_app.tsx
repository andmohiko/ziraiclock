import '@mantine/core/styles.css'
import '@mantine/dropzone/styles.css'
import '@mantine/notifications/styles.css'

import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { RecoilRoot, RecoilEnv } from 'recoil'

import '~/styles/reset.css'
import type { AppProps } from 'next/app'

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

export default MyApp
