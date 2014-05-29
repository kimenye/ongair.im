$(document).ready(function() {

    var pattern = /^((http|https|ftp):\/\/)/;

    $('.subscribe.form').submit(function() {
        url = window.location.toString();
        if(!pattern.test(url)) {
            $('.subscribe.form, .success').toggleClass('hidden');            
        }
        else {
            $(this).ajaxSubmit({ success: function() {
                console.log("Was a success");
                $('.subscribe.form, .success').toggleClass('hidden'); 
            }}
            );
        }
        return false;


    });
$(document).foundation({});
    
    // $.fn.fullpage();

    // $(document).foundation({

    //     orbit: {
    //         animation: 'slide',
    //         timer: false,
    //         next_on_click: false,
    //         animation_speed: 1000,
    //         navigation_arrows: true,
    //         bullets: false,
    //         swipe: false
    //    }
    // });

    // function setToken(token) {
    // 	$('#code').html(token);
    // }

    // function handleMessage(message) {

    //     if (!verified) {
    //         if (message.data.message == token) {                
    //             $('input[name="phone_number"]').val(message.data.from);
    //             $('.instructions h1, .navigation a.go').addClass('success');
    //             $('.navigation a.go').removeClass('disabled').html('Lets go!');

    //             verified = true;
    //         }
    //     }
    // }

    // function getToken(reset) {
    //     $.getJSON("demo/code", function(data) {
    //         token = data.code;
    //         setToken(token);
    //     });
    // }   

    // var token = null, step = 0, verified = false;
    // if (token == null) {
    // 	getToken(false);
    // }
    // else {
    // 	setToken(token);
    // }

    // $('#sendForm').submit(function() { 
    //     // submit the form 
    //     $(this).ajaxSubmit({ success: function() {
    //             $('small.sent').removeClass('hidden');
    //             $('textarea[name="message"]').val('');
    //         }
    //     }); 
    //     // return false to prevent normal browser submit and page navigation 
    //     return false; 
    // });

    // $('.compose textarea').keyup(function() {
    //     if (!$('small.sent').hasClass('hidden'))
    //         $('small.sent').addClass('hidden');    
    // });

    // $('.navigation a').click(function() {
    //     if (verified)
    //         $('.orbit-next').click();
    // });

    // $('.restart').click(function() {
    //     token = null;
    //     verified = false;
    //     getToken(true);
    // });

    // var pubnub = PUBNUB.init({
    //     publish_key: 'pub-c-d2bcacda-ad1e-4c33-aa0f-77e592c387da',
    //     subscribe_key: 'sub-c-ebfa3f62-71f4-11e2-93fe-12313f022c90'
    // });

    // pubnub.subscribe({
    //     channel: 'ongair_im',
    //     message: function(m){
    //         // console.log(m)
    //         handleMessage(m);
    //     }
    // });
});