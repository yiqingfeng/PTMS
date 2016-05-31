define(function(){

  return function(obj) {obj || (obj = {});var __t, __p = '', __e = _.escape;with (obj) {__p += '<li class="task" data-tid=' +((__t = ( obj._id )) == null ? '' : __t) +'>\r\n\t<span class="task-name" title=' +((__t = ( obj.name )) == null ? '' : __t) +'>' +((__t = ( obj.name )) == null ? '' : __t) +'</span><span></span>\r\n\t<a href="javascript:;" class="task-edit"></a>\r\n\t<a href="javascript:;" class="destroy j-destroy-t"></a>\r\n</li>';}return __p}

});