(function(){

var HashIncluder = new Class({

    Cache: 'hash',

    fetch: function(criteria){
        var cache = this.cache.get(criteria);
        if (cache && cache.isLimit() !== false) {
            return cache.getContent();
        }
        var content = {
            name: 'foo',
            age: 28
        };
        this.cache.set(criteria, content, 1 * 60 * 60 * 1000);

        return content;
    }

});



var CacheLimitChecker = new Class({

    Cache: 'hash',

    cacheLimit: function(criteria){
        var cache = this.cache.get(criteria);
        if (cache && cache.isLimit() === true) {
            return true;
        }

        this.cache.set(criteria, {}, 100);

        return false;
    }

});


describe("Class.Cache", function(){

    var cacheChecker = null, limitChecker = null;

    beforeEach(function() {
        cacheChecker = new HashIncluder();
        limitChecker = new CacheLimitChecker();
    });

	it("equal", function(){
        var v1 = cacheChecker.fetch('name=foo&age=28');
        var v2 = cacheChecker.fetch('name=foo&age=28');

        expect(v1.name).toEqual(v2.name);
        expect(v1.age).toEqual(v2.age);
	});

    it("limit", function(){
        var v1 = limitChecker.cacheLimit('name=foo&age=20');
        var v2 = limitChecker.cacheLimit('name=foo&age=20');

        expect(v1).toEqual(false);

		setTimeout(function(){
			expect(v2).toEqual(true);
		}, 1000);

	});

});

}());