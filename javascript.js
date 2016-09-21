

$(document).ready(function(){
  var cursor = $("#cursor");
  var terminalLine = $("#terminal-line");
  //var terminal = $("#terminal");
  var level = "computer";
  var challenge = "cd";
  var moveCount = 0;
  var url = "https://github.com/fake/Assignments.git";

  console.log("Jquery has loaded");
  terminalLine.keypress(function(event) {
    if (event.keyCode == '13') {
        console.log("Enter");
        //Evaluate command
        evaluateCommand(terminalLine.val());
        //Append line above
        var newLine = $("<li></li>");
        newLine.append(cursor.text() + " " + terminalLine.val());
        $("#lines").append(newLine);
        //Clear input
        terminalLine.val("");
    }
  });
  var instructions = {
    ins1 : function(){
      console.log("Updating instructions");
      $("#instructions").html("Use the command line to navigate to the 'Assignments' folder");
      $("#hint").html("Use 'cd desktop' then 'cd Assignments' <span>or</span> 'cd desktop/Assignments'");
    },
    ins2 : function(){
      console.log("Updating instructions");
      $("#instructions").html("Create a new Git Repository in the 'Assignments' folder");
      $("#hint").html("Use 'git init'");
    },
    ins3 : function(){
      console.log("Updating instructions");
      $("#instructions").html("Add the existing files to the staging area of the new repository");
      $("#hint").html("Use 'git add . ' <span>or</span> 'git add + filename'");
    },
    ins4 : function(){
      console.log("Updating instructions");
      $("#instructions").html("Commit the staged files to the repository");
      $("#hint").html("Use 'git commit -m'");
    },
    ins5 : function(){
      console.log("Updating instructions");
      $("#instructions").html("Set the origin as the remote repository on your GitHub account: <span>https://github.com/fake/Assignments.git</span> (you can copy and paste link)");
      $("#hint").html("Use 'git remote add origin https://github.com/fake/Assignments.git'");
    },
    ins6 : function(){
      console.log("Updating instructions");
      $("#instructions").html("Push your local repository to the Master branch of your GitHub repository");
      $("#hint").html("Use 'git push -u origin master' <span>or</span> 'git push origin master'");
    },
    ins7 : function(){
      console.log("Updating instructions");
      $("#instructions").html("Sucsess!");
      $("#hint").html("Nice Job!");
    },
  }
  var commands = {
    cd : function(value){
      if(value[1] === "desktop" && level === "computer"){
        level = "desktop";
        changeLevel();
      }
      else if (value[1] === "desktop/Assignments" && level === "computer") {
        level = "assignments";
        changeLevel();
        challenge = "git";
        instructions.ins2();
      }
      else if (value[1] === "Assignments" && level === "desktop") {
        level = "assignments";
        changeLevel();
        challenge = "git";
        instructions.ins2();
      }
      else{
        terminalLine.val("No such file or directory");
      }
    },
    git : function(value){
      if(value[1] === "init"){
        console.log("repo");
        $("#repository").addClass("visible");
        level = "add";
        instructions.ins3();
      }
      else if (value[1] === level && level === "add") {
        if(value[2] === "."){
          $(".file").transition({ x: '310px', y: '100px' });
          level = "commit"
          instructions.ins4();
        }
        else{
          $(".file").each(function(){
            if(value[2] === $(this).attr("id")){
              $(this).transition({ x: '310px', y: '100px' });
              moveCount += 1;
            }
          })
          if(moveCount === 3){
            level = "commit"
            instructions.ins4();
          }
          else if (moveCount) {
          }
          else{
            terminalLine.val("No such file or directory");
          }
        }
      }
      else if (value[1] === level && level === "commit") {
        console.log("commit");
        if (value[2] !== "-m"){
          terminalLine.val("Remember to add a message with -m");
        }
        else{
          console.log("commiting files");
          $(".file").transition({ x: '620px' })
          level = "remote"
          instructions.ins5();
        }
      }
      else if (value[1] === level && level === "remote"){
        if(value[2] + " " + value[3] + " " + value[4] === "add origin https://github.com/fake/Assignments.git"){
          level = "push";
          instructions.ins6();
          $("#git-hub").transition({ x: '-900px', opacity: 1 }, 1000, 'ease');
          $("#git-hub h2").transition({ opacity: 1, delay: 1000 });
        }
        else{
          terminalLine.val("Invalid remote repository");
        }
      }
      else if (value[1] === level && level === "push"){
        if(value[2] + " " + value[3] + " " + value[4] === "-u origin master" || value[2] + " " + value[3] === "origin master"){
          $(".file").addClass("heavenly-light");
          $(".file").transition({ y: '-170px', opacity: .1 }, 3000, 'ease');
          level = "complete"
          instructions.ins7();
          console.log("complete");
        }
        else{
          terminalLine.val("Invalid push command");
        }
      }
      else{
        console.log("Invalid git command");
        terminalLine.val("Wrong command. Try again.");
      }
    }
  }

  function evaluateCommand(value){
    var cmdArray = value.split(" ");
    if(cmdArray[0] === challenge){
      console.log("command is good");
      commands[challenge](cmdArray);
    }
    else{
      console.log("Command not Found");
      terminalLine.val("Command not found");
    }
  }

  function changeLevel(){
    var levelId = "#" + level;
    $(".outline").removeClass("outline");
    $(levelId).addClass("outline");
    $("#line-level").text(level);
  }
});
