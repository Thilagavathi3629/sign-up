// src/routes/__root.jsx
import { createRootRoute, Outlet, Link } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
      {/*   */}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  )
}