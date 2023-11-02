import { MantineProvider } from '@mantine/core'
import { RecoilRoot } from 'recoil'

import '~/styles/reset.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <MantineProvider>
        <Component {...pageProps} />
      </MantineProvider>
    </RecoilRoot>
  )
}

export default MyApp
