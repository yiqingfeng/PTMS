define(function (require, exports, module){
	var store =  PTMS.store || new PTMS.Store('PTMS');
	// var cate = store.set({
	// 	name: '新建分类'
	// });
	// var task = store.setTask(cate, {name: '新建任务'});
	// var todo = store.setTodo(task._id, {name: '子任务1', date: new Date(), content: 'tets', done: false});
	module.exports = {
		getTodoNumByTid: function (tid){
			return store.findTodo(tid).length;
		},
		getTodoNumByCid: function (cid){
			var me = this,
				count = 0,
				tasks = store.findTask(cid);
			if (tasks) {
				tasks.forEach(function (task){
					count += me.getTodoNumByTid(task._id);
				});
			}
			return count;
		},
		getAllTodosNum: function (){
			var me = this,
				count = 0,
				cates = store.find();
			cates.forEach(function (cate){
				count += me.getTodoNumByCid(cate._id);
			});
			return count;
		},
		getTaskMenu: function (){
			var me = this,
				cates = store.find();
			cates.forEach(function (cate){
				cate.todos = me.getTodoNumByCid(cate._id);
				if (cate.tasks) {
					cate.tasks.forEach(function (task){
						task.todos = me.getTodoNumByTid(task._id);
					});
				}
			});
			return cates;
		},
		clearCate: function (cid){
			// var tasks = store.findTask(cid);
			var cate = store.find(cid);
			if (!cate) return;
			if (!cate.tasks) {
				return store.remove(cid);
			}
			cate.tasks.forEach(function (task){
				store.removeTask(cid, task._id);
			});
			store.remove(cid);
		},
		createCate: function (){
			var cate = store.set({
				name: '新建分类'
			});
			return cate;
		},
		updateCateName: function(cid, name){
			var cate = store.find(cid);
			cate.name = name;
			store.set(cate);
			// console.log(name);
		}
	}
});