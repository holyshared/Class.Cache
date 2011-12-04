
Class.Cache
========================================

The mixin library which includes a cache function in a class


How to use
----------------------------------------

Directions for use only specify **Caches**, when defining a class.  
The value specified as **Caches** is a storage name to be used. 

### Cache storage

* local - **localStorage** is used.
* session - **sessionStorage** is used.
* hash - storage which uses hash is used.

The code at the time of actually using it is as follows. 

	var MyClass = new Class({

		Implements: [Events],

	    Caches: 'hash',

	    fetch: function(criteria){

	        var model = this,
				cache = model.cache.get(criteria);

			//The check of cache 
	        if (cache){
				if (cache.isLimit() !== true){
					//The cached contents are returned.
					model.fireEvent('success', [cache.getContent()]);
		        	return;
				}
				cache.destroy();
	        }

			var request = new Request.JSON({
				method: 'get',
				url: '/path/to/query?' + criteria,
				onSuccess: function(responseJSON, responseText){
					//Cache of a response result 
					model.cache.set(criteria, responseJSON, 1 * 60 * 60 * 1000);
					model.fireEvent('success', [responseJSON]);
				}
			});
			request.send();

	    }

	});


Moreover, the priority of the storage to be used can be specified.  
The appointed method is only specified as Caches in arrangement.

In the following example, it is specified that it uses in order of localStorage, sessionStorage, and hashStorage.

	Caches: ['local', 'session', 'hash']

or

	Caches: ['local', 'session']

As for the browser which cannot use localStorage and sessionStorage, hashStorage is used compulsorily.


Screenshot
-----------------------------------------

