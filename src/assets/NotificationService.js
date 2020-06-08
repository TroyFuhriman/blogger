import Swal from "sweetalert2"

export default class NotificationService {

  static async confirmAction(text = "You won't be able to revert this!") {
    try {
      let res = await Swal.fire({
        title: 'Are you sure?',
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#56CC9D',
        cancelButtonColor: '#e83e8c',
        confirmButtonText: 'Yes, delete it!'
      })
      if (res.value) {
        return true
      }
      return false
    } catch (error) {
      console.error(error)
    }
  }
  static toast(title = "default handler", icon = "success") {
    Swal.fire({
      title: "created",
      icon: icon,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      toast: true,
      position: "top-right",
    })
  }


}