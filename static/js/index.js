//$(player.a).css('width',800);


$('body').tooltip({
    selector: '.createdDiv'
});





//get iframe ready
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player, id = "gV6253ap0WU";

function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: id,
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
}

function onPlayerReady(event) {
    player.setPlaybackRate(1);
    initialize();
    //event.target.playVideo();
}

const youtube = [{"id": "gV6253ap0WU", "transcript" : [{"text":"Hey Tim (oh ah). Listen man I cut my hands really bad. Can I borrow some of your gauze?","time":18},{"text":"Help yourself. Thanks.","time":25},{"text":"(wrapping hands in gauze) (squirting caramel syrup into popcorn)","time":28},{"text":"Hey, what are you up to? Well, I'm making some caramel popcorn for my very own Tairy Greene film festival","time":33},{"text":"There's no movie theater here, where's the projector and all the films?","time":38},{"text":"Eric I don't need any of that stuff, cuz I've got (looks at camera), The Tairy Greene Machine.","time":41},{"text":"Here we go. That thing looks really cool Tim.","time":49},{"text":"The Tairy Greene Machine contains every movie, TV show, and public appearance that Tairy Greene ever made.","time":51},{"text":"Nice. Bullseye.","time":57},{"text":"That thing looks extremely complicated, I mean I can't even operate my VCR at home in my condo.","time":58},{"text":"Eric the Tairy Greene Machine is so easy to use even you can use it.","time":63},{"text":"Nice. You hit the nail on the head. Also looks like it requires tons of electricity.","time":67},{"text":"That's where you're completely wrong Eric. The Tairy Greene Machine operates with good old-fashioned American tap water.","time":71},{"text":"Nice. Bullseye.","time":76},{"text":"(Silence) Let me show you how it works. Right","time":78},{"text":"What we are gonna do is take this hose. And why don't you turn the water on. Mkay, it's on. Just connect this hose right up there to the Cinco proof faucet.","time":82},{"text":"Does it fit on here? Yeah that should should fit f-fine. Do you not. Come on. Let me try it. Alright, we got it, what's the next step?","time":90},{"text":"Alright, well we're gonna needa get that temperature to 75 degrees exactly or this boy won't turn on, so why don't you give me a little heat.","time":98},{"text":"That's too much, way way too much. The hot. It's all the way hot..on hot.","time":103},{"text":"Lose the heat, it's at a hundred degrees, add cool. Hot or Cold!? Hot hot hot.","time":107},{"text":"Okay take it off you're good.","time":112},{"text":"Alright don't do no' don't do nothing.","time":113},{"text":"That's it. Bullseye.","time":115},{"text":"There it is! Bullseye. Nice. We're ready to watch one of Tairy's finest films. Enjoy the movie.","time":117}]}];

function createSpan(content, time) {
    var span = document.createElement('span');
    if (time) {
        span.dataset.time = time;
        time = time + ": ";
    }
    else {
        time = "";
    }
    $(span).addClass("transcript-span");
    $(span).html(time + content + "<br />")
    $("#YTtranscript").append(span);
}

function showVal(newVal){
    state.slider = update("slider", newVal);
    if (newVal < 10)
        newVal = "&nbsp" + "&nbsp" + newVal;
    $("#slider").html(newVal);
}

var currentState = undefined;

function onPlayerStateChange(event) {
    playerStateChange(event);
    //1=player 2=paused 3=buffering
}

function playerStateChange(event) {
    state.currentPlayerState = update("currentPlayerState",event.data);

    //state.bwdcounter = update("resetneg1");
    //state.fwdcounter = update("reset1");
}

function update(obj, val) {
    //most of the ones with "return val" are bools being set
    switch(obj) {
        case "loopTime": return val;
            break;
        case "slider": return Number(val);
            break;
        case "cboxreplay": return !state.cboxreplay;
            break;
        case "cboxslider": return !state.cboxslider;
            break;
        case "currentTime": return player.getCurrentTime();
            break;
        //skip rate
        //video id
        case "listening": return val;
            break;
        case "sidebar": return val;
            break;
        case "lastclick": return val;
            break;
        case "preventInterval": return val;
            break;
        case "timeoutActive": return val;
            break;
        case "currentPlayerState": return val;
            break;
        case "increment": return val + 1;
            break;
        case "decrement": return val - 1;
            break;
        case "resetneg1": return -1;
            break;
        case "reset1": return 1;
            break;
        case "fullMode": return val;
            break;
        case "lastElementFocused": val === 1 ? "iframe" : "notiframe";
            break;
    }
}

var state = {
    loopTime: undefined,
    slider: undefined,
    cboxreplay: false,
    cboxslider: false,
    currentTime: 0,
    listening: true,
    sidebar: false,
    lastclick: undefined,
    preventInterval: true,
    timeoutActive: false,
    currentPlayerState: undefined,
    fwdcounter: 1,
    bwdcounter: -1,
    videoId: undefined,
    fullMode: false,
    lastElementFocused: undefined //can only be "iframe" or "notiframe"
}

