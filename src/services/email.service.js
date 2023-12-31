import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

export const emailService = {
  query,
  save,
  remove,
  getById,
  createEmail,
  emailDateTimeDisplay,
}

const STORAGE_KEY = "emails"

_createEmails()

async function query(filterBy, loggedinUser) {
  let emails = await storageService.query(STORAGE_KEY)
  const countUnRead = emails.reduce((acc, email) => {
    if(!email.isRead)acc++
    return acc
  },0)
  if (!filterBy) return {emails, countUnRead}
  else {
    let { txt, isRead, folder } = filterBy
    if (folder !== 'trash') {
      emails = emails.filter((email) => !email.removedAt)
    } else {
      emails = emails.filter((email) => email.removedAt)
    }
    if (folder === 'inbox') {
      emails = emails.filter((email) => email.to === loggedinUser.email)
    }else if (folder === 'sent'){
      emails = emails.filter((email) => email.from === loggedinUser.email)
    }else if (folder === 'starred') {
      emails = emails.filter((email) => email.isStarred)
    }
    if (isRead) {
      isRead = isRead === "read" ? true : false
      emails = emails.filter((email) => email.isRead === isRead)
    }
    const regeTxtTerm = new RegExp(txt, "i")
    emails = emails.filter(
      (email) => regeTxtTerm.test(email.subject) || regeTxtTerm.test(email.body)
    )
  }
  return {emails, countUnRead}
}

function getById(id) {
  return storageService.get(STORAGE_KEY, id)
}

function remove(id) {
  return storageService.remove(STORAGE_KEY, id)
}

function save(emailToSave) {
  if (emailToSave.id) {
    return storageService.put(STORAGE_KEY, emailToSave)
  } else {
    // emailToSave.isOn = false
    const newEmail = createEmail(
      emailToSave.subject,
      emailToSave.body,
      emailToSave.from,
      emailToSave.to
    )
    return storageService.post(STORAGE_KEY, newEmail)
  }
}

function emailDateTimeDisplay(dateTime) {
  let dateTimeDisplay = new Date(dateTime)
  return dateTimeDisplay.toDateString() == new Date().toDateString()
    ? dateTimeDisplay.toLocaleTimeString()
    : dateTimeDisplay.toLocaleDateString("en-US")
}

function createEmail(
  subject = "",
  body = "",
  from = "momo@momo.com",
  to = "user@appsus.com"
) {
  return {
    id: utilService.makeId(),
    subject,
    body,
    isRead: false,
    isStarred: false,
    sentAt: Date.now(),
    removedAt: null, //for later use
    from,
    to,
  }
}


function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY)
  if (!emails || !emails.length) {
    emails = [
      createEmail("hi", "hello"),
      createEmail("by", "by by"),
      createEmail("Ready", "Its ready"),
      createEmail("Love", "I love yoe"),
      createEmail("Meet", "See you soon"),
    ]
    utilService.saveToStorage(STORAGE_KEY, emails)
  }
}
