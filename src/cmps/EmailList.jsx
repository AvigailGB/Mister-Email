/* eslint-disable react/prop-types */
import { EmailPreview } from "./EmailPreview"

export function EmailList({ emails, onUpdateEmail }) {
  return (
    <section className="email-list">
      {emails.map((email) => {
        return <EmailPreview key={email.id} email={email} onUpdateEmail={onUpdateEmail}/>
      })}
    </section>
  )
}
