$(function () {
    $('.container').fullpage({
        verticalCentered: false,
        sectionsColor: ["#fadd67", "#84a2d4", "#ef674d", "#ffeedd", "#d04759", "#84d9ed", "#8ac060"],
        navigation: true,
        scrollingSpeed: 1000,
        afterLoad: function (link,index) {
            //等页面切换完成后
            //给当前的section加上now统一执行动画
            //this 是当前屏的jquery对象
            this.addClass('now');

            if(index !==8 ) $('.more').fadeIn();
        },
        onLeave: function (index, nextIndex) {
            $('.more').fadeOut();
            //index 离开时的当前屏序号 nextIndex 下一屏序号
            //执行第二屏的沙发下落动画
            //从第二屏到第三屏才去执行
            if (index == 2 && nextIndex == 3) {
                $('.section:nth-child(2) .sofa').addClass('animated');
            }
            //从第三屏到第四屏才去执行
            else if (index == 3 && nextIndex == 4) {
                $('.section:nth-child(3) .sofa').addClass('animated');
            }
            //从第五屏到第六屏才去执行
            else if (index == 5 && nextIndex == 6) {
                $('.section:nth-child(5) .card img:last-child').addClass('animated');
                $('.section:nth-child(6) .box').addClass('animated');
            }
            //从第六屏到第七屏才去执行
            else if (index == 6 && nextIndex == 7) {
                //一秒后去执行 星星动画
                /*setTimeout(function () {
                    $('.section:nth-child(7) .star img').fadeIn();
                    setTimeout(function () {
                        $('.section:nth-child(7) .star img').fadeOut();
                    },1000)
                },1000)  不推荐这么使用延时*/
                //延时的函数  delay(延时时间单位毫秒)
                //$('.section:nth-child(7) .star img').delay(1000).fadeIn().delay(1000).fadeOut();
                $('.section:nth-child(7) .star img').each(function (i, item) {
                    $(item).delay(1000 + i * 500).fadeIn();
                });
            }
        },
        afterRender: function () {
            /*插件初始化完毕 可能会去修改HTML结构*/
            $('.section:nth-child(4) .cart').on('animationend', function () {
                $('.section:nth-child(4) .text img:last-child').fadeIn();
                $('.section:nth-child(4) .address').fadeIn(function () {
                    $(this).find('img:last-child').fadeIn();
                });
            });
            /*第八屏 功能*/
            /*1. 手移动*/
            $('.section:nth-child(8)').on('mousemove',function (e) {
                //console.log('坐标:'+e.clientX + ' ' + e.clientY);
                $(this).find('.hand').css({
                    left:e.clientX + 20, //手指和鼠标箭头对齐
                    top:e.clientY + 20   // 露出鼠标箭头  让它可以点击其他元素
                });
            }).on('click','.again',function () {
                /*2. 在来一次*/
                /*刷新页面  <a href=""></a>  location.href = ''; ‘’地址存在兼容问题  不推荐*/
                //推荐使用 location.reload();
                /*不是刷新页面  跳转去第一屏+重置动画*/
                /*fullpage  moveTo(1) 去纵向第一屏*/
                //$.fn.fullpage 调用函数
                $.fn.fullpage.moveTo(1);
                /*1. 加now实现动画*/
                $('.now').removeClass('now');
                /*2. 加animated实现动画*/
                $('.animated').removeClass('animated');
                /*3. jquery动画*/
                $('.section [style]').removeAttr('style');
            });

            /*继续往下 */
            /*1. 在第八屏不显示 */
            /*2. 在运动的过程中隐藏  到达下一屏 淡入操作*/
            $('.more').on('click',function () {
                $.fn.fullpage.moveSectionDown();
            });
        }
    });
    /*1. 下一屏动画实现思路*/
    /*1.1 等下一屏完全切换动画执行完成  执行内容动画*/
    /*1.2 内容动画有很多个  怎么去一次控制这些动画*/
    /*2. 执行沙发下降的动画*/
    /*2.1 当从上一屏离开到完全进入下一屏时间段去执行下降动画*/
    /*2.1 离开的时候  屏幕切换执行动画的时间  同步*/
});