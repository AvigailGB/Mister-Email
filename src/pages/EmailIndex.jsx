import { useEffect, useState } from "react"

import { emailService } from "../services/email.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailToolBar } from "../cmps/emailToolBar"

export function EmailIndex() {
  const [emails, setEmails] = useState(null)
  const [filterBy, setFilterBy] = useState(emailService.getDefultFilter())


  useEffect(() => {
    loadEmails()
  }, [filterBy])

  async function loadEmails() {
    const emails = await emailService.query(filterBy)
    setEmails(emails)
  }

  function onSetFilter(filterBy) {
    setFilterBy(prevFilter => ({...prevFilter, ...filterBy}))
  }

  function onUpdateEmail(email){
    emailService.save(email)
  }

  const {txt} = filterBy

  if (!emails) return <div>Loading...</div>
  return (
    <section className="email-index">
      <section className="tool-bar">
        <EmailToolBar />
      </section>
      <section className="body">
        <EmailFilter filterBy={{txt}} onSetFilter={onSetFilter} />
        <EmailList emails={emails} onUpdateEmail={onUpdateEmail}/>
      </section>
    </section>
  )
}
