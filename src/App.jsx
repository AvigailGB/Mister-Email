import { Navigate, Route, HashRouter as Router, Routes } from "react-router-dom"

import { Home } from "./pages/Home"
import { AboutUs } from "./pages/AboutUs"
import { EmailIndex } from "./pages/EmailIndex"
import { EmailDetails } from "./cmps/EmailDetails"
import { AppHeader } from "./cmps/AppHeader"

export function App() {
  return (
    <Router>
      <section className="main-app">
        <header>
          <AppHeader />
        </header>

        <main className="container">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/email/:folder" element={<EmailIndex />}>
              <Route path="/email/:folder/:emailId" element={<EmailDetails />} />
            </Route>
            <Route index element={<Navigate to="/home" />} />
          </Routes>
        </main>

        <footer>
          <section className="app-layout">Mails 2023 &copy;</section>
        </footer>
      </section>
    </Router>
  )
}
