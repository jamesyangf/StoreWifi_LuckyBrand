            setTimeout(function(){ document.getElementById("delay").innerHTML = "It is taking awhile, please give it a few more seconds"; }, 30000);

            // Internet Explorer 6-11
            var isIE = /*@cc_on!@*/false || !!document.documentMode;
            // Chrome 1+
            var isChrome = !!window.chrome && !!window.chrome.webstore;

            $(document).ready(function(){
                $(".fieldYes").hide();
                $(".fieldNo").hide();
                $(".bgPic").hide();

                // Determines which browser it is on
                if(isIE) {
                    document.getElementsByTagName("BODY")[0].setAttribute("background","img/SplashPage_Bg.png");
                    $(".ScanForm").css('margin-top', '230px');
                } else {
                    $(".bgPic").show();
                }
            });


            function webServiceCall() {
                // Web service
                var email = document.cookie.replace(/(?:(?:^|.*;\s*)email\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                var gender = document.cookie.replace(/(?:(?:^|.*;\s*)gender\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                var type = document.cookie.replace(/(?:(?:^|.*;\s*)type\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                var dateTime = document.cookie.replace(/(?:(?:^|.*;\s*)dateTime\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                var data = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n\t<LoginInfo xmlns=\"customerEmailxml\">\r\n\t\t<UserSubmission>"+email+"</UserSubmission>\r\n\t\t<Type>"+type+"</Type>\r\n\t\t<Gender>"+gender+"</Gender>\r\n\t\t<DateTime>"+dateTime+"</DateTime>\r\n\t</LoginInfo>";
                console.log(data);

                var xhr = new XMLHttpRequest();
                
                //xhr.open("POST", "http://localhost:9090/ws/rest/email/addCustomerEmail;boomi_auth=bHVja3licmFuZC1OQTJVWUM6MTkyYWQxMTItZTNlOC00YmViLTliMDItMjlmMzMyNTQ5Yzg5", true);
                xhr.open("POST", "https://test.connect.boomi.com/ws/rest/customerdl/addCustomerDL;boomi_auth=bHVja3licmFuZC1OQTJVWUMuMlVOODdKOjVjYzYxZDFiLThlNmEtNDI2Ni04YmVjLWRjMDM0YWMxMzUxYQ==", true);

                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        if(this.status == 200) { // When its successful

                            if(this.responseText == "Bad Email") {
                                alert("Adding Email Unsuccessful");
                            }

                            console.log(this.responseText);
                            console.log(this.status);
                            
                            // TODO: Go to successpage
                            window.location.href = "SuccessPage.html"
                        } else {
                            console.log("Failure: " + this.status);
                            // Print a message saying not successful, and tell them to retry
                        }
                    }
                });

                xhr.send(data);
            }

            webServiceCall();
