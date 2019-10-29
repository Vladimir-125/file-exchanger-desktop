
var util = {};
util.post = function(url, fields) {
    var $form = $('<form>', {
        action: url,
        method: 'post'
    });
    $.each(fields, function(key, val) {
         $('<input>').attr({
             type: "hidden",
             name: key,
             value: val
         }).appendTo($form);
    });
    $form.appendTo('body').submit();
}

function countTime(time, id){
	time = time.split(':');
	let h = parseInt(time[0], 10);
	let m = parseInt(time[1], 10);
	let s = parseInt(time[2], 10);
	var loop;
	if(h<0&&m<0&&s<0){
		return
	}
	var check = function(){
	    if(h==0&&m==0&&s==0){
	    	// remove loop
	    	$('#'+id).text('File has been expired!');
	        clearTimeout(loop)
	    }
	    else {
	        loop = setTimeout(check, 1000); // check again in a second
	        let seconds = h*60*60+m*60+s;
	        seconds--;
	        h=Math.floor(seconds/(60*60));
	        seconds = seconds - h*60*60;
	        m=Math.floor(seconds/60);
	        seconds = seconds - m*60;
	        s = seconds;
	        let text = (h ? (h > 9 ? h : "0" + h) : "00") + ":" + (m ? (m > 9 ? m : "0" + m) : "00") + ':' + (s > 9 ? s : "0" + s);
			$('#'+id).text(text);
	    
	        }
	}

	check();
}
function randHex(len) {
var maxlen = 8,
      min = Math.pow(16,Math.min(len,maxlen)-1) 
      max = Math.pow(16,Math.min(len,maxlen)) - 1,
      n   = Math.floor( Math.random() * (max-min+1) ) + min,
      r   = n.toString(16);
  while ( r.length < len ) {
     r = r + randHex( len - maxlen );
  }
  return r;
};