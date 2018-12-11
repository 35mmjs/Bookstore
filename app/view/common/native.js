/* eslint-disable prefer-template */
function openHashLink(path) {
  if (!path) return
  window.location.hash = path
}

/**
 * 获取某个key对应的cookie，如果不存在返回，空字符串
 * @param {string} key cookie的key
 * @return {string} 对应cookie的值，如果不存在，返回空字符串
 */
function getCookie(name) {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) {
    return parts
      .pop()
      .split(';')
      .shift()
  }
  return ''
}

function getUploadToken() {
  return getCookie('upload-token')
}

export { openHashLink, getCookie, getUploadToken }
