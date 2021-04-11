$('.categories li')[0].classList.add('active')

$('.categories li').on('click', function() {
    $('.categories li').removeClass('active')
    $(this).addClass('active');
});