import {
  createMachine,
  assign,
  StateNode,
  MachineConfig,
  MachineOptions,
} from 'xstate'

interface DataContext {
  data?: any
  message?: string
}

interface DataStateSchema {
  states: {
    idle: StateNode
    fetching: StateNode
    success: StateNode
    failure: StateNode
  }
}

type DataTypeState =
  | {
      value: 'idle'
      context: DataContext & {
        data: undefined
      }
    }
  | {
      value: 'fetching'
      context: DataContext & {
        data: undefined
      }
    }
  | {
      value: 'success'
      context: DataContext & {
        message: undefined
      }
    }
  | {
      value: 'failure'
      context: DataContext & {
        data: undefined
      }
    }

type DataEvent = { type: 'FETCH' } | { type: 'SUCCESS' } | { type: 'FAILURE' }

const dataMachineConfig = (
  machineId: string
): MachineConfig<DataContext, DataStateSchema, DataEvent> => ({
  id: machineId,
  initial: 'idle',
  context: {
    data: undefined,
  },
  states: {
    idle: {
      on: {
        FETCH: 'fetching',
      },
    },
    fetching: {
      invoke: {
        src: 'fetchData',
        onDone: { target: 'success' },
        onError: { target: 'failure', actions: 'setMessage' },
      },
    },
    success: {
      entry: ['setData'],
      on: {
        FETCH: 'fetching',
      },
    },
    failure: {
      entry: ['setMessage'],
      on: {
        FETCH: 'fetching',
      },
    },
  },
})

const dataMachineOptions: Partial<MachineOptions<DataContext, DataEvent>> = {
  actions: {
    setData: assign((_, event: any) => ({
      data: event.data,
    })),
    setMessage: assign((_, event: any) => ({
      message: event.data,
    })),
  },
}

export const dataMachine = (machineId: string) =>
  createMachine<DataContext, DataEvent, DataTypeState>(
    dataMachineConfig(machineId),
    dataMachineOptions
  )
