A simple, lightweight jQuery plugin for creating modal popups, with a decent css default.

A simple proyect to learn proper jquery plugin building, my first attemp :)

## Features

* Super small
* Centered dialog
* Adapts to any content size
* Simple usage
* Totally reusable

## Installation

Include script *after* the jQuery library (unless you are packaging scripts somehow else):

```html
<script src="/path/to/jquery.ventanita.js"></script>
```

**Do not include the script directly from GitHub (http://raw.github.com/...).** The file is being served as text/plain and as such being blocked
in Internet Explorer on Windows 7 for instance (because of the wrong MIME type). Bottom line: GitHub is not a CDN.

Include the css 

<link rel='stylesheet' href='ventanita.css' media='screen' type='text/css' charset='utf-8'/>

And copy the optional /img/close.img and/or adjust the path in the css

## Usage a full example

```javascript
var dialog = $('.open_ventanita_button').ventanita({
    contents: '#ventanita_content_div',
    beforeOpen: function($dialog_content){
        console.log('i can modify the content before displaying it')
    },
    onOpen: function($dialog_content){
        console.log('finished opening')
    },
    onClose: function(){
        console.log('finished closing')
    }
});

// You can control it like this
dialog.ventanita('close');
```

## Contributing

Check out the [Contributing Guidelines](CONTRIBUTING.md)

## Authors

[Guillermo Siliceo](https://github.com/grillermo)
