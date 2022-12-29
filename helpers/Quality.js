export const videoQuality = [
  {pixels: '1080p', quality: 'FHD'},
  {pixels: '720p', quality: 'HD'},
  {pixels: '360p/480p/540p', quality: 'SD'},
];

export const imageQuality = [
  {size: 'Original', quality: 'original'},
  {size: 'Large 2x', quality: 'large2x'},
  {size: 'Large', quality: 'large'},
  {size: 'Medium', quality: 'medium'},
  {size: 'Small', quality: 'small'},
  {size: 'Portrait', quality: 'portrait'},
  {size: 'Landscape', quality: 'landscape'},
  {size: 'Tiny', quality: 'tiny'},
];

export const selectedTheme = [
  {theme: 'Dark', value: 'dark'},
  {theme: 'Light', value: 'light'},
  {theme: 'System default', value: 'system'},
];

export let logs = [];

export function createLogs(message) {
  logs.push({date: new Date(), message: message});
}

export function clearLogs() {
  logs = [];
}
