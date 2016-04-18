var regexp = /require\(\s*"(.*)"\s*\)/g;
var obj = {};
var cache = {};

function getKeys(obj){
	var a = [];
	for(a[a.length] in obj);
	return a;
}
function start(fn){
	var match;

	while(match = regexp.exec(fn)){
		obj[match[1]] = new XMLHttpRequest();
		require(obj[match[1]], match[1]);
	}
}

function require(xhr, path){

	xhr.open("GET", path, true);


	xhr.onreadystatechange = function(){

		if(xhr.readyState === 4 && xhr.status === 200){
			var response = xhr.responseText;

			cache[path] = response && console.log('已缓存'+path);
			delete obj[path];

			getKeys(obj).length === 0 && console.log('allLoad');

			start(response);
		}
	};

	xhr.send();
}