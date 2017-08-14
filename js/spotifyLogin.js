        var artists = [];
        var genres = [];
        var tracks = [];


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
            var datetime = (currentdate.getMonth()+1) + "/" 
        
                + currentdate.getDate() + "/"

                + currentdate.getFullYear()

                + " "  

                + currentdate.getHours() + ":"  

                + currentdate.getMinutes() + ":" 

                + currentdate.getSeconds();

            eMap.set("dateTime", datetime); 

            /* Gets Top Tracks */
            getUserTopTracks(accessToken).then(function(response) {
                console.log(response);

                var tracksArray = response.items;
                var numberOfTracks = tracksArray.length;


                console.log("Number of tracks: "+numberOfTracks);

                if(numberOfTracks > 3) {
                    // Keep it at most 3
                    numberOfTracks = 3;
                }
                console.log("Top 3 Tracks: ");
                for(var i = 0; i < 3; i++) {
                    tracks.push(tracksArray[i].name);
                    console.log(tracksArray[i].name);
                }

                /* Gets top artist */
                getUserTopArtists(accessToken).then(function(response) {

                    var artistsArray = response.items;
                    var i;

                    console.log("Top 3 Artist: ");
                    for(i = 0; i < 3; i++) {
                        artists.push(artistsArray[i].name);
                        console.log((i+1) + " Artist: " + artistsArray[i].name);
                        console.log((i+1) + " Artist ID: " + artistsArray[i].id);
                        var artistId = artistsArray[i].id;

                        var temp = [];

                        /* Gets top Genre */
                        var test = getGenre(accessToken, artistId).then(function(response) {
                            var genresArray = response.genres;
                            temp.push(genresArray[0]);
                            console.log("Favorite Genre: " + genresArray[0]);
                            return temp;
                        });

                        console.log("THETEST: " + test);
                        genres = temp;

                        console.log("IN GENRE: " + genres);
                    }

                    console.log("WHATTT YOU: "+ eMap.get("genre1"));

                    if(i == 3) {
                        webServiceCall();
                        console.log(i);
                        console.log(genres);
                        console.log(artists);
                    }
                });  
            });
        });

        //TODO: Put this inside getUserurl and put webServiceCall() inside this
        // getUserTopTracks(accessToken).then(function(response) {
        //     console.log(response);

        //     var tracksArray = response.items;
        //     var numberOfTracks = tracksArray.length;


        //     console.log("Number of tracks: "+numberOfTracks);

        //     if(numberOfTracks > 3) {
        //         // Keep it at most 3
        //         numberOfTracks = 3;
        //     }
        //     console.log("Top Tracks: ");
            
        //     for(var i = 0; i < 3; i++) {
        //     	tracks.push(tracksArray[i].name);
        //         console.log(tracksArray[i].name);
        //     }
        // });

        // getUserTopArtists(accessToken).then(function(response) {

        //     var artistsArray = response.items;

        //     for(var i = 0; i < 3; i++) {
        //         artists.push(artistsArray[i].name);
        //         console.log((i+1) + " Artist: " + artistsArray[i].name);
        //         console.log((i+1) + " Artist ID: " + artistsArray[i].id);
        //         var artistId = artistsArray[i].id;

        //         getGenre(accessToken, artistId).then(function(response) {
        //             var genres = response.genres;
        //             genres.push(genres[0]);
        //             console.log("Favorite Genre: " + genres[0]);
        //         });
        //     }
        // });


        function webServiceCall() {
            // Web service
            var client_ip = document.cookie.replace(/(?:(?:^|.*;\s*)client_ip\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var client_mac = document.cookie.replace(/(?:(?:^|.*;\s*)client_mac\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var node_id = document.cookie.replace(/(?:(?:^|.*;\s*)node_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var node_mac = document.cookie.replace(/(?:(?:^|.*;\s*)node_mac\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            var gateway_id = document.cookie.replace(/(?:(?:^|.*;\s*)gateway_id\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            console.log("DEBUG: " + artists);
            console.log("DEBUG: " + genres);
            var data = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n\t<LoginInfo xmlns=\"customerEmailxml\">\r\n\t\t<UserSubmission>"+eMap.get("email")+"</UserSubmission>\r\n\t\t<Type>Spotify</Type>\r\n\t\t<DateTime>"+eMap.get("dateTime")+"</DateTime>\r\n\t\t<ClientIp>"+client_ip+"</ClientIp>\r\n\t\t<ClientMac>"+client_mac+"</ClientMac>\r\n\t\t<NodeId>"+node_id+"</NodeId>\r\n\t\t<NodeMac>"+node_mac+"</NodeMac>\r\n\t\t<GatewayId>"+gateway_id+"</GatewayId>\r\n\t\t<Artist1>"+artists[0]+"</Artist1>\r\n\t\t<Artist2>"+artists[1]+"</Artist2>\r\n\t\t<Artist3>"+artists[2]+"</Artist3>\r\n\t\t<Genre1>"+eMap.get("genre1")+"</Genre1>\r\n\t\t<Genre2>"+eMap.get("genre2")+"</Genre2>\r\n\t\t<Genre3>"+eMap.get("genre3")+"</Genre3>\r\n\t\t<Track1>"+tracks[0]+"</Track1>\r\n\t\t<Track2>"+tracks[1]+"</Track2>\r\n\t\t<Track3>"+tracks[2]+"</Track3>\r\n\t</LoginInfo>";
            console.log(data);

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
                               //window.location.href = granturl;
 
                            }
                        } else {
                            console.log("Failure: " + this.status);
                            // Print a message saying not successful, and tell them to retry
                        }
                    }
                });

            xhr.send(data);
        }