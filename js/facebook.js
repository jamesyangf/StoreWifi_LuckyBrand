/* FACEBOOK SCRIPT */
window.fbAsyncInit = function() {
    FB.init({
        appId      : '2006624432899239',
        cookie     : true,
        xfbml      : true,
        version    : 'v2.8'
    });
    FB.AppEvents.logPageView();   
    // This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.
    FB.getLoginStatus(function(response) {
        if (response.status === 'connected') {
            // Logged into your app and Facebook.
            //testAPI();
            console.log("Customer is already logged on");
        } else {
            console.log("Customer not logged on");
        }
    });
};

// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
    } else {
        // The person is not logged into your app or we are unable to tell.
        //document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
         console.log("Customer not logged on");
    }
}
// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    console.log("Checking login state");
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', { locale: 'en_US', fields: 'name, email, gender' },
    function(response) {
        var fbMap = new Map();
        console.log(response);
        console.log(response.email);
        console.log(response.gender);
        console.log('Successful login for: ' + response.name);
        fbMap.set("email", response.email);
        fbMap.set("gender", response.gender);

        var currentdate = new Date(); 
        var datetime = currentdate.getDate() + "/"
            + (currentdate.getMonth()+1)  + "/" 
            + currentdate.getFullYear() + " @ "  
            + currentdate.getHours() + ":"  
            + currentdate.getMinutes() + ":" 
            + currentdate.getSeconds();
        fbMap.set("dateTime", datetime); 

        var data = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n\t<LoginInfo xmlns=\"customerEmailxml\">\r\n\t\t<UserSubmission>"+fbMap.get("email")+"</UserSubmission>\r\n\t\t<Type>Facebook</Type>\r\n\t\t<Gender>"+fbMap.get("gender")+"</Gender>\r\n\t\t<DateTime>"+fbMap.get("dateTime")+"</DateTime>\r\n\t</LoginInfo>";
        console.log(data);

        document.cookie = "email="+fbMap.get("email");
        document.cookie = "dateTime="+fbMap.get("dateTime");
        document.cookie = "type=Email";
        document.cookie = "gender="+fbMap.get("gender");

        var grantUrl = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var email = document.cookie.replace(/(?:(?:^|.*;\s*)email\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var gender = document.cookie.replace(/(?:(?:^|.*;\s*)gender\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var type = document.cookie.replace(/(?:(?:^|.*;\s*)type\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        var dateTime = document.cookie.replace(/(?:(?:^|.*;\s*)dateTime\s*\=\s*([^;]*).*$)|^.*$/, "$1");

        alert("TEST grant: " + grantUrl);
        console.log("TEST payload: "+ email + type + dateTime + gender);
        
        // localStorage.setItem("payload", data);
        //window.location.href = "http://publicwifi.luckybrand.com/emailLogin.html";

    });
}

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.9&appId=2006624432899239";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
