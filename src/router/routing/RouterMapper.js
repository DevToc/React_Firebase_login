import React from 'react'
import { Route } from 'react-router-dom'
import { MobileRouterConfig } from './RouterConfig'

export const RouterMapper = (props) =>
  (
    MobileRouterConfig.map((config, index) => {
      const Component = config.component
      return (
          <Route
            exact path={`/${config.path}`}
            component={Component}
            key={index}
            id={index}
          />
      )
    })
  )
