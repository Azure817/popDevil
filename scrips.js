window.onload = () => {
    console.warn('我到現在還在想,我到底在衝三小?');
    var emu_container = document.querySelector("#emu_container");
    var emu = document.querySelector("#emu");
    var emu_pop = document.querySelector("#emu_pop");
    var pop_count = 0;
    var counter = document.querySelector("#counter");
    // var sound_effect = new Audio('./source/pop.mp3');
    var sound_effect = new Audio();
    var playlist = new Array('./source/A0.mp3','./source/A1.mp3','./source/A2.mp3','./source/A3.mp3');

    function pop() {
        playSound();
        emu.setAttribute("style","visibility: hidden;");
        emu_pop.setAttribute("style","visibility: unset;");
    }

    function unpop() {
        emu_pop.setAttribute("style","visibility: hidden;");
        emu.setAttribute("style","visibility: unset;");
    }

    var storage = {};
    storage.load = function () {
        var count = localStorage.getItem("pop_count");
        if (count !== null) {
            pop_count = parseInt(count);
            counter.innerHTML = pop_count;
        }
    };
    storage.save = function () {
        localStorage.setItem("pop_count", pop_count);
    }

    function isMobile() {
        try{ document.createEvent("TouchEvent"); return true; }
        catch(e){ return false;}
    }

    function playSound(){
        list_index=Math.floor(Math.random()*4);
        sound_effect.currentTime = 0;
        sound_effect.src =playlist[list_index];
        sound_effect.play();
    }

    function count_up() {
        pop_count++;
        counter.innerHTML = pop_count;
        storage.save();
    }

    storage.load();

    if (isMobile()) {
        window.addEventListener("touchmove",function(e) {
            e.preventDefault();
        }, { passive: false });
        emu.setAttribute("src","./source/close2.png");
        emu_container.addEventListener('touchstart', function (e) {
            count_up();
            pop();
        });
        emu_container.addEventListener('touchend', function (e) {
            unpop();
        });
    } else {
        emu_container.addEventListener('mouseover', function (e) {
            emu.setAttribute("src","./source/close2.png");
        });
        emu_container.addEventListener('mouseout', function (e) {
            emu.setAttribute("src","./source/close2.png");
        });

        //  點擊事件
        emu_container.addEventListener('mousedown', function (e) {
            count_up();
            pop();
        });
        emu_container.addEventListener('mouseup', function (e) {
            unpop();
        });

        //  鍵盤事件
        document.addEventListener('keydown', function (e) {
            pop();
        });
        document.addEventListener('keyup', function (e) {
            count_up();
            emu.setAttribute("src","./source/close2.png");
            unpop();
        });
    }
}