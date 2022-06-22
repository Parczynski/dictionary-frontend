const CACHE_NAME = "english";
const FILES_TO_CACHE = [ "/" ];





self.addEventListener( 'install', async sw => {
	sw.waitUntil(
		caches.open( CACHE_NAME )
			.then( cache => cache.addAll( FILES_TO_CACHE ))
	)
})


self.addEventListener( 'push', event => {
	if( event.data ) {
		const notification = event.data
		const promiseChain = self.registration.showNotification( notification, notification );
		event.waitUntil( promiseChain );
	}
})



self.addEventListener( 'notificationclick', event => {

	const target = ( event => {
		switch( event.action ) {
			case 'button1':
				return event.notification.data.button1_action || '/';
			case 'button2':
				return event.notification.data.button2_action || '/';
			default:
				return event.notification.data.click_action || '/';
		}
	})(event)
    
    event.notification.close();
    return self.clients.openWindow( target );
  
});

self.addEventListener( "fetch", ( e ) => {
    e.respondWith(
        fetch( e.request )
			.catch( _ => caches.match(e.request) )
    );
} );


