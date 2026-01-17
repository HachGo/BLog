import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { enhanceApp } from './config-helper'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    enhanceApp({ app })
  }
}
