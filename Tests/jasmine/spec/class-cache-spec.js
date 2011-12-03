describe("Class.Cache", function() {

	it("storage is equal", function(){
		var cache = new CacheManager.CacheContent({
			storage: CacheManager.HashStorage
		});
		expect(cache.getStorage()).toEqual(CacheManager.HashStorage);
	});

});