function newTranscript(i) {
    youtube[i].transcript.forEach(function(AE) {
        createSpan(AE.text,AE.time);
    });

    $(".transcript-span").unbind("click");

    $(".transcript-span").click(function() {
        var time = $(this).data("time");
        player.seekTo(time);
        if (state.cboxreplay) {
            startLoop(time);
        }
    });
}

function hidesidebar() {
    $("#YTsearch").hide();
    $("#sidebar-ctrl").css("background-color","transparent");
    $("#arrow").removeClass("glyphicon-menu-right");
    $("#arrow").addClass("glyphicon-menu-left");
}

function showsidebar() {
    $("#YTsearch").show();
    $("#sidebar-ctrl").css("background-color","grey");
    $("#arrow").removeClass("glyphicon-menu-left");
    $("#arrow").addClass("glyphicon-menu-right");
    $("#search-terms").focus();
}

function initialize() {
    time();
    keyShortcuts();
    newYT("gV6253ap0WU")
    //newTranscript(0);

    $( "#resizable" ).resizable();

    //sidebar-ctrl click

    $("#search").submit(function(event) {
        event.preventDefault();
        console.log('here')
        var url = $("#url").val();
        if(url){
            var id = extract(url);
            if (id) {
                newYT(id);
            }
        }
        $("#url").val('');
    });

    $(".input-text").focus(function() {
        state.listening = update("listening",false);
    });

    $(".input-text").focusout(function() {
        state.listening = update("listening",true);
    });
    (function(){
        //don't fck with this click order
        $("#sidebar-ctrl").click(function() {
            if(!state.sidebar)
                    state.lastclick = update("lastclick", "YTsearch");
            if(state.sidebar) {
                state.lastclick = update("lastclick", "sidebar-ctrl");
            }
            if (state.sidebar) {
                state.sidebar = update("sidebar",false);
                hidesidebar();
            }
            else {
                state.sidebar = update("sidebar",true);
                showsidebar();
            }
        });//don't do it
        $("#YTsearch").click(function() {
            state.lastclick = update("lastclick","YTsearch");
        });//pls this order is important
        $(document).click(function() {
            if (state.sidebar && state.lastclick === "body") {
                state.sidebar = update("sidebar",false);
                hidesidebar();
            }
            if (state.lastclick != "sidebar-ctrl"){
                state.lastclick = update("lastclick","body");
            }
        });
    }())

    $("#YTsearch").css("display","initial");
    $("#YTsearch").hide();
    var ua = navigator.userAgent.toLowerCase();
    var isMobile = ua.indexOf("mobile") > -1;

    if (isMobile) {
        $("#YTtranscript").css("font-size","20px");
    }

    state.loopTime = update("loopTime",0);
    state.slider = update("slider",$("#length").val());
}

function startLoop(time) {
    if (time === undefined)
        time = player.getCurrentTime();

    state.loopTime = update("loopTime", time);

    function loop() {
        if (time === state.loopTime && state.cboxreplay) {
            if (state.currentTime >= state.loopTime + state.slider){
                //console.log(state.currentTime, state.loopTime, state.slider)
                player.seekTo(state.loopTime);
            }
            requestAnimationFrame(loop)
        }
    }
    loop();
}

function updateReplayBox() {
    state.cboxreplay = update('cboxreplay');
}

function time(){
    var now, fps=20, delta, interval = 1000/fps, then = Date.now();
    function updateTime() {
        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            state.currentTime = update("currentTime");
            state.preventInterval = update("preventInterval", true);
            then = now - (delta % interval);
        }
        requestAnimationFrame(updateTime);
    }
}

var lastElementFocused = undefined;

setInterval(function() {
    //
    if (state.preventInterval && state.fullMode) {
        //blurs iframe if focus is on iframe
        unfocusYT();
    }
    
    //requestAnimationFrame won't run if the window isn't active
    //this interval will do the looping job when it isn't active
    if (!state.preventInterval && state.cboxreplay && state.slider > 6) {
        state.currentTime = update("currentTime");
        if ((state.currentTime  + 3 >= state.loopTime + state.slider) && !state.timeoutActive){
            state.timeoutActive = update("timeoutActive",true);
            var time = state.loopTime + state.slider - state.currentTime;
            setTimeout(function(){
                if (!state.preventInterval) {
                    if (Math.abs(player.getCurrentTime() - state.loopTime) > 3){
                        console.log('here');
                        player.seekTo(state.loopTime);
                    }
                }
                state.timeoutActive = update("timeoutActive",false);
            }, time * 1000 - 600);
        }
    }

    state.preventInterval = update("preventInterval", false);
}, 1000);

function unfocusYT() {
    var element = document.activeElement;
    if (element instanceof HTMLIFrameElement) {
        state.lastElementFocused = update("lastElementFocused",1);
        element.blur();
    }
    else if (state.lastElementFocused === 'iframe') {
        state.lastElementFocused = update("lastElementFocused",2);
    }
}

