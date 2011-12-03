/*
---
name: Class.Cache

description: 

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
				if (Cache[name]) {
					storage = Cache[value];
					return false;
				}
			});
			storage = storage || LegacyStorage;
			break;
		case 'string':
			name = cacheStorage.capitalize() + 'Storage';
			storage = Cache[name] || LegacyStorage;
			break;
		default:
			storage = LegacyStorage;
	}
	this.prototype.cache = new Cache.CacheManager(storage);

};

}(this));