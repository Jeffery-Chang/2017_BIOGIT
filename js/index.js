window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame   ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function( callback ){
        window.setTimeout(callback, 1000 / 60);
    };
})();
(function(){
    var indexCtrl = new Vue({
        el: '#indexPage',
        data: {
            menuHeader: false,
            goldFG: false, goldStep: 1,
            purpleFG: false, purpleStep: 1,
            switchCnt: 2,
            actFG: false,
            priFG: false,
            gaV3: true, gaV5: true, gaV6: true,
            goldData:{ name: '', phone: '', address: '', gift: 'A' },
            purpleData:{ name: '', phone: '', address: '', gift: 'B' }
        },
        created: function () {
            window.addEventListener('scroll', this.ctrlScroll);
        },
        beforeMount: function(){
            if(isMobile.phone) this.switchCnt = 2;
        },
        mounted: function(){
            var $this = this;
            window.onload = function(){
                $this.initKV();
                //$this.initEasy();
                $this.initPatent();
                if(!isMobile.phone) $this.initFamous();
                $this.initProduct();
                $this.initForm();

                gapage('homepage');
            }
        },
        methods: {
            ctrlScroll: function(){
                var winTop = window.scrollY || document.documentElement.scrollTop;
                this.menuHeader = (winTop > document.querySelector('.index').offsetHeight - 100) ? true : false;
                (this.menuHeader) ? document.querySelector('header').classList.add('show') : document.querySelector('header').classList.remove('show');

                var hdHeight = document.getElementsByTagName('header')[0].offsetHeight;
                var hdObj = document.querySelector('.wrap');
                var hdMargin = (isMobile.phone) ? '40px' : '80px';
                hdObj.style.marginTop = (this.menuHeader == true) ? hdMargin : '';

                var div3offest = document.querySelector('.famous').offsetTop - document.querySelector('.famous').offsetHeight;
                if(this.gaV3 == true && winTop > div3offest){
                    gapage('V3');
                    this.gaV3 = false;
                }
            },
            setOverFlow: function(){
                document.body.style.cssText = (this.goldFG == true || this.purpleFG == true || this.actFG == true) ? 'overflow-y: hidden' : '';
            },
            moveToPdt: function(){
                var pos = document.querySelector('.bg_2').offsetTop;
                this.scrollToY(pos, 500);
                if(isMobile.phone) document.querySelector('.menuToggle input').click();

                gaclick('product');
            },
            initKV: function(){
                // mobile不做泡泡進場
                if(!isMobile.phone){
                    var bubble1 = document.querySelectorAll('.one');
                    var bubble2 = document.querySelectorAll('.two');
                    var bubbleAll = document.querySelectorAll('.one, .two');
                    var bubbleDelay = ['.1', '.3', '.2', '.5', '.1'];
                    var bubbleDuration = ['2', '1.75', '2.25', '2', '1.75'];
                    /*var bubbleDelay = ['.1', '.75'];
                    var bubbleDuration = ['2.25', '1.75'];
                    var bubbleClass = ['floatDown', 'floatUp'];*/

                    var oneTween = TweenMax.to(bubble1, .5,{
                        opacity: 1,
                        scale: 1,
                        //delay: 1.25,
                        delay: .25,
                        paused: true
                    });
                    var twoTween = TweenMax.to(bubble2, .5,{
                        opacity: 1,
                        scale: 1,
                        //delay: 1.5,
                        delay: .5,
                        paused: true,
                        onComplete: function(){
                            for (var i = 0; i < bubbleAll.length; i++) {
                                bubbleAll[i].style.opacity = '1';
                                bubbleAll[i].style.transform = 'scale(1)';
                                bubbleAll[i].style.animation = 'floatDown '+bubbleDuration[i]+'s ease infinite';
                                bubbleAll[i].style.animationDelay = bubbleDelay[i]+'s';
                            }
                        }
                    });
                    oneTween.play();
                    twoTween.play();
                }

                // kv進場
                /*var wow = new WOW({
                    boxClass: 'index_kv',
                    callback: function(box) {
                        if(!isMobile.phone) oneTween.play();
                        if(!isMobile.phone) twoTween.play();
                    }
                }).init();*/
            },
            initEasy: function(){
                var word = document.querySelectorAll('.easy h1 p img, .easy h1 span, .easy h2 img');
                var bubbleArr = document.querySelectorAll('.bubble_block li p');
                var bubble = [bubbleArr[3], bubbleArr[2], bubbleArr[1], bubbleArr[0]];

                // 文字跟泡泡做成動畫lite
                var wordTween = new TimelineMax({ paused: true });
                var step1 = TweenMax.staggerTo(word, .5, {
                    opacity: 1,
                    y: 0,
                    delay: .5
                }, .2);
                var step2 = TweenMax.staggerTo(bubble, .5, {
                    scale: 1
                }, .2);
                wordTween.add(step1);
                wordTween.add(step2);

                TweenMax.set(word, { y: -50 });

                // easy進場
                var wow = new WOW({
                    boxClass: 'easy_kv',
                    offset: 200,
                    callback: function(box) {
                        wordTween.play();
                        gapage('V1');
                    }
                }).init();
            },
            initPatent: function(){
                var word = document.querySelectorAll('.text_block h1, .text_block h2, .text_block h3, .text_block .video');
                var boxName = (isMobile.phone) ? 'patent_kv_m' : 'patent_kv_pc';
                var video = document.querySelector('.text_block .video');

                TweenMax.set(word, { opacity: 0, y: -50 });
                WAMediaBox.bindAll(video);

                // patent進場
                var wow = new WOW({
                    boxClass: boxName,
                    offset: 200,
                    delay: .5,
                    callback: function(box) {
                        gapage('V2');
                        TweenMax.staggerTo(word, .5, {
                            opacity: 1,
                            y: 0
                        }, .2, function(){
                            TweenMax.set(word, { clearProps:"all" });
                        });
                    }
                }).init();
            },
            initFamous: function(){
                const prev = document.querySelector('.switch_block .pre');
                const next = document.querySelector('.switch_block .next');
                const mySiema = new Siema({
                    selector: '.switch_block ul',
                    duration: 500,
                    easing: 'ease',
                    perPage: 3,
                    startIndex: 0,
                    draggable: true,
                    multipleDrag: true,
                    threshold: 20,
                    loop: true,
                    onInit: () => {},
                    onChange: () => {},
                });
                prev.addEventListener('click', () => mySiema.prev(3));
                next.addEventListener('click', () => mySiema.next(3));

                setInterval(function(){
                    mySiema.next(3);
                }, 5000);
            },
            initProduct: function(){
                var title = document.querySelector('.pdt_block h1 img');
                title.classList.add('product_kv');
                title.classList.add('fadeInDown');
                title.setAttribute('data-wow-duration', '.5s');
                if(!isMobile.phone){
                    var section1 = document.querySelector('.cut_block.c_1');
                    var section2 = document.querySelector('.cut_block.c_2');
                    var pdtIcon = document.querySelector('.pdt_block .triggle img');
                    var gold = document.querySelector('.pdt_block .gold img');
                    var goldBubble = document.querySelector('.pdt_block .bubble_gold img');
                    var goldBoard = document.querySelectorAll('.cut_block.c_2 .board_gold');
                    var purple = document.querySelector('.pdt_block .purple img');
                    var purpleBubble = document.querySelector('.pdt_block .bubble_purple img');
                    var purpleBoard = document.querySelectorAll('.cut_block.c_2 .board_purple');
                    var pdtTween = new TimelineMax({ paused: true, delay: .5 });
                    var step1 = TweenMax.to(pdtIcon, .75,{
                        scale: 1,
                        delay: .25
                    });
                    var step2 = TweenMax.to([gold, purple], .75,{
                        opacity: 1,
                        x: 0,
                        delay: .25
                    });
                    var step3 = TweenMax.to([goldBubble, purpleBubble], .75,{
                        opacity: 1,
                        x: 0,
                        y: 0,
                        scale: 1,
                        delay: .25
                    });
                    var step4 = TweenMax.to(section1, .75,{
                        opacity: 0,
                        delay: .75,
                        onComplete: function(){
                            TweenMax.set(section1, { display: 'none' });
                            TweenMax.set(section2, { display: 'block' });
                        }
                    });
                    var step5 = TweenMax.to(section2, .75,{
                        opacity: 1
                    });
                    var step6 = TweenMax.to([goldBoard, purpleBoard], .75,{
                        opacity: 1,
                        x: 0
                    });
                    pdtTween.add(step1);
                    pdtTween.add(step2);
                    pdtTween.add(step3);
                    pdtTween.add(step4);
                    pdtTween.add(step5);
                    pdtTween.add(step6);

                    TweenMax.set(pdtIcon, { scale: 0 });
                    TweenMax.set([gold, purpleBoard], { opacity: 0, x: -50 });
                    TweenMax.set([purple, goldBoard], { opacity: 0, x: 50 });
                    TweenMax.set(goldBubble, { opacity: 0, x: 75, y: 75, scale: .5 });
                    TweenMax.set(purpleBubble, { opacity: 0, x: -100, y: -100, scale: .5 });
                    TweenMax.set(section2, { opacity: 0 });

                    // product進場
                    var wow = new WOW({
                        boxClass: 'product_kv',
                        offset: 300,
                        delay: .1,
                        callback: function(box) {
                            gapage('V4');
                            pdtTween.play();
                        }
                    }).init();
                }else{
                    var gbox = document.querySelector('.pdt_block .gold_block');
                    var pbox = document.querySelector('.pdt_block .purple_block');
                    var gimgbox = document.querySelectorAll('.pdt_block .m_pdtBlock .open')[0];
                    var pimgbox = document.querySelectorAll('.pdt_block .m_pdtBlock .open')[1];

                    gbox.classList.add('product_kv_g');
                    gbox.classList.add('fadeInDownSmall');
                    gbox.setAttribute('data-wow-duration', '.5s');
                    pbox.classList.add('product_kv_p');
                    pbox.setAttribute('data-wow-duration', '.5s');
                    pbox.classList.add('fadeInDownSmall');

                    TweenMax.set([gimgbox, pimgbox], { height: 0, overflow: 'hidden' });

                    // product進場
                    var wow = new WOW({
                        boxClass: 'product_kv',
                        offset: 300,
                        delay: .1,
                        callback: function(box) {
                            gapage('V4');
                        }
                    }).init();
                    var wow = new WOW({
                        boxClass: 'product_kv_g',
                        offset: 300,
                        delay: .1
                    }).init();
                    var wow = new WOW({
                        boxClass: 'product_kv_p',
                        offset: 300,
                        delay: .1
                    }).init();
                }
            },
            initForm: function(){
                var $this = this;
                var h1 = document.querySelector('.lottery h1 img');
                var h2 = document.querySelector('.lottery h2');
                var h3 = document.querySelector('.lottery h3');
                var box = document.querySelector('.lottery .choose_block');
                var gbox = document.querySelector('.lottery .gold_box img');
                var pbox = document.querySelector('.lottery .purple_box img');
                var formTween = new TimelineMax({ paused: true, delay: .55 });
                var step1 = TweenMax.to(box, .5,{
                    opacity: 1
                });
                var step2 = TweenMax.to([gbox, pbox], .5,{
                    opacity: 1,
                    x: 0,
                });
                formTween.add(step1);
                formTween.add(step2);

                TweenMax.set([box, gbox, pbox], { opacity: 0 });
                TweenMax.set(gbox, { x: -50 });
                TweenMax.set(pbox, { x: 50 });
                h1.classList.add('form_kv');
                h1.classList.add('fadeInDown');
                h1.setAttribute('data-wow-duration', '1s');
                h2.classList.add('form_kv');
                h2.classList.add('fadeInDown');
                h2.setAttribute('data-wow-duration', '1s');
                h3.classList.add('form_kv');
                h3.classList.add('fadeInDown');
                h3.setAttribute('data-wow-duration', '1s');

                // form進場
                var wow = new WOW({
                    boxClass: 'form_kv',
                    offset: 300,
                    delay: .1,
                    callback: function(box) {
                        if($this.gaV5 == true){
                            gapage('V5');
                            $this.gaV5 = false;
                            formTween.play();
                        }
                    }
                }).init();
            },
            disAct: function(evt){
                evt.preventDefault();
                this.actFG = true;
                this.$nextTick(function(){
                    if(this.gaV6 == true){
                        gapage('V6');
                        this.gaV6 = false;
                    }
                });
                gaclick('rule');
            },
            disImg: function(evt, type){
                evt.preventDefault();
                var ctrlBox = (type === 'gold') ? document.querySelectorAll('.pdt_block .m_pdtBlock .open')[0] : document.querySelectorAll('.pdt_block .m_pdtBlock .open')[1];
                var refHeight = (type === 'gold') ? document.querySelectorAll('.pdt_block .m_pdtBlock .open img')[0].offsetHeight : document.querySelectorAll('.pdt_block .m_pdtBlock .open img')[1].offsetHeight;

                TweenMax.to(ctrlBox, .5,{
                    height: (ctrlBox.offsetHeight === 0) ? refHeight : 0 + 'px'
                });

                (type === 'gold') ? gaclick('gold') :  gaclick('bounce');
            },
            sendShare: function(evt){
                evt.preventDefault();
                var date = new Date();
                var year = date.getFullYear().toString();
                var month = (date.getMonth()+1).toString();
                var day = ((date.getDate() < 10) ? '0' : '') + date.getDate().toString();
                var urlDate = year + month + day;
                this.shareFB(location.href, '?back=1&v='+urlDate);
            },
            sendData: function(evt, type){
                if(evt) evt.preventDefault();
                var err = '';
                var read = false;
                var senddata = '';

                if(type === 'gold'){
                    read = document.getElementById("checkbox").checked;
                    if (!CH.checktxt(this.goldData.name)) err += "請填寫您的姓名\n";
                    if (!CH.isValidCell(this.goldData.phone)) err += "請填寫10碼的手機號碼(格式 0912345678)\n";
                    if (!CH.checktxt(this.goldData.address)) err += "請填寫您的地址\n";
                    if(!read) err += "請詳閱個人資料授權並同意";
                    senddata = this.goldData;
                }else if(type === 'purple'){
                    read = document.getElementById("checkbox_2").checked;
                    if (!CH.checktxt(this.purpleData.name)) err += "請填寫您的姓名\n";
                    if (!CH.isValidCell(this.purpleData.phone)) err += "請填寫10碼的手機號碼(格式 0912345678)\n";
                    if (!CH.checktxt(this.purpleData.address)) err += "請填寫您的地址\n";
                    if(!read) err += "請詳閱個人資料授權並同意";
                    senddata = this.purpleData;
                }

                if(err.length > 0) {
                    alert(err);
                    return;
                }

                axios({
                    method: 'post',
                    url: 'https://bioessence.webgene.com.tw/api/Send_User',
                    data: senddata
                }).then((response) => {
                    console.log(response);

                    if(response.data.status === '200'){
                        if(type === 'gold'){
                            this.goldStep = 2;
                            gaclick('biogoldenter');
                        }else if(type === 'purple'){
                            this.purpleStep = 2;
                            gaclick('biobounceenter');
                        }
                    }else if(response.data.status === '110'){
                        if(type === 'gold'){
                            this.goldStep = 3;
                            gaclick('biogoldenter');
                        }else if(type === 'purple'){
                            this.purpleStep = 3;
                            gaclick('biobounceenter');
                        }
                    }else{
                        alert('資料傳送錯誤，請重新再試！');
                    }
                });
            },
            shareFB: function(url, track){
                var fb_url = (isMobile.phone) ? 'http://m.facebook.com/sharer.php?u=' : 'http://www.facebook.com/sharer.php?u=';
                var fbBack_url = (track) ? track : '';
                var share_u;
                share_u = url + fbBack_url;
                window.open(fb_url + encodeURIComponent(share_u), 'sharer', 'toolbar=0,status=0,width=656,height=436');
            },
            scrollToY: function(scrollTargetY, speed, easing){
                var scrollY = window.scrollY || document.documentElement.scrollTop,
                    scrollTargetY = scrollTargetY || 0,
                    speed = speed || 2000,
                    easing = easing || 'easeOutSine',
                    currentTime = 0;
                var time = Math.max(.1, Math.min(Math.abs(scrollY - scrollTargetY) / speed, .8));
                var easingEquations = {
                    easeOutSine: function (pos) {
                        return Math.sin(pos * (Math.PI / 2));
                    },
                    easeInOutSine: function (pos) {
                        return (-0.5 * (Math.cos(Math.PI * pos) - 1));
                    },
                    easeInOutQuint: function (pos) {
                        if ((pos /= 0.5) < 1) {
                            return 0.5 * Math.pow(pos, 5);
                        }
                        return 0.5 * (Math.pow((pos - 2), 5) + 2);
                    }
                };
                function tick() {
                    currentTime += 1 / 60;
                    var p = currentTime / time;
                    var t = easingEquations[easing](p);

                    if (p < 1) {
                        requestAnimFrame(tick);
                        window.scrollTo(0, scrollY + ((scrollTargetY - scrollY) * t));
                    } else {
                        window.scrollTo(0, scrollTargetY);
                    }
                }
                tick();
            }
        },
        destroyed: function () {
            window.removeEventListener('scroll', this.ctrlScroll);
        },
        watch:{
            goldFG: 'setOverFlow',
            purpleFG: 'setOverFlow',
            actFG: 'setOverFlow',
            priFG: 'setOverFlow'
        }
    });
})();