function newYT(id) {//add second param (time)

    $("#YTtranscript").empty();
    var index = -1;
    youtube.some(function(AE, i) {
        if (id === AE.id) {
            index = i;
        }
        return index != -1;
    });
    if (index != -1) {
        $("#resizable").height("200px");
        newTranscript(index);
    }
    else {
        $("#resizable").height("30px");
        createSpan("no transcript to display");
    }

    //

    /*var path = window.location.href, location;
    path1 = path.lastIndexOf("/"), path2 = path.lastIndexOf("\\");
    var pathSys = Math.max(path1,path2);
    if (path1 > 0) {

    }
    path = path.substring(0, Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\")));
    window.location.href="http://localhost:8080/#idofvideo";*/
    player.cueVideoById({videoId:id});
    player.playVideo();
}


//function that comes before newYT
//call a function that only send id to newYT if it needs to load a new one
//this function will check state.videoId, url
//if both are blank of id then it will pass new id to newYT
//if id
    //newYT will check how to add id to url

//need to take id and change url
//need to detect url upon initialization and load video if id present
//just tack on a v=# with id of initial video
//


function extract(url) {
    var myregexp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/i;
    //pull id out of url
    if(myregexp.test(url)) {
        var start = url.indexOf("v="), id;
        if (start != -1)
            var end = (url).indexOf("&")
            if (end === -1)
                end = url.length;
            id = url.slice(url.indexOf("v=") + 2 , end);
        if (start === -1)
            id = url;
        if (/[a-zA-Z0-9_-]{11}/.test(id))
            return id;
        else {
            return false;
        }
    }
    //if it wasn't a url just assume it is an id
    return url;
}

function increment() {
    //5 digit max for display purposes
    var value = $("#length").prop('max');
    if (value < 99980) {
        $("#length").prop('max', Number(value) + 20 );
        $("#length").prop('min', Number(value) );
        showVal($("#length").val());

    }
}

function decrement() {
    var value = $("#length").prop('min');
    if (value > 0){
        $("#length").prop('min', Number(value) -20 );
        $("#length").prop('max', Number(value) );
        showVal($("#length").val());

    }
}

//add factor to state
function keyShortcuts() {
    var playBackState = 1, factor = 10, array = [.25,.5,1,1.25,1.5,2];
    document.addEventListener('keypress', function(event) {
        //if focus on input type text silence key listeners
        if(state.listening) {

            playBackState = player.getPlaybackRate();
            var speed = -10;
            //lower playback speed
            if (event.keyCode === 91 && playBackState > .25) {
                speed = array.indexOf(playBackState)-1;
                player.setPlaybackRate(array[speed]);
                playBackState = array[speed];
                setTimeout(function() {document.getElementById("consoleY").innerHTML = "Speed: " + playBackState + "x";}, 100);
            }
            //raise playback speed
            else if(event.keyCode === 93 && playBackState < 2) {
                speed = array.indexOf(playBackState)+1;
                player.setPlaybackRate(array[speed]);
                playBackState = array[speed];
                setTimeout(function() {document.getElementById("consoleY").innerHTML = "Speed: " + playBackState + "x";}, 100);
            }
            //x is skip rate
            var x = factor * playBackState;

            //'j' and 'l' are seek back and seek forward respectively
            //the pollution of code is to hold the state of counters
            if (event.keyCode === 106) {
                var count;
                if (state.currentPlayerState == 3) {
                    if (state.fwdcounter > 1) {
                        count = state.fwdcounter - 1;
                        state.fwdcounter = update("decrement",state.fwdcounter);
                    }
                    else {
                        state.bwdcounter = update("decrement",state.bwdcounter);
                        count = state.bwdcounter;
                    }
                }
                else {
                    state.bwdcounter = update("resetneg1");
                    state.fwdcounter = update("reset1");
                    count = state.bwdcounter;
                }
                player.seekTo(player.getCurrentTime() + x * count, true);
            }
            else if (event.keyCode === 108) {
                var count;
                if (state.currentPlayerState == 3) {
                    if (state.bwdcounter < -1) {
                        count = state.bwdcounter + 1;
                        state.bwdcounter = update("increment",state.bwdcounter);
                    }
                    else {
                        state.fwdcounter = update("increment",state.fwdcounter);
                        count = state.fwdcounter;
                    }
                }
                else {
                    state.bwdcounter = update("resetneg1");
                    state.fwdcounter = update("reset1");
                    count = state.fwdcounter;
                }
                player.seekTo(player.getCurrentTime() + x * count, true);
            }

            if (event.keyCode === 107) {
                //player.getPlayerState() 1=playing 2=paused
                var playerState = player.getPlayerState();
                if (playerState === 1) {
                    player.pauseVideo();
                }
                else if (playerState ===2) {
                    player.playVideo();
                }
            }

            if (event.keyCode === 45) {
                if (factor > 1){
                    factor --;
                    x = factor * playBackState;
                }
            }
            else if (event.keyCode === 61) {
                if (factor < 20) {
                    factor ++;
                    x = factor * playBackState;
                }
            }

            setTimeout(function() {document.getElementById("skipFactor").innerHTML = x + " seconds";}, 100);
        }
    });
}