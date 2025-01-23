import { EVENT_KEY, useEmit, useOn } from '../hooks/useMitt'
import { playerStore } from '../store/index'
import { useAppRouter } from '@/use'

export class CommonEvent {
  private router = useAppRouter()
  private events = [
    {
      event: EVENT_KEY.SET_FLOATING_PANEL,
      handler: this._setFloatingPanelHandler.bind(this),
    },
  ]
  constructor() {
    this.subscribe()
  }
  private subscribe() {
    this.events.forEach((item) => {
      useOn(item.event, item.handler)
    })
  }
  private _setFloatingPanelHandler(data: number) {
    playerStore.updateStore({
      floatingPanelAnchor: data,
    })
    if (data > 0) {
      useEmit(EVENT_KEY.ALLOW_TOUCH_MOVE, false)
    } else {
      useEmit(EVENT_KEY.ALLOW_TOUCH_MOVE, true)
    }
  }
}
