$(document).ready(function(){

	//phone masked
	$('input[type="tel"]').mask("+7 (999) 999-99-99",{placeholder:"+7 (___) ___-__-__"});
	$('input[type="tel"]').on('click', function() {
		$(this).setCursorPosition(4);
	})
	$.fn.setCursorPosition = function(pos) {
	  this.each(function(index, elem) {
	    if (elem.setSelectionRange) {
	      elem.setSelectionRange(pos, pos);
	    } else if (elem.createTextRange) {
	      var range = elem.createTextRange();
	      range.collapse(true);
	      range.moveEnd('character', pos);
	      range.moveStart('character', pos);
	      range.select();
	    }
	  });
	  return this;
	};



    //btn tgl
    $('.js-btn-tgl').on('click', function () {
        $(this).toggleClass('active');
        return false;
    })


    //popups
    let popupCurrent;
    $('.js-popup-open').on('click', function () {
        $('.popup-outer-box').removeClass('active');
        $('body').addClass('popup-open');
        popupCurrent = $(this).attr('data-popup');
        $('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
        return false;
    })
    $('.js-popup-close').on('click', function () {
        $('body').removeClass('popup-open');
        $('.popup-outer-box').removeClass('active');
        return false;
    })


    //popup menu wrap
    $('.popup-menu-wrap .menu-catalog a, .header .page-menu-wrap .button-menu-close').on('click', function() {
        $('.popup-menu-wrap .menu-catalog a').toggleClass('active');
        $('.header .page-menu-wrap').toggleClass('active');
        $('body').toggleClass('menu-active');
        return false;
    })
    $('.header .page-menu-wrap li .submenu-outer-wrap').each(function () {
        $(this).parent().addClass('submenu-inner');
    })
    $('.header .page-menu-wrap li a').on('click', function () {
        if ($(this).next('.submenu-outer-wrap').length > 0) {
            if ($(this).next('.submenu-outer-wrap').css('display') == 'block') {
                $(this).next('.submenu-outer-wrap').slideUp(200).parent('li').removeClass('open');
            } else {
                $(this).next('.submenu-outer-wrap').slideDown(200).parent('li').addClass('open');
            }
            return false;
        }
    })
    //popup-side-menu-wrap
    if (!!$('.popup-side-menu-wrap').offset()) {
        $('.popup-side-menu-wrap li .submenu-outer-wrap').each(function () {
            $(this).parent().addClass('submenu-inner');
        })
        $('.popup-side-menu-wrap li a').on('click', function () {
            if ($(this).next('.submenu-outer-wrap').length > 0) {
                if ($(this).next('.submenu-outer-wrap').css('display') == 'block') {
                    $(this).next('.submenu-outer-wrap').slideUp(200).parent('li').removeClass('open');
                } else {
                    $(this).next('.submenu-outer-wrap').slideDown(200).parent('li').addClass('open');
                }
                return false;
            }
        })
    }

    //swipebox
    $('[data-swipebox]').swipebox();


    //header fixed
    if (!!$('.header').offset()) {
        $(window).scroll(function () {
            var windowTop = $(window).scrollTop();
            if (windowTop > 0) {
                $('body').addClass('header-fix');
            } else {
                $('body').removeClass('header-fix');
            }
        });
    }
    
    
    //about more
    $('.about-box.open-all .text-hidden-wrap').show(0);
    $('.about-box.open-all .button-toggle').addClass('active');
    $('.about-box .button-toggle').on('click', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active').parents('.about-box').removeClass('open-all').find('.text-hidden-wrap').slideUp(200);
        } else {
            $(this).addClass('active').parents('.about-box').addClass('open-all').find('.text-hidden-wrap').slideDown(200);
        }
        return false;
    })
    


    //frm counter   
    $('.js-counter .js-button-counter-minus').on('click', function () {
        var cnt = $(this).parents('.js-counter').find('.js-input-counter').val();
        cnt = parseInt(cnt);
        if (cnt > 0) {
            $(this).parents('.js-counter').find('.js-input-counter').val(cnt - 1);
        }
        return false;
    })
    $('.js-counter .js-button-counter-plus').on('click', function () {
        var cnt = $(this).parents('.js-counter').find('.js-input-counter').val();
        $(this).parents('.js-counter').find('.js-input-counter').val(cnt - 1 + 2);
        return false;
    })
	
    //popup block
	$('.js-popup-wrap .js-btn-toggle').on('click', function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('body').removeClass('menu-show');
            $('.js-popup-wrap').removeClass('popup-right');
		} else {
			$('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
			$(this).addClass('active');
			if ($(this).parent().hasClass('full-menu-wrap')) {
				$('body').addClass('menu-show');
			}
            pLeft = $(this).parent('.js-popup-wrap').find('.js-popup-block').offset().left;
            pWidth = $(this).parent('.js-popup-wrap').find('.js-popup-block').outerWidth();
            pMax = pLeft + pWidth;
            console.log(pLeft)
            console.log(pWidth)
            console.log(pMax)
            if ( pMax > $('.wrap').width() ) {
                $(this).parent('.js-popup-wrap').addClass('popup-right');
            } else {
                $('.js-popup-wrap').removeClass('popup-right');
            }
		}
		return false;
	})
	$('.js-popup-wrap .js-btn-close').on('click', function() {
		$(this).parents('.js-popup-wrap').children('.js-btn-toggle').removeClass('active');
        $('.js-popup-wrap').removeClass('popup-right');
		$('body').removeClass('menu-show');
		return false;
	})
	$(document).click(function(event) {
	    if ($(event.target).closest(".js-popup-block").length) return;
	    $('.js-popup-wrap:not(.no-close) .js-btn-toggle').removeClass('active');
        $('.js-popup-wrap').removeClass('popup-right');
	    $('body').removeClass('menu-show');
	    event.stopPropagation();
	});
	$('.js-popup-wrap').each(function() {
		if ($(this).hasClass('js-popup-select')) {
			// alert(1)
			if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
				$(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
			}
			var currentSelect = $(this).find('.js-popup-block').find('.active').html();
			$(this).find('.js-btn-toggle').html(currentSelect);
		}
	})
	$('.js-popup-wrap.js-popup-select .js-popup-block a').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$(this).parents('.js-popup-wrap').find('.js-popup-block').find('.active').removeClass('active');
			$(this).addClass('active');
		}
		$('.js-popup-wrap').each(function() {
			if ($(this).hasClass('js-popup-select')) {
				if ($(this).find('.js-popup-block').find('.active').length>0) {} else {
					$(this).find('.js-popup-block').find('li').eq(0).children('a').addClass('active');
				}
				var currentSelect = $(this).find('.js-popup-block').find('.active').html();
				$(this).find('.js-btn-toggle').html(currentSelect);
			}
		})
		$(this).parents('.js-popup-wrap').find('.js-btn-toggle').removeClass('active');
		return false;
	})

	//tabs
	$('.js-tabs-nav').each(function() {
		$('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
	})
	$('.js-tab-title').each(function() {
		if ($(this).hasClass('active')) {
			$(this).next('.js-tab-content').show(0);
		}
	})
	$('.js-tabs-nav li a').on('click', function() {
		if ($(this).hasClass('active')) {} else {
			$('.js-tab-block').removeClass('active');
			$(this).parents('.js-tabs-nav').find('.active').removeClass('active');
			$(this).addClass('active');
			$('.js-tabs-nav').each(function() {
				$('.js-tab-block[data-tab*="'+$(this).find('.active').attr('data-tab')+'"]').addClass('active');
			})
		}
		return false;
	})
	$('.js-tab-title').on('click' , function() {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active').next('.js-tab-content').slideUp(200);
		} else {
			$(this).addClass('active').next('.js-tab-content').slideDown(200);
		}
	})


    
    //catalog-slider-box
    if (!!$('.catalog-slider-box').offset()) {
        $('.catalog-slider-box .slider').slick({
            dots: false,
            slidesToShow: 4,
            variableWidth: false,
            infinite: false,
            adaptiveHeight: false,
            rows: 1,
            swipeToSlide: true,
            prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
            nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                        slidesToShow: 3,
                    }
                },
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        prevArrow: false,
                        nextArrow: false,
                        dots: true,
                    }
                },
                {
                    breakpoint: 640,
                    settings: {
                        slidesToShow: 1,
                        prevArrow: false,
                        nextArrow: false,
                        dots: true,
                    }
                },
            ]
        });
    }
    if (!!$('.item-tile-catalog').offset()) {
        $('.item-tile-catalog .tile-slider').slick({
            dots: true,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: false,
            rows: 1,
            swipeToSlide: true,
            prevArrow: false,
            nextArrow: false,
        });
    }

    //main-top-box
    if (!!$('.main-top-box').offset()) {
        $('.main-top-box .slider').slick({
            dots: true,
            slidesToShow: 1,
            variableWidth: false,
            infinite: true,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 5000,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            rows: 1,
            swipeToSlide: true,
            prevArrow: false,
            nextArrow: false,
            appendDots: $('.slider-numbers, .slider-lines'),
        });
        $('.main-top-box .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
            if ($(this).find('.slick-track').find('.slick-active').find('.sl-wrap').hasClass('header-light')) {
                $('body').addClass('header-light');
            } else {
                $('body').removeClass('header-light');
            }
        })	
    }
    
    
    //card features
    $('.card-info-wrap .button-more-action').on('click', function() {
        $(this).parent().parent().toggleClass('show-all');
        return false;
    })


    //photos slider box
    if (!!$('.photos-slider-box').offset()) {
        let slActivePosRight = 0;
        let slActivePosLeft = 0;
        let slActivePosMax = 0;
        let slActivePosRightDelta = 0;
        let slActivePosLeftDelta = 0;
        let slActiveScrollLeft = 0;
        let pSlider = $('.photos-slider-box .slider-wrap .slider').slick({
            dots: true,
            slidesToShow: 1,
            infinite: false,
            adaptiveHeight: true,
            appendDots: $('.slider-dots, .slider-dots-lines'),
            prevArrow: false,
            nextArrow: false,
            customPaging: function (slick, index) {
                var targetImage = slick.$slides.eq(index).find('.sl-wrap').attr('data-thumb');
                if (slick.$slides.eq(index).find('.sl-wrap').children('.elm-video').length > 0) {
                    return '<div class="elm-photo photo-actions photo-cover"><img src=" ' + targetImage + ' "/></div>';
                } else {
                    if (slick.$slides.eq(index).find('.sl-wrap').children('.elm-photo[data-thumb-type="photo-cover"]').length > 0) {
                        return '<div class="elm-photo photo-cover"><img src=" ' + targetImage + ' "/></div>';
                    } else if (slick.$slides.eq(index).find('.sl-wrap').children('.elm-photo[data-thumb-type="photo-contain"]').length > 0) {
                        return '<div class="elm-photo photo-contain"><img src=" ' + targetImage + ' "/></div>';
                    } else {
                        return '<div class="elm-photo"><img src=" ' + targetImage + ' "/></div>';
                    }
                }
            },
        });
        $('.photos-slider-box .slider-dots .slick-slide .elm-photo').on('click', function () {
            let cSlide = $(this).parents('.slick-slide').attr('data-slick-index');
            pSlider.slick('slickGoTo', cSlide);
        })
        $('.photos-slider-box .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
            $('.photos-slider-box .slider-dots li').removeClass('slick-active').eq(currentSlide).addClass('slick-active');
        })
        $('.photos-slider-box .slider-dots li').eq(0).addClass('slick-active');
    }


    //#price
    if (!!$('#price').offset()) {
        $('#price').slider({
            range: true,
            min: 0,
            max: 30000,
            values: [1300, 30000],
            slide: function (event, ui) {
                $('#price-min').val(ui.values[0]);
                $('#price-max').val(ui.values[1]);
            }
        })
        $('#price-min').val($('#price').slider('values', 0));
        $('#price-max').val($('#price').slider('values', 1));
        $('#price-min').bind('focusout', function () {
            if ($(this).val() > $('#price').slider('values', 1)) {
                $(this).val($('#price').slider('values', 0));
            }
            $('#price').slider('values', 0, $(this).val());
        })
        $('#price-max').bind('focusout', function () {
            if ($(this).val() < $('#price').slider('values', 0)) {
                $(this).val($('#price').slider('values', 1));
            }
            $('#price').slider('values', 1, $(this).val());
        })
        $('#price-min').bind('keypress', function (e) {
            if (e.keyCode == 13) {
                if ($(this).val() > $('#price').slider('values', 1)) {
                    $(this).val($('#price').slider('values', 0));
                }
                $('#price').slider('values', 0, $(this).val());
            }
        })
        $('#price-max').bind('keypress', function (e) {
            if (e.keyCode == 13) {
                if ($(this).val() < $('#price').slider('values', 0)) {
                    $(this).val($('#price').slider('values', 1));
                }
                $('#price').slider('values', 1, $(this).val());
            }
        })
        $('#widget').draggable();
    }
    

});


