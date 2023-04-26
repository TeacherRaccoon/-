seajs.config({
    base: (/(http|https)/.test(GV.FrontBaseUrl) ? '' : window.location.protocol) + GV.FrontBaseUrl,
    map: [
        [/^(.*\.(?:css|js))(.*)$/i, '$1?v=' + GV.FrontVer]
    ],
    charset: 'utf-8',
    // 预加载项
    preload: [
        this.Promise ? '' : 'promise',
        this.JSON ? '' : 'json'
    ],
    alias: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        inherit: 'lib/inherit',
        json: 'lib/json',
        promise: 'lib/promise'
    }
});
