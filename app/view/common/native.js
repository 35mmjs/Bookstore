function openHashLink(path) {
  if (!path) return
  window.location.hash = path
}

export {
  openHashLink,
}
