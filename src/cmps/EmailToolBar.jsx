

export function EmailToolBar({onSetFilter}){

    function handleChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        onSetFilter({[field]: value})
      }

    return <section className="email-tool-bar">
        <div className="compose">Compose</div>
        <section className="tools-section">
            <div className="inbox-tool" >Inbox</div>
            <div className="starred-tool">Starred</div>
            <div className="sent-tool">Sent</div>
            <div className="draft-tool">Draft</div>
            <div className="trash-tool">Trash</div>
        </section>
    </section>
}