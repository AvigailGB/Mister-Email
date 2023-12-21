
export function EmailFilter({onSetFilter}) {

  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    onSetFilter({[field]: value})
  }

  return (
    <section className="email-filter">
      <form></form>
      <input onChange={handleChange} name="txt" type="text" />
    </section>
  )
}
