$(document).ready(function () {
    console.log("Document ready.");

    // List of available cards to be used
    var cards = [];

    // Specific defense and attack cards to be store
    var attackCard = null;
    var defenseCard = null;

    // Adding an event Listener to the card div.
    // When the div is pressed, this will be triggered
    document.addEventListener('click', function (event) {
        if (event.target.matches('.card-image')) {
            let data_id = event.target.getAttribute('data-id');
            let id = $("img").parent().attr("id");
            setCard(data_id);


            // Moving to the next available card
            // $("#carousel-card-choose").carousel('next');
            // If everything works, the tag is removed.
            // $("#"+id).remove();

            $(".carousel-inner").remove();

            // Reloading the list of available cards
            showListOfCards(cards);
        }
    });

    //  This function uploads the list of available cards
    function showListOfCards(cards) {

        // Creating the carousel div
        let carouselDiv = document.createElement("div");

        // Giving the class name
        carouselDiv.className = "carousel-inner";

        // If the array has more than one element, only the first is active
        if (cards.length > 1) {
            for (var i = 0; i < cards.length; i++) {

                // Creation of the div tag
                let cardDiv = document.createElement('div');

                // Class name of the div. Only the first one is active at the beggining
                if (i === 0)
                    cardDiv.className = 'item active';
                else
                    cardDiv.className = 'item';

                let n = i + 1;

                // Setting the data-id of the card as data id for future use
                cardDiv.setAttribute("data-id", cards[i].id);

                // Setting the id of the card
                cardDiv.setAttribute("id", "card-" + n);

                // creating now an image tag
                let imageTag = document.createElement('img');

                // Setting the class data
                imageTag.setAttribute("class", "d-block w-100 card-image");

                // Setting the source of the image
                imageTag.setAttribute("src", cards[i].image);

                // Setting the title
                imageTag.setAttribute("title", cards[i].name);

                // Setting the id of the card as data id for future use
                imageTag.setAttribute("data-id", cards[i].id);

                // Appending the image to this card Div
                cardDiv.append(imageTag);

                // Appending the card Div to the carousel Div
                carouselDiv.append(cardDiv);
            }
        } else {
            // Creation of the div tag
            let cardDiv = document.createElement('div');

            // Class name of the div. 
            cardDiv.className = 'item active';

            // Setting the id of the card as data id for future use
            cardDiv.setAttribute("data-id", cards[0].id);

            // creating now an image tag
            let imageTag = document.createElement('img');

            // Setting the class data
            imageTag.setAttribute("class", "d-block w-100 card-image");

            // Setting the source of the image
            imageTag.setAttribute("src", cards[0].image);

            // Setting the title
            imageTag.setAttribute("title", cards[0].name);

            // Setting the id of the card as data id for future use
            imageTag.setAttribute("data-id", cards[0].id);

            // Appending the image to this card Div
            cardDiv.append(imageTag);

            // Appending the card Div to the carousel Div
            carouselDiv.append(cardDiv);
        }
        // Appending the carousel Div to the slide Div
        $("#carousel-card-choose").append(carouselDiv);
    }

    // This function sets the card on one of the slots (attack or defense)
    function setCard(id) {
        // If the defense card is already occupied (meaning the attack card also),
        // then no insertion is made
        let defenseCard = $(".defenseCard").html();
        if (defenseCard === "") {
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].id === id) {
                    // Creation of the div tag
                    // let cardDiv = document.createElement('div');

                    // Class name of the div. Only the first one is active at the beggining
                    // cardDiv.className = 'item';

                    // Setting the id of the card as data id for future use
                    // cardDiv.setAttribute("data-id", cards[i].id);

                    // creating now an image tag
                    let imageTag = document.createElement('img');

                    // Setting the class data
                    imageTag.setAttribute("class", "d-block w-100 equip-card");

                    // Setting the source of the image
                    imageTag.setAttribute("src", cards[i].image);

                    // Setting the title
                    imageTag.setAttribute("title", cards[i].name);

                    // Appending the image to this card Div
                    // cardDiv.append(imageTag);


                    // Appending the item to the specific card type
                    if ($(".attackCard").html() !== "")
                        $(".defenseCard").append(imageTag);
                    else
                        $(".attackCard").append(imageTag);

                    // Removing the card from the list of cards
                    // cards.pop(cards[i]);
                    cards.splice(i, 1);
                    break;
                }
            }
        }
    }

    // This function removes the card from one of the weapon cards
    // and puts it back to the array of available cards
    function removeCard(id) {
        let data_id = $("data-id").val();
        let card_name = $("title").val();
        let image = $("src").val();

        var newCard = {
            id: data_id,
            name: card_name,
            image: image
        }

        // Putting the card on the array
        cards.push(newCard);

        // Removing the card tag from the the corresponding div
        $("").remove();

    }

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
        let cardType = $("#cardType").val(); // Getting the card type
        let cardLevel = $("#cardLevel").val(); // Getting the card level



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

                    // Uploading the list of cards
                    showListOfCards(cards);


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

                // This div will be hidden and the other bellow shown
                $('.gamediv2').fadeOut().queue(function () {

                    $('.equipCardDiv').removeClass("hidden").dequeue();
                });


                // Uploading the list of cards
                showListOfCards(cards);

            }

        });


        // Disabling the button that called all of this
        $("#btnEquipCards").attr("disabled", true);
        $("#btnEquipCards").fadeOut();

        event.preventDefault(); //do not run the default action

    });


    /*
        $(".card-image").click(function () {
            attackCard = $('data-id').val();
            for (let i = 0; i < cards.length; i++) {
                if (cards[i].id == attackCard) {
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
                    
                    // Appending the item to the attack card
                    $(".attackCard").append(); 
                    // Removing the card from the list of cards
                    cards.pop(cards[i]);
                }
            }
        });
       */

    /*
        +++++++++++++++++++++++ NEXT TO DO ++++++++++++++++++++++++++++++++
        /*
    .o88b.  .d88b.  .88b  d88. d8888b.  .d8b.  d888888b
   d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D d8'` 8b `~~88~~'
   8P      88    88 88  88  88 88oooY' 88ooo88    88
   8b      88    88 88  88  88 88~~~b. 88~~~88    88
   Y8b  d8 `8b  d8' 88  88  88 88   8D 88   88    88
    `Y88P'`  Y88P'  YP  YP  YP Y8888P' YP   YP    YP
   resolve round 1:
   if playerAttackCard > enemyDefense
   { playerRoundScore ++
   resolveRound2()}
   if playerAttackCard<enemyDefenseCard
   { playerRoundScore --
   resolveRound2()}
if playerAttackCard===enemyDefenseCard
   {
   resolveRound2()}
   resolve round 2:
if playerDefenseCard > enemyAttackCard
   { playerRoundScore ++
   endCombat()}
else    if playerDefenseCard < enemyAttackCard
   { playerRoundScore --
   endCombat()}
else if
playerAttackCard===enemyDefenseCard
   {
  endCombat()}
  function endCombat(){
   if playerScore <=0
   player has lost the battle!
   attackCard = null;
   defenseCard = null;
   $(combatdiv).hide();
       if playerScore <0
   player has won the battle!
   attackCard = null;
   defenseCard = null;
   $(combatdiv).hide();
   */

});