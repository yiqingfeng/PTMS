define(function(){

return function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="app-task-list">\r\n\t<ul class="tasks-top">\r\n\t\t<li class="status curt">所有</li><li class="status">未完成</li><li class="status">已完成</li>\r\n\t</ul>\r\n\t<div class="tasks">\r\n\t\t<ul class="tasks-list">\r\n\t\t\t';
 for(var i=0,l=obj.length; i<l; i++){ ;
__p += '\r\n\t\t\t\t<li class="date">' +
((__t = ( obj[i].date )) == null ? '' : __t) +
'</li>\r\n\t\t\t\t';
 var todos = obj[i].todos ;
__p += '\r\n\t\t\t\t';
 for(var j=0,jl=todos.length; j<jl; j++){ ;
__p += '\r\n\t\t\t\t\t<li class="task-c">' +
((__t = ( todos[j].name )) == null ? '' : __t) +
'</li>\r\n\t\t\t\t';
 } ;
__p += '\r\n\t\t\t';
 } ;
__p += '\r\n\t\t</ul>\r\n\t</div>\r\n\t<div class="add-task"><a class="j-add-task" href="javascript:;"></a><span>新增任务</span></div>\r\n</div>';

}
return __p
}

});