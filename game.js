(function() {
  window.RPS = {
    
    started : false,
    userChoice : 0,
    cpuChoice : 0,
    
    // outcomes in string value
    outcomes : ['rock', 'paper', 'scissors'],

    // cached nodes
    userHand : document.getElementById('userHand'),
    userScore : document.getElementById('userScore'),
    
    cpuHand : document.getElementById('cpuHand'),
    cpuScore : document.getElementById('cpuScore'),
    
    msgBox : document.getElementById('messageBox'),
    go : document.getElementById('go'),
    
    // menus
    menus : [
      document.getElementById('mainMenu'),
      document.getElementById('rules'),
      document.getElementById('credits'),
      document.getElementById('gameBoard')
    ],
    
    // initialization
    startGame : function(n) {
      RPS.showMenu(RPS.menus.length - 1);
      if (!RPS.started) {
        RPS.started = true;
        n.innerHTML = 'Resume';
        window.setTimeout(function() {
          RPS.write('Welcome !', 'Choose your weapon in the top left hand corner ; Rock, Paper, or Scissors. When you\'re ready click the "GO" button to begin an epic battle !', 10000);
        }, 1);
      }
    },
    
    // show the specified menu from the RPS.menus array
    showMenu : function(index) {
      if (!index) index = 0;
      
      for (var i = 0, j = RPS.menus.length; i < j; i++) RPS.menus[i].style.display = i == index ? 'block' : 'none';
    },
    
    // change the user's weapon
    switchChoice : function(index) {
      var choice = document.getElementById('userChoice').getElementsByTagName('DIV');
      
      choice[RPS.userChoice].className = choice[RPS.userChoice].className.replace(/chosen/, '');
      choice[RPS.userChoice = index].className += ' chosen';
    },
    
    // change the hand icons
    handsTo : function(str) {
      RPS.userHand.innerHTML = '<i class="fa fa-hand-' + str + '-o"></i>';
      RPS.cpuHand.innerHTML = '<i class="fa fa-hand-' + str + '-o"></i>';
    },
    
    // begin the 4 second countdown
    shuffle : function() {
      if (/inactive/.test(RPS.go.className)) return false;
      
      window.clearTimeout(RPS.message);
      RPS.msgBox.className = 'out';
      
      RPS.go.className += ' inactive';
      RPS.userHand.className = 'shuffle';
      RPS.cpuHand.className = 'shuffle';
      
      RPS.handsTo('rock');
      
      RPS.write('ROCK !', '', 700, 1);
      window.setTimeout(function() {
        RPS.write('PAPER !', '', 700, 1);
        RPS.handsTo('paper');
        
        window.setTimeout(function() {
          RPS.write('SCISSORS !', '', 700, 1);
          RPS.handsTo('scissors');
        
          window.setTimeout(function() {
            RPS.write('SHOOT !', '', 700, 1);
            RPS.handsTo('rock');
            window.setTimeout(RPS.shoot, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    },
    
    // shoot your weapons and discover the victor !
    shoot : function() {
      RPS.cpuChoice = Math.floor(Math.random() * 3); // cpu chooses at the last minute.. >.>
      
      RPS.go.className = RPS.go.className.replace(/inactive/, '');
      RPS.userHand.className = '';
      RPS.cpuHand.className = '';
      
      RPS.userHand.innerHTML = '<i class="fa fa-hand-' + RPS.outcomes[RPS.userChoice] + '-o"></i>';
      RPS.cpuHand.innerHTML = '<i class="fa fa-hand-' + RPS.outcomes[RPS.cpuChoice] + '-o"></i>';
      
      // conditional outcome chain
      if (RPS.userChoice == RPS.cpuChoice) { // draw
        RPS.write('DRAW !', 'You both drew the same weapon !', 6000);
      } else if (RPS.userChoice == 0) { // rock
      
        if (RPS.cpuChoice == 2) {
          RPS.write('YOU WIN !', 'You slam your Rock into the CPU\'s Scissors, breaking them !', 6000);
          RPS.userScore.innerHTML = ++RPS.userScore.innerHTML;
        } else {
          RPS.write('YOU LOSE !', 'The CPU covers your Rock with its Paper !', 6000);
          RPS.cpuScore.innerHTML = ++RPS.cpuScore.innerHTML;
        }
        
      } else if (RPS.userChoice == 1) { // paper
      
        if (RPS.cpuChoice == 0) {
          RPS.write('YOU WIN !', 'You cover the CPU\'s Rock with your Paper !', 6000);
          RPS.userScore.innerHTML = ++RPS.userScore.innerHTML;
        } else {
          RPS.write('YOU LOSE !', 'The CPU cuts your Paper in half with its Scissors !', 6000);
          RPS.cpuScore.innerHTML = ++RPS.cpuScore.innerHTML;
        }
        
      } else if (RPS.userChoice == 2) { // scissors
      
        if (RPS.cpuChoice == 1) {
          RPS.write('YOU WIN !', 'You cut the CPU\'s Paper in half with your Scissors !', 6000);
          RPS.userScore.innerHTML = ++RPS.userScore.innerHTML;
        } else {
          RPS.write('YOU LOSE !', 'The CPU slams its Rock into your Scissors, breaking them !', 6000);
          RPS.cpuScore.innerHTML = ++RPS.cpuScore.innerHTML;
        }
        
      }
      
    },
    
    // write a notification / message into the game
    writing : false,
    write : function(title, message, duration, hideMenu) {
      if (RPS.writing) window.clearTimeout(RPS.message);
      
      RPS.msgBox.innerHTML = '<h3 class="menuTitle">' + title + '</h3>' + '<p>' + message + '</p>';
      RPS.msgBox.className = hideMenu ? 'hideMenu' : '';
      RPS.writing = true;
      
      RPS.message = window.setTimeout(function() {
        RPS.msgBox.className = hideMenu ? 'hideMenu out' : 'out';
        RPS.writing = false;
      }, duration);
    }
    
  };
}());
