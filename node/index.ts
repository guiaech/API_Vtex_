import type { ClientsConfig, ServiceContext} from '@vtex/api'
import { method, Service } from '@vtex/api'

import { Clients } from './clients'
import { status } from './middlewares/status'
import { validate } from './middlewares/validate'

const TIMEOUT_MS = 1000

const clients: ClientsConfig<Clients> = {
   implementation: Clients,
  options: {
      default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
    type Context = ServiceContext<Clients>
}

export default new Service({
  clients,
  routes: {
      status: method({
      GET: [validate, status],
      POST: [status]
    }),
  },
})
