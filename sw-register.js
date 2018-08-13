if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js').then(registration => {
        console.log('Service worker is registred with scope', registration.scope);
    }).catch(e => {
        console.log(e);
    });

}