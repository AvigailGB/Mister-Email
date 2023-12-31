import { EmailFolderList } from "./EmailFolderList"
import { LuPencil } from "react-icons/lu";

export function EmailToolBar({ onOpenNewEmail, countUnRead }) {
  return (
    <section className="email-tool-bar">
      <button onClick={onOpenNewEmail}><LuPencil/>Compose</button>
      <EmailFolderList countUnRead={countUnRead} />
    </section>
  )
}
