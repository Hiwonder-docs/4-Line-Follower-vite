import { versionDefinitions } from '../site.config.mjs'

// Keep the landing dialog in sync with the navigation version menu.
export const kitVersions = versionDefinitions
  .filter((version) => version.version !== 'latest')
  .map((version) => ({
    id: version.version,
    name: version.label,
    description: version.description || '',
    entry: version.entryPath.replace(/^\/+/, '')
  }))
