/*!
 * jQuery Ventanita Plugin v1.0
 * https://github.com/grillermo/jquery-ventanita
 *
 * Copyright 2013 Guillermo Siliceo
 * Released under the MIT license
 */
;(function($, window, document, undefined){
    $.extend($.fn,{
        dialog: function(opts,e){
            var settings = $.extend({
                // Dialogs can be non closable
                closable: true,
                // or have the close button hidden
                showClose: true,

                // Callbacks
                beforeOpen: function(){},
                onClose: function(){},
                onOpen: function(){},
                onScroll: function(){}

            }, opts);

            // Make a copy to leave the original content free for further manipulation
            var content = $(settings.contents).clone();

            // We remove the original content to prevent having more than one element with the same id 
            $(settings.contents).remove();
            $(settings.contents).detach();
            
            // The dialog can be attached to multiple objects, we return it to make it chainable
            return $(this).each(function(i, element){

                $(this).on('click',function(e){

                    var $overlay = $('#overlay');
                    // If a dialog already exists, close it
                    if($overlay.length !== 0){
                        $overlay.trigger('click');
                    }

                    // Create html tags
                    var $ui = $('<div id="overlay"></div><div class="dialog_box"></div>');
                    $ui.hide().appendTo('body').fadeIn();
                    var $dialog_box = $('.dialog_box');
                    if (settings.closable && settings.showClose){
                        $dialog_box.append('<a class="close" href="#"></a>');
                    }

                    // Customize the background
                    $('#overlay').css({
                        height: $(document).height()
                    });

                    // Set provided content
                    $dialog_box.append(content);

                    // Handling closing
                    if (settings.closable){
                        $('.dialog_box .close, #overlay').on('click',function(){
                            $('#overlay').fadeOut(function(){
                                $('#overlay').detach();
                            });
                            $('.dialog_box').fadeOut(function(){
                                $('.dialog_box').detach();
                            });
                            settings.onClose(content);
                            return false;
                        });
                    }

                    settings.beforeOpen(content);
                    $(content).fadeIn(function(){
                        settings.onOpen(content);
                    });

                    // Center the dialog in the viewport
                    $dialog_box.css({
                        'position': 'fixed',
                        'top': ( $(window).height() - $dialog_box.height() ) / 2+'px',
                        'left': ( $(window).width() - $dialog_box.width() ) / 2+'px'
                    });
                });
            });
        }
    });
    // This plugin shows a dialog with the provided content on click on the target
})(jQuery, window, document);
