/* eslint-disable react/prop-types */
import { EmailPreview } from "./EmailPreview"

export function EmailList({ emails, onUpdateEmail, onRemoveEmail, setUnReadCount }) {
  return (
    <section className="email-list">
      {emails.map((email) => {
        return <EmailPreview key={email.id} email={email} onUpdateEmail={onUpdateEmail} onRemoveEmail={onRemoveEmail} setUnReadCount={setUnReadCount}/>
      })}
    </section>
  )
}
