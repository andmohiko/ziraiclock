import { defineManifest } from '@crxjs/vite-plugin'
import { version } from '../package.json'

// NOTE: do not include src/ in paths,
// vite root folder: src, public folder: public (based on the project root)
// @see ../vite.config.ts#L16

const manifest = defineManifest(async (env) => ({
  manifest_version: 3,
  name: `${env.mode === 'development' ? '[Dev] ' : ''}地雷時計`,
  description: '地雷女子が時間を教えてくれるよ',
  version,
  background: {
    service_worker: 'background/index.ts'
  },
  host_permissions: [],
  web_accessible_resources: [
    {
      resources: ['welcome/welcome.html'],
      matches: ['<all_urls>']
    }
  ],
  action: {
    default_icon: {
      '16': 'images/extension_16.png',
      '32': 'images/extension_32.png',
      '48': 'images/extension_48.png',
      '128': 'images/extension_128.png'
    }
  },
  icons: {
    '16': 'images/extension_16.png',
    '32': 'images/extension_32.png',
    '48': 'images/extension_48.png',
    '128': 'images/extension_128.png'
  },
  chrome_url_overrides: {
    newtab: 'newtab/index.html'
  }
}))

export default manifest
