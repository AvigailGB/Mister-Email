import { NavLink, Navigate, Route, HashRouter as Router, Routes } from 'react-router-dom'

import { Home } from "./pages/Home"
import { AboutUs } from "./pages/AboutUs"
import { EmailIndex } from './pages/EmailIndex'

export function App() {
  return (
    <Router>
      <section className="main-app">
        <header className="app-header">
            <section className='container'>
          <nav>
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/email">Email</NavLink>
          </nav>
            </section>
        </header>

        <main className="container">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/email" element={<EmailIndex />} />
            <Route index element={<Navigate to='/home' />} />
          </Routes>
        </main>

        <footer>
          <section className="container">Mails 2023 &copy;</section>
        </footer>
      </section>
    </Router>
  )
}
