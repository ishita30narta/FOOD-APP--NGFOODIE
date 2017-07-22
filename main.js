// Runs when HTML file is loaded
$(document).ready(function() {
   $('#user-email').on('input',function() {
        var email = $('#user-email').val()
        var message = 'Welcome Back, ' + email;
        $('.welcome-message').text(message);
    });
});