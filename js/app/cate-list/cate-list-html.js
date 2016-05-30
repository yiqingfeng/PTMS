define(function(){

return function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<ul class="cates-list">\r\n\t';
 for(var i=0,len=obj.length; i<len; i++){ ;
__p += '\r\n\t<li class="cate-item" data-cid=' +
((__t = ( obj[i]._id )) == null ? '' : __t) +
'>\r\n\t\t<div class="cate">\r\n\t\t\t<span class="cate-name" title=' +
((__t = ( obj[i].name )) == null ? '' : __t) +
'>' +
((__t = ( obj[i].name )) == null ? '' : __t) +
'</span><span>' +
((__t = ( obj[i].todos? "("+obj[i].todos+")" : "" )) == null ? '' : __t) +
'</span>\r\n\t\t\t<a href="javascript:;" class="cate-add-task j-cate-add-task">\r\n\t\t\t<a href="javascript:;" class="cate-edit j-cate-edit">\r\n\t\t\t<a href="javascript:;" class="destroy j-destroy-c"></a>\r\n\t\t</div>\r\n\t\t<div class="cate-input"><input type="text" class="j-cate-edit" value=' +
((__t = ( obj[i].name )) == null ? '' : __t) +
'></div>\r\n\t\t<ul class="task-list hide">\r\n\t\t';
 if(obj[i].tasks){ ;
__p += '\r\n\t\t\t';
 for(var j=0,jlen=obj[i].tasks.length; j<jlen; j++){ ;
__p += '\r\n\t\t\t\t<li class="task" data-tid=' +
((__t = ( obj[i].tasks[j]._id )) == null ? '' : __t) +
'>\r\n\t\t\t\t\t<div class="task-view">\r\n\t\t\t\t\t\t<span class="task-name" title=' +
((__t = ( obj[i].tasks[j].name )) == null ? '' : __t) +
'>' +
((__t = ( obj[i].tasks[j].name )) == null ? '' : __t) +
'</span><span>' +
((__t = ( obj[i].tasks[j].todos ? "("+obj[i].tasks[j].todos+")" : "" )) == null ? '' : __t) +
'</span>\r\n\t\t\t\t\t\t<a href="javascript:;" class="task-edit"></a>\r\n\t\t\t\t\t\t<a href="javascript:;" class="destroy j-destroy-t"></a>\r\n\t\t\t\t\t</div>\r\n\t\t\t\t\t<input type="text" class="j-edit-task" value=' +
((__t = ( obj[i].tasks[j].name )) == null ? '' : __t) +
'>\r\n\t\t\t\t</li>\r\n\t\t\t';
 } ;
__p += '\r\n\t\t';
 } ;
__p += '\r\n\t\t</ul>\r\n\t</li>\r\n\t';
 } ;
__p += '\r\n\t<!-- <li class="cate-item">\r\n\t\t<div class="cate"><span class="cate-name" title="百度IFE项目百度IFE项目">百度IFE项目百度IFE项目</span><span>(10)</span><a href="javascript:;" class="destroy"></a></div>\r\n\t\t<ul class="task-list hide">\r\n\t\t\t<li class="task"><span class="task-name" title="任务一任务一任务一">任务一任务一任务一</span><span>(6)</span><a href="javascript:;" class="destroy"></a></li>\r\n\t\t\t<li class="task"><span class="task-name" title="任务二任务二任务二">任务二任务二任务二</span><span>(4)</span><a href="javascript:;" class="destroy"></a></li>\r\n\t\t</ul>\r\n\t</li> -->\r\n</ul>\r\n';

}
return __p
}

});