$(document).ready(function() {
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
    
    $("#bt_randomize").click(function() {
        var newData = [];
        var users = [];
        var rowCount = $("#studentsTable > tbody > tr").length;
        var promises = [];
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
