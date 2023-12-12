import { storageService } from "./async-storage.service.js"
import { utilService } from "./util.service.js"

export const emailService = {
  query,
  save,
  remove,
  getById,
  createEmail,
  emailDateTimeDisplay
}

const STORAGE_KEY = "emails"

_createEmails()

async function query() {
  let emails = await storageService.query(STORAGE_KEY)
  // if (filterBy) {
  //   var { status, txt, isRead } = filterBy
  //   // maxBatteryStatus = maxBatteryStatus || Infinity
  //   // minBatteryStatus = minBatteryStatus || 0
  //   // emails = emails.filter(
  //     (email) =>
  //       email.status.includes(status) &&
  //       email.txt.toLowerCase().includes(model.toLowerCase()) &&
  //       email.batteryStatus < maxBatteryStatus &&
  //       email.batteryStatus > minBatteryStatus
  //   )
  // }
  return emails
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
    return storageService.post(STORAGE_KEY, emailToSave)
  }
}

function emailDateTimeDisplay(dateTime) {
  let dateTimeDisplay = new Date(dateTime);
  return dateTimeDisplay.toDateString() == new Date().toDateString() ? dateTimeDisplay.toLocaleTimeString() : dateTimeDisplay.toLocaleDateString('en-US')
}  

function createEmail(subject = "", body = "", from = "momo@momo.com" , to = "user@appsus.com") {
  return {
    id: utilService.makeId(),
    subject,
    body,
    isRead: false,
    isStarred: false,
    sentAt: Date.now(),
    removedAt: null, //for later use
    from,
    to
  }
}

function _createEmails() {
  let emails = utilService.loadFromStorage(STORAGE_KEY)
  if (!emails || !emails.length) {
    emails = [
        createEmail('hi', 'hello'),
        createEmail('by', 'by by'),
        createEmail('Ready', 'Its ready'),
        createEmail('Love', 'I love yoe'),
        createEmail('Meet', 'See you soon')
    ]
    utilService.saveToStorage(STORAGE_KEY, emails)
  }
}