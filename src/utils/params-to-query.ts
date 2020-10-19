export default function params2query (params: Record<string, string | number | boolean>): string {
  return Object.entries(params).map(([key, value]) => `${key}=${value.toString()}`).join('&')
}
