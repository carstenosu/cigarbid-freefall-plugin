chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {

	if (request.method === "Send Notification") {
		var notificationParams = {'type':'basic', 
				'iconUrl': 'icons/icon48.png', 
			    'title': request.title, 
			    'message': 'New Low Price: $' + request.price}
	    var notify = chrome.notifications.create(request.title, notificationParams);
	     
		 
		chrome.notifications.onClicked.addListener(function( notificationId ) {
	    	chrome.tabs.query({url: request.url}, function(tabs) {
				var tab = tabs[0];
				chrome.tabs.highlight({windowId: tab.windowId, tabs:tab.index}, function(window){
					chrome.windows.update(window.id, {focused:true}, function(){});
				});
			});
	    	chrome.notifications.clear(notificationId);
		});
		
	    setTimeout(function(){ chrome.notifications.clear(request.title); }, request.timeout);
		
	} else if ( request.method === "getLocalStorage") {
		var result = localStorage[request.key];
		sendResponse({data:result});
	} 
	return true;
 });