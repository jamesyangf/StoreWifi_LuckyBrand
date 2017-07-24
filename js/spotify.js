function login(callback) {

    var CLIENT_ID = '12282f88a47e48c4ba68e41a5c01cfe4';

    var REDIRECT_URI = 'http://publicwifi.luckybrand.com/spotifyLogin.html';

    function getLoginURL(scopes) {

        return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
                '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
                '&scope=' + encodeURIComponent(scopes.join(' ')) +
                '&response_type=token';
    }

                    
    var url = getLoginURL(['user-read-email', 'user-top-read']);

    var w = window.open(url, '_self');
}



var loginButton = document.getElementById('btn-login');

loginButton.addEventListener('click', function() {

    login(function(accessToken) {

        getUserData(accessToken)

            .then(function(response) {

                // Goes to authentication screen

            });

    });

});