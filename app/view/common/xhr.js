import io from 'xhr-plus'

const CTOKEN = 'csrfToken'

function getCtokenFromCookie(cookie) {
  const cookieParts = cookie.split(/;\s/g)
  for (let i = 0, len = cookieParts.length; i < len; i++) {
    const cookieNameValue = cookieParts[i].match(/([^=]+)=/i)
    if (cookieNameValue && cookieNameValue[1] === CTOKEN) {
      return cookieParts[i].substring(cookieNameValue[1].length + 1)
    }
  }
  return ''
}
const ajaxSetup = io.ajaxSetup

ajaxSetup({
  traditional: true,
  beforeSend(xhr) {
    const ctoken = getCtokenFromCookie(window.document.cookie)
    xhr.setRequestHeader('x-csrf-token', ctoken)
  },
})

export default io
