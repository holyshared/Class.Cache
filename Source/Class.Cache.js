/*
---
name: Class.Cache

description: A cash function is included in a class.

license: MIT-style

authors:
- Noritaka Horio

requires:
  - Core/Class
  - CacheManager/CacheManager

provides:
  - Class.Cache
...
*/

(function(global){

Class.Mutators.Caches = function(cacheStorage){

	var name = null,
		item = null,
		storage = null,
		storages = [];

	switch(typeOf(cacheStorage)) {
		case 'array':
			cacheStorage.each(function(value, key){
				name = value.capitalize() + 'Storage';
				item = (CacheManager[name]) ? value : null;
				storages.push(item);
			});
			storage = storages.pick() || 'hash';

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