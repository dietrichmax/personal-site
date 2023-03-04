import config from "../data/internal/SiteConfig"

export function copyToClipboard(e) {
  navigator.clipboard.writeText(window.location.href)
}
