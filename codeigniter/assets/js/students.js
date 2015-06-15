$(document).ready(function() {
    /**
     * Populates the table by calling for the students information
     */
    $.getJSON("http://localhost/Sokikom/api/getStudents", function(jd) {
        var $tbody = $("#studentsTable");
        
        $.each(jd, function(key, value) {
            //id, user_name, password
            var $newRow = 
                "<tr>" +
                    "<td>" + value.id + "</td>" +
                    "<td>" + value.user_name + "</td>" +
                    "<td>" + value.password + "</td>" +
                "</tr>";
            $tbody.append($newRow);
        });
    });
    
    /**
     * Gets random user information from the random user api.
     * Updates every row with the new information and sends the data
     * to the server to update the database
     */
    $("#bt_randomize").click(function() {
        $(this).prop("disabled",true);
        $("#spinner").addClass("spinning");
        var newData = []; // WIll contain all the new data to save
        var users = []; // to save the random user info
        var rowCount = $("#studentsTable > tbody > tr").length;
        var promises = []; // Store every ajax call to random users
        for(var i = 0; i < rowCount; i++) {
            var request = $.ajax({
                url: 'http://api.randomuser.me/',
                dataType: 'json',
                success: function(data) {
                    var userInfo = data.results[0].user;
                    users.push(userInfo);
                }
            });
            promises.push(request);
        }
         
        // wait for every ajax call to finish and updates the table
        $.when.apply(null, promises).done(function(){
            var rowCount = 0;
            $("#studentsTable > tbody > tr").each(function() {
                var $row = $(this);
                var student = {};
                var userInfo = users[rowCount];
                var index = 0;
                $row.find('td').each (function() {
                    if(index === 0) {
                        student["id"] = $(this).text();
                    }
                    else if(index === 1) {
                        $(this).text(userInfo.username);
                        student["user_name"] = userInfo.username;
                    }
                    else if(index === 2) {
                        $(this).text(userInfo.password);
                        student["password"] = userInfo.password;
                    }
                    index++;
                }); 
                newData.push(student);
                rowCount++;
            });
            var newUsersJSON = JSON.stringify(newData);
            
            // This should be done after the next api call
            $("#spinner").removeClass("spinning");
            $("#bt_randomize").prop("disabled", false);
            
            // update the database
            $.ajax({
               type: "POST",
                url: "http://localhost/Sokikom/api/updateStudents",
                data: newUsersJSON,
                contentType: "application/json; charset=utf-8",
                dataType: "json"
            }).done(function(data) {
            });
        });
    });
});
