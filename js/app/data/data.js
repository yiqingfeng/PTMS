define(function (require, exports, module){
	var store =  PTMS.store || new PTMS.Store('PTMS');
	module.exports = {
		getTodoNumByTid: function (tid){
			var todos = store.findTodo(tid);
			return todos ? todos.length : 0;
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
		},
		createTask: function(cid){
			var cate = store.find(cid);
			return store.setTask(cate, {name: '新建任务'});
		},
		clearTask: function(cid, tid){
			return store.removeTask(cid, tid);
		},
		updateTaskName: function (cid, tid, name){
			var cate = store.find(cid),
				task = store.findTask(cid, tid);
			task.name = name;
			store.setTask(cate, task);
		},
		getTodosByDate: function (tid, status){
			var todos = store.findTodo(tid);
			if (!todos) return;
			if (status === undefined) {
				return sortByDate(todos);
			}
			return sortByDate(findTodoByStatus(todos, status));
			function findTodoByStatus (todos, status){
				var result = [];
				todos.forEach(function (todo){
					if (!!status === todo.done) {
						result.push(todo);
					}
				});
				return result;
			}
			function isObjPro (arr, date){
				for (var i=0, l=arr.length; i < l; i++) {
					if (date === arr[i].date) return i;
				}
				return -1;
			}
			function sortByDate(arr){
				var newArr = [];
				arr.forEach(function (todo){
					var date = todo.date.substr(0, 10),
						index = isObjPro(newArr, date);
					if (index !== -1) {
						newArr[index].todos.push(todo);
					} else {
						var item = {
							date: date,
							todos: []
						}
						item.todos.push(todo);
						newArr.push(item);
					}
				});
				return newArr;
			}
		},
		createTodo: function (tid){
			return store.setTodo(tid, {name: 'todo', date: new Date(), content: '', done: false});
		},
		clearTodo: function (tid, id){
			return store.removeTodo(tid, id);
		},
		updateTodoName: function (tid, id, name){
			var todo = store.findTodo(tid, id);
			if (!todo) return;
			todo.name = name;
			return store.setTodo(tid, todo);
		},
		getTodo: function (tid, id){
			return store.findTodo(tid, id);
		},
		updateTodoContent: function (tid, id, value){
			var todo = store.findTodo(tid, id);
			if (!todo) return;
			todo.content = value;
			return store.setTodo(tid, todo);
		}
	}
});