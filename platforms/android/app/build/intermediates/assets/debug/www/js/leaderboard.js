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

var labels = ['school01', 'school02', 'school03', 'school04', 'school05', 'school06', 'school07', 'school08', 'school09', 'school10'];

var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        // to do:    initilize labels
        var ctx = $("#myChart");
        var myBarChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Score',
                    backgroundColor: ['rgba(4,0,115,0.9)', 'rgba(4,0,115,0.8)', 'rgba(4,0,115,0.7)', 'rgba(4,0,115,0.6)', 'rgba(4,0,115,0.5)', 'rgba(4,0,115,0.4)', 'rgba(4,0,115,0.3)', 'rgba(4,0,115,0.2)'],
                    borderColor: 'rgba(4,0,115,1)',
                    borderWidth: 1,
                    data: [920, 890, 850, 800, 770, 765, 730, 698, 640, 200]
                    }],
            },
            options: {
                scales: {
                    xAxes: [{
                        stacked: true
                    }],
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            fontSize: 14
                        }
                    }]
                }
            }   
        });
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

function logout () {
    window.location = "index.html";
}

function changeToAddMeasure () {
    window.location = "addMeasure.html";
}

$( document ).ready(function() {
    $('#dashBtn').on('click', function () {
        changeToDashboard();
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