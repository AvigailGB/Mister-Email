import { NavLink } from "react-router-dom"

export function AppHeader() {
  return (
    <section className="app-header">
      <section className="app-layout header">
        <h1 className="titel">Mister Email</h1>
        <nav>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/email">Email</NavLink>
        </nav>
      </section>
    </section>
  )
}
