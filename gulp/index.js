/**
 * Created by iyudin on 20.12.2016.
 */

var fs = require('fs'),
	gutil = require('gulp-util'),
	path = require('path'),
	taskDir = path.join(__dirname, 'tasks');

var tasks = {};
var taskNames = fs.readdirSync(path.join(taskDir));

taskNames.forEach(function(taskfile) {
	var task = require(path.join(taskDir, taskfile));
	var taskname = taskfile.split('.').splice(0,1);
	gutil.log('loadTasks: task "' + taskname + '" loaded.');
	tasks[taskname] = task;
});

module.exports = tasks;
