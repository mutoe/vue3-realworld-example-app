import marked from 'marked'
import DOMPurify from 'dompurify'

export default (markdown: string): string => DOMPurify.sanitize(marked(markdown))
