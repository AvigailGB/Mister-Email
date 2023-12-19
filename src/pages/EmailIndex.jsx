import { useEffect, useState } from "react"

import { emailService } from "../services/email.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"
import { EmailToolBar } from "../cmps/emailToolBar"
import { EmailOptions } from "../cmps/EmailOptions"

export function EmailIndex() {
  const [emails, setEmails] = useState(null)
  const [filterBy, setFilterBy] = useState()

  useEffect(() => {
    loadEmails()
  }, [filterBy])

  async function loadEmails() {
    try{
      const emails = await emailService.query(filterBy)
      setEmails(emails)
    } catch (error){
      console.log('error:', error);
    }
  }
  async function onRemoveEmail(emailId) {
    try{
      await emailService.remove(emailId)
      setEmails(prevEmails => {
        return prevEmails.filter(email => email.id !== emailId)
      })
    } catch (error){
      console.log('error:', error);
    }
  }

  function onSetFilter(filterBy) {
    setFilterBy(prevFilter => ({...prevFilter, ...filterBy}))
  }

  async function onUpdateEmail(email){
    try{
      emailService.save(email)
    } catch (error){
      console.log('error:', error);
    }
  }

  // const {txt, isRead} = filterBy

  if (!emails) return <div>Loading...</div>
  return (
    <section className="email-index">
      <section className="tool-bar">
        <EmailToolBar onSetFilter={onSetFilter}/>
      </section>
      <section className="body">
        <EmailFilter onSetFilter={onSetFilter} />
        <EmailOptions onSetFilter={onSetFilter} />
        <EmailList emails={emails} onUpdateEmail={onUpdateEmail} onRemoveEmail={onRemoveEmail}/>
      </section>
    </section>
  )
}
