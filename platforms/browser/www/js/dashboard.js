/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        infoQuery();
        meteoQuery();
    },

    receivedEvent: function(id) {
    }
};

app.initialize();

var city;
var METEOKEY = "54bf74575f2a3b0b44fe7d4c363dafdf";

function changeToLeaderboard () {
    window.location = "leaderboard.html";
}

function changeToEditProfile () {
    window.location = "editProfile.html";
}

function changeToAddMeasure () {
    window.location = "addMeasure.html";
}

function displayData (response) {
    var name = response.name;
    var address = response.address;
    var score = response.score;
    var stateId = response.image.split('-')[2];
    $('#name').append(name);
    $('#address').append(address);
    $('#score').append(score);
    $('#image').append('<img id="flag" src="img/flags/'+stateId+'.svg"/>');
}

function infoQuery () {
    var token = localStorage.getItem("token");
    $.ajax({
        url: "http://energyatschool.finmatica.eu/api/getschoolinfo",
        headers: { 
            "Accept": "application/json;charset=UTF-8",
            "Authorization": "JWT "+token
        },
        async: false,
        success: function(response) {
            if ( response.error) {
                window.location = "index.html";
            }
            else {
                city = response.address.split(',')[1].split(' ')[2];
                displayData(response);
            }
        },
        error: function(response) {
                window.location = "index.html";
                $('#main').append('<p>errore</p>');
        },
        dataType: "json"
      });
}

function meteoQuery () {
    var url ="http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+METEOKEY;
    $.ajax({
        url: url,
        async: true,
        success: function(data) {
            $('#temp').append(data.main.temp+'K');
        },
        error: function(response) {
            $('#temp').append("Unable to find this value");
        },
        dataType: "json"
      });
}

function logout () {
    window.location = "index.html";
}

$( document ).ready(function() {
    $('#leaderBtn').on('click', function () {
        changeToLeaderboard();
    });
    $('#measureBtn').on('click', function() {
        changeToAddMeasure();
    });
    $('#editProfileBtn').on('click', function() {
        changeToEditProfile();
    });
    $('#logoutBtn').on('click', function() {
        logout();
    });
});