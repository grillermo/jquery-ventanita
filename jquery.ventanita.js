/*!
 * jQuery Ventanita Plugin v1.1
 * https://github.com/grillermo/jquery-ventanita
 *
 * Copyright 2013 Guillermo Siliceo
 * Released under the MIT license
 */

;(function($, window, document){
    var ventanita_bind = function($button,settings){
        var $overlay = $('#overlay');
        var $ui = $('.dialog_box');

        if ($overlay.length === 0){
            // We asume if the overlay doesnt exists neither the rest of the ui
            var $ui = $('<div class="dialog_box"><a class="ventanita_close" href="#"></a></div>');
            var $overlay = $('<div id="overlay"></div>');
            $overlay.hide().appendTo('body');
            $ui.hide().appendTo('body');
        }

        // Set provided contents
        settings.beforeOpen($button,$(settings.contents));
        $ui.append($(settings.contents)).fadeIn();
        
        // Customize the background to fill all the page
        $overlay.css({ height: $(document).height() }).fadeIn();

        // Handling closing
        $('.dialog_box .ventanita_close, #overlay').on('click',function(){
            if(!settings.preventClosing()){
                $(document).unbind('scroll');
                $overlay.fadeOut();
                $ui.fadeOut();
                // Since append moved the element to ventanita lets return it to the body
                $('body').append($(settings.contents).hide());
                settings.onClose($button,$(settings.contents));
                return false;
            }
        });


        $(settings.contents).fadeIn(function(){
            settings.onOpen($button,$(settings.contents));
        });

        // Center the dialog in the viewport
        $(document).bind('scroll',function(){
            $('.dialog_box').css({
                'position': 'fixed',
                'top': ( $(window).height() - $('.dialog_box').height() ) / 2+'px',
                'left': ( $(window).width() - $('.dialog_box').width() ) / 2+'px'
            });
        }).trigger('scroll');
        $(window).bind('resize',function(){
                $('.dialog_box').css({
                    'position': 'fixed',
                    'top': ( $(window).height() - $('.dialog_box').height() ) / 2+'px',
                    'left': ( $(window).width() - $('.dialog_box').width() ) / 2+'px'
                });
        });
        return $button
    }

    var methods = {
        init: function(opts){
            // The actual plugin
            var settings = $.extend({
                // Callbacks
                beforeSetup: function(){return true;},
                beforeOpen: function(){},
                onClose: function(){},
                onOpen: function(){},
                preventClosing: function(){ return false;},
                preventDefault: function(){return true;},
                contents: opts.contents
            }, opts);


            // If we are being called without a selector ie $.fn.ventanita
            if(this.selector === ''){
                // We pass the empty jquery object because a jquery objects is expected
                // and we don't have one
                return ventanita_bind($([]),settings);
            }

            // The dialog can be attached to multiple objects, we return it to make it chainable
            return $(this).on('click',function(e){
                var $button = $(this);
                // Shorcircuit if the beforesetup returns falsy
                if (!settings.beforeSetup($button,$(settings.contents))){
                    return false;
                }
                if (settings.preventDefault($button,$(settings.contents))){
                    e.preventDefault();
                }
                // Actual plugin
                ventanita_bind($button,settings);

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
        return this;
    };
    // This plugin shows a dialog with the provided content on click on the target
})(jQuery, window, document);

