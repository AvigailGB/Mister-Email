

export function EmailToolBar(){
    return <section className="email-tool-bar">
        <div className="compose">Compose</div>
        <section className="tools-section">
            <div className="inbox-tool">Inbox</div>
            <div className="starred-tool">Starred</div>
            <div className="sent-tool">Sent</div>
            <div className="draft-tool">Draft</div>
            <div className="trash-tool">Trash</div>
        </section>
    </section>
}