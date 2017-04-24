  // This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    //console.log('statusChangeCallback');
    //console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      fbapi();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('loginStatus').innerHTML = '&nbsp;&nbsp;&nbsp;Please log into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('loginStatus').innerHTML = '&nbsp;&nbsp;Please log into Facebook.';
    }
  }

  // This function is called when someone finishes with the Login
  // Button.  See the onlogin handler attached to it in the sample
  // code below.
  function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
  }

  window.fbAsyncInit = function() {
    FB.init({
      appId      : '725598060832930',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.0' // use version 2.0
    });

    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

  };

  // Load the SDK asynchronously
  (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));

  function fb_login(){
      FB.login(function(response) {

          if (response.authResponse) {
              console.log('Welcome!  Fetching your information.... ');
              //console.log(response); // dump complete info
              access_token = response.authResponse.accessToken; //get access token
              user_id = response.authResponse.userID; //get FB UID
              fbapi();
          }
      }, {
          scope: 'publish_stream,email'
      });
  }

  function fbapi() {
    FB.api('/me', function(response) {
        //$("#facebookLoginButton").hide();
        document.getElementById('loginStatus').innerHTML =
            'last score: ' + $("#gamePoints").val() + '&nbsp;&nbsp;-&nbsp;&nbsp;best score:' + $("#maxScore").val();
        $("#nickname").val(response.first_name);
        $("#lastname").val(response.last_name);
        $("#email").val(response.email);
        $("#logged").val(true);
        $("#facebookLoginButton").css("background-color", "#4365BC");
        fontSize = $.regraDeTres(19, mapSize)+"px";
        paddingLeft = $.regraDeTres(10, mapSize)+"px";
        paddingTop = $.regraDeTres(15, mapSize)+"px";
        $("#facebookLoginButton").html('<div style="font-size: '+fontSize+'; padding-left: '+paddingLeft+'; padding-top: '+paddingTop+'">'+response.first_name+'</div>');
        $.post('/Ranking/logInUser/', {
            nickName: response.first_name,
            lastName: response.last_name,
            email: response.email,
            points: $("#gamePoints").val() },
            function(res) {
                res = $.parseJSON(res);
                if (res.response == 1) {
                    $("#maxScore").val(res.maxScore);
                    $("#loginStatus").html(
                        'last score: ' + $("#gamePoints").val() + '&nbsp;&nbsp;-&nbsp;&nbsp;best score: ' + $("#maxScore").val()
                    );
                }
            }
        );
    });
  }
