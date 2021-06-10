$(document).ready(function(){
    $(window).scroll(function(){
        // sticky navbar on scroll script
        if(this.scrollY > 20){
            $('.navbar').addClass("sticky");
        }else{
            $('.navbar').removeClass("sticky");
        }
        
        // scroll-up button show/hide script
        if(this.scrollY > 500){
            $('.scroll-up-btn').addClass("show");
        }else{
            $('.scroll-up-btn').removeClass("show");
        }
    });

    // slide-up script
    $('.scroll-up-btn').click(function(){
        $('html').animate({scrollTop: 0});
        // removing smooth scroll on slide-up button click
        $('html').css("scrollBehavior", "auto");
    });

    $('.navbar .menu li a').click(function(){
        // applying again smooth scroll on menu items click
        $('html').css("scrollBehavior", "smooth");
    });
    
    $(document).ready(function () {
        $(".owl-carousel").owlCarousel({
            items:1,
            loop:true,
            nav:true,
            dots:true,
            autoplay:true,
            autoplaySpeed:1000,
            smartSpeed:1500,
            autoplayHoverPause:true
        });
    });

    // owl carousel script
    $('.carousel').owlCarousel({
        margin: 20,
        loop: true,
        autoplayTimeOut: 2000,
        autoplayHoverPause: true,
        responsive: {
            0:{
                items: 1,
                nav: false
            },
            600:{
                items: 2,
                nav: false
            },
            1000:{
                items: 3,
                nav: false
            }
        }
    });

    $('.contact-form').submit((e)=>{
        e.preventDefault(); //preventing from submitting form
    });

    $('.send-msg').click(()=>{
        $fullname = $('.fullname').val();
        $email = $('.email-input').val();
        $subject = $('.subject').val();
        $message = $('.message').val();
        $('.send-msg').text("Sending...");
        $('.contact-form').addClass("disable");

        $.ajax({
            url: "message.php",
            type: "POST",
            data: "email="+$email+"&subject="+$subject+"&message="+$message,
            success: function(data){
                $errorBox = $('.error-box');
                $('.send-msg').text("Send message");
                $('.contact-form').removeClass("disable");
                if(data == "success"){
                    $fullname = $('.fullname').val("");
                    $email = $('.email-input').val("");
                    $subject = $('.subject').val("");
                    $message = $('.message').val("");
                    $errorBox.html("Your message has been sent!");
                    $errorBox.addClass("success");
                    setTimeout(()=>{
                        $errorBox.html("");
                        $errorBox.removeClass("success");
                    }, 5000);
                }else{
                    $errorBox.removeClass("success");
                    $errorBox.html("<span>* </span>" + data);
                }
            }
        });
    });
});