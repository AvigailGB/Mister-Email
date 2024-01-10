import { useEffect, useState } from "react"

import { emailService } from "../services/email.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailToolBar } from "../cmps/EmailToolBar"
import { EmailOptions } from "../cmps/EmailOptions"
import { NewEmail } from "./NewEmail"
import { Outlet, useParams, useSearchParams } from "react-router-dom"
import { utilService } from "../services/util.service"
import { eventBusService } from "../services/event-bus.service"

export function EmailIndex() {
  const params = useParams()
  const [searchParams, setSearchParams] = useSearchParams()
  const [emails, setEmails] = useState(null)
  const [filterBy, setFilterBy] = useState(utilService.getFilterFromParams(searchParams))
  const [openNewEmail, setOpenNewEmail] = useState(null)
  const [countUnRead, setCountUnRead] = useState(0)
    
  const loggedinUser = {
    email: "user@appsus.com",
    fullname: "Mahatma Appsus",
  }
  

  useEffect(() => {
    console.log(filterBy);
    setSearchParams({filterBy})
    loadEmails()
  }, [filterBy, params.folder])

  async function loadEmails() {
    try {
      const {emails, countUnRead} = await emailService.query({filterBy, folder: params.folder}, loggedinUser)
      setCountUnRead(countUnRead)
      setEmails([...emails])
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
      eventBusService.emit('show-user-msg',{type: 'seccess', txt:'Email removed'})
    } catch (error) {
      console.log("error:", error)
    }
  }

  function onSetFilter(filterBy) {
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

  function setUnReadCount(){
    setCountUnRead((prevCount) => {return prevCount-1})
  }

  function onOpenNewEmail() {
    setOpenNewEmail(!openNewEmail)
  }

  // const {txt, isRead} = filterBy

  if (!emails) return <div>Loading...</div>
  return (
    <section className="email-index email-layout">
      <EmailFilter onSetFilter={onSetFilter} />
      <EmailToolBar onOpenNewEmail={onOpenNewEmail} countUnRead={countUnRead}/>
      <section className="body">
        <EmailOptions onSetFilter={onSetFilter} />
        {params.emailId ? (
          <Outlet />
        ):(
          <EmailList
            emails={emails}
            onUpdateEmail={onUpdateEmail}
            onRemoveEmail={onRemoveEmail}
            setUnReadCount={setUnReadCount}
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
