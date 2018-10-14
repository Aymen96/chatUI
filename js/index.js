$(document).ready(function(){

  setTimeout(function (){
      var preloadbg = document.createElement("img");
      preloadbg.src = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/245657/timeline1.png";
      addFriendListner();
  },500);
});

const addFriendListner = function () {
    $(".friend.bot").each(function(){
        $(this).click(function(){
            var childOffset = $(this).offset();
            var parentOffset = $(this).parent().parent().offset();
            var childTop = childOffset.top - parentOffset.top;
            var clone = $(this).find('img').eq(0).clone();
            var top = childTop+12+"px";



            setTimeout(function(){$("#profile p").addClass("animate");$("#profile").addClass("animate");}, 100);
            setTimeout(function(){
                $("#chat-messages").addClass("animate");
                $('.cx, .cy').addClass('s1');
                setTimeout(function(){$('.cx, .cy').addClass('s2');}, 100);
                setTimeout(function(){$('.cx, .cy').addClass('s3');}, 200);
            }, 150);


            app.chat_partner.name = $(this).find("p strong").html();
            app.chat_partner.link = $(this).find("p span").html();
            app.chat_partner.avatar = $(this).find('img').attr('src');
            app.chat_partner.id = $(this).attr('id');
            $('#chat-messages .message').remove();
            $('#chat-messages').append('<div  class="message">\n' +
                '                <img v-bind:src="chat_partner.avatar" />\n' +
                '                <div class="bubble">\n' +
                app.bots[app.chat_partner.id].messages[0] +
                '                    <div class="corner"></div>\n' +
                '                </div>\n' +
                '            </div>');

            $(".message").not(".right").find("img").attr("src", $(clone).attr("src"));
            $('#friendslist').fadeOut();
            $('#chatview').fadeIn();


            $('#close').unbind("click").click(function(){
                $("#chat-messages, #profile, #profile p").removeClass("animate");
                $('.cx, .cy').removeClass("s1 s2 s3");


                setTimeout(function(){
                    $('#chatview').fadeOut();
                    $('#friendslist').fadeIn();
                }, 50);
            });

        });
    });
};
var app = new Vue({
	el: '#chatbox',
	created: function () {
		console.log("Vuejs App created at " + new Date().toLocaleDateString());
	},
	updated: function () {
		console.log("Updated");
	},
	data: {
		message: 'Hello Vue!',
		user: {
			name: 'Aymen Hachicha',
			avatar: 'https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png',
			last_active: new Date().toLocaleString()
		},
		chat_partner: {
			name: '',
			link: '',
			avatar: '',
			id: 0,
			available: true
		},
		bots: "",
		friends: "",
        query: ""
	},
	methods: {
		getMessage: function () {
			console.log(json.bots.calendar.messages[0]);
		},
		createMessage: function() {

		},
		click: function (e) {

        },
        search: function() {
            var obj = {};
            for(var key in json.bots) {
                const el = json.bots[key];
                if(el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1) {
                    obj[key] = el;
                }
            }
            this.bots = obj;
            obj = {};
            for(var key in json.friends) {
                const el = json.friends[key];
                if(el.name.toLowerCase().indexOf(this.query.toLowerCase()) > -1) {
                    obj[key] = el;
                }
            }
            this.friends = obj;
            setTimeout(addFriendListner(),1000);
		}
	}
});
var json;
$.getJSON("data/data.json", function(j) {
    json = j; // this will show the info it in firebug console
	app.bots = json.bots;
	app.friends = json.friends
});
Vue.component('message', {
    template: '<div  class="message">\n' +
    '                <img v-bind:src="chat_partner.avatar" />\n' +
    '                <div class="bubble">\n' +
    '                    {{bots[chat_partner.id].messages[0]}}\n' +
    '                    <div class="corner"></div>\n' +
    '                </div>\n' +
    '            </div>'
});