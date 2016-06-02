define(function(require, exports, module) {
	// No binding when there is this type of event
	function bindEventOne(el ,type, callback){
		var events = $._data(el, 'events');
		if (events && events[type]) {
			return;
		}
		$(el).on(type, callback);
	}
	exports.bindEventOne = bindEventOne;
});