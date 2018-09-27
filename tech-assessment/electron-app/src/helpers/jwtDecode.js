import atob from 'atob'

export default function (token) {
  return JSON.parse(atob(token.split('.')[1]))
}
