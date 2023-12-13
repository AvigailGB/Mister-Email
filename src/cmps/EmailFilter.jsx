import { useEffect, useState } from "react"

export function EmailFilter({filterBy, onSetFilter}) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
  }

  useEffect(() => {
    onSetFilter(filterByToEdit)
  }, [filterByToEdit])

  const {txt} = filterByToEdit
  return (
    <section className="email-filter">
      <input onChange={handleChange} name="txt" type="text" value={txt}/>
    </section>
  )
}
