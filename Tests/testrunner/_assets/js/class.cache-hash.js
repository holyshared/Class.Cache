(function(){

var MyClass = new Class({

	Implements: [Events],

	Caches: 'hash',

    fetch: function(criteria){

		var model = this,
			cache = model.cache.get(criteria);

        if (cache) {
	        if (cache.isLimit() !== true) {
				log('cache loaded');

				this.fireEvent('success', [cache.getContent()]);
    	        return;
        	}
			cache.destroy();

			log('cache destory');
		}

		var request = new Request.JSON({
			url: '/echo/json/',
			onSuccess: function(responseJSON, responseText){
				log('response cached');
				log(criteria);

				model.cache.set(criteria, responseJSON, 1 * 60 * 60 * 1000);
				model.fireEvent('success', [responseJSON]);
			}
		});
		request.send('json={ "name": "holyshared" }');

    }

});

window.addEventListener('load', function(){

	var storage = CacheManager.HashStorage;

	storage.clear();

	var tester  = new MyClass();

	tester.addEvent('success', function(response){
		log(response.name);
	});
	tester.fetch('name=foo&age=28');

	tester.fetch.delay(2000, tester, ['name=foo&age=28']);
	tester.fetch.delay(2000, tester, ['name=foo&age=28']);

}, false);

}(this));
