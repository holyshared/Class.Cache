/*
---
name: Class.Cache

description: A cash function is included in a class.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - CacheManager/CacheManager

provides:
  - Class.Cache
...
*/

(function(global){

Class.Mutators.Cache = function(cacheStorage){

	var name = null,
		storage = null;

	switch(typeOf(cacheStorage)) {
		case 'array':
			cacheStorage.each(function(value, key){
				name = value.capitalize() + 'Storage';
				if (CacheManager[name]) {
					storage = name;
					return false;
				}
			});
			storage = storage || 'hash';
			break;
		case 'string':
			name = cacheStorage.capitalize() + 'Storage';
			storage = (CacheManager[name]) ? cacheStorage : 'hash';
			break;
		default:
			storage = 'hash';
	}
	this.prototype.cache = new CacheManager(storage);

};

}(this));