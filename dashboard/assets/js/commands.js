$('.categories li').on('click', setCategory);

function setCategory() {
    blank();
    
        const selected = $(this)
        selected.addClass('active');
    
        $(`.commands li`).hide();
    
        const categoryCommands = $(`.commands .${selected[0].id}`);
        categoryCommands.show();

        updateResultsText(categoryCommands);
}
  function blank() {
      $('.categories li').removeClass('active');
      $('.commands li').hide()
  }

$('#search + button').on('click', () => {
   const query = $('#search input').val();
   if (!query.trim()) {
    updateResultsText(commands)
     return $('.command li').show();
   }

   const results = new Fuse(commands, {
       isCaseSensitive: false,
       keys: [
           { name: 'name', weight: 1 },
           { name: 'category', weight: 0.5 }
       ]
   })
   .search(query)
   .map(r => r.item);

   $(`.categories li`).removeClass('active');
   $('.commands li').hide();
   
   for (const command of results) {
       console.log(command.name)
       $(`#${command.name}Command`).show();
   }

   updateResultsText(results);
});

function updateResultsText(arr) {
   $(`#commandError`).text(
    (arr.length <= 0)
        ? 'No commands here.'
        : '' );
}