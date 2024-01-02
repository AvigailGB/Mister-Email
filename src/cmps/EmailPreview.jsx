import { useState } from 'react'
import { emailService } from '../services/email.service'
import { FaRegStar ,FaStar} from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import { CgTrash } from "react-icons/cg";
import { MdOutlineMarkEmailUnread } from "react-icons/md"
import { PiArchiveBox } from "react-icons/pi";


export function EmailPreview({ email , onUpdateEmail, onRemoveEmail, setUnReadCount}) {

  const params = useParams()
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

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
    <section className="email-preview"onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <div className={`email-container ${(mailStatusClass)}`} onClick={() => { setRead() }}>
        <FaRegStar className={`email-star ${(starModClass)}`} onClick={() => { setStarred()}}/>
        <FaStar className={`email-starred ${(starModClass)}`} onClick={() => { setStarred()}}/>
        <Link to={`/email/${params.folder}/${email.id}`}>
        <div className="email-titel">{email.from}</div>
        <div className="email-subject">{email.subject}</div>
        </Link>
        <section className='option-end-line'>
        {!isHovering ? (
          <div className="email-time">{emailService.emailDateTimeDisplay(email.sentAt)}</div>
        ):(
          <section className='delete-options'>
            <CgTrash onClick={onRemove}/>
            <MdOutlineMarkEmailUnread />
            <PiArchiveBox onClick={onRemove}/>
          </section>
          )}
        </section>
      </div>
    </section>
  )
}
