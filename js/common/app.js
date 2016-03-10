define('common/app', [
    'jquery'
], function (
    $
) {
    'use strict';

    var $document = $(document);

    return {
        publish: function(eventName, data) {
            $document.trigger(eventName, data);
        },

        subscribe: function(eventName, callback) {
            $document.on(eventName, callback);
            //.on( events [, selector ] [, data ], handler )
        },

        unSubscribe: function(eventName) {
            $document.off(eventName);
            //.off( events [, selector ] [, handler ] )
        }
    };
});