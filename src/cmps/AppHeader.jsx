import { NavLink } from "react-router-dom"

export function AppHeader() {
  return (
    <section className="app-header full main-layout">
      <section className="header">
        <h1 className="titel">Mister Email</h1>
        <nav>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/email/inbox">Email</NavLink>
        </nav>
      </section>
    </section>
  )
}
