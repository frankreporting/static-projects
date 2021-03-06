var jqueryNoConflict = jQuery;

// begin main function
jqueryNoConflict(document).ready(function() {
    renderStaticTemplates();
});
// end

// render handlebars templates via ajax
function getTemplateAjax(path, callback) {
    var source, template;
    jqueryNoConflict.ajax({
        url: path,
        success: function (data) {
            source = data;
            template = Handlebars.compile(source);
            if (callback) callback(template);
        }
    });
}
//end

// begin
function renderStaticTemplates(){
    renderKpccHeaderTemplate();
    renderDataFooterTemplate();
    renderKpccFooterTemplate();
};
// end

// create data footer template
function renderKpccHeaderTemplate(){
    getTemplateAjax('static-files/templates/kpcc-header.handlebars', function(template) {
        jqueryNoConflict('#kpcc-header').html(template());
    })
};

// create data footer template
function renderDataFooterTemplate(){
    getTemplateAjax('static-files/templates/data-footer.handlebars', function(template) {
        jqueryNoConflict('#data-footer').html(template());
    })
};

// create data footer template
function renderKpccFooterTemplate(){
    getTemplateAjax('static-files/templates/kpcc-footer.handlebars', function(template) {
        jqueryNoConflict('#kpcc-footer').html(template());
    })
};