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
        displayData();
    },

    receivedEvent: function(id) {
    }
};

app.initialize();

function changeToDashboard () {
    window.location = "dashboard.html";
}

function changeToEditProfile () {
    window.location = "editProfile.html";
}

function changeToLeaderboard () {
    window.location = "leaderboard.html";
}

function logout () {
    window.location = "index.html";
}

function displayData () {
    var count = 0;
    var num = sessionStorage.getItem("numberOfSensors");
    while (count < num) {
        $('#sel').append('<option>'+sessionStorage.getItem('name'+count)+'</option>')
        count = count + 1;
    }
}

function showForm () {
    event.preventDefault();
    $('#form').hide();
    if ($('#sel').val() == "Classroom") {
        $('#classForm').show();
        var classlist = sessionStorage.getItem('classlist').split(',');
        for (var i in classlist) {
            $('#classroom').append('<option>'+classlist[i]+'</option>');            
        }
    }
    else {
        if ($('#sel').val() == "Heat") {
            $('.energyLabel').append(' m3');
        }
        else {
            $('.energyLabel').append(' kW/h');
        }
        $('#sensorForm').show();
    }
 }

 function sendClassroomData() {
    event.preventDefault();
    var token = localStorage.getItem("token");
    var presence1 = "false";
    var presence2 = "false";
    var presence3 = "false";
    if ($('#presence1').is(":checked")){
        presence1 = "true";
    }
    if ($('#presence2').is(":checked")){
        presence2 = "true";
    }
    if ($('#presence3').is(":checked")){
        presence3 = "true";
    }
    var time1 = $('#classDate').val()+"-09:00:00";
    var time2 = $('#classDate').val()+"-12:00:00";
    var time3 = $('#classDate').val()+"-15:00:00";
    var data={
        "host": $('#classroom').val(),
        "presence1": presence1,
        "presence2": presence2,
        "presence3": presence3,
        "temperature1": $('#temperature1').val(),
        "temperature2": $('#temperature2').val(),
        "temperature3": $('#temperature3').val(),
        "time1": time1,
        "time2": time2,
        "time3": time3
    };
    $.ajax({
        type: "POST",
        url: "http://energyatschool.finmatica.eu/api/sendroomdata",
        headers: { 
            "Accept": "application/json",
            "Authorization": "JWT "+token
        },
        contentType: "application/json",
        data: JSON.stringify(data),
        async: false,
        success: function(response) {
            if ( response.error) {
                alert('An error occurred');
                location.reload();
            }
            else {
                window.location = "dashboard.html";
            }
        },
        error: function(response) {
            alert('An error occurred');
                location.reload();
        },
        dataType: "json"
      });
 }

 function sendSensorData () {
    event.preventDefault();
    var token = localStorage.getItem("token");
    var time1 = $('#date').val()+"-09:00:00";
    var time2 = $('#date').val()+"-12:00:00";
    var time3 = $('#date').val()+"-15:00:00";
    var data={
        "host": $('#sel').val(),
        "energy1": $('#energy1').val(),
        "energy2": $('#energy2').val(),
        "energy3": $('#energy3').val(),
        "time1": time1,
        "time2": time2,
        "time3": time3
    };
    $.ajax({
        type: "POST",
        url: "http://energyatschool.finmatica.eu/api/sendsensordata",
        headers: { 
            "Accept": "application/json",
            "Authorization": "JWT "+token
        },
        contentType: "application/json",
        data: JSON.stringify(data),
        async: false,
        success: function(response) {
            if ( response.error) {
                alert('An error occurred');
                location.reload();
            }
            else {
                window.location = "dashboard.html";
            }
        },
        error: function(response) {
            alert('An error occurred');
                location.reload();
        },
        dataType: "json"
      });
 }

 $( document ).ready(function() {
    $('#leaderBtn').on('click', function () {
        changeToLeaderboard();
    });
    $('#dashBtn').on('click', function () {
        changeToDashboard();
    });
    $('#editProfileBtn').on('click', function() {
        changeToEditProfile();
    });
    $('#logoutBtn').on('click', function() {
        logout();
    });
    $('#form').on('submit', function () {
        showForm();
    });
    $('#classForm').on('submit', function () {
        sendClassroomData();
    });
    $('#sensorForm').on('submit', function () {
        sendSensorData();
    });
});