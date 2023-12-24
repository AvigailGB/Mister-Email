import { IoMdSearch } from "react-icons/io";

export function EmailFilter({ onSetFilter }) {
  function handleChange(ev) {
    const field = ev.target.name
    const value = ev.target.value
    onSetFilter({ [field]: value })
  }

  return (
    <section className="email-filter">
      <img src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_default_1x_rtl_r5.png" />
      <form>
      <IoMdSearch className="search"/>
        <input onChange={handleChange} name="txt" type="text" placeholder="Search mail"/>
      </form>
    </section>
  )
}
