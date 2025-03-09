import useAuthStore from '@/store/auth'
import auth from '@/utils/auth'
import { AUTH_HEADER_KEY } from '@/utils/auth'

export const loadIframeOriginList = () => {
  const iframeOriginListStr: string = import.meta.env.VITE_IFRAME_ORIGIN_LIST
  let iframeOriginList: string[] = [window.origin]
  if (iframeOriginListStr) {
    iframeOriginList = iframeOriginListStr.split(',')
  }
  return iframeOriginList
}

const buildIframeIdSelector = (origin: string) => {
  return `#iframe_${origin
    .replace('://', '_')
    .replace(':', '_')
    .replace(/\./g, '_')
    .replace(/\//g, '')
    .replace('#', '_')}`
}

export const initFunction = async () => {
  const iframeOriginList = loadIframeOriginList()
  // 捕获iframe消息
  window.addEventListener('message', (event: any) => {
    // 判断消息来源是否合法
    if (iframeOriginList.includes(event.origin)) {
      // 请求认证token
      if (event.data === 'RequestAuthorization') {
        const idSelector = buildIframeIdSelector(event.origin)
        const iframe: HTMLIFrameElement | null = document.querySelector(idSelector)
        // 获取token并返回
        const token = auth.getToken()
        const info = useAuthStore().info
        const result = { type: 'token', token: token, tokenName: AUTH_HEADER_KEY, realname: info?.realname }
        iframe?.contentWindow?.postMessage(result, event.origin)
      }
    }
  })

  // 监听主题变化，随之改变主题，并广播到所有页面

  // 监听主题色变化
}

export const broadcastToAllIframe = (val: any) => {
  const iframeOriginList = loadIframeOriginList()
  for (const origin of iframeOriginList) {
    const idSelector = buildIframeIdSelector(origin)
    const iframe: HTMLIFrameElement | null = document.querySelector(idSelector)
    iframe?.contentWindow?.postMessage(val, origin)
  }
}
