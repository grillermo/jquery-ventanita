/*!
 * jQuery Ventanita Plugin v1.0
 * https://github.com/grillermo/jquery-ventanita
 *
 * Copyright 2013 Guillermo Siliceo
 * Released under the MIT license
 */
;(function($, window, document){
    var methods = {
        init: function(opts){
            // The actual plugin
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

            // Lets get the content
            var $content = $(settings.contents);

            // The dialog can be attached to multiple objects, we return it to make it chainable
            return $(this).each(function(){
                $(this).on('click',function(e){
                    self = this;
                    e.preventDefault();
                    
                    // If a dialog already exists, close it
                    if($('#overlay').length !== 0){
                        $overlay.trigger('click');
                    }

                    // Create html tags
                    var $ui = $('<div id="overlay"></div><div class="dialog_box"></div>');
                    $ui.hide().appendTo('body').fadeIn();
                    var $dialog_box = $('.dialog_box');
                    if (settings.closable && settings.showClose){
                        $dialog_box.append('<a class="ventanita_close" href="#"></a>');
                    }

                    // Customize the background to fill all the page
                    $('#overlay').css({
                        height: $(document).height()
                    });

                    // Set provided $content
                    $dialog_box.append($content);

                    // Handling closing
                    if (settings.closable){
                        $ui.on('click',function(){
                            $ui.fadeOut(function(){
                                $ui.detach();
                                $(document).unbind('scroll');
                            });
                            settings.onClose($content);
                            return false;
                        });
                    }

                    settings.beforeOpen($content);
                    $content.fadeIn(function(){
                        settings.onOpen($content);
                    });

                    // Center the dialog in the viewport
                    $(document).bind('scroll',function(){
                        $dialog_box.css({
                            'position': 'fixed',
                            'top': ( $(window).height() - $dialog_box.height() ) / 2+'px',
                            'left': ( $(window).width() - $dialog_box.width() ) / 2+'px'
                        });
                    }).trigger('scroll');
                });
            });
        },
        close: function( ){  
            // Little helper method to close ventanita once it has been instantiated
            $('#overlay').trigger('click');
        }
    };
    // Wrapper to detect if plugin was initialized or it was passed a method to execute
    $.fn.ventanita = function(methodOrOptions) {
        if ( methods[methodOrOptions] ) {
            return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            // Default to "init"
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.tooltip' );
        }    
        return false;
    };
    // This plugin shows a dialog with the provided content on click on the target
})(jQuery, window, document);
