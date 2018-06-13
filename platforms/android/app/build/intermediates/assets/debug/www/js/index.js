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
        if ((localStorage.getItem("user") != null) && (localStorage.getItem("password") != null)) {
            $("#user").val(localStorage.getItem("user"));
            $("#psw").val(localStorage.getItem("password"));
            cacheFlag = 1;
        }
    },

    receivedEvent: function(id) {
    }
};

app.initialize();

var cacheFlag = 0;
var id;
var password;

function changePage (data) {
    var numberOfSensors = 0;
    localStorage.setItem("token", data.token);
    sessionStorage.setItem("classlist", data.classlist);
    for (var i in data.sensors) {
        sessionStorage.setItem("name"+i, data.sensors[i].name);
        numberOfSensors = numberOfSensors + 1;
    }
    sessionStorage.setItem("numberOfSensors", numberOfSensors);
    window.location = "dashboard.html";
};

function cleanCache() {
    if (confirm("Are you sure you want to delete saved credentials?")) {
        localStorage.removeItem("user");
        localStorage.removeItem("password");
        location.reload();
    }
};

function Error() {
    alert("Wrong credentials, try again");
};

function login(){
    event.preventDefault();
        id = $("#user").val();
        password = $("#psw").val();
    var data={"user": id, "password": password};
    $.ajax({
        type: "POST",
        headers: { 
            'Accept': 'application/json',
            'Content-Type': 'application/json' 
        },
        url: "http://energyatschool.finmatica.eu/api/login",
        data: JSON.stringify(data),
        async: true,
        success: function (response) {
            if (response.error == undefined) {
                if (cacheFlag == 0) {
                    if (confirm("Want to remember credentials?")) {
                        localStorage.setItem("user", $("#user").val());
                        localStorage.setItem("password", $("#psw").val());
                        cacheFlag = 1;
                    }
                }
                changePage(response);
            }
            else  {
                Error();
            }
        },
        dataType: "json"
    });
}

$( document ).ready(function() {
    $('#form').on('submit', function () {
        login();
    });
    $('#cleanCache').on('click', function() {
        cleanCache();
    });
});