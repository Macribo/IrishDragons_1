$(document).ready(function () {
    console.log('Document is loaded.');

$('#play').click(function(){
    console.log("start game!");
    $('.gamediv1').fadeOut().queue(function() {
        
        $( '.gamediv2' ).removeClass( "hidden" ).dequeue();
      });
        
   

});

    $("#about").click(() => {
        $.ajax({
            url: 'http://localhost:3000/about',
            type: 'GET',
            dataType: 'JSON',
            contentType: 'application/json; charset=utf-8',
            success: function (data) {

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


/*
 .o88b.  .d88b.  .88b  d88. d8888b.  .d8b.  d888888b 
d8P  Y8 .8P  Y8. 88'YbdP`88 88  `8D d8' `8b `~~88~~' 
8P      88    88 88  88  88 88oooY' 88ooo88    88    
8b      88    88 88  88  88 88~~~b. 88~~~88    88    
Y8b  d8 `8b  d8' 88  88  88 88   8D 88   88    88    
 `Y88P'  `Y88P'  YP  YP  YP Y8888P' YP   YP    YP    
*/
let cards =["rock1","paper1","scissors1"];
// let playerCard= selectedAttack;
// beginCombat(playerCard, enemyCard);

// function beginCombat(playerCard, enemyCard){




//game div 2 is active:

$('#btn-right').click(function(){

    console.log("btn right is clicked");

    $('#hero').animate({left: '50%'});
    setTimeout(function(){console.log("time!")
        $('#enemy1').animate({top:'16%'})},500);
        $('#btnEquipCards').removeClass("hidden");
});

$('#btnEquipCards').click(function(){
    console.log("equip cards btn clicked");

    $('.gamediv2').fadeOut().queue(function() {
        
        $( '.equipCardDiv' ).removeClass( "hidden" ).dequeue();
      });
        
  
});


//card selector active:
$("#carousel-card-choose").attr("data-ride","carousel");
$("#carousel-card-choose").carousel({interval:false});

$('#card-btn-right').click(function(){
    console.log("next card");
    $("#carousel-card-choose").carousel('prev');

});

$('#card-btn-left').click(function(){
    console.log("next card");
    $("#carousel-card-choose").carousel('next');

})



});