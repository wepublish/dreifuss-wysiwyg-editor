export async function getClipboardText() {
  return await navigator.clipboard.readText()
}
