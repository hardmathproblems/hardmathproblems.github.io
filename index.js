function duolingoAlert(){
    alert('Be Warned...');
    alert('This Is A Point Of No Return...');
};

function figureItOut(){
    $('#figure-it-out').html('Womp Womp');
    setTimeout(() => {
        $('#figure-it-out').html('Or Just Make One?');
    }, 2500)
};

function teacherMode(){
    $('#games-area').css('display', 'none')
};

function hidePopup(){
    $('.popup').css('z-index', '-1')
};