// 访问页面

var n = 0;
var page=0;
var isLogin= true;
var isFirst= true;
var step = ["http://t.qq.com/nbaniub"];
App.webview.open('http://xui.ptlogin2.qq.com/div/qlogin_div.html?lang=2052&flag2=2&u1=http%3A%2F%2F1.t.qq.com&appid=46000101&ptredirect=1&low_login=1&autocheck=1&ptui_version=10009'); 
// 监听文档加载完成


	App.webview.addEventListener('DOMContentLoaded', function(t,url) {

		 if(isLogin){
		 	App.webview.sendMouseEvent(App.webview.elementRects('#loginbtn')[0],"click");
		 	isLogin=false;
		 }else if(isFirst){
		 	App.webview.open(step[n])
		 	isFirst= false;
		 	
		 }else{
		 	loadSource();
		 }
	});


function loadSource() {

	App.webview.execScript(function() {
		function setJS(url,back){
			var node = document.createElement("script"),
				head = document.getElementsByTagName("head")[0];

			node.src = url;
			node.async = false;

			node.onload = node.onreadystatechange=function() {
				if (!this.readyState || this.readyState == "loaded" || this.readyState == "complete"){
					back && back();
				}   
			}
			head.appendChild(node);
		}

		var arr=[]

		setJS("http://misc.fandongxi.com/min/f=js/jquery-1.6.2.min.js",function(){

			var $List = $("#talkList li");

			$List.each(function(){
				var $this = $(this);
				if(!$this.find(".replyBox").length && !$this.find(".msgCnt").text().match("店")){

					var obj = {};

					obj["date"]  = $this.find(".time").attr("title").split(" ")[0];
					obj["content"] = $this.find(".msgCnt").text();
					obj["picurl"] = $this.find(".pic").attr("href");

					arr.push(obj);
				}
				
			})
			var url = $(".pageBtn:last").attr("href")
			__pageExtension.postMessage({"data":arr, msg:"postDate"});
			__pageExtension.postMessage({url:url,msg:"postDate"});
			
		})			    
	});	
	
}
var innerArr=[];

App.webview.addEventListener('message', function(arr, l) {
	
	//App.webview.open("http://t.qq.com/nbaniub"+url.url)
	if(arr.data){
		innerArr =innerArr.concat(arr.data);
		console.log(innerArr.length)
		App.writeFile("D:/node-plugs/lessonNode/microblog/models/source.json", JSON.stringify(innerArr));

	}
	if(arr.url){
		console.log(arr.url)
		App.webview.open("http://t.qq.com/nbaniub"+arr.url);
	}
	
	
});	


