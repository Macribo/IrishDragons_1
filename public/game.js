$(document).ready(function () {
    console.log('Document is loaded.');

    //fade in splash screen:
    setTimeout(function () {
        $('h1').animate({
            opacity: 1
        });
        setTimeout(function () {
            $('.buttonMenu').animate({
                opacity: 1


            });

        }, 1000);
    }, 250);

    //start game music:
    var themeTuneIntro = new Audio("./audio/GoT8bit1.mp3");
    themeTuneIntro.play();
    themeTuneIntro.addEventListener('ended', function () {
        this.currentTime = 0;
        this.play();
    }, false);


    //start game:
    $('#play').click(function () {
        console.log("start game!");
        $('#play').fadeOut();
        $('#about').fadeOut();
        $('.about-info').fadeOut();
        $('.gamediv1').fadeOut().queue(function () {
            themeTune.play();
            themeTuneIntro.pause();
            themeTune.addEventListener('ended', function () {
                this.currentTime = 0;
                this.play();
            }, false);
            $('.gamediv2').removeClass("hidden").dequeue();
        });



    });

    //switch to game main tune:
    var themeTune = new Audio("./audio/GoT8bit.mp3");


    //see 'about' document:
    $("#about").click(() => {
        $.ajax({
            url: 'http://localhost:3000/about',
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {
                $('h1').animate({
                    opacity: 0.3
                });
                $("#aboutInfo").append(data.about);
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





    //game div 2 is active:

    $('#btn-right').click(function () {

        console.log("btn right is clicked");

        $('#hero').animate({
            left: '50%'
        });
        setTimeout(function () {
            console.log("time!");
            $('#enemy1').animate({
                top: '38%'
            })
        }, 500);
        setTimeout(function () {
            $('.btnEquipCards').fadeIn();
            $('#btnEquipCards').removeClass("hidden");
        }, 1250);


    });

    $('#btnEquipCards').click(function () {
        console.log("equip cards btn clicked");
        var attackCard = null;
        var defenseCard = null;
        $('.bottomMask').fadeOut();
        $('.gamediv2').fadeOut().queue(function () {

            $('.equipCardDiv').removeClass("hidden").dequeue();
        });


    });


    //card selector active:
    $("#carousel-card-choose").attr("data-ride", "carousel");
    $("#carousel-card-choose").carousel({
        interval: false
    });

    $('#card-btn-right').click(function () {
        console.log("next card");
        $("#carousel-card-choose").carousel('prev');

    });

    $('#card-btn-left').click(function () {
        console.log("next card");
        $("#carousel-card-choose").carousel('next');

    });

    $("#carousel-card-choose").click(function () {
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
                $(".attackCard").append();
            }
        }

    });

    //card selector active:
    $("#carousel-card-choose").attr("data-id", "carousel");
    $("#carousel-card-choose").carousel({
        interval: false
    });


    $('#card-btn-right').click(function () {
        console.log("next card");
        $("#carousel-card-choose").carousel('prev');

    });


    $('#card-btn-left').click(function () {
        console.log("previous card");
        $("#carousel-card-choose").carousel('next');

    });

    //temp card selector 
    $('#glass').click(function () {

        $('.equipCardDiv').fadeOut();
        startCombat();

    });

});

function startCombat() {
    let playerScore = 0;
    let enemyScore = 0;
    $('.combatMode').removeClass('hidden');
    console.log("start combat!");

    setTimeout(function () {
        $('#enemyDefendCard').animate({
            left: '52%',

        });
        $('#playerAttackCard').animate({
            left: '30%'
        });

        $('#battleText').fadeOut();
        setTimeout(function () {
            $('#playerAttackCard').fadeOut();
            $('#enemyDefendCard').fadeOut();

        }, 1000);

    }, 1200);

    setTimeout(function () {
        $('#battleText').html("Round 2");

        $('#battleText').fadeIn();


    }, 3000)
    setTimeout(function () {
        round2();
    }, 3000)
}

function round2() {
    setTimeout(function () {
        $('#battleText').html("Player wins!");

        $('#battleText').fadeIn();
    }, 3000);
    setTimeout(function () {
        $('#enemyAttackCard').animate({
            left: '52%',

        });
        $('#playerDefendCard').animate({
            left: '30%'
        });

        $('#battleText').fadeOut();
        setTimeout(function () {
            $('#playerDefendCard').fadeOut();
            $('#enemyAttackCard').fadeOut();

        }, 1000);


    }, 1200);
    console.log("round2");
}