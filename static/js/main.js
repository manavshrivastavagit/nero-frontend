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
}

function showLoading(){
	var options = {month: 'short', day: 'numeric', hour:'numeric', minute: 'numeric'  };
				console.log("in showLoadingMessage");
				MessageLoading = new MessageLoading({
						text: 'loading...',
						time: getCurrentTimestamp().toLocaleString("en-IN", options),
						message_side: 'left'
				});
				MessageLoading.draw();
				$messages.animate({ scrollTop: $messages.prop('scrollHeight') }, 300);
}

function hideLoading(){
	//$('.messages').remove();
	$( "li.message.left.appeared.loading_appeared" ).hide();
	// $('.messages').remove('loading_appeared')
}
