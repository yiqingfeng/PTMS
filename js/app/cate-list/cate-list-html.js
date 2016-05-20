define(function(){

return function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<ul class="cates-list">\r\n\t';
 for(var i=0,len=obj.length; i<len; i++){ ;
__p += '\r\n\t<li class="cate-item">\r\n\t\t<div class="cate" data-index=' +
((__t = ( i )) == null ? '' : __t) +
'><span class="cate-name" title=' +
((__t = ( obj[i].cate )) == null ? '' : __t) +
'>' +
((__t = ( obj[i].cate )) == null ? '' : __t) +
'</span><span>(10)</span><a href="javascript:;" class="destroy"></a></div>\r\n\t\t<ul class="task-list hide">\r\n\t\t\t';
 for(var j=0,jlen=obj[i].children.length; j<jlen; j++){ ;
__p += '\r\n\t\t\t\t<li class="task" data-index=' +
((__t = ( j )) == null ? '' : __t) +
'><span class="task-name" title=' +
((__t = ( obj[i].children[j].name )) == null ? '' : __t) +
'>' +
((__t = ( obj[i].children[j].name )) == null ? '' : __t) +
'</span><span>(' +
((__t = ( obj[i].children[j].children.length )) == null ? '' : __t) +
')</span><a href="javascript:;" class="destroy"></a></li>\r\n\t\t\t';
 } ;
__p += '\r\n\t\t</ul>\r\n\t</li>\r\n\t';
 } ;
__p += '\r\n\t<!-- <li class="cate-item">\r\n\t\t<div class="cate"><span class="cate-name" title="百度IFE项目百度IFE项目">百度IFE项目百度IFE项目</span><span>(10)</span><a href="javascript:;" class="destroy"></a></div>\r\n\t\t<ul class="task-list hide">\r\n\t\t\t<li class="task"><span class="task-name" title="任务一任务一任务一">任务一任务一任务一</span><span>(6)</span><a href="javascript:;" class="destroy"></a></li>\r\n\t\t\t<li class="task"><span class="task-name" title="任务二任务二任务二">任务二任务二任务二</span><span>(4)</span><a href="javascript:;" class="destroy"></a></li>\r\n\t\t</ul>\r\n\t</li> -->\r\n</ul>\r\n';

}
return __p
}

});