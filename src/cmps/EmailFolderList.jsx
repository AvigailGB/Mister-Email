

export function EmailFolderList({countUnRead}){
    function handleChange(){
        console.log('handleChange');
    }
    return <section className="email-folder-list">
        <section className="tools-section">
        <div className="inbox-tool" id="to" onClick={handleChange}>
          <div>Inbox</div>
          <div>{countUnRead}</div>
        </div>
        <div className="starred-tool" id="isStarred" onClick={handleChange}>
          Starred
        </div>
        <div className="sent-tool" id="from" onClick={handleChange}>
          Sent
        </div>
        <div>hi</div>
        <div className="draft-tool">Draft</div>
        <div className="trash-tool" id="trash" onClick={handleChange}>
          Trash
        </div>
      </section>
    </section>
}