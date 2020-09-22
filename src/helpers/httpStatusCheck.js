export function checkStatus(r) {
   if (r.ok) {
      return r
   } else {
      throw Error(r.statusText)
   }
}
