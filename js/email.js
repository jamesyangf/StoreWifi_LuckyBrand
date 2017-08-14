function validateEmail(email) {

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);

}



function validateForm() {

    var email = $("input[name=32411]").val();

    if(!validateEmail(email)) {

        alert("Please check email field")

        return false;

    }

    else if(!$("input[name=32415]:checked").val()) {

        alert("Please agree to the terms")

        return false;

    }

    return true;

}



$(".connect").click(function() {

    var xhr = new XMLHttpRequest();

    var dataMap = new Map();



    var cont = validateForm();



    if(cont == true) {

        // Put all the fields in 

        console.log($("input[name=32411]").val());

        dataMap.set("email", $("input[name=32411]").val());



        console.log($("input[name=32414]:checked").val());

        dataMap.set("gender", $("input[name=32414]:checked").val());



        var currentdate = new Date(); 

        var datetime = (currentdate.getMonth()+1) + "/" 
        
            + currentdate.getDate() + "/"

            + currentdate.getFullYear()

            + " "  

            + currentdate.getHours() + ":"  

            + currentdate.getMinutes() + ":" 

            + currentdate.getSeconds();

        console.log(datetime);

        dataMap.set("dateTime", datetime);



        document.cookie = "email="+dataMap.get("email");

        document.cookie = "dateTime="+dataMap.get("dateTime");

        document.cookie = "type=Email";



        window.location.href = "http://publicwifi.luckybrand.com/emailLogin.html";

        window.open("http://publicwifi.luckybrand.com/emailLogin.html", "_self");

    }

});



