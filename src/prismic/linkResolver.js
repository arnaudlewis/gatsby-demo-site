module.exports = {
  linkResolver(doc) {
    console.log('link resolver')
    if(doc.type === 'blogpos') return `/${doc.uid}`
    else return '/'
  }
}