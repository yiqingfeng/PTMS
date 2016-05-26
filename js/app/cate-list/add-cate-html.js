define(function(){

return function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<li class="cate-item">\r\n\t<div class="cate"><span class="cate-name" title=' +
((__t = ( obj.name )) == null ? '' : __t) +
'>' +
((__t = ( obj.name )) == null ? '' : __t) +
'</span><span></span><a href="javascript:;" class="destroy j-destroy-c"></a></div>\r\n\t<div class="cate-input"><input type="text" class="j-cate-edit" value=' +
((__t = ( obj.name )) == null ? '' : __t) +
'></div>\r\n</li>';

}
return __p
}

});