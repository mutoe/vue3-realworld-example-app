import { marked } from 'marked'
import insane from 'insane'

export default (markdown?: string): string => {
  if (!markdown) return ''
  const html = marked(markdown, {
    // Fixme: ts-jest import.meta not support
    // baseUrl: import.meta.env.BASE_URL,
  })

  return insane(html, {
    allowedTags: ['a', 'article', 'b', 'blockquote', 'br', 'caption', 'code', 'del', 'details', 'div', 'em',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'i', 'img', 'ins', 'kbd', 'li', 'main', 'ol',
      'p', 'pre', 'section', 'span', 'strike', 'strong', 'sub', 'summary', 'sup', 'table',
      'tbody', 'td', 'th', 'thead', 'tr', 'u', 'ul', 'input'],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'title'],
      iframe: ['allowfullscreen', 'frameborder', 'src'],
      img: ['src', 'alt', 'title'],
      i: ['class'],
      h1: ['id'],
      h2: ['id'],
      h3: ['id'],
      h4: ['id'],
      h5: ['id'],
      h6: ['id'],
      ol: ['start'],
      code: ['class'],
      th: ['align', 'rowspan'],
      td: ['align'],
      input: ['disabled', 'type', 'checked'],
    },
    filter: ({ tag, attrs }: {tag: string, attrs: Record<string, string>}) => {
      // Display checklist
      if (tag === 'input') {
        return attrs.type === 'checkbox' && attrs.disabled === ''
      }
      return true
    },
  })
}
