$('.categories li').on('click', setCategory);

function setCategory() {
        $('.categories li').removeClass('active')
    
        const selected = $(this)
        selected.addClass('active');
    
        $(`.commands li`).hide();
    
        const categoryCommands = $(`.commands .${selected[0].id}`);
        categoryCommands.show();
    
        (categoryCommands) 
            $(`#commandError`).text(categoryCommands.length <= 0
                ? 'No commands found in this category'
               : '' );
}

setCategory.bind($(`.categories li`)[0])();