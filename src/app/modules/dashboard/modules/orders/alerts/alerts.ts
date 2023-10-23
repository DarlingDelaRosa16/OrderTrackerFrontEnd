import Swal from "sweetalert2";

export function alertRemoveSure(): Promise<boolean> {
  return new Promise((resolve) => {
    Swal.fire({
      title: '¡Alerta!',
      text: 'Estas seguro que deseas eliminar la orden.',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#004b8d',
      cancelButtonColor: '#aaa',
    }).then((result) => {

      if (result.isConfirmed) {
        resolve(true)
      } else {
        resolve(false)
      }
    });
  })
}


export function alertIsSuccess(respuesta: boolean) {
  if (respuesta) {

    Swal.fire({
      icon: 'success',
      title: 'Guardado correctamente.',
      showConfirmButton: false,
      timer: 2000
    })

  } else {
    Swal.fire({
      icon: 'error',
      title: 'Ocurrio un error, No se pudo guardar el cambio.',
      text: 'Intente nuevamente.',
      showConfirmButton: true,
      confirmButtonColor: 'red',
    })
  }
}

export function alertServerDown() {
  Swal.fire({
    icon: 'error',
    title: 'Se ha producido un error \n No se pudo conectar con el servidor.',
    text: 'Intente mas tarde, Si el error persiste consulte al ADMINISTRADOR.',
    showConfirmButton: true,
    confirmButtonColor: 'red',
  })
}

export function alertRemoveSuccess() {
  Swal.fire({
    icon: 'success',
    title: 'Eliminado correctamente.',
    showConfirmButton: false,
    timer: 2000
  })
}

export function alerUserWrong() {
  Swal.fire({
    icon: 'error',
    title: 'Usuario o constraseña incorrectos.',
    showConfirmButton: false,
    timer: 2000
  })
}

export function alertLogOut(): Promise<boolean> {
  return new Promise((resolve) => {
    Swal.fire({
      title: '¡Alerta!',
      text: 'Estas seguro que deseas cerrar la sesión.',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#004b8d',
      cancelButtonColor: '#aaa',
    }).then((result) => {

      if (result.isConfirmed) {
        resolve(true)
      } else {
        resolve(false)
      }
    });
  })
}
