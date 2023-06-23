// cheque si el browser soporta service workers

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then((messsage) => {
      console.log('Service Worker registrado con éxito:');
    })
    .catch(error => {
      console.log('Error al registrar el Service Worker:', error);
    });
}