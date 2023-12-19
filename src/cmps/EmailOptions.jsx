
export function EmailOptions({onSetFilter}){

    function handleChange(ev){
        const field = ev.target.name
        const value = ev.target.value
        onSetFilter({[field]: value})
    }

    return <section className="email-options">
        <select name="isRead" id="isRead" onChange={handleChange}>
            <option value="">All</option>
            <option value="read">Read</option>
            <option value="unRead">Un Read</option>
        </select>
    </section>
    
}