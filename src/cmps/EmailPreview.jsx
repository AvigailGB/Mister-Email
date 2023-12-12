import { useState } from 'react'
import imgUrl from '../assets/imgs/star-outline-svgrepo-com.svg'
import { emailService } from '../services/email.service'

export function EmailPreview({ email }) {
    const [isStarred, setIsStarred] = useState(false)
    const [isRead, setIsRead] = useState(false)

    function setStarred(){
        email.isStarred = true
        emailService.save(email)
        setIsStarred(!isStarred)
    }

    function setRead(){
        if(!email.isRead){
            email.isRead = true
            emailService.save(email)
            setIsRead(true)
        }
    }

    const mailStatusClass = isRead? 'read' : ''
    const starModClass = isStarred ? 'starred' : ''
  return (
    <section className="email-preview">
      <div className={`email-container ${mailStatusClass}`} onClick={() => { setRead() }}>
        <img className={`img-star ${starModClass}`} src={imgUrl} alt="" onClick={() => { setStarred() }}/>
        <div className="email-titel">{email.from}</div>
        <div className="email-subject">{email.subject}</div>
        <div className="email-time">{emailService.emailDateTimeDisplay(email.sentAt)}</div>
      </div>
    </section>
  )
}
