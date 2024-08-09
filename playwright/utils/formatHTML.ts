import { prettyPrint } from 'html'

export function formatHTML(rawHTMLString: string) {
  const removeComments = rawHTMLString.replaceAll(/<!--.*?-->/gs, '')
  const pretty = prettyPrint(removeComments, { indent_size: 2 })
  const removeEmptyLines = `${pretty}\n`.replaceAll(/\n{2,}/g, '\n')
  return removeEmptyLines
}
