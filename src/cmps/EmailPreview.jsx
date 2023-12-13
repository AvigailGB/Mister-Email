import { useState } from 'react'
import imgUrl from '../assets/imgs/star-outline-svgrepo-com.svg'
import { emailService } from '../services/email.service'

export function EmailPreview({ email , onUpdateEmail}) {
    const [isStarred, setIsStarred] = useState(false)
    const [isRead, setIsRead] = useState(false)

    function setStarred(){
        email.isStarred = true
        onUpdateEmail(email)
        setIsStarred(!isStarred)
    }

    function setRead(){
      console.log(email);
      if(!email.isRead){
        email.isRead = true
        onUpdateEmail(email)
        setIsRead(true)
        console.log(email);
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
