import { EmailFolderList } from "./EmailFolderList"

export function EmailToolBar({ onOpenNewEmail, countUnRead }) {
  return (
    <section className="email-tool-bar">
      <button onClick={onOpenNewEmail}>Compose</button>
      <div>hi</div>
      <EmailFolderList countUnRead={countUnRead} />
    </section>
  )
}
