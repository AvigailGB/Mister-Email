import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { EmailFolderList } from "./EmailFolderList";

export function EmailToolBar({ onSetFilter, onOpenNewEmail, countUnRead }) {
  const [starred, setStarred] = useState(true)
  const params = useParams

 
  function handleChange(ev) {
    const value = ev.target.id

    if (value === "to" || value === "from") {
      onSetFilter({ disply: value })
    } else if (value === "isStarred") {
      setStarred(!starred)
      onSetFilter({ isStarred: starred })
    } else if (value === "trash") {
      onSetFilter({ trash: true })
    }
  }

  return (
    <section className="email-tool-bar">
      <button className="composeing" onClick={onOpenNewEmail}>
        Compose
      </button>
      < EmailFolderList countUnRead={countUnRead}/>
    </section>
  )
}
