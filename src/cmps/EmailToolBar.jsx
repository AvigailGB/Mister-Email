import { useState } from "react";


export function EmailToolBar({onSetFilter, onOpenNewEmail, countUnRead}){

    const [starred, setStarred] = useState(true)
    console.log(countUnRead);
    function handleChange(ev) {
        console.log('innerText', ev.target.id);
        const value = ev.target.id

        if(value === 'to' || value === 'from'){
            onSetFilter({disply: value})
        }
        else if(value === 'isStarred'){
            setStarred(!starred)
            onSetFilter({isStarred: starred})
        }
        else if(value === 'trash'){
            onSetFilter({trash: true});
        }
      }


    return <section className="email-tool-bar">
        <button className="composeing" onClick={onOpenNewEmail}>Compose</button>
        <section className="tools-section">
            <div className="inbox-tool" id="to" onClick={handleChange}>Inbox</div>
            <div>{countUnRead}</div>
            <div className="starred-tool" id="isStarred"onClick={handleChange}>Starred</div>
            <div className="sent-tool" id="from" onClick={handleChange}>Sent</div>
            <div className="draft-tool">Draft</div>
            <div className="trash-tool" id="trash" onClick={handleChange}>Trash</div>
        </section>
    </section>
}