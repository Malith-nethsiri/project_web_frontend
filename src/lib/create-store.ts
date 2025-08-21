import { useState, useEffect } from 'react'

type SetState<T> = (partial: T | Partial<T> | ((state: T) => T | Partial<T>)) => void
type GetState<T> = () => T
type StoreApi<T> = {
  setState: SetState<T>
  getState: GetState<T>
  subscribe: (listener: (state: T) => void) => () => void
}

type StateCreator<T> = (set: SetState<T>, get: GetState<T>) => T

export function create<T>(stateCreator: StateCreator<T>) {
  let state: T
  const listeners = new Set<(state: T) => void>()

  const setState: SetState<T> = (partial) => {
    const nextState = typeof partial === 'function' 
      ? (partial as (state: T) => T | Partial<T>)(state)
      : partial

    if (nextState !== state) {
      state = typeof nextState === 'object' && nextState !== null
        ? { ...state, ...nextState }
        : nextState as T

      listeners.forEach(listener => listener(state))
    }
  }

  const getState: GetState<T> = () => state

  const subscribe = (listener: (state: T) => void) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }

  const api: StoreApi<T> = { setState, getState, subscribe }
  state = stateCreator(setState, getState)

  const useStore = () => {
    const [, forceUpdate] = useState({})
    
    useEffect(() => {
      const unsubscribe = subscribe(() => {
        forceUpdate({})
      })
      return unsubscribe
    }, [])

    return state
  }

  return useStore
}