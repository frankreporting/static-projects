    var jqueryNoConflict = jQuery;
    var dataSpreadsheet = '0An8W63YKWOsxdC1rbVVTUGRUdXBwTHY3SHNnSFZrNWc';
    var dataSheet = 'Sheet1';
    var newDataSet = [];

    // begin main function
    jqueryNoConflict(document).ready(function(){
        Tabletop.init({
            key: dataSpreadsheet,
            callback: showInfo,
            simpleSheet: false,
            debug: true
        })
    });

    function showInfo(data, tabletop) {

        // pulls column names
        jqueryNoConflict.each( tabletop.sheets(), function(i, sheet) {
            jqueryNoConflict("#data-dump").html(
                '<p>Returning data from ' + sheet.name +
                ' and it has column names of: ' + sheet.column_names.join(', ') +
                '</p>');
        });

        jqueryNoConflict.each(tabletop.sheets(dataSheet).all(), function(i, record) {
            var store = record.store;
            var opening = record.opening;
            var myArray = [store, opening];

            // push to an array
            newDataSet.push(myArray);

        });


    };