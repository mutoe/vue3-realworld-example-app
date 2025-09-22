
export function avatarUrl(username?: string | null, image?: string | null) {
  if (image && image.trim() !== '') return image;

  const seed = encodeURIComponent(username || 'U');
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&fontWeight=700&backgroundType=gradientLinear`;
}
