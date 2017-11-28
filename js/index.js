(function(){
    var indexCtrl = new Vue({
        el: '#indexPage',
        data: {
            menuFG: false
        },
        created: function () {
            window.addEventListener('scroll', this.ctrlScroll);
            // window.addEventListener('resize', this.ctrlScroll);
        },
        beforeMount: function(){

        },
        mounted: function(){
            this.initKV();
        },
        methods: {
            ctrlScroll: function(){
                this.menuFG = (window.scrollY > 0) ? true : false;
            },
            initKV: function(){
                // kv進場
                var wow = new WOW({
                    boxClass: 'index_kv',
                    animateClass: 'animated',
                    offset: 0,
                    callback: function(box) {

                    }
                }).init();

                // mobile不做泡泡進場
                if(!isMobile.phone){
                    var bubble1 = document.querySelectorAll('.one');
                    var bubble2 = document.querySelectorAll('.two');
                    var bubbleAll = document.querySelectorAll('.one, .two');
                    var bubbleDelay = ['.1', '.3', '.2', '.5', '.1'];
                    var bubbleDuration = ['2', '1.75', '2.25', '2', '1.75'];
                    TweenMax.from(bubble1, .5,{
                        scale: 0,
                        delay: 1,
                        onComplete: function(){
                            TweenMax.set(bubble1, { clearProps:"all" });
                        }
                    });
                    TweenMax.from(bubble2, .5,{
                        scale: 0,
                        delay: 1.25,
                        onComplete: function(){
                            TweenMax.set(bubble2, { clearProps:"all" });
                            for (var i = 0; i < bubbleAll.length; i++) { 
                                bubbleAll[i].style = 'animation: float '+bubbleDuration[i]+'s ease infinite; animation-delay: '+bubbleDelay[i]+'s'
                            }
                        }
                    });
                }
            }
        },
        destroyed: function () {
            window.removeEventListener('scroll', this.ctrlScroll);
            // window.removeEventListener('resize', this.ctrlScroll);
        }
    });
})();