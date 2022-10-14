import React from 'react'
import { ErrorBoundary } from '../index'

export const BlankLayout = ({ children }) => {
  return children ? <ErrorBoundary>{children}</ErrorBoundary> : null
}

export default BlankLayout
