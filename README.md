
Class.Cache
========================================

The mixin library which includes a cache function in a class







How to use
----------------------------------------


	var MyClass = new Class({
	
	    Cache: 'hash',
	
		Implements: [Events],
	
	    fetch: function(criteria){
	        var cache = this.cache.get(criteria),
	        	content = null;
	
			//The check of cache 
	        if (cache && cache.isLimit() !== false) {
				//The cached contents are returned.
				content = cache.getContent();
				this.fireEvent('success', [content]);
	        	return;
	        }
	
			var request = new Request.JSON({
				method: 'get',
				url: '/path/to/',
				onSuccess: function(responseJSON, responseText){
	
					//Cache of a response result 
					this.cache.set(criteria, responseJSON, 1 * 60 * 60 * 1000);
	
					this.fireEvent('success', [responseJSON]);
	
				}
			});
			request.send();
	
	    }
	
	});


Screenshot
-----------------------------------------

