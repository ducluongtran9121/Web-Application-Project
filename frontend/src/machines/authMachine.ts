import {
  createMachine,
  assign,
  StateNode,
  MachineConfig,
  MachineOptions,
} from 'xstate'
import { User } from '../models'
import { history } from '../utils'

export interface AuthContext {
  user?: User
  message?: string
}

export type AuthEvent = { type: 'SIGNIN' } | { type: 'SIGNOUT' }

interface AuthStateSchema {
  states: {
    unauthorized: StateNode
    signingIn: StateNode
    authorized: StateNode
    signingOut: StateNode
  }
}

export type AuthTypeState =
  | {
      value: 'unauthorized'
      context: AuthContext & {
        user: undefined
      }
    }
  | {
      value: 'signingIn'
      context: AuthContext & {
        user: undefined
      }
    }
  | {
      value: 'authorized'
      context: AuthContext & {
        message: undefined
      }
    }
  | {
      value: 'signingOut'
      context: AuthContext & {
        user: undefined
      }
    }

const authMachineConfig: MachineConfig<
  AuthContext,
  AuthStateSchema,
  AuthEvent
> = {
  id: 'authentication',
  initial: 'unauthorized',
  context: {
    user: undefined,
    message: undefined,
  },
  states: {
    unauthorized: {
      on: {
        SIGNIN: 'signingIn',
      },
    },
    signingIn: {
      invoke: {
        src: 'performSignIn',
        onDone: { target: 'authorized', actions: 'onSuccess' },
        onError: { target: 'unauthorized', actions: 'onError' },
      },
    },
    authorized: {
      entry: 'redirectToHome',
      on: {
        SIGNOUT: 'signingOut',
      },
    },
    signingOut: {
      invoke: {
        src: 'performSignOut',
        onDone: { target: 'unauthorized' },
        onError: { target: 'unauthorized', actions: 'onError' },
      },
    },
  },
}

const authMachineOptions: Partial<MachineOptions<AuthContext, AuthEvent>> = {
  services: {
    performSignIn: async (context, event) => {},
    performSignOut: async (context, event) => {},
  },
  actions: {
    redirectToHome: () => {
      if (history.location.pathname === '/signin') {
        history.push('/')
      }
    },
    onSuccess: assign((_, event: any) => ({
      user: event.data,
      message: undefined,
    })),
    onError: assign((_, event: any) => ({
      message: event.data,
    })),
  },
}

export const authMachine = createMachine<AuthContext, AuthEvent, AuthTypeState>(
  authMachineConfig,
  authMachineOptions
)
