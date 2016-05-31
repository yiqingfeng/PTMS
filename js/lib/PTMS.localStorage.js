/*
 * author: mengxuan
 * devtime: 2016.5.24
 * version: 0.0.1
 * state: store datas for PTMS
 */

(function (root, undefined){
	// Generate four random hex digits.
	function S4() {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	};
	// Generate a pseudo-GUID by concatenating random hexadecimal.
	function guid() {
		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	};

	// get index form array made of object by id of object
	function findObj(arr, id){
		for (var i=0,len=arr.length; i<len; i++){
			if (id === arr[i]._id) {
				return i;
			}
		}
		return -1;
	}

	var Store = function (name){
		this.name = name;// set namespce
		var store = this.localStorage().getItem(this.name);
		this.records = (store && store.split(',')) || [];// record all tasks
	};
	root.PTMS || (root.PTMS = {});
	root.PTMS.Store = root.localStorage ? Store : undefined;

	Store.prototype = {
		localStorage: function (){
			return root.localStorage;
		},
		save: function (){
			this.localStorage().setItem(this.name, this.records.join(','));
		},
		jsonData: function (data){
			return data && JSON.parse(data);
		},
		// category
		set: function (obj){
			if (!obj._id) {
				obj._id = guid();
				this.localStorage().setItem(this.name+'-'+obj._id, JSON.stringify(obj));
				this.records.push(obj._id.toString());
				this.save();
				return this.find(obj._id);
			}
			this.localStorage().setItem(this.name+'-'+obj._id, JSON.stringify(obj));
			return this.find(obj._id);
		},
		find: function (id){
			var me = this;
			if (arguments.length) {
				return me.jsonData(me.localStorage().getItem(me.name+"-"+id));
			} else {
				var results = [];
				me.records.forEach(function (item){
					results.push(me.jsonData(me.localStorage().getItem(me.name+"-"+item)));
				});
				return results;
			}
		},
		remove: function (cid){
			var index = this.records.indexOf(cid);
			if (index === -1) return false;
			this.localStorage().removeItem(this.name+"-"+cid);
			this.records.splice(index, 1);
			this.save();
			return true;
		},
		// task
		setTask: function (cate, obj){
			var me = this;
			if (!(cate._id && me.records.indexOf(cate._id) !== -1)) return;
			if (!obj._id) {
				obj._id = guid();
				cate.tasks || (cate.tasks = []);
				cate.tasks.push(obj);
				me.set(cate);
				return me.findTask(cate._id, obj._id);
			}
			var index = findObj(cate.tasks, obj._id);
			cate.tasks.splice(index, 1, obj);
			me.set(cate);
			return me.findTask(cate._id, obj._id);
		},
		findTask: function (cid, id){
			var cate = this.find(cid);
			if (!cate || !cate.tasks) return false;
			if (!id) return cate.tasks;
			var index = findObj(cate.tasks, id);
			if (index === -1) return false;
			return cate.tasks[index];
		},
		removeTask: function (cid, id){
			var cate = this.find(cid);
			if (!cate || !cate.tasks) return;
			var index = findObj(cate.tasks, id);
			if (index === -1) return;
			cate.tasks.splice(index, 1);
			this.set(cate);
			this.localStorage().removeItem(this.name+'-task-'+id);
		},
		// todo
		setTodo: function (tid, obj){
			var me = this;
			if (!obj._id) {
				obj._id = guid();
				var task = me.jsonData(me.localStorage().getItem(me.name+'-task-'+tid)) || [];
				task.push(obj);
				me.localStorage().setItem(me.name+'-task-'+tid, JSON.stringify(task));
				return me.findTodo(tid, obj._id);
			}
			var task = me.jsonData(me.localStorage().getItem(me.name+'-task-'+tid));
			if (!task) return;
			var index = findObj(task, obj._id);
			if (index === -1) return;
			task.splice(index, 1, obj);
			me.localStorage().setItem(me.name+'-task-'+tid, JSON.stringify(task));
			return me.findTodo(tid, obj._id);
		},
		findTodo: function (tid, id){
			var tasks = this.jsonData(this.localStorage().getItem(this.name+'-task-'+tid)) || undefined;
			if (!tasks || !id) {
				return tasks;
			}
			var index = findObj(tasks, id);
			if (index === -1) return;
			return tasks[index];
		},
		removeTodo: function (tid, id){
			var tasks = this.jsonData(this.localStorage().getItem(this.name+'-task-'+tid)) || undefined;
			if (!tasks) return;
			var index = findObj(tasks, id);
			if (index === -1) return;
			tasks.splice(index, 1);
			this.localStorage().setItem(this.name+'-task-'+tid, JSON.stringify(tasks));
		}
	}
})(window, undefined);
