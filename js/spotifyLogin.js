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

        var eMap = new Map();
        var url = window.location.href;
        var sep = ["access_token=", "&token_type"];
        var res = url.split(new RegExp(sep.join('|'), 'g'));

        var accessToken = res[1];

        function getUserurl(accessToken) {
            return $.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
        }

        function getUserTopTracks(accessToken) {
            return $.ajax({
                url: 'https://api.spotify.com/v1/me/top/tracks',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
        }

        function getUserTopArtists(accessToken) {
            return $.ajax({
                url: 'https://api.spotify.com/v1/me/top/artists',
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
        }

        function getGenre(accessToken, id) {
            return $.ajax({
                url: "https://api.spotify.com/v1/artists/" + id,
                headers: {
                    'Authorization': 'Bearer ' + accessToken
                }
            });
        }
            
        getUserurl(accessToken).then(function(response) {
            console.log(response);
            console.log(response.display_name);
            console.log(response.email);

            eMap.set("email", response.email);

            var currentdate = new Date(); 
            var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
            eMap.set("dateTime", datetime);   

            webServiceCall();
        });

        //TODO: Put this inside getUserurl and put webServiceCall() inside this
        getUserTopTracks(accessToken).then(function(response) {
            console.log(response);

            var tracksArray = response.items;
            var numberOfTracks = tracksArray.length;


            console.log("Number of tracks: "+numberOfTracks);

            if(numberOfTracks > 10) {
                // Keep it at most 10
                numberOfTracks = 10;
            }
            console.log("Top Tracks: ");
            var tracks = [];
            for(var i = 0; i < numberOfTracks; i++) {
            	tracks.push(tracksArray[i].name);
                console.log(tracksArray[i].name);
            }
        });

        getUserTopArtists(accessToken).then(function(response) {

            var artistsArray = response.items;

            console.log("Top Artist: " + artistsArray[0].name);
            console.log("Artist ID: " + artistsArray[0].id);
            var artistId = artistsArray[0].id;

            getGenre(accessToken, artistId).then(function(response) {
                var genres = response.genres;
                var genre = genres[0];
                console.log("Favorite Genre: " + genre);
            });
        });


        function webServiceCall() {
            // Web service
            var data = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n\t<LoginInfo xmlns=\"customerEmailxml\">\r\n\t\t<UserSubmission>"+eMap.get("email")+"</UserSubmission>\r\n\t\t<Type>Spotify</Type>\r\n\t\t<Gender></Gender>\r\n\t\t<DateTime>"+eMap.get("dateTime")+"</DateTime>\r\n\t</LoginInfo>";
            console.log(data);

            var xhr = new XMLHttpRequest();
            
            //xhr.open("POST", "http://localhost:9090/ws/rest/email/addCustomerEmail;boomi_auth=bHVja3licmFuZC1OQTJVWUM6MTkyYWQxMTItZTNlOC00YmViLTliMDItMjlmMzMyNTQ5Yzg5", true);
            xhr.open("POST", "https://test.connect.boomi.com/ws/rest/customerdl/addCustomerDL;boomi_auth=bHVja3licmFuZC1OQTJVWUMuMlVOODdKOjVjYzYxZDFiLThlNmEtNDI2Ni04YmVjLWRjMDM0YWMxMzUxYQ==", true);

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    if(this.status == 200) { // When its successful
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