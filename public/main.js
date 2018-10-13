$(document).ready(function () {
    console.log("Document ready.");

    var cards = [];

    $("#about").click(() => {


        $.ajax({
            url: 'http://localhost:3000/about',
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {

                $("#aboutInfo").html(data[0].about);
                console.log('about', data[0].about);
                console.log('about', data);
                $("#aboutInfo").show();
            },
            error: function (xhr, status, error) {
                console.log(`
                    error   : ${error},
                    status  : ${status},
                    xhr     : ${JSON.stringify(xhr)}
                `);
            }

        });
    });

    $(".get-cards").click(() => {
        let cardType = $("#cardType").val();
        let cardLevel = $("#cardLevel").val();

        var params = {
            type: cardType,
            level: cardLevel
        };

        // After getting the options, this is sent to the server as parameters
        $.ajax({
            // The right request URL
            url: "http://localhost:3000/cards?type=" + cardType + "&level=" + cardLevel,
            // The type of request
            type: 'GET',
            // Here is where the parameters are put
            data: "JSON",
            // The data type
            dataType: 'JSON',
            // The content type, since we are now dealing with JSON files
            contentType: 'application/json',
            beforeSend: function (jqXHR, settings) {
                $('p.status-message').html('Getting your cards...');
            },
            success: function (data) {
                $('p.status-message').empty();

                if (data.length === 0)
                    alert("You don't have this type of cards with at the selected level.");
                else {
                    data.forEach(card => {
                        cards.push(card);
                    });

                    $("#invetory").fadeOut();
                    // $("#firstCard")
                    // $(".equipCardDiv").fadeIn();


                    if (cards.length > 1) {
                        for (var i = 0; i < cards.length; i++) {

                            let cardDiv = document.createElement('div');

                            // Class name of the div. Only the first one is active at the beggining
                            if (i === 0)
                                cardDiv.className = 'item active';
                            else
                                cardDiv.className = 'item';

                            // Setting the id of the card as data id for future use
                            cardDiv.setAttribute("data-id", cards[i].id);

                            // creating now an image tag
                            let imageTag = document.createElement('img');

                            // Setting the class data
                            imageTag.setAttribute("class", "d-block w-100");

                            // Setting the source of the image
                            imageTag.setAttribute("src", cards[i].image);

                            // Setting the title
                            imageTag.setAttribute("title", cards[i].name);

                            // Appending the image to this card Div
                            cardDiv.append(imageTag);

                            // Appending the Div to the carousel Div
                            $(".carousel-inner").append(cardDiv);
                        }
                    } else {
                        let cardDiv = document.createElement('div');

                        // Class name of the div. 
                        cardDiv.className = 'item active';

                        // Setting the id of the card as data id for future use
                        cardDiv.setAttribute("data-id", cards[i].id);

                        // creating now an image tag
                        let imageTag = document.createElement('img');

                        // Setting the class data
                        imageTag.setAttribute("class", "d-block w-100");

                        // Setting the source of the image
                        imageTag.setAttribute("src", cards[i].image);

                        // Setting the title
                        imageTag.setAttribute("title", cards[i].name);

                        // Appending the image to this card Div
                        cardDiv.append(imageTag);

                        // Appending the Div to the carousel Div
                        $(".carousel-inner").append(cardDiv);
                    }
                }
            }
        });

        event.preventDefault(); //do not run the default action

    });


    $("#btnEquipCards").click(() => {
        $.ajax({
            url: "http://localhost:3000/initcards",
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json',
            success: function (data) {
                cards = [];
                data.forEach(card => {
                    cards.push(card);

                });
                for (var i = 0; i < cards.length; i++) {

                    let cardDiv = document.createElement('div');

                    // Class name of the div. Only the first one is active at the beggining
                    if (i === 0)
                        cardDiv.className = 'item active';
                    else
                        cardDiv.className = 'item';

                    // Setting the id of the card as data id for future use
                    cardDiv.setAttribute("data-id", cards[i].id);

                    // creating now an image tag
                    let imageTag = document.createElement('img');

                    // Setting the class data
                    imageTag.setAttribute("class", "d-block w-100");

                    // Setting the source of the image
                    imageTag.setAttribute("src", cards[i].image);

                    // Setting the title
                    imageTag.setAttribute("title", cards[i].name);

                    // Appending the image to this card Div
                    cardDiv.append(imageTag);

                    // Appending the Div to the carousel Div
                    $(".carousel-inner").append(cardDiv);
                }

            }

        });

    });
});