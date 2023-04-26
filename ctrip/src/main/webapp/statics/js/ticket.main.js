(function () {
    require.config({
        baseUrl: GV.app.ticket.baseUrl,
        paths: {
            jquery: 'jquery',
            lazayloader: 'lazayloader',
            base: 'base',
            imagePlayer: 'imageplayer',
            placeholder: 'placeholders.min',
            tab: 'tab',
            autocomplete: 'autocomplete'
        },
        shim: {
            jquery: 'jquery',

            imagePlayer: {
                deps: ['jquery'],
                exports: ''
            },
            tab: {
                deps: ['jquery'],
                exports: ''
            },
            lazayloader: {
                deps: ['jquery'],
                exports: ''
            },
            placeholder: {
                deps: ['jquery'],
                exports: ''
            },
            autocomplete: {
                deps: ['jquery'],
                exports: ''
            }
        }
    });

})(this);