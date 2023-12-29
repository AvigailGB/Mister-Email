import { useState } from 'react'
import { emailService } from '../services/email.service'
import { FaRegStar ,FaStar} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { CgTrash } from "react-icons/cg";




export function EmailPreview({ email , onUpdateEmail, onRemoveEmail, setUnReadCount}) {

    function setStarred(){
        email.isStarred = !email.isStarred
        onUpdateEmail(email)
    }

    function setRead(){
      if(!email.isRead){
        email.isRead = true
        onUpdateEmail(email)
        setUnReadCount()
        }
    }

    function onRemove(){
      if(email.removedAt){
        onRemoveEmail(email.id)
      }else{
        email.removedAt = Date.now()
        onUpdateEmail(email)
      }
    }

    const mailStatusClass = email.isRead? 'read' : ''
    const starModClass = email.isStarred ? 'starred' : 'unstarred'
  return (
    <section className="email-preview">
      <div className={`email-container ${(mailStatusClass)}`} onClick={() => { setRead() }}>
        <FaRegStar className={`email-star ${(starModClass)}`} onClick={() => { setStarred()}}/>
        <FaStar className={`email-starred ${(starModClass)}`} onClick={() => { setStarred()}}/>
        <Link to={`/email/:folder/${email.id}`}>
        <div className="email-titel">{email.from}</div>
        <div className="email-subject">{email.subject}</div>
        </Link>
        <section className='option-end-line'>
          <div className="email-time">{emailService.emailDateTimeDisplay(email.sentAt)}</div>
          <section className='delete-options'>
            <div className='remove-email'><CgTrash onClick={onRemove}/></div>
            <div className='read-email'></div>
          </section>
        </section>
      </div>
    </section>
  )
}
