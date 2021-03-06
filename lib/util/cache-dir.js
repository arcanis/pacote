const osenv = require('osenv')
const {resolve} = require('path')

module.exports = (fakePlatform = false) => {
  const temp = osenv.tmpdir()
  const uidOrPid = process.getuid ? process.getuid() : process.pid
  const home = osenv.home() || resolve(temp, 'npm-' + uidOrPid)
  const platform = fakePlatform || process.platform
  const cacheExtra = platform === 'win32' ? 'npm-cache' : '.npm'
  const cacheRoot = (platform === 'win32' && process.env.APPDATA) || home
  return resolve(cacheRoot, cacheExtra)
}
