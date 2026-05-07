'use client'

import { useSyncExternalStore } from 'react'

// Inert subscription for useSyncExternalStore
const emptySubscribe = () => () => {}

/**
 * Returns true after the component has mounted on the client.
 * Prevents hydration mismatches between server and client renders.
 * Uses useSyncExternalStore to avoid the setState-in-effect lint rule.
 */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,  // client returns true
    () => false  // server returns false
  )
}
