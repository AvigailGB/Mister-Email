import { IoCloseOutline } from "react-icons/io5"
import { CgTrash } from "react-icons/cg";
import { useState } from "react";
import { emailService } from "../services/email.service";


export function NewEmail({ loggedinUser, onOpenNewEmail }) {
    const [newEmail, setNewEmail] = useState({})

    function onSetNewEmail(ev){
        const field = ev.target.name
        const value = ev.target.value
        setNewEmail(prevNewEmail => ({...prevNewEmail, [field]: value}))
    }

    function onSendEmail(){
        newEmail.from = loggedinUser.email
        emailService.save(newEmail)
        onOpenNewEmail()
    }

  return (
    <section className="new-email">
      <header className="header">
        <div>new message</div>
        <IoCloseOutline onClick={onOpenNewEmail} />
      </header>
      <main>
        <form action="">
          <label htmlFor="to">to:</label>
          <input onChange={onSetNewEmail} type="text" id="to" name="to"/>
          <label htmlFor="subject">subject</label>
          <input onChange={onSetNewEmail} type="text" id="subject" name="subject"/>
          <label htmlFor="body"></label>
          <input onChange={onSetNewEmail} type="text" id="body" name="body"/>
        </form>
      </main>
      <footer>
        <button onClick={onSendEmail}>send</button>
        <CgTrash/>
      </footer>
    </section>
  )
}
