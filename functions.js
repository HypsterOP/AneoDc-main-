module.exports = {
    formatDate: function(date){
        return new Intl.DateTimeFormat("en-US").format(date)
    }
}