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
		// return (((1+Math.random())*0x10000)|0).toString(16).substr(0, 4);
	};

	// Generate a pseudo-GUID by concatenating random hexadecimal.
	function guid() {
		return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
	};

	function findObj(arr, id){
		for (var i=0,len=arr.length; i<len; i++){
			if (id === arr[i]._id) {
				return i;
			}
		}
		return -1;
	}

	var Store = function (name){
		this.name = name;
		var store = this.localStorage().getItem(this.name);
		this.records = (store && store.split(',')) || [];
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
		// 类别
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
		// 任务
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
		// Todo
		setTodo: function (tid, obj){
			var me = this;
			if (!obj._id) {
				obj._id = guid();
				var tasks = me.jsonData(me.localStorage().getItem(me.name+'-task-'+tid)) || [];
				tasks.push(obj);
				me.localStorage().setItem(me.name+'-task-'+tid, JSON.stringify(tasks));
				return me.findTodo(tid, obj._id);
			}

		},
		findTodo: function (tid, id){
			var tasks = this.jsonData(this.localStorage().getItem(this.name+'-task-'+tid)) || [];
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

// window.localStorage.clear();// 清理存储

// var store = new PTMS.Store('test');
// var a = {as:12312};
// store.set(a);
// // store.remove(a);
// // console.log(store.records[0]);
// // console.log(store.find(store.records[0]));
// var b = {ds:98989};
// store.setTask(store.find(store.records[0]), b);
// b.ds = 90;
// store.setTask(store.find(store.records[0]), b);
// var c = {as:98989};
// store.setTask(store.find(store.records[0]), c);
// c.as = 90;
// store.setTask(store.find(store.records[0]), c);
// // console.log(store.findTask(store.find(store.records[0]), c._id));
// // store.removeTask(store.find(store.records[0]), c._id);
// // console.log(store.find(store.records[0]));
// // console.log(store);

// var d = {todo:1231};
// store.setTodo(c._id, d);
// console.log(store.findTodo(c._id, d._id));
// store.removeTodo(c._id, d._id);