

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault("counter", 20);
  Session.setDefault("message", "Play");
  arrayOfColors = ['red','green','blue','navy','black','yellow','purple','pink'];
  duplicate = arrayOfColors.slice();
  dobbles = arrayOfColors.concat(duplicate);
  console.log('Colors :' + arrayOfColors);
  dobbles = shuffle(dobbles);
  Session.setDefault("colors", dobbles);
  console.log('Colors shuffeld:' + dobbles);

  Template.hello.helpers({
    counter: function () {
      return Session.get("counter");
    },
    message: function () {
      return Session.get("message");
    }
  });

   Template.random.helpers({
    colors: function () {
      console.log('getting colors');
      return Session.get("colors");
    }
  });

  Template.random.events({
    'click .square': function (event, template) {
      // increment the counter when button is clicked
      console.log(event);

      selected = $(event.target);
      isFound = selected.hasClass('Match');
            if(isFound){
              console.log('should return .. allready found');
              return;
            }

      first = $('.parent').find('.first');
      
      if(!first.length==0){
        console.log("second elemnt clicked");
        Session.set("counter", Session.get("counter") - 1); 
        gameOver = isGameOver();    
        compare(selected,first,gameOver);
        
        
      }else{
        console.log("first elemnt clicked");
        selected.addClass('first');
        showElement(selected);
      }  
    }
    
  });

  function isGameOver(){
    if(Session.get("counter")==0){
        console.log("Game Over");
        $('.parent').find('div').each(function(){
            showElement($(this));        
        });
        return true;
        }else return false;
  }

  function showElement(element){
    console.log('showElement');
    element.removeClass('square');
    element.addClass('showColorSquare');
  }

  function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
  }

  function compare(div1,div2,gameOver){
    console.log(div1.css( "background-color" )  + ' vs ' + div2.css( "background-color" ) );
    showElement(div1);
    if(div1.css( "background-color" )  == div2.css( "background-color" ) ){
      console.log('Match');
      div1.removeClass('first');
      div2.removeClass('first');
      div1.addClass('Match');
      div2.addClass('Match');
      if(haveWon()){
        Session.set("message", "Victory"); 
      }
      return;
    }else{
      if(gameOver){
        Session.set("message", "Looooooser"); 
        return;
      }

      hideAfter2sec(div1,div2);
    }
  }

  function haveWon(){
     won = true;
    $('.parent').find('div').each(function(){
            if(!$(this).hasClass('Match')){
                won = false;
            }   
        });
    return won;
  }

  function hideAfter2sec(div1,div2){
    console.log('hide');
    setTimeout(function () {
       div1.addClass('square');
       div1.removeClass('showColorSquare first');
       div2.addClass('square');
       div2.removeClass('showColorSquare first');
    }, 1000);
  }
}



if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
