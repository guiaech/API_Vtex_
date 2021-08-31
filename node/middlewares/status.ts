import { UserInputError } from '@vtex/api'
import { json } from 'co-body'
//import api from './api'
//import axios from 'axios'

export async function status(ctx: Context, next: () => Promise<any>) {
  
  const {
    clients: { OMS, leads:LeadsClient },
  } = ctx
        
    const body = (await json(ctx.req))
    const data = await OMS.order(body.OrderId)

    ctx.status=200
    console.log(body.OrderId)
    console.log(data.clientProfileData.email.split("-",1))
    console.log(data.creationDate)
    
    const [ email ] = data.clientProfileData.email.split("-",1)
    // todo: verificar se ainda é leed
    if(!email){
      throw new UserInputError("Fatou e-mail")
    }
    const updateLead={ 
      userid: email,
      compra: data.creationDate}
      console.log(updateLead)
    const teste = await LeadsClient.updateLead(updateLead)
    
    console.log(teste)

    await next()

  //const response = await axios.get('https://iodno295ed.execute-api.us-west-2.amazonaws.com/clientes')
  //console.log(response.data.Items)

}

