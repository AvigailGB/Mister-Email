import { useState } from "react";


export function EmailToolBar({onSetFilter, onOpenNewEmail }){

    const [starred, setStarred] = useState(true)

    function handleChange(ev) {
        console.log('innerText', ev.target.id);
        const value = ev.target.id
        if(value === 'to' || value === 'from'){
            onSetFilter({disply: value})
        }
        if(value === 'isStarred'){
            setStarred(!starred)
            console.log(starred);
            onSetFilter({isStarred: starred})
        }
      }


    return <section className="email-tool-bar">
        <button className="composeing" onClick={onOpenNewEmail}>Compose</button>
        <section className="tools-section">
            <div className="inbox-tool" id="to" onClick={handleChange}>Inbox</div>
            <div className="starred-tool" id="isStarred"onClick={handleChange}>Starred</div>
            <div className="sent-tool" id="from" onClick={handleChange}>Sent</div>
            <div className="draft-tool">Draft</div>
            <div className="trash-tool">Trash</div>
        </section>
    </section>
}