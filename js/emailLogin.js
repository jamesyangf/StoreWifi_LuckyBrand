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
                var type = document.cookie.replace(/(?:(?:^|.*;\s*)type\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                var dateTime = document.cookie.replace(/(?:(?:^|.*;\s*)dateTime\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                var client_ip = document.cookie.replace(/(?:(?:^|.*;\s*)client_ip\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                var client_mac = document.cookie.replace(/(?:(?:^|.*;\s*)client_mac\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                var node_id = document.cookie.replace(/(?:(?:^|.*;\s*)node_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                var node_mac = document.cookie.replace(/(?:(?:^|.*;\s*)node_mac\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                var gateway_id = document.cookie.replace(/(?:(?:^|.*;\s*)gateway_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
                var data = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n\t<LoginInfo xmlns=\"customerEmailxml\">\r\n\t\t<UserSubmission>"+email+"</UserSubmission>\r\n\t\t<Type>Email</Type>\r\n\t\t<DateTime>"+dateTime+"</DateTime>\r\n\t\t<ClientIp>"+client_ip+"</ClientIp>\r\n\t\t<ClientMac>"+client_mac+"</ClientMac>\r\n\t\t<NodeId>"+node_id+"</NodeId>\r\n\t\t<NodeMac>"+node_mac+"</NodeMac>\r\n\t\t<GatewayId>"+gateway_id+"</GatewayId>\r\n\t\t<Artist1></Artist1>\r\n\t\t<Artist2></Artist2>\r\n\t\t<Artist3></Artist3>\r\n\t\t<Genre1></Genre1>\r\n\t\t<Genre2></Genre2>\r\n\t\t<Genre3></Genre3>\r\n\t\t<Track1></Track1>\r\n\t\t<Track2></Track2>\r\n\t\t<Track3></Track3>\r\n\t</LoginInfo>";

                var granturl = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
         

                var xhr = new XMLHttpRequest();
                
                xhr.open("POST", "http://66.80.179.115:9090/ws/rest/email/addCustomerEmail;boomi_auth=bHVja3licmFuZC1OQTJVWUM6MTkyYWQxMTItZTNlOC00YmViLTliMDItMjlmMzMyNTQ5Yzg5", true);

                xhr.addEventListener("readystatechange", function () {
                    if (this.readyState === 4) {
                        if(this.status == 200) { // When its successful

                            if(this.responseText == "Bad Email") {
                                alert("Adding Email Unsuccessful");
                                window.location.href = "index.phtml";
                            } else {

                                console.log(this.responseText);
                                console.log(this.status);
                                
                                // Go to successpage
                                window.location.href = granturl;
 
                            }
                        } else {
                            console.log("Failure: " + this.status);
                            // Print a message saying not successful, and tell them to retry
                        }
                    }
                });

                xhr.send(data);
            }

            webServiceCall();
