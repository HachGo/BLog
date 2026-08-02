import DefaultTheme from 'vitepress/theme'
import ProtectedContent from './components/ProtectedContent.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ProtectedContent', ProtectedContent)
  },
}
