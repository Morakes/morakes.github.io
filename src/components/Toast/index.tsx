import { createVNode, render } from 'vue'
import { ToastProps, componentProps } from './type'
import './index.less'

const ToastComponent = defineComponent<ToastProps>({
  name: 'Toast',
  props: componentProps,
  setup(props, { slots, attrs }) {
    const renderContent = () => {
      if (props.content) {
        return props.content
      }
      return slots.default?.()
    }
    const isVisible = ref(true)

    function transitionEnd() {
      if (attrs && typeof attrs.onDestory === 'function') {
        attrs.onDestory()
      }
    }

    onMounted(() => {
      setTimeout(() => {
        isVisible.value = false
      }, props.duration)
    })

    return () => (
      <div class={['toast', { 'fade-out': !isVisible.value }]} onTransitionend={transitionEnd}>
        {props.overlay && <div class="toast-mask" />}

        <div class="toast-content">{renderContent()}</div>
      </div>
    )
  },
})

export default ToastComponent

export function Toast(props: ToastProps) {
  const parent = document.createElement('div')
  const vnode = createVNode(ToastComponent, { ...props, onDestory: destory })

  render(vnode, parent)
  document.body.appendChild(parent)

  function destory() {
    render(null, parent)
    document.body.removeChild(parent)
  }
}

export function ToastV2(props: ToastProps) {
  const parent = document.createElement('div')
  // const app = createApp({
  //   render() {
  //     return <ToastComponent {...props} onDestory={destory} />
  //   },
  // })
  const app = createApp(ToastComponent, { ...props, onDestory: destory })

  document.body.appendChild(parent)
  app.mount(parent)

  function destory() {
    app.unmount()
    document.body.removeChild(parent)
  }
}
