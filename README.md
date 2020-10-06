# player

### Project Description
This project displays a simple guided learning frontend engine, that can run on google.com, using JsonP, jQuery, and JavaScript.
main files are:
1. player.js - the project main script
2. player_tests.js - basic tests in order to validate the solution.
Clicking on the "Back" button should display the previous tip (except for the first tip, for it the button is disabled).
Clicking on the "Next" button should display the next tip (except fot the last tip, in this case clicking on the "next" button will close the tips). 
Clicking on the "X" button will close the tips. 

### SetUp Instructions
1. Adding jQuery: 
  In the Chrome DevTools Console, add the following: 
  var script = document.createElement('script');script.src = "https://code.jquery.com/jquery-3.4.1.min.js";
  document.getElementsByTagName('head')[0].appendChild(script);
  It might take a few seconds to see it is okay. If it is okay, the console output for this command will be:
  <a href="https://imgbb.com/"><img src="https://i.ibb.co/gdYQXnp/Capture.png" alt="Capture" border="0"></a>
2. Running the code:
   There are two options- 
   a. 1. copy and paste the content of the player.js file
      2. press "Enter" to run it
   b. 1. in the "Sources" tab of the console, choose "Snippets", create a new one and copy the player.js file content to there.
      2. press Ctrl+Enter to run it. 
   Now tips should appear, and in the log the following message should be displayed: "done reading player.js!". 
   *** clicking on the bottons is also possible using the console:
   1. To click on the 'Next' button : write in the console - $("#NextBt").click();
   2. To click on the 'Back' button : write in the console - $("#PrevBt").click();
   3. To click on the 'Close' button : write in the console - $("#CloseBt").click();
3. Running the tests:
  There are two options- 
   a. 1. copy and paste the content of the player_tests.js file
      2. press "Enter" to run it
   b. 1. in the "source" tab of the console, choose "snippets", create a new one and copy the player_tests.js file content to there.
      2. press Ctrl+Enter to run it. 
   If the all of the tests have passed, the console will display the message "All of the tests had passed!!!", and the tips should disappear. Otherwise, it will display the message 
   "Some tests had failed. See notes above." (and there will be more log messages to display where the error occured). 
  
  * using the Snippets should look like this:
  
  <a href="https://imgbb.com/"><img src="https://i.ibb.co/jDqjCk4/Capture.png" alt="Capture" border="0"></a>
  
  Thank you!
  
  
  
