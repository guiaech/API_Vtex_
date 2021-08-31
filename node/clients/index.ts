//node/Clients/index.ts
import { IOClients } from '@vtex/api'
import { Catalog } from '@vtex/clients'
import { OMS } from '@vtex/clients'
import Leads from './leads'


// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get leads() {
    return this.getOrSet('leads', Leads)
  }

  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }

public get OMS() {
  return this.getOrSet('oms', OMS)
}

}
