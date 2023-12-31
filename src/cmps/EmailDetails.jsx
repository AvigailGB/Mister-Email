import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { emailService } from "../services/email.service"
import { MdArrowBack } from "react-icons/md";
import { CgTrash } from "react-icons/cg";

export function EmailDetails() {
  const [email, setEmail] = useState(null)
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    loadEmail()
  }, [])

  function onBack(){
    navigate('/email/'+ params.folder)
  }

  async function loadEmail() {
    try {
        const email = await emailService.getById(params.emailId)
        setEmail(email)
    } catch (error){
        console.log('error:', error)
    }
  }

  async function onRemoveEmail() {
    try{
      await emailService.remove(email.id)
      onBack()
    } catch (error){
      console.log('error:', error);
    }
  }

  if (!email) return <div>loding...</div>
  return (
    <section className="Email-details">
      <section className="options">
        <div className="back"><MdArrowBack onClick={onBack}/></div>
        <div className="delet"><CgTrash onClick={onRemoveEmail}/></div>
      </section>
      <section className="details">
        <div className="subject">{email.subject}</div>
        <div className="sentAt">Sent at: {emailService.emailDateTimeDisplay(email.sentAt)}</div>
        <div className="from">From: {email.from}</div>
        <div className="body">{email.body}</div>

      </section>
    </section>
  )
}
