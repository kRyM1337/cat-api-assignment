export function lsTest() {
   let test = 'test'
   try {
      window.SessionStorage.setItem(test, test)
      window.SessionStorage.removeItem(test)
      return true
   } catch (e) {
      return false
   }
}
