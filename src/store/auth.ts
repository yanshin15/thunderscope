import auth from '@/utils/auth'
import type { LoginFormData, State } from '@/types/auth'
import { getdocsLogin } from '@/utils/api'

export default defineStore('auth', {
  state: (): State => ({
    loading: false,
    errorMessage: ''
  }),
  actions: {
    async login(formData: LoginFormData) {
      this.loading = true
      this.errorMessage = ''
      const response = await getdocsLogin(formData)
      this.loading = false
      if (!response.error) {
        auth.setToken(response)
        return response
      } else {
        this.errorMessage = response.error
      }
    }
    // login(account: unknown) {
    //   return new Promise((resolve, reject) => {
    //     api
    //       .post<string>('/auth/login', account)
    //       .then(res => {
    //         if (res.data) {
    //           auth.setToken(res.data)
    //           resolve(res.data)
    //         }
    //       })
    //       .catch(err => {
    //         ElMessage.error(err.message || err.msg || '稍后重试')
    //         reject()
    //       })
    //   })
    // }
    // getInfo: async function (refresh = false) {
    //   try {
    //     const res = await api.get<{ info: UserModel; roles: Array<Role> }>('/auth/user-info', { refresh })
    //     this.info = res.data?.info
    //     if (this.info?.avatarUrl) this.avatar = buildImgSrc(this.info?.avatarUrl)
    //     this.realname = `${this.info?.realname}`
    //     this.roles = res.data?.roles ?? []
    //   } catch (e) {
    //     throw new Error('获取登录用户信息异常')
    //   }
    // },
    // async logout() {
    //   try {
    //     await api.post('/auth/logout')
    //   } finally {
    //     auth.clearToken()
    //     this.$reset()
    //     resetRouter()
    //     router.push({ name: 'Login' }).finally()
    //     useViewTabs().$reset()
    //   }
    // }
  }
})
