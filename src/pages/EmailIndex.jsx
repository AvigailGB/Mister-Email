import { useEffect, useState } from "react"

import { emailService } from "../services/email.service"
import { EmailList } from "../cmps/EmailList"
import { EmailFilter } from "../cmps/EmailFilter"

export function EmailIndex (){

    const [emails, setEmails] = useState(null)

    useEffect(() => {
        loadEmails()
    }, [])

    async function loadEmails() {
        const emails = await emailService.query()
        setEmails(emails)
    }
        if (!emails) return <div>Loading...</div>
        return <section className="email-index">
        <EmailFilter/>
        <EmailList emails={emails}/>
    </section>
}