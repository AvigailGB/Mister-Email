import { useEffect, useState } from "react"

import { emailService } from "../services/email.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailToolBar } from "../cmps/emailToolBar"
import { EmailOptions } from "../cmps/EmailOptions"
import { NewEmail } from "./NewEmail"
import { Outlet, useParams } from "react-router-dom"
import { utilService } from "../services/util.service"

export function EmailIndex() {
  const [emails, setEmails] = useState(null)
  const [filterBy, setFilterBy] = useState(utilService.getDefaultFilter())
  const [openNewEmail, setOpenNewEmail] = useState(null)

  const params = useParams()
  const loggedinUser = {
    email: "user@appsus.com",
    fullname: "Mahatma Appsus",
  }

  useEffect(() => {
    loadEmails()
  }, [filterBy])

  async function loadEmails() {
    try {
      const emails = await emailService.query(filterBy, loggedinUser)
      setEmails(emails)
    } catch (error) {
      console.log("error:", error)
    }
  }
  async function onRemoveEmail(emailId) {
    try {
      await emailService.remove(emailId)
      setEmails((prevEmails) => {
        return prevEmails.filter((email) => email.id !== emailId)
      })
    } catch (error) {
      console.log("error:", error)
    }
  }

  function onSetFilter(filterBy) {
    console.log(filterBy);
    setFilterBy({trash: false, isStarred: false})
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }))
  }

  async function onAddateEmail(email) {
    try {
      const addEmail = await emailService.save(email)
      setEmails((prevEmails) => [...prevEmails, addEmail])
    } catch (error) {
      console.log("error:", error)
    }
  }
  async function onUpdateEmail(email) {
    try {
      const updatedEmail = await emailService.save(email)
      if (!updatedEmail.removedAt) {
        setEmails((prevEmails) =>
          prevEmails.map((email) =>
            email.id === updatedEmail.id ? updatedEmail : email
          )
        )
      }else {
        setEmails((prevEmails) => {
          return prevEmails.filter((email) => email.id !== updatedEmail.id)
        })
      }
    } catch (error) {
      console.log("error:", error)
    }
  }

  function onOpenNewEmail() {
    setOpenNewEmail(!openNewEmail)
  }

  // const {txt, isRead} = filterBy

  if (!emails) return <div>Loading...</div>
  return (
    <section className="email-index app-layout">
      <EmailFilter onSetFilter={onSetFilter} />
      <EmailToolBar onSetFilter={onSetFilter} onOpenNewEmail={onOpenNewEmail} />
      <section className="body">
        <EmailOptions onSetFilter={onSetFilter} />
        {params.emailId ? (
          <Outlet />
        ) : (
          <EmailList
            emails={emails}
            onUpdateEmail={onUpdateEmail}
            onRemoveEmail={onRemoveEmail}
          />
        )}
        {openNewEmail && (
          <NewEmail
            loggedinUser={loggedinUser}
            onOpenNewEmail={onOpenNewEmail}
          />
        )}
      </section>
    </section>
  )
}
