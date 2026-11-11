export const projectName = '4-Ch Knob Line Follower'
export const projectSlug = '4-Ch-Knob-Line-Follower'
export const defaultVersion = 'latest'

export const versionDefinitions = [
  {
    version: 'latest',
    label: 'Latest',
    entryPath: '/docs/index.html'
  },
  {
    version: 'gpio-version',
    label: 'GPIO Version',
    description: 'GPIO interface documentation',
    entryPath: '/docs/1_4-Ch_Line_Follower_Sensor_Overview.html'
  },
  {
    version: 'i2c-version',
    label: 'I2C Version',
    description: 'I2C interface documentation',
    entryPath: '/docs/1_4-Ch_Line_Follower_Sensor_Overview.html'
  }
]

export function getVersionBase(version = defaultVersion) {
  return `/projects/${projectSlug}/en/${version}/`
}

export function getVersionDefinition(version) {
  return versionDefinitions.find((item) => item.version === version)
}

export function getVersionLabel(version) {
  return getVersionDefinition(version)?.label || version
}

export function getVersionEntryPath(version = defaultVersion) {
  return getVersionDefinition(version)?.entryPath || '/docs/'
}

export function getVersionUrl(version = defaultVersion) {
  const entryPath = getVersionEntryPath(version).replace(/^\/+/, '')
  return `${getVersionBase(version)}${entryPath}`
}

export function getVersionLabels() {
  return Object.fromEntries(versionDefinitions.map((item) => [item.version, item.label]))
}

export function getVersionNames() {
  return versionDefinitions.map((item) => item.version)
}
