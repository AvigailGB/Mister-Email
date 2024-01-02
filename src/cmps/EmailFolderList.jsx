import { NavLink, useParams } from "react-router-dom";
import { BiSolidInbox } from "react-icons/bi";
import { FaRegStar } from "react-icons/fa";
import { RiSendPlane2Line } from "react-icons/ri";
import { GrDocument } from "react-icons/gr";
import { CgTrash } from "react-icons/cg";



export function EmailFolderList({countUnRead}){
  const params = useParams()
  console.log('params', params);  
  
 
    return <section className="email-folder-list">
        <section className="tools-section">
        <NavLink to="/email/inbox"><BiSolidInbox/>inbox<span>{countUnRead}</span></NavLink>
        <NavLink to="/email/starred"><FaRegStar/>Starred</NavLink>
        <NavLink to="/email/sent"><RiSendPlane2Line/>Sent</NavLink>
        <NavLink to="/email/draft"><GrDocument/>Draft</NavLink>
        <NavLink to="/email/trash"><CgTrash/>Trash</NavLink>
      </section>
    </section>
}