import { Navigate, Route, HashRouter as Router, Routes } from "react-router-dom"

import { Home } from "./pages/Home"
import { AboutUs } from "./pages/AboutUs"
import { EmailIndex } from "./pages/EmailIndex"
import { EmailDetails } from "./cmps/EmailDetails"
import { AppHeader } from "./cmps/AppHeader"
import { UserMsg } from "./cmps/UserMsg"

export function App() {
  return (
    <Router>
      <section className="main-app app-layout">
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
        <UserMsg/>

        <footer className="main-layout">
          <section>Mails 2023 &copy;</section>
        </footer>
      </section>
    </Router>
  )
}
