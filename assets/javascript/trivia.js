var questions = [{
            ques: "In what decade is the Netflix original series set?",
            ans: ["1990s", "1980s", "1970s", "1960s"],
            correct: "1980s",
            name: "decade"
        },
        {
            ques: "Where does the story occur?",
            ans: ["Kansas", "Indiana", "Mississippi", "Oklahoma"],
            correct: "Indiana",
            name: "location"
        },
        {
            ques: "What is the name of the game that the boys are always playing?",
            ans: ["Dungeons and Dragons", "Super Mario Bros.", "The Legend of Zelda", "Pac-Man"],
            correct: "Dungeons and Dragons",
            name: "game"
        },
        {
            ques: "El's favorite food is ___________",
            ans: ["Eggos", "Twinkies", "Pop-Tarts", "Nutter Butter"],
            correct: "Eggos",
            name: "food"
        },
        {
            ques: "How does Joyce communicate with her son Will when he is taken?",
            ans: ["Painting on the walls", "Through sensory deprivation", "With Christmas lights", "Through a mirror"],
            correct: "With Christmas lights",
            name: "communicate"
        },
        {
            ques: "What is the parallel dimension inhabited by the Demogorgon referred to?",
            ans: ["The Butterfly Effect", "The Dark World", "The Other Place", "The Upside Down"],
            correct: "The Upside Down",
            name: "dimension"
        },
        {
            ques: "What do the boys dress up as at school for Halloween?",
            ans: ["Star Wars Characters", "Ghostbusters", "Dungeons and Dragons Characters", "They don't dress up"],
            correct: "California",
            name: "halloween"
        },
        {
            ques: "Who does Dustin dance with at the Snow Ball?",
            ans: ["Lucas' Sister", "Nancy", "Eleven", "Max"],
            correct: "Nancy",
            name: "dance"
        },
        {
            ques: "Where is the gate to the Upside Down?",
            ans: ["At the Byers' house", "At Hopper's cabin in the woods", "In the underground tunnels beneath the pumpkin patch", "Hawkins Lab"],
            correct: "Hawkins Lab",
            name: "gate"
        },
        {
            ques: "Who created the show?",
            ans: ["The Duffer Brothers", "M. Night Shyamalan", "Steven Spielberg", "Stephen King"],
            correct: "The Duffer Brothers",
            name: "creators"
        },
        {
            ques: "Who beats the high score at the game 'Dig Dug' in the arcade?",
            ans: ["Will", "Dustin", "Lucas", "Mad Max"],
            correct: "Mad Max",
            name: "arcade"
        }
    ] // end questions object


$(".container").hide();
$('#results').hide();

// click to start the display questions
var startGame = $("#start-btn").on('click', function() {
    play();
    $("#start").fadeOut(400).hide();
    $(".container").fadeIn(400).show();
    countdown(60);
    questionDisplay();
});

// function for displaying questions
var questionDisplay = function() {
    $(".questions :not('#submit')").empty();
    // loops through the questions 
    for (var j = 0; j < questions.length; j++) {
        var questionDiv = "<div class='displayQues'>" + (j+1) + ". " + questions[j].ques + "</div>";
        $('.questions').append(questionDiv);

        // loops through answers for each radio button
        for (var i = 0; i <= 3; i++) {
            var answerButton = '<input type="radio" name="' + questions[j].name + '" value="' + questions[j].ans[i] + '"/>' + questions[j].ans[i];
            $('.questions').append(answerButton);
        }
    }
}


// function for countdown timer
var countdown = function(seconds) {

    var timer = setInterval(function() {
        seconds--;
        $("#time-remain").html(seconds);

        if (seconds <= 0) {
            $('.container').fadeOut(400).hide();
            var correctAnswers = 0;
            var wrongAnswers = 0;
            var unAnswered = 0;

            // loop through correctArray & radioName to match html elements & answers
            for (var i = 0; i < questions.length; i++) {

                if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {
                    correctAnswers++;
                } else if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === undefined) {
                    unAnswered++;
                } else {
                    wrongAnswers++;
                }

            };

            $('#correct').append('<span>' + correctAnswers + '</span>');
            $('#wrong').append('<span>' + wrongAnswers + '</span>');
            $('#unanswered').append('<span>' + unAnswered + '</span>');
            $('#results').show();

            // alert("Times Up!");
            clearInterval(timer);
            return;
        }
    }, 1000);

    // click event for submit button to stop timer
    $('#submit').on('click', function() {
        clearInterval(timer);
    })
}; // end countdown


// function to grade quiz once submit button is clicked
var gradeQuiz = $('#submit').on('click', function() {

    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unAnswered = 0;

    // loop through correctArray & radioName to match html elements & answers
    for (var i = 0; i < questions.length; i++) {

        if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct) {
            correctAnswers++;
        } else if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === undefined) {
            unAnswered++;
        } else {
            wrongAnswers++;
        }

    };

    // once submit is clicked...
    // tests
    // stop timer
    countdown();

    // fade out questions
    $('.container').fadeOut(400).hide();
    $('#results').fadeIn(400).show();
    $('#correct').append('<span>' + correctAnswers + '</span>');
    $('#wrong').append('<span>' + wrongAnswers + '</span>');
    $('#unanswered').append('<span>' + unAnswered + '</span>');

});


var play = function () {
    var audio = "<audio autoplay='autoplay'><source src='assets/audio/theme.mp3' type='audio/mpeg'></audio>";
    $("#audio").html(audio);
}