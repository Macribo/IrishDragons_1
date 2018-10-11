$(document).ready(function () {
    console.log("Document ready.");

    $("#about").click(() => {
        $.ajax({
            url      : 'http://localhost:3000/about',
            type     : 'GET',
            dataType : 'JSON',
            contentType: 'application/json; charset=utf-8',
            success  : function (data) {
                
                $("#aboutInfo").append(data.about);
                $("#aboutInfo").show();
            },
            error    : function (xhr, status, error) {
                console.log(`
                    error   : ${error},
                    status  : ${status},
                    xhr     : ${JSON.stringify(xhr)}
                `);
            }
        
        });
    });

    $(".get-cards").click(() => {
        
    });

});