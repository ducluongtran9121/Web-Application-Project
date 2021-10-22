import { dataMachine } from './dataMachine'
import { httpClient } from '../utils'

export const userMachine = (id: number) =>
  dataMachine('user').withConfig({
    services: {
      fetchData: async () => {
        const resp = await httpClient.get(`/members/${id}/`)
        return resp.data
      },
    },
  })
