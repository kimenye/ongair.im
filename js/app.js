$(document).ready(function() {
    // $.fn.fullpage();

    $(document).foundation({

        orbit: {
            animation: 'slide',
            timer: false,
            next_on_click: false,
            animation_speed: 1000,
            navigation_arrows: false,
            bullets: false,
            swipe: false
       }
    });

    function setToken(token) {
    	$('#code').html(token);
    }

    function handleMessage(message) {
        // first check if we have verified the code
        var verified = monster.get('token_verified') != null;

        if (!verified) {
            var token = monster.get('token');
            if (message.data.message == token) {
                monster.set('token_verified', true);
                monster.set('phone_number', message.data.from);
                $('.instructions h1').addClass('success');
                monster.set('step', 2);
            }
        }
    }

    function init() {
        var verified = monster.get('token_verified') != null;
        var step = monster.get('step');

        if (step == 2) {
            $('.instructions h1, .navigation a').addClass('success');
            $('.navigation a').removeClass('disabled').html('Your code was received from +' + monster.get('phone_number') + '. Lets go!');
            $('step-one .navigation a').click();
            $('input[name="phone_number"]').val(monster.get('phone_number'));
        }
    }

    var token = monster.get('token');
    if (token == null) {
    	$.getJSON("demo/code", function(data) {
    		token = data.code;
    		monster.set('token', token);    		
    		setToken(token);
    	});
    }
    else {
    	setToken(token);
    }

    $('#sendForm').submit(function() { 
        // submit the form 
        $(this).ajaxSubmit({ success: function() {
                $('small.sent').removeClass('hidden');
                $('textarea[name="message"]').val('');
            }
        }); 
        // return false to prevent normal browser submit and page navigation 
        return false; 
    });

    $('.compose textarea').keyup(function() {
        if (!$('small.sent').hasClass('hidden'))
            $('small.sent').addClass('hidden');    
    });

    init();

    var pubnub = PUBNUB.init({
        publish_key: 'pub-c-d2bcacda-ad1e-4c33-aa0f-77e592c387da',
        subscribe_key: 'sub-c-ebfa3f62-71f4-11e2-93fe-12313f022c90'
    });

    pubnub.subscribe({
        channel: 'ongair_im',
        message: function(m){
            console.log(m)
            handleMessage(m);
        }
    });
});