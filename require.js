var regexp = /require\((.*)\)/g;
var obj = {};
var cache = [];

function start(fn){
	var str = fn.toString();
	var match;

	while(match = regexp.exec(str)){
		match && match[1] && require(match[1]);
	}
}

function require(module){

	var xhr = new XMLHttpRequest();
	var match;
	xhr.open("GET", module, true);

	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4 && xhr.status === 200){
			var response = xhr;

			start(response);
		}
	}
}