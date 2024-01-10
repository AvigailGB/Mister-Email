import { useEffect, useState } from "react"
import { eventBusService } from "../services/event-bus.service"

export function UserMsg() {
    const [msg, setMsg] = useState(null)

    useEffect(() => {
        eventBusService.on('show-user-msg', (msg) => {
            console.log('hi');
            setMsg(msg)
            setTimeout(() => {
                onCloseMsg()
            }, 3000)
        })

    
    }, [])
    

    function onCloseMsg() {
        setMsg(null)
    }

    if (!msg) return <></>
    return (
        <div className={"user-msg " + msg.type}>
            <p>{msg.txt}</p>
            <button onClick={onCloseMsg}>X</button>
        </div>
    )
}