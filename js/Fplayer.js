window.onload = function () {
    // $(DOMid) 返回元素ID
    function $(id) {return typeof id === 'string'?document.getElementById(id):null;}
    //全局域变量声明
    var AfullScreen = true;
    var a = 1;

    //动态Dom声明
    var fplayer_control = document.createElement('div');
    var play = document.createElement('span');
    var duration = document.createElement('span');
    var progressBar = document.createElement('progress');
    var fullScreen = document.createElement('span');
    var volume = document.createElement('span');
    var speed = document.createElement('span');
    var volume_control_bar = document.createElement('progress');


    //标签属性样式声明
    fplayer_control.setAttribute('id','fplayer_control');
    play.setAttribute('id','play');
    play.setAttribute('class','fas fa-play');
    duration.setAttribute('id','duration');
    progressBar.setAttribute('id','progressBar');
    progressBar.setAttribute('max','100');
    progressBar.setAttribute('value','0');
    fullScreen.setAttribute('id','fullScreen');
    fullScreen.setAttribute('class','fas fa-expand'); //fas fa-compress
    volume.setAttribute('id','volume');
    volume.setAttribute('class','fas fa-volume-up');
    speed.setAttribute('id','speed');
    speed.setAttribute('class','fas fa-tachometer-alt');
    volume_control_bar.setAttribute('id','volume_control_bar');


    $('fplayer').appendChild(fplayer_control);
    $('fplayer').style.position = 'relative';
    $('fplayer').style.overflow = 'hidden';

    $('video').style.width = '100%';
    $('video').style.height = '100%';
    $('video').style.background = '#000';

    $('fplayer_control').style.position = 'absolute';
    $('fplayer_control').style.height = '55px';
    $('fplayer_control').style.width = '100%';
    $('fplayer_control').style.bottom = '0';
    $('fplayer_control').style.background = 'linear-gradient(rgba(255,255,255,0),rgba(51,51,51,0.9)';
    $('fplayer_control').style.display = 'none';

    $('fplayer_control').appendChild(play);
    $('play').style.position = 'absolute';
    $('play').style.color = '#fff';
    $('play').style.fontSize = '25px';
    $('play').style.lineHeight = '55px';
    $('play').style.left = '30px';

    $('fplayer_control').appendChild(duration);
    $('duration').style.position = 'absolute';
    $('duration').style.color = '#fff';
    $('duration').style.lineHeight = '55px';
    $('duration').style.left = '80px';
    $('duration').innerText = '00:00 / ' + s_to_hs(parseInt($('video').duration));

    $('fplayer_control').appendChild(progressBar);
    $('progressBar').style.position = 'absolute';
    $('progressBar').style.height = '5px';
    $('progressBar').style.width = '100%';
    $('progressBar').style.top = '5px';
    $('progressBar').style.background = 'rgba(204,204,204,0.5)';
    $('progressBar').style.border = '0';

    $('fplayer_control').appendChild(fullScreen);
    $('fullScreen').style.position = 'absolute';
    $('fullScreen').style.color = '#fff';
    $('fullScreen').style.fontSize = '25px';
    $('fullScreen').style.lineHeight = '55px';
    $('fullScreen').style.right = '30px';

    $('fplayer_control').appendChild(volume);
    $('volume').style.position = 'absolute';
    $('volume').style.color = '#fff';
    $('volume').style.fontSize = '25px';
    $('volume').style.lineHeight = '55px';
    $('volume').style.right = '200px';

    $('fplayer_control').appendChild(speed);
    $('speed').style.position = 'absolute';
    $('speed').style.color = '#fff';
    $('speed').style.fontSize = '25px';
    $('speed').style.lineHeight = '55px';
    $('speed').style.right = '270px';

    $('fplayer_control').appendChild(volume_control_bar);
    $('volume_control_bar').style.position = 'absolute';
    $('volume_control_bar').style.width = '100px';
    $('volume_control_bar').style.height = '5px';
    $('volume_control_bar').style.top = '25px';
    $('volume_control_bar').style.right = '90px';
    $('volume_control_bar').style.border = '0';
    $('volume_control_bar').style.background = '#ffffff';

    //以上应该封装个函数进行创建 。。。。下个版本再说吧

    //事件处理
    //.禁用鼠标右键行为
    $('fplayer').oncontextmenu = function(e) {
        //事件对象 左键--button属性=1，右键button属性=2
        if(e.button == 2) {
            e.preventDefault();
        }
    };
    //.播放暂停行为
    $('play').onclick = function () {
        if ($('video').paused){
            $('video').play();
            $('play').setAttribute('class','fas fa-pause');
        }else{
            $('video').pause();
            $('play').setAttribute('class','fas fa-play');
        }
    };
    //.全屏模式切换
    $('fullScreen').onclick = function () {
        if (AfullScreen){
            AfullScreen = !AfullScreen;
            if($('fplayer').requestFullscreen){
                $('fplayer').requestFullscreen();
            }else if($('fplayer').mozRequestFullScreen) {
                $('fplayer').mozRequestFullScreen();
            }else if($('fplayer').webkitRequestFullScreen){
                $('fplayer').webkitRequestFullScreen();
            }
            $('fullScreen').setAttribute('class','fas fa-compress');
        }else{
            AfullScreen = !AfullScreen;
            if (document.exitFullscreen){
                document.exitFullscreen();
            } else if (document.mozCancelFullScreen){
                document.mozCancelFullScreen();
            }else if(document.webkitCancelFullScreen){
                document.webkitCancelFullScreen();
            }
            $('fullScreen').setAttribute('class','fas fa-expand');
        }
    };
    //.播放进度
    $('video').ontimeupdate = function () {
        var currTime = this.currentTime, //当前播放时间
            durtion = this.duration; //视频总长度
        var pre = currTime / durtion * 100;
        progressBar.setAttribute('value',pre);
        $('duration').innerText = s_to_hs(parseInt($('video').currentTime)) + ' / ' + s_to_hs(parseInt($('video').duration));
    };
    //.进度条控制播放
    $('progressBar').onclick = function (e) {
        var event = e || window.event;
        $('video').currentTime = (event.offsetX / this.offsetWidth) * $('video').duration;
    };
    //.播放完毕还原
    video.onended = function () {
        $('play').setAttribute('class','fas fa-play');
        progressBar.setAttribute('value','0');
        $('duration').innerText = '00:00 / ' + s_to_hs(parseInt($('video').duration));
        this.currentTime = 0;
    };
    //工具栏显示监听
    //.鼠标移入
    $('fplayer').onmouseover = function () {
        $('fplayer_control').style.display = 'block';
    };
    //.鼠标移出
    $('fplayer').onmouseout = function () {
        $('fplayer_control').style.display = 'none';
    };
    //音量改变监听
    $('volume_control_bar').onclick = function (e) {
        e = e || window.event;
        var a = e.offsetX / this.offsetWidth;
        $('video').volume = a;
        this.setAttribute('value', a );
    };
    //速度改变
    $('speed').onclick = function () {
        if(a == 1){
            $('video').playbackRate = a;
            a = 1.25;
        }else if(a == 1.25){
            $('video').playbackRate = a;
            a = 1.5;
        }else if(a == 1.5){
            $('video').playbackRate = a;
            a = 2;
        }else if(a == 2){
            $('video').playbackRate = a;
            a = 0.5;
        }else if(a == 0.5){
            $('video').playbackRate = a;
            a = 1;
        }
    };
    //秒转换
    function s_to_hs(s){
        var h;
        h  =   Math.floor(s/60);
        s  =   s % 60;
        h    +=    '';
        s    +=    '';
        h  =   (h.length==1)?'0'+h:h;
        s  =   (s.length==1)?'0'+s:s;
        return h+':'+s;
    }
};