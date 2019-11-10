var Message, MessageLoading;
$messages = $('.messages');
Message = function (arg) {
		this.text = arg.text, this.message_side = arg.message_side, this.time = arg.time;
		this.draw = function (_this) {
				return function () {
						var $message;
						$message = $($('.message_template').clone().html());
						$message.addClass(_this.message_side).find('.text').html(addBr(_this.text));
						$message.addClass(_this.message_side).find('.timestamp').html(_this.time);
						$('.messages').append($message);
						return setTimeout(function () {
								return $message.addClass('appeared');
						}, 0);
				};
		}(this);
		return this;
};

MessageLoading = function (arg) {
		this.text = arg.text, this.message_side = arg.message_side, this.time = arg.time;
		this.draw = function (_this) {
				return function () {
						var $message;
						$message = $($('.loading_message_template').clone().html());
						$message.addClass(_this.message_side).find('.text_loading').html('<div class="avatar avatar_loading"></div>');
						$message.addClass('loading_appeared');
						$('.messages').append($message);
						return setTimeout(function () {
								return $message.addClass('appeared');
						}, 0);
				};
		}(this);
		return this;
};

function addBr(text){
		//console.log("text was: "+text)
		newText=text.replace(/\n/g, "<br />")
		newText=newText.replace(/\\n/g, "<br />")//for \n from dialogflow
		//console.log("text is: "+text)
		return newText;

}

function changeTitle(title){
		document.getElementById("title").innerHTML=title;
}

function getCurrentTimestamp()
{
	// var d=new Date(c["timestamp"][0],c["timestamp"][1],c["timestamp"][2],c["timestamp"][3],c["timestamp"][4],c["timestamp"][5],c["timestamp"][6]);
	var d = new Date();
	return d;
}

function showUserMessage(msg,d){
				var options = {month: 'short', day: 'numeric', hour:'numeric', minute: 'numeric'  };
				//console.log("in showUserMessage");
				message = new Message({
						text: msg,
						time: d.toLocaleString("en-IN", options),
						message_side: 'right'
				});
				message.draw();
				$messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
				$('#msg_input').val('');
}
function showBotMessage(msg,d){
				var options = {month: 'short', day: 'numeric', hour:'numeric', minute: 'numeric'  };
				//console.log("in showBotMessage");
				message = new Message({
						 text: msg,
						 time: d.toLocaleString("en-IN", options),
						 message_side: 'left'
				});
				message.draw();
				$messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
}

function showWelcomeMessage(){
	     $('.message_input').val('');
         $('.message_input').focus();
         
         var welcomeMsg = "";
         if(!localStorage.getItem("firstname")){
             welcomeMsg = "Hi! This is NERO, your personal digital assistant for anything and everything related to Enquero"
              showBotMessage(welcomeMsg,getCurrentTimestamp());
          AskFNameLNameMsg = "Please provide your First-name and Last-name\n example: Ajit Verma"
          showBotMessage(AskFNameLNameMsg,getCurrentTimestamp());
         } else {
            welcomeMsg = "Hi " + localStorage.getItem("firstname")+ " " + localStorage.getItem("lastname") + " ! My name is NERO and I'm a Chatbot. I can help you with Enquero related queries. Please select a quick link below or type your question in the space provided."
          showBotMessage(welcomeMsg,getCurrentTimestamp());
		 }
		 // show hint btn
		  // Used like so
			var quicklinksArray = ['<div class="quicklink">my reporting manager</div>', '<div class="quicklink">can you tell me my practice lead ?</div>',
			'<div class="quicklink">Largest account in enquero</div>', '<div class="quicklink">what is my business unit ?</div>',
			'<div class="quicklink">Tell me something about Enquero</div>',  '<div class="quicklink">Tell me something about Enquero</div>',
			'<div class="quicklink">my date of joining</div>'
		];
		quicklinksArray = shuffle(quicklinksArray);
			//console.log(quicklinksArray);
			var shuffledLinks='';
			quicklinksArray.forEach(link => {
				shuffledLinks += link;
			});
			//console.log('shuffledLinks: '+ shuffledLinks);
		 var quicklinks = '<div class="quicklinks">' + shuffledLinks + '</div>';
		 $('.messages').append(quicklinks);
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
  
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
  
	  // And swap it with the current element.
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
	}
  
	return array;
  }
  
 

function showLoading(){
	var options = {month: 'short', day: 'numeric', hour:'numeric', minute: 'numeric'  };
				console.log("in showLoadingMessage");
				MessageLoading1 = new MessageLoading({
						text: 'loading...',
						time: getCurrentTimestamp().toLocaleString("en-IN", options),
						message_side: 'left'
				});
				MessageLoading1.draw();
				$messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
}

function hideLoading(){
	//$('.messages').remove();
	$( "li.message.left.appeared.loading_appeared" ).hide();
	// $('.messages').remove('loading_appeared')
}