window.onload = function () {
    
    //field-select
    $('.frm-field-select').each(function() {
        if (!!$(this).find('.field-select-wrap').offset()) {
            let countCurrent = $(this).find('.field-select-wrap').find('input:checked').length;
            if (countCurrent > 0) {
                $(this).find('.btn-popup').attr('data-count', countCurrent);
                $(this).find('.field-counter').text(countCurrent);
                $(this).addClass('selected');
            } else {
                $(this).find('.btn-popup').attr('data-count', '');
                $(this).find('.field-counter').text('0');
                $(this).removeClass('selected');
            }
        }
    })
    $('.frm-field-select .field-select-wrap input').on('change', function() {
        let countCurrent = $(this).parents('.frm-field-select').find('.field-select-wrap').find('input:checked').length;
        if (countCurrent > 0) {
            $(this).parents('.frm-field-select').find('.btn-popup').attr('data-count', countCurrent);
            $(this).parents('.frm-field-select').find('.field-counter').text(countCurrent);
            $(this).parents('.frm-field-select').addClass('selected');
        } else {
            $(this).parents('.frm-field-select').find('.btn-popup').attr('data-count', '');
            $(this).parents('.frm-field-select').find('.field-counter').text('0');
            $(this).parents('.frm-field-select').removeClass('selected');
        }
    })
    $('.frm-field-select').on('click', '.field-button-clear', function() {
        $(this).parent('.frm-field-select').removeClass('selected');
        if (!!$(this).parent('.frm-field-select').find('.field-select-wrap').offset()) {
            $(this).parent('.frm-field-select').find('.field-select-wrap').find('input:checked').prop( "checked", false );
            $(this).parent('.frm-field-select').find('.btn-popup').attr('data-count', '');
            $(this).parent('.frm-field-select').find('.field-counter').text('0');
        }
        return false;
    })
    
    
    //field-password
    $('.js-password-toggle').on('click', function () {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).parent('.js-input').find('.form-input').prop('type', 'password');
        } else {
            $(this).addClass('active');
            $(this).parent('.js-input').find('.form-input').prop('type', 'text');
        }
        return false;
    })

    //field-clear
    $('.js-button-clear').on('click', function () {
        $(this).parent('.js-input').find('.form-input').val('').focus();
        return false;
    })
    //field input
    $('#form-reg button[type="submit"]').on('click', function() {
        $(this).parents('.frm-inner-wrap').addClass('form-send');
        return false;
    })
    $('.js-input').each(function() {
        if ($(this).find('.form-input').val() != '') {
            $(this).addClass('inp-valid')
        }
    })
    $('a[data-step]').on('click', function() {ll
        let frmStep = $(this).attr('data-step');
        $(this).parents('.frm-inner-wrap').find('[data-step].active').removeClass('active');
        $(this).parents('.frm-inner-wrap').find('[data-step="'+frmStep+'"]').addClass('active');
        return false;
    })
    let fieldInput = document.querySelectorAll('.js-input');
    if (fieldInput.length > 0) {
        for (i = 0; i < fieldInput.length; i++) {
            fieldInput[i].querySelector('label').onclick = function () {
                this.parentElement.classList.add('inp-active');
                this.parentElement.classList.remove('inp-valid');
                this.parentElement.querySelector('input').focus();
            }
            //input
            if (fieldInput[i].querySelector('input')) {
                fieldInput[i].querySelector('input').onfocus = function () {
                    this.parentElement.classList.add('inp-active');
                    this.parentElement.classList.remove('inp-valid');
                }
                fieldInput[i].querySelector('input').onblur = function () {
                    this.parentElement.classList.remove('inp-active');
                    if (this.value.length == "0") {
                        this.parentElement.classList.remove('inp-valid');
                    } else {
                        this.parentElement.classList.add('inp-valid');
                    }
                }
                //select
            } else if (fieldInput[i].querySelector('select')) {
                fieldInput[i].querySelector('select').onchange = function () {
                    this.parentElement.classList.add('inp-active');
                    this.parentElement.classList.remove('inp-valid');
                }
                fieldInput[i].querySelector('select').onblur = function () {
                    this.parentElement.classList.remove('inp-active');
                    if (this.options[this.selectedIndex].text === "") {
                        this.parentElement.classList.remove('inp-valid');
                    } else {
                        this.parentElement.classList.add('inp-valid');
                    }
                }
            }
        }
    }
}