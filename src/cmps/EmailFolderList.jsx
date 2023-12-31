import { NavLink, useParams } from "react-router-dom";


export function EmailFolderList({countUnRead}){
  const params = useParams()
  console.log('params', params);  
  
  function handleChange(){
        console.log('handleChange');
    }
    return <section className="email-folder-list">
        <section className="tools-section">
        <NavLink to="/email/inbox">inbox</NavLink>
        <NavLink to="/email/starred">Starred</NavLink>
        <NavLink to="/email/sent">Sent</NavLink>
        <NavLink to="/email/draft">Draft</NavLink>
        <NavLink to="/email/trash">Trash</NavLink>
      </section>
    </section>
}