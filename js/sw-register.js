    if (navigator.serviceWorker) {
        navigator.serviceWorker.register('js/sw.js').then(()=>{
            console.log('Service worker is registred');
        }).catch(e => {
            console.log(e);
        });
        
    }