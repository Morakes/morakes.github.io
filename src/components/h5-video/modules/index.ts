import { CommonEvent } from './common-event'
import { DataReport } from './data-report'
import { SidebarEvent } from './sidebar-event'

export class ModuleInject {
  constructor() {
    new CommonEvent()
    new SidebarEvent()
    new DataReport()
  }
}
