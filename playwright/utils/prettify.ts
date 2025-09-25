import { prettyPrint } from 'html'

export function formatHTML(rawHTMLString: string): string {
  let removeComments = rawHTMLString
  let prev
  do {
    prev = removeComments
    removeComments = removeComments.replaceAll(/<!--.*?-->/gs, '')
  } while (removeComments !== prev)
  // eslint-disable-next-line camelcase
  const pretty = prettyPrint(removeComments, { indent_size: 2 })
  const removeEmptyLines = `${pretty}\n`.replaceAll(/\n{2,}/g, '\n')
  return removeEmptyLines
}

export function formatJSON(json: string | object): string {
  const jsonObject = typeof json === 'string' ? JSON.parse(json) as object : json
  return JSON.stringify(jsonObject, null, 2)
}
