(function() {
    var iframeContainer = document.createElement('iframe');
    iframeContainer.src = 'about:blank';
    iframeContainer.frameBorder = 0;
    iframeContainer.style.cssText = 'width:1px; height: 1px; position:absolute; top: -1000px; left: -1000px;';
    iframeContainer.onload = iframeContainerLoaded;
    (function (global) {
        var queue = [];
        var consumeQueue;
        var setRunner;
        var frameInterval = Math.floor(1000 / 60);
        var isRunning = false;

        if (global.requestIdleCallback) {
            setRunner = function () {
                global.requestIdleCallback(accurateRunner);
            };
        } else if (global.requestAnimationFrame) {
            setRunner = function () {
                global.requestAnimationFrame(runner);
            };
        } else {
            setRunner = function () {
                setTimeout(runner, 0);
            };
        }
        function idleRunner (callback) {
            queue.push(callback);
            if (!isRunning) {
                consumeQueue();
            }
        }
        function consumeQueue () {
            if (queue.length) {
                isRunning = true;
                setRunner();
            } else {
                isRunning = false;
            }
        };
        function accurateRunner (deadline) {
            try {
                while (queue.length && deadline.timeRemaining() > 0) {
                    queue.shift()();
                }
            } catch (e) {
                throw e;
            } finally {
                consumeQueue();
            }
        }
        function runner () {
            try {
                var ts = Date.now();
                while (queue.length && Date.now() - ts < frameInterval) {
                    queue.shift()();
                }
            } catch (e) {
                throw e;
            } finally {
                consumeQueue();
            }
        }

        global.idleRunner = idleRunner;
    })(window);
    if(document.body) {
        if (document.body.firstChild) {
            document.body.insertBefore(iframeContainer, document.body.firstChild);
        } else {
            document.body.appendChild(iframeContainer);
        }
    }
    function iframeContainerLoaded () {
        var domDocument= null;
        try {
            if(iframeContainer.contentDocument||iframeContainer.contentWindow)
                domDocument = iframeContainer.contentWindow.document;
            else
                domDocument=null|| iframeContainer.document;
        }catch (e) {
            domDocument=null|| iframeContainer.document;
        }
        if(!domDocument||domDocument==null) return;
        var domContainer = domDocument.body;
        domContainer.style.cssText = 'width: 2000px;';
        var myUnique = function(args){
            var res = [];
            var json = {};
            for(var i = 0; i < args.length; i++){
                if(!json[args[i]]){
                    res.push(args[i]);
                    json[args[i]] = 1;
                }
            }
            return res;
        }

        var myIndexOf = function(arr,val){
            for(var i =0; i < arr.length; i++){
                if(arr[i] == val) return i;
            }
            return -1;

        };

        window.CHLOROFP_STATUS="start";
        var flashEnable=false;

        var surl = location.protocol + "//cdid.c-ctrip.com/chloro-device/v2/d";
        var swf= location.protocol +"//pic.c-ctrip.com/picaresonline/risk/ubtrms/DeviceInfo.00d244c5.swf";


        var durl = surl, //动态事件提交的url
            form1, dataInput, submiting=false, //当用iframe提交的时候用到的变量
            guid = null,
            rsg_ = null,
            rdg_ = null,
            version = 7,
            isCollectDynaData = false, //是否收集动态数据
            dyInterval=3000,//动态数据发送间隔,单位:毫秒
            moveSpeedMinTime = 200000, //鼠标移动数据收集参数:最短时间,单位:微秒
            moveSpeedMaxTime = 1500000,//鼠标移动数据收集参数:最长时间,单位:微秒
            moveSpeedMinDist = 50, //鼠标移动数据收集参数:最小距离
            keypressMinTime = 10, //按键收集的参数:最小时间差
            keypressMaxTime = 3000000, //按键收集的参数:最大时间差,单位:微秒
            mouseClickMinTime=8000, //鼠标点击收集的参数:最小时间差,单位:微秒
            mouseClickMaxTime=1000000, //鼠标点击收集的参数:最大时间差,单位:微秒
            existsRsgGuid = false,
            G_NAME="_RGUID",
            S_NAME="_RSG",
            D_NAME="_RDG";

        var serverName = location.protocol+"//"+location.host;

        var log = function(msg){
            if(window.console){
                console.log(msg);
            }
        }

        /***********************************dictionary used during the encoding process *******************************/
            //the dictionary is used for encoding and compressing the data into binary format.
            //There's no need for SC guys to focus on this parts. SC guys can do your own encoding and compressing before send the data to your backend.
            //
        var Dictionary={
                WEBGL_EXTENSIONS:["ANGLE_instanced_arrays",
                    "EXT_blend_minmax",
                    "EXT_color_buffer_half_float",
                    "EXT_disjoint_timer_query",
                    "EXT_frag_depth",
                    "EXT_sRGB",
                    "EXT_shader_texture_lod",
                    "EXT_texture_filter_anisotropic",
                    "MOZ_EXT_texture_filter_anisotropic",
                    "MOZ_WEBGL_compressed_texture_atc",
                    "MOZ_WEBGL_compressed_texture_s3tc",
                    "MOZ_WEBGL_depth_texture",
                    "MOZ_WEBGL_lose_context",
                    "OES_element_index_uint",
                    "OES_standard_derivatives",
                    "OES_texture_float",
                    "OES_texture_float_linear",
                    "OES_texture_half_float",
                    "OES_texture_half_float_linear",
                    "OES_vertex_array_object",
                    "WEBGL_color_buffer_float",
                    "WEBGL_compressed_texture_atc",
                    "WEBGL_compressed_texture_etc1",
                    "WEBGL_compressed_texture_s3tc",
                    "WEBGL_debug_renderer_info",
                    "WEBGL_debug_shaders",
                    "WEBGL_depth_texture",
                    "WEBGL_draw_buffers",
                    "WEBGL_lose_context",
                    "WEBKIT_EXT_texture_filter_anisotropic",
                    "WEBKIT_WEBGL_compressed_texture_atc",
                    "WEBKIT_WEBGL_compressed_texture_pvrtc",
                    "WEBKIT_WEBGL_compressed_texture_s3tc",
                    "WEBKIT_WEBGL_depth_texture",
                    "WEBKIT_WEBGL_lose_context"],
//2b
                WEBGL_fragmentShaderFloatIntPrecision:[
                    "highp/highp",
                    "highp/lowp",
                    "mediump/highp",
                    "mediump/lowp",
                    "not available"],
//2b
                FLASH_touchScreenType:[
                    "finger",//00
                    "none",//01
                    "stylus"],
//3b
                FLASH_cpuArchitecture:[
                    "arm",//000
                    "other",//001
                    "powerpc",//010
                    "sparc",//011
                    "x86"//100
                ],
//2b
                FLASH_screenColor:[
                    "bw",//00
                    "color",//01
                    "gray",//10
                    "other"
                ],
//3b
                FLASH_playerType:[
                    "activex",//000
                    "desktop",//001
                    "external",//010
                    "other",//011
                    "plugin",///100
                    "standalone"//101
                ],
//2b
                NAVIGATOR_doNotTrack:[
                    "do not track",//00
                    "enable",//01
                    "unspecified"//10
                ],
//8b
                NAVIGATOR_plugins:[
                    "2007 Microsoft Office system",
                    "360MMPlugin",
                    "360安全卫士 快速登录",
                    "ANT pic ocr plugin",
                    "APlayer ActiveX hosting plugin",
                    "AcroPDF.PDF",
                    "ActiveX hosting plugin for NPAPI",
                    "Adobe Acrobat",
                    "AdobeAAMDetect",
                    "AgControl.AgControl",
                    "AliSSOLogin plugin",
                    "AliWangWang Plug-In For Firefox and Netscape",
                    "Alipay Security Control 3",
                    "Alipay Security Payment Client Suit",
                    "Alipay security control",
                    "Alipay webmod control",
                    "BJCA Update",
                    "BaiduSafeInput",
                    "BaiduSetUp Plugin",
                    "BaiduYunGuanjia Application",
                    "Bang5Tao Plugin",
                    "Baofeng StormPlayer 5",
                    "Baofeng StormPlayer WebBrowser Plugin",
                    "BluRay Plug-in",
                    "CCBEnckey plugin",
                    "CCBInfoScan plugin",
                    "CCBNetSignCom plugin",
                    "CFCA CryptoKit BOC 3.3",
                    "CFCA CryptoKit CIB 3.0",
                    "CFCA CryptoKit CMBC 3.2",
                    "CFCA CryptoKit CMBC U2 3.0",
                    "CFCA npSecEditCtl.BOC.x86 1.0",
                    "CFCA npSecEditCtl.DaysPASS.x86 3.0",
                    "CFCA npSecEditCtl.SHRB.x86 3.0",
                    "CGB Online Banking Security Chrome Plugin",
                    "CGB Online Banking Security Firefox Plugin",
                    "CITICEdit",
                    "CMBCEDIT",
                    "CMBEdit Plugin",
                    "CNKI CAJAX Plugin",
                    "CNKI sysinfo Plugin",
                    "CaiNiaoPrint",
                    "China Online Banking Assistant",
                    "Chrome PDF Viewer",
                    "Chrome Remote Desktop Viewer",
                    "Chromium PDF Viewer",
                    "CmbcCom",
                    "Cssweb Hard Info",
                    "Cssweb Safe LoginHt",
                    "Dingding Screenshot Plug-In For Firefox and Netscape",
                    "EBestPay",
                    "Edge PDF Viewer",
                    "Fancy Game Plugin",
                    "Foxit Reader Plugin for Mozilla",
                    "GamePlugin",
                    "Google Update",
                    "HDZBCertCtrl.dll plugin",
                    "HDZBSNCtrl plugin",
                    "HunanTVPlugins",
                    "Intel® Identity Protection Technology",
                    "JDDongDong Plugin",
                    "Java Applet Plug-in",
                    "Java(TM) Platform SE 6 U30",
                    "Java(TM) Platform SE 7 U11",
                    "Java(TM) Platform SE 7 U15",
                    "Java(TM) Platform SE 7 U67",
                    "Java(TM) Platform SE 7 U71",
                    "Java(TM) Platform SE 8 U101",
                    "Java(TM) Platform SE 8 U25",
                    "Java(TM) Platform SE 8 U60",
                    "Java(TM) Platform SE 8 U66",
                    "Java(TM) Platform SE 8 U91",
                    "Lync Meeting Join Plug-in",
                    "MacromediaFlashPaper.MacromediaFlashPaper",
                    "Maxthon PDF Viewer",
                    "McAfee SecurityCenter",
                    "Microsoft Lync 2010 Meeting Join Plug-in",
                    "Microsoft Office 2003",
                    "Microsoft Office 2010",
                    "Microsoft Office 2013",
                    "Microsoft Office 2016",
                    "Microsoft® DRM",
                    "Microsoft® Windows Media Player Firefox Plugin",
                    "Msxml2.DOMDocument",
                    "Msxml2.XMLHTTP",
                    "NPCtrip",
                    "NPQQCertificate",
                    "NPQQPassword",
                    "NVIDIA 3D VISION",
                    "NVIDIA 3D Vision",
                    "Native Client",
                    "Native Widget Plugin",
                    "Nexon Game Controller",
                    "PPLive PPTV Plugin",
                    "PassGuard",
                    "PowerEnter Plug-in for BOSH",
                    "PowerEnter Plug-in for SRCB",
                    "PowerEnter Plug-in for UMS",
                    "PowerSign Plug-in for BOSH",
                    "PowerSign Plug-in for SPDB",
                    "QQ2013",
                    "QQDownload Plugin",
                    "QQGameHall Firefox Plugin",
                    "QQGamePlugin Pro",
                    "QQMail Plugin",
                    "QQMiniDL Plugin",
                    "QQMusic",
                    "QQMusic",
                    "QQPCMgr Detector",
                    "QuickTime Plug-in",
                    "QuickTime Plug-in 7.7.4",
                    "RealDownloader Plugin",
                    "RealNetworks(tm) RealDownloader Chrome Background Extension Plug-In (32-bit)",
                    "RealNetworks(tm) RealDownloader HTML5VideoShim Plug-In (32-bit)",
                    "RealNetworks(tm) RealDownloader PepperFlashVideoShim Plug-In (32-bit)",
                    "RealPlayer Download Plugin",
                    "RealPlayer(tm) G2 LiveConnect-Enabled Plug-In (32-bit)",
                    "Rising AntiVirus V16",
                    "SA-iSecurity Plug-in for BOSH",
                    "SA-iSecurity Plug-in for PAB",
                    "SA-iSecurity Plug-in for SPDBANK",
                    "SWCtl.SWCtl",
                    "SangforECPlugin",
                    "Scripting.Dictionary",
                    "SdpEdit",
                    "Shahai ShareCom Plugin",
                    "SharePoint Browser Plug-in",
                    "Shell.UIHelper",
                    "Shockwave Flash",
                    "Shockwave for Director",
                    "ShockwaveFlash.ShockwaveFlash",
                    "SignMessenger",
                    "Silverlight Plug-In",
                    "Skype Web Plugin",
                    "Sogou Explorer PrintScreen plugin",
                    "Sogou Explorer npruntime scriptable example plugin",
                    "Sogou plugin",
                    "TDCCtl.TDCCtl",
                    "Tencent FTN plug-in",
                    "Tencent QQ",
                    "Tencent SSO Platform",
                    "Tendyron CCB Get SN Plugin",
                    "Tendyron CCB ImportCert Plugin",
                    "Tenpay Security Control",
                    "Thunder DapCtrl NPAPI Plugin",
                    "TradeManager Plug-In For Firefox and Netscape",
                    "Turbo.net Plugin",
                    "UPEditor",
                    "Unity Player",
                    "WMPlayer.OCX",
                    "Wandoujia Plugin",
                    "Watchdata (Beijing) Limited npwdkctrl",
                    "WebKit built-in PDF",
                    "WebKit 内建 PDF",
                    "Widevine Content Decryption Module",
                    "Windows Media Player Plug-in Dynamic Link Library",
                    "Wiz",
                    "XunLei Plugin",
                    "XunLei User Plugin",
                    "XunLei User Plugin",
                    "YeePay SecureGuard",
                    "YoukuAgent",
                    "clear cache plugin for fsi",
                    "client binding plugin for fsi",
                    "com.sogou.sogoupdfviewer",
                    "full screen plugin for fsi",
                    "hao123BrowserTool",
                    "hd2gccbcertctrl plugin",
                    "hd2gccbsnctrl plugin",
                    "iQiyi Browser Plugin",
                    "iTrusChina iTrusPTA,XEnroll,iEnroll,hwPTA,UKeyInstalls Firefox Plugin",
                    "iTunes Application Detector",
                    "nbcbEdit",
                    "npABCUtilapp",
                    "npAssistComm Dynamic Link Library",
                    "npCCBGmSignCtrl",
                    "npCNCBChecker.dll",
                    "npCNCBGuard.dll",
                    "npCryptoKit.CertEnrollment.Pro.x86",
                    "npCryptoKit.CertEnrollment.SHRB.x86",
                    "npCryptoKit.SHRB.x86",
                    "npFT2000APIForNBCBank",
                    "npOEdit",
                    "npQQPhotoDrawEx",
                    "npScreenGrab Plugin",
                    "npSecCtl.dll",
                    "npStatusBarCreator plugin",
                    "npTongbuAddin",
                    "npTsGamePlugin",
                    "npWeiboDesktopAssist Plugin",
                    "npXEdit",
                    "npalicdo plugin",
                    "npdmccbplugin",
                    "npft_citic",
                    "npgd_citic",
                    "npiTools 动态链接库",
                    "npifox Dynamic Link Library",
                    "npnedit netease edit plugin",
                    "npxxin input plugin for fsi",
                    "rmocx.RealPlayer G2 Control",
                    "rmocx.RealPlayer G2 Control.1",
                    "shahai Password Plugin",
                    "signAssist",
                    "submit plugin for fsi",
                    "weatherplg",
                    "x-npcntvlive2-plugin",
                    "xfplay p2p plugin",
                    "上海农商银行签名控件",
                    "企业QQ",
                    "如意搜娱乐帮手",
                    "平安银行签名控件",
                    "应用宝一键安装插件",
                    "歪歪",
                    "电脑管家网址安全插件",
                    "百度极速下载助手",
                    "百度网页启动组件",
                    "百度软件中心助手",
                    "腾讯开放平台浏览器插件",
                    "腾讯视频"
                ],
                NAVIGATOR_mimeTypes:[
                    "application/BaiduExpert-npplugin",
                    "application/HwPTA.iTrusHwPTA",
                    "application/HwWDkey.installWDkey",
                    "application/activex-manager",
                    "application/alidcp",
                    "application/aliedit",
                    "application/asx",
                    "application/atm-plugin",
                    "application/baiduexpert-npplugin",
                    "application/baidusetup-activex",
                    "application/baofeng-webbrowser-plugin",
                    "application/baofengwebplayer-plugin",
                    "application/bd-npYunWebDetect-plugin",
                    "application/bd-npupload-plugin",
                    "application/bd-npyunwebdetect-plugin",
                    "application/citic-npcncbchecker",
                    "application/client-activex",
                    "application/cmbc",
                    "application/cnki-cajax-plugin",
                    "application/cnki-sysinfo-plugin",
                    "application/coba",
                    "application/csswebhardinfo",
                    "application/csswebsafeloginht",
                    "application/dd-plugin",
                    "application/futuresplash",
                    "application/gameplugin",
                    "application/hunantv-plugin",
                    "application/hwpta.itrushwpta",
                    "application/hwwdkey.installwdkey",
                    "application/itunes-plugin",
                    "application/java-deployment-toolkit",
                    "application/mozilla-3dv-streaming-plugin",
                    "application/mozilla-ccbenckey-plugin",
                    "application/mozilla-ccbgmsignctrl-plugin",
                    "application/mozilla-ccbinfoscan-plugin",
                    "application/mozilla-ccbnetsign-plugin",
                    "application/mozilla-dmwz-ccbdevidctrl-plugin",
                    "application/mozilla-dmwz-writecert-plugin",
                    "application/mozilla-hdzb-2g-ccbcertctrl-plugin",
                    "application/mozilla-hdzb-2g-ccbsnctrl-plugin",
                    "application/mozilla-hdzb-ccbcertctrl-plugin",
                    "application/mozilla-hdzb-ccbsnctrl-plugin",
                    "application/mozilla-npqihooquicklogin",
                    "application/np-bddownload",
                    "application/np-bdsofthelperplug",
                    "application/npAliSSOLogin",
                    "application/np_xunlei_plugin",
                    "application/np_xunlei_plugin.2",
                    "application/npabcutilapp",
                    "application/npalicdo",
                    "application/npalissologin",
                    "application/npcryptokit.certenrollment.pro.x86",
                    "application/npcryptokit.certenrollment.shrb.x86",
                    "application/npcryptokit.cib.x86",
                    "application/npcryptokit.cmbc.u2.x86",
                    "application/npcryptokit.cmbc.x86",
                    "application/npft_citic",
                    "application/npgd_citic",
                    "application/npitools-plugin",
                    "application/npnedit-netease-edit-plugin",
                    "application/npoedit",
                    "application/npqqwebgame",
                    "application/npseceditctl.boc.x86",
                    "application/npseceditctl.dayspass.x86",
                    "application/npseceditctl.shrb.x86",
                    "application/nptxsso",
                    "application/npxedit",
                    "application/npxf-qqdownload",
                    "application/npxf-qqminidl",
                    "application/npxluser_plugin",
                    "application/pdf",
                    "application/player-activex",
                    "application/postscript",
                    "application/pta.itruspta.version.1",
                    "application/qqcert",
                    "application/qqedit",
                    "application/qqpcmgr-extensions-mozilla",
                    "application/qqphonemanagerplugin",
                    "application/qscall-plugin",
                    "application/sdp",
                    "application/sdp-edit",
                    "application/skype-web-plugin",
                    "application/sogou-computerinfo-plugin",
                    "application/sogou-native-widget-plugin",
                    "application/sogou-npprintscreen-scriptable-plugin",
                    "application/sogou-npruntime-scriptable-plugin",
                    "application/sogou-npruntime-statusbar-attacher-for-da-plugin",
                    "application/sogou-npruntime-statusbar-attacher-plugin",
                    "application/sogou-query-left-ticket-12306-plugin",
                    "application/sogou-start-gamecenter-lite-plugin",
                    "application/srcbsign-signer-plugin",
                    "application/tecent-qqlive-plugin",
                    "application/tecent-qqmusichelper-plugin",
                    "application/tecent-qzonemusic-plugin",
                    "application/tencent-qqphotodrawex2-plugin",
                    "application/tencentopenplatform",
                    "application/tsgameplugin",
                    "application/txftn-webkit",
                    "application/upeditor",
                    "application/upeditor-2",
                    "application/vnd.adobe.pdfxml",
                    "application/vnd.adobe.x-mars",
                    "application/vnd.adobe.xdp+xml",
                    "application/vnd.adobe.xfd+xml",
                    "application/vnd.adobe.xfdf",
                    "application/vnd.apple.mpegurl",
                    "application/vnd.chromium.remoting-viewer",
                    "application/vnd.fdf",
                    "application/vnd.microsoft.communicator.ocsmeeting",
                    "application/vnd.ppdf",
                    "application/vnd.rn-realdownloader-javascript",
                    "application/vnd.rn-realplayer-javascript",
                    "application/vnd.unity",
                    "application/ww-plugin",
                    "application/x-adobeaamdetect",
                    "application/x-aliinethealth-plugin",
                    "application/x-alisecctrl-plugin",
                    "application/x-baidu-safe",
                    "application/x-bang5taoplugin",
                    "application/x-baofeng-webbrowser-plugin",
                    "application/x-cainiaoprint",
                    "application/x-cgbeditchrome-plugin",
                    "application/x-cgbeditfirefox-plugin",
                    "application/x-checker",
                    "application/x-cmbc-edit",
                    "application/x-cmbedit",
                    "application/x-director",
                    "application/x-drm",
                    "application/x-drm-v2",
                    "application/x-ebestpay",
                    "application/x-google-chrome-pdf",
                    "application/x-google-chrome-print-preview-pdf",
                    "application/x-hao123dps-plugin",
                    "application/x-icbc-clientbinding",
                    "application/x-icbc-plugin-chrome-npclientbinding",
                    "application/x-icbc-plugin-chrome-npfullscreen",
                    "application/x-icbc-plugin-chrome-npsubmit",
                    "application/x-icbc-plugin-chrome-npxxin-input",
                    "application/x-icbc-plugin-submit",
                    "application/x-icbcnpxxin-plugin-input",
                    "application/x-itst-activex",
                    "application/x-java-vm",
                    "application/x-java-vm-npruntime",
                    "application/x-jit-sign-plugin-boc",
                    "application/x-juziagent-plugin",
                    "application/x-media-element-proxy-plugin",
                    "application/x-mfe-ipt",
                    "application/x-mpeg",
                    "application/x-mpegurl",
                    "application/x-mplayer2",
                    "application/x-ms-wmp",
                    "application/x-msoffice",
                    "application/x-msoffice14",
                    "application/x-nacl",
                    "application/x-npassistcomm-plugin",
                    "application/x-npclcache-plugin",
                    "application/x-npcntvlive2-plugin",
                    "application/x-npctrip",
                    "application/x-npecplugin",
                    "application/x-npfullscreen-plugin",
                    "application/x-npnxgame-cn",
                    "application/x-npnxminfo-cn",
                    "application/x-nppcmgr",
                    "application/x-pass-guard",
                    "application/x-pnacl",
                    "application/x-ppapi-widevine-cdm",
                    "application/x-pptv-plugin",
                    "application/x-qgassist",
                    "application/x-quartzcomposer",
                    "application/x-rn-downloaderchromebgext-plugin",
                    "application/x-rn-downloaderhtml5videoshim-plugin",
                    "application/x-rn-downloaderpepperflashvideoshim-plugin",
                    "application/x-ruyisoassistplg",
                    "application/x-screengrab-sina",
                    "application/x-sdp",
                    "application/x-sharepoint",
                    "application/x-sharepoint-uc",
                    "application/x-sharepoint-webkit",
                    "application/x-shockwave-flash",
                    "application/x-sign-messenger",
                    "application/x-signassist",
                    "application/x-silverlight",
                    "application/x-silverlight-2",
                    "application/x-tencent-qmail",
                    "application/x-tencent-qmail-webkit",
                    "application/x-tendyron-ccb-importcert-ctrl",
                    "application/x-tendyron-ccb-usbkey-ctrl",
                    "application/x-thunder-aplayer",
                    "application/x-thunder-dapctrl",
                    "application/x-vnd-csii-powerenter-bosh",
                    "application/x-vnd-csii-powerenter-srcb",
                    "application/x-vnd-csii-powerenter-ums",
                    "application/x-vnd-csii-powersign-bosh",
                    "application/x-vnd-csii-powersign-spdb",
                    "application/x-vnd-intel-webapi-updater",
                    "application/x-vnd-sa-isecurity-bosh",
                    "application/x-vnd-sa-isecurity-pab",
                    "application/x-vnd-sa-isecurity-spdbank",
                    "application/x-vnd.google.oneclickctrl.9",
                    "application/x-vnd.google.update3webcontrol.3",
                    "application/x-watchdata-importcert-ctrl",
                    "application/x-watchdata-usbkey-ctrl",
                    "application/x-weibodesktopassist-sina",
                    "application/x-wizbrother-wiz-ax",
                    "application/x-yeepay-edit",
                    "application/x-youkuagent",
                    "application/x360mmplugin",
                    "application/xfplay-plugin",
                    "audio/3gpp",
                    "audio/3gpp2",
                    "audio/aac",
                    "audio/aiff",
                    "audio/amr",
                    "audio/basic",
                    "audio/mp3",
                    "audio/mp4",
                    "audio/mpeg",
                    "audio/mpeg3",
                    "audio/mpegurl",
                    "audio/scpls",
                    "audio/wav",
                    "audio/x-aac",
                    "audio/x-aiff",
                    "audio/x-caf",
                    "audio/x-gsm",
                    "audio/x-m4a",
                    "audio/x-m4b",
                    "audio/x-m4p",
                    "audio/x-m4r",
                    "audio/x-mp3",
                    "audio/x-mpeg",
                    "audio/x-mpeg3",
                    "audio/x-mpegurl",
                    "audio/x-ms-wax",
                    "audio/x-ms-wma",
                    "audio/x-pn-realaudio-plugin",
                    "audio/x-scpls",
                    "audio/x-wav",
                    "image/jps",
                    "image/mpo",
                    "image/pns",
                    "text/pdf",
                    "video/3gpp",
                    "video/3gpp2",
                    "video/flc",
                    "video/mp4",
                    "video/mpeg",
                    "video/quicktime",
                    "video/x-m4v",
                    "video/x-mpeg",
                    "video/x-ms-asf",
                    "video/x-ms-asf-plugin",
                    "video/x-ms-wm",
                    "video/x-ms-wmv",
                    "video/x-ms-wvx",
                    "x-application/baofengwebplayer-plugin"
                ],
//1B
                NAVIGATOR_language:[
                    "af",
                    "af-za",
                    "ar",
                    "ar-ae",
                    "ar-bh",
                    "ar-dz",
                    "ar-eg",
                    "ar-iq",
                    "ar-jo",
                    "ar-kw",
                    "ar-lb",
                    "ar-ly",
                    "ar-ma",
                    "ar-om",
                    "ar-qa",
                    "ar-sa",
                    "ar-sy",
                    "ar-tn",
                    "ar-ye",
                    "az",
                    "az-az-cyrl",
                    "az-az-latn",
                    "be",
                    "be-by",
                    "bg",
                    "bg-bg",
                    "bs-ba",
                    "ca",
                    "ca-es",
                    "cs",
                    "cs-cz",
                    "cy",
                    "cy-gb",
                    "da",
                    "da-dk",
                    "de",
                    "de-at",
                    "de-ch",
                    "de-de",
                    "de-li",
                    "de-lu",
                    "dv",
                    "dv-mv",
                    "el",
                    "el-gr",
                    "en",
                    "en-au",
                    "en-bz",
                    "en-ca",
                    "en-cb",
                    "en-gb",
                    "en-ie",
                    "en-jm",
                    "en-nz",
                    "en-ph",
                    "en-tt",
                    "en-us",
                    "en-za",
                    "en-zw",
                    "eo",
                    "es",
                    "es-ar",
                    "es-bo",
                    "es-cl",
                    "es-co",
                    "es-cr",
                    "es-do",
                    "es-ec",
                    "es-es",
                    "es-gt",
                    "es-hn",
                    "es-mx",
                    "es-ni",
                    "es-pa",
                    "es-pe",
                    "es-pr",
                    "es-py",
                    "es-sv",
                    "es-uy",
                    "es-ve",
                    "et",
                    "et-ee",
                    "eu",
                    "eu-es",
                    "fa",
                    "fa-ir",
                    "fi",
                    "fi-fi",
                    "fo",
                    "fo-fo",
                    "fr",
                    "fr-be",
                    "fr-ca",
                    "fr-ch",
                    "fr-fr",
                    "fr-lu",
                    "fr-mc",
                    "gl",
                    "gl-es",
                    "gu",
                    "gu-in",
                    "he",
                    "he-il",
                    "hi",
                    "hi-in",
                    "hr",
                    "hr-ba",
                    "hr-hr",
                    "hu",
                    "hu-hu",
                    "hy",
                    "hy-am",
                    "id",
                    "id-id",
                    "is",
                    "is-is",
                    "it",
                    "it-ch",
                    "it-it",
                    "ja",
                    "ja-jp",
                    "ka",
                    "ka-ge",
                    "kk",
                    "kk-kz",
                    "kn",
                    "kn-in",
                    "ko",
                    "ko-kr",
                    "kok",
                    "kok-in",
                    "ky",
                    "ky-kg",
                    "lt",
                    "lt-lt",
                    "lv",
                    "lv-lv",
                    "mi",
                    "mi-nz",
                    "mk",
                    "mk-mk",
                    "mn",
                    "mn-mn",
                    "mr",
                    "mr-in",
                    "ms",
                    "ms-bn",
                    "ms-my",
                    "mt",
                    "mt-mt",
                    "nb",
                    "nb-no",
                    "nl",
                    "nl-be",
                    "nl-nl",
                    "nn-no",
                    "ns",
                    "ns-za",
                    "pa",
                    "pa-in",
                    "pl",
                    "pl-pl",
                    "pt",
                    "pt-br",
                    "pt-pt",
                    "qu",
                    "qu-bo",
                    "qu-ec",
                    "qu-pe",
                    "ro",
                    "ro-ro",
                    "ru",
                    "ru-ru",
                    "sa",
                    "sa-in",
                    "se",
                    "se-fi",
                    "se-no",
                    "se-se",
                    "sk",
                    "sk-sk",
                    "sl",
                    "sl-si",
                    "sq",
                    "sq-al",
                    "sr-ba",
                    "sr-sp",
                    "sv",
                    "sv-fi",
                    "sv-se",
                    "sw",
                    "sw-ke",
                    "syr",
                    "syr-sy",
                    "ta",
                    "ta-in",
                    "te",
                    "te-in",
                    "th",
                    "th-th",
                    "tl",
                    "tl-ph",
                    "tn",
                    "tn-za",
                    "tr",
                    "tr-tr",
                    "ts",
                    "tt",
                    "tt-ru",
                    "uk",
                    "uk-ua",
                    "ur",
                    "ur-pk",
                    "uz",
                    "uz-uz",
                    "vi",
                    "vi-vn",
                    "xh",
                    "xh-za",
                    "zh",
                    "zh-cn",
                    "zh-hk",
                    "zh-mo",
                    "zh-sg",
                    "zh-tw",
                    "zu",
                    "zu-za"
                ],
//3b
                BASIC_os:[
                    "android",//001
                    "ios",//000
                    "linux",//010
                    "mac",//011
                    "other",//100
                    "windows",//101
                    "windows phone"//110
                ],
//1b
                BASIC_DeviceType:[
                    "desktop",//0
                    "mobiledevice"//1
                ],
                FONTS :[
                    "Agency FB",
                    "Aharoni",
                    "Algerian",
                    "Andalus",
                    "Angsana New",
                    "AngsanaUPC",
                    "Aparajita",
                    "Arabic Typesetting",
                    "Arial",
                    "Arial Black",
                    "Arial Narrow",
                    "Arial Rounded MT Bold",
                    "Arial Unicode MS",
                    "Baskerville Old Face",
                    "Batang",
                    "BatangChe",
                    "Bauhaus 93",
                    "Bell MT",
                    "Berlin Sans FB",
                    "Berlin Sans FB Demi",
                    "Bernard MT Condensed",
                    "Bodoni MT",
                    "Bodoni MT Black",
                    "Bodoni MT Poster Compressed",
                    "Book Antiqua",
                    "Bookman Old Style",
                    "Bookshelf Symbol 7",
                    "Britannic Bold",
                    "Broadway",
                    "Browallia New",
                    "BrowalliaUPC",
                    "Brush Script MT",
                    "Calibri",
                    "Calibri Light",
                    "Californian FB",
                    "Calisto MT",
                    "Cambria",
                    "Cambria Math",
                    "Candara",
                    "Castellar",
                    "Centaur",
                    "Century",
                    "Century Gothic",
                    "Century Schoolbook",
                    "Chiller",
                    "Colonna MT",
                    "Comic Sans MS",
                    "Consolas",
                    "Constantia",
                    "Cooper Black",
                    "Copperplate Gothic Bold",
                    "Copperplate Gothic Light",
                    "Corbel",
                    "Cordia New",
                    "CordiaUPC",
                    "Courier New",
                    "Curlz MT",
                    "DFKai-SB",
                    "DaunPenh",
                    "David",
                    "DilleniaUPC",
                    "DokChampa",
                    "Dotum",
                    "DotumChe",
                    "Ebrima",
                    "Edwardian Script ITC",
                    "Elephant",
                    "Engravers MT",
                    "Eras Bold ITC",
                    "Eras Demi ITC",
                    "Eras Light ITC",
                    "Eras Medium ITC",
                    "Estrangelo Edessa",
                    "EucrosiaUPC",
                    "Euphemia",
                    "Felix Titling",
                    "Footlight MT Light",
                    "Forte",
                    "FrankRuehl",
                    "Franklin Gothic Book",
                    "Franklin Gothic Demi",
                    "Franklin Gothic Demi Cond",
                    "Franklin Gothic Heavy",
                    "Franklin Gothic Medium",
                    "Franklin Gothic Medium Cond",
                    "FreesiaUPC",
                    "Freestyle Script",
                    "French Script MT",
                    "Gabriola",
                    "Garamond",
                    "Gautami",
                    "Georgia",
                    "Gigi",
                    "Gill Sans MT",
                    "Gill Sans MT Condensed",
                    "Gill Sans MT Ext Condensed Bold",
                    "Gill Sans Ultra Bold",
                    "Gill Sans Ultra Bold Condensed",
                    "Gisha",
                    "Gloucester MT Extra Condensed",
                    "Goudy Old Style",
                    "Goudy Stout",
                    "Gulim",
                    "GulimChe",
                    "Gungsuh",
                    "GungsuhChe",
                    "Haettenschweiler",
                    "Harlow Solid Italic",
                    "Harrington",
                    "High Tower Text",
                    "Impact",
                    "Imprint MT Shadow",
                    "Informal Roman",
                    "IrisUPC",
                    "Iskoola Pota",
                    "JasmineUPC",
                    "Jokerman",
                    "Juice ITC",
                    "Kalinga",
                    "Kartika",
                    "Khmer UI",
                    "KodchiangUPC",
                    "Kokila",
                    "Kristen ITC",
                    "Kunstler Script",
                    "Lao UI",
                    "Latha",
                    "Leelawadee",
                    "Levenim MT",
                    "LilyUPC",
                    "Lucida Bright",
                    "Lucida Calligraphy",
                    "Lucida Console",
                    "Lucida Fax",
                    "Lucida Handwriting",
                    "Lucida Sans",
                    "Lucida Sans Typewriter",
                    "Lucida Sans Unicode",
                    "MS Gothic",
                    "MS Mincho",
                    "MS Outlook",
                    "MS PGothic",
                    "MS PMincho",
                    "MS Reference Sans Serif",
                    "MS Reference Specialty",
                    "MS UI Gothic",
                    "MT Extra",
                    "MV Boli",
                    "Magneto",
                    "Maiandra GD",
                    "Malgun Gothic",
                    "Mangal",
                    "Marlett",
                    "Matura MT Script Capitals",
                    "Meiryo",
                    "Meiryo UI",
                    "Microsoft Himalaya",
                    "Microsoft JhengHei",
                    "Microsoft New Tai Lue",
                    "Microsoft PhagsPa",
                    "Microsoft Sans Serif",
                    "Microsoft Tai Le",
                    "Microsoft Uighur",
                    "Microsoft Yi Baiti",
                    "MingLiU",
                    "MingLiU-ExtB",
                    "MingLiU_HKSCS",
                    "MingLiU_HKSCS-ExtB",
                    "Miriam",
                    "Miriam Fixed",
                    "Mistral",
                    "Modern No. 20",
                    "Mongolian Baiti",
                    "Monotype Corsiva",
                    "MoolBoran",
                    "Narkisim",
                    "Niagara Engraved",
                    "Niagara Solid",
                    "Nyala",
                    "OCR A Extended",
                    "Old English Text MT",
                    "Onyx",
                    "PMingLiU",
                    "PMingLiU-ExtB",
                    "Palatino Linotype",
                    "Papyrus",
                    "Parchment",
                    "Perpetua",
                    "Perpetua Titling MT",
                    "Plantagenet Cherokee",
                    "Playbill",
                    "Poor Richard",
                    "Pristina",
                    "Raavi",
                    "Ravie",
                    "Rockwell",
                    "Rockwell Condensed",
                    "Rockwell Extra Bold",
                    "Rod",
                    "Sakkal Majalla",
                    "Segoe Print",
                    "Segoe Script",
                    "Segoe UI",
                    "Segoe UI Light",
                    "Segoe UI Semibold",
                    "Segoe UI Symbol",
                    "Shonar Bangla",
                    "Showcard Gothic",
                    "Shruti",
                    "SimSun-ExtB",
                    "Simplified Arabic",
                    "Simplified Arabic Fixed",
                    "Snap ITC",
                    "Stencil",
                    "Sylfaen",
                    "Symbol",
                    "Tahoma",
                    "Tempus Sans ITC",
                    "Times New Roman",
                    "Traditional Arabic",
                    "Trebuchet MS",
                    "Tunga",
                    "Tw Cen MT",
                    "Utsaah",
                    "Vani",
                    "Verdana",
                    "Vijaya",
                    "Viner Hand ITC",
                    "Vivaldi",
                    "Vladimir Script",
                    "Vrinda",
                    "Webdings",
                    "Wide Latin",
                    "Wingdings",
                    "Wingdings 2",
                    "Wingdings 3",
                    "仿宋",
                    "华文中宋",
                    "华文仿宋",
                    "华文宋体",
                    "华文彩云",
                    "华文新魏",
                    "华文楷体",
                    "华文琥珀",
                    "华文细黑",
                    "华文行楷",
                    "华文隶书",
                    "宋体",
                    "幼圆",
                    "微软雅黑",
                    "新宋体",
                    "方正姚体",
                    "方正舒体",
                    "楷体",
                    "隶书",
                    "黑体"
                ],
                WEBGL_contextName_webgl:"webgl",
                WEBGL_contextName_experimental:"experimental-webgl",
                COLLECTOR_LOADER:["desktop",//00
                    "h5",//01
                    "hybrid",//10
                    "nativeapp"//11
                ],
                UNKOWN:"unkown",
                UNKOWN_IX:255,
                UNKOWN_IX2:15,
                CPUNUM_LIST:[1,2,4,8,16,32,64,128],
                BOOLEAN_ENUM:[true,false]
            }
        /***********************************dictionary used during the encoding process end *******************************/

        var hasProp = function(obj){
            if(!obj)
                return false;
            if(typeof(obj)!="object")
                return true;
            for(var p in obj){
                if(Object.prototype.hasOwnProperty.call(obj, p))
                    return true;
            }
            return false;
        }

        var DIGITS_LOWER =
            ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f']
        var toHex=function(data){
            var l = data.length;
            var  out = "";
            // two characters form the hex value.
            for (var i = 0, j = 0; i < l; i++) {
                out += DIGITS_LOWER[(0xF0 & data[i]) >>> 4];
                out += DIGITS_LOWER[0x0F & data[i]];
            }
            return out;
        }
        var stringify1 = (typeof JSON === "undefined" || typeof JSON.stringify === "undefined")?
            function (obj) {
                var t = typeof(obj);
                if (t != "object" || obj === null) {
                    if (t == "string") obj = '"'+obj+'"';
                    return String(obj);
                }
                else {
                    var n, v, json = [], arr = (obj && obj.constructor == Array);
                    for (n in obj) {
                        v = obj[n]; t = typeof(v);
                        if(v===undefined || v==="--") // || !hasProp(v)
                            continue;
                        if (t == "string") v = '"'+v+'"';
                        else if (t == "object" && v !== null) v = stringify1(v);
                        json.push((arr ? "" : '"' + n + '":') + String(v));
                    }
                    return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
                }
            }:JSON.stringify;

        var stringify = function (obj) {
            //static data
            var encoder = new Encoder();
            if(obj.basic) {
                var data = encoder.encodeStatic(pdata);
                var hex = toHex(data);
                return LZString.compressToEncodedURIComponent(hex);
            }else{
                //dynamic data
                var data = encoder.encodeDynamic(obj);
                var hex = toHex(data);
                return LZString.compressToEncodedURIComponent(hex);
            }
        };

        //get the current time
        var currTimes = function(){
            if (typeof window.performance !== 'undefined' && typeof performance.now !== 'undefined')
                return Math.round(performance.now()*1000);
            return (new Date()).getTime()*1000;
        }

        var CookieUtil = (function(){
            var decode = decodeURIComponent;
            var encode = encodeURIComponent;
            var Cookie = {};

            Cookie.get = function(name, options) {
                validateCookieName(name);
                if (typeof options === 'function') {
                    options = { converter: options };
                } else {
                    options = options || {};
                }
                var cookies = parseCookieString(document.cookie, !options['raw']);
                return (options.converter || same)(cookies[name]);
            };

            Cookie.set = function(name, value, options) {
                validateCookieName(name);
                options = options || {};
                var expires = options['expires'];
                var domain = options['domain'];
                var path = options['path'];
                if (!options['raw']) {
                    value = encode(String(value));
                }
                var text = name + '=' + value;
                var date = expires;
                if (typeof date === 'number') {
                    date = new Date();
                    date.setDate(date.getDate() + expires);
                }
                if (date instanceof Date) {
                    text += '; expires=' + date.toUTCString();
                }
                if (isNonEmptyString(domain)) {
                    text += '; domain=' + domain;
                }
                if (isNonEmptyString(path)) {
                    text += '; path=' + path;
                }
                if (options['secure']) {
                    text += '; secure';
                }
                document.cookie = text;
                return text;
            };

            Cookie.remove = function(name, options) {
                options = options || {};
                options['expires'] = new Date(0);
                return this.set(name, '', options);
            };

            function parseCookieString(text, shouldDecode) {
                var cookies = {};

                if (isString(text) && text.length > 0) {
                    var decodeValue = shouldDecode ? decode : same;
                    var cookieParts = text.split(/;\s/g);
                    var cookieName, cookieValue, cookieNameValue;

                    for (var i = 0, len = cookieParts.length; i < len; i++) {
                        cookieNameValue = cookieParts[i].match(/([^=]+)=/i);
                        if (cookieNameValue instanceof Array) {
                            try {
                                cookieName = decode(cookieNameValue[1]);
                                cookieValue = decodeValue(cookieParts[i].substring(cookieNameValue[1].length + 1));
                            } catch (ex) {
                            }
                        } else {
                            cookieName = decode(cookieParts[i]);
                            cookieValue = '';
                        }
                        if (cookieName) {
                            cookies[cookieName] = cookieValue;
                        }
                    }
                }
                return cookies;
            }

            function isString(o) {
                return typeof o === 'string';
            }

            function isNonEmptyString(s) {
                return isString(s) && s !== '';
            }

            function validateCookieName(name) {
                if (!isNonEmptyString(name)) {
                    throw new TypeError('Cookie name must be a non-empty string');
                }
            }

            function same(s) {
                return s;
            }
            return Cookie;
        })();

        /* murmurHash3 algorithm https://github.com/Valve/fingerprintjs2/blob/master/fingerprint2.js */
        var murmurHash3  = (function(){
            var x64Add = function(m, n) {
                    m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
                    n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
                    var o = [0, 0, 0, 0];
                    o[3] += m[3] + n[3];
                    o[2] += o[3] >>> 16;
                    o[3] &= 0xffff;
                    o[2] += m[2] + n[2];
                    o[1] += o[2] >>> 16;
                    o[2] &= 0xffff;
                    o[1] += m[1] + n[1];
                    o[0] += o[1] >>> 16;
                    o[1] &= 0xffff;
                    o[0] += m[0] + n[0];
                    o[0] &= 0xffff;
                    return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
                },
                x64Multiply = function(m, n) {
                    m = [m[0] >>> 16, m[0] & 0xffff, m[1] >>> 16, m[1] & 0xffff];
                    n = [n[0] >>> 16, n[0] & 0xffff, n[1] >>> 16, n[1] & 0xffff];
                    var o = [0, 0, 0, 0];
                    o[3] += m[3] * n[3];
                    o[2] += o[3] >>> 16;
                    o[3] &= 0xffff;
                    o[2] += m[2] * n[3];
                    o[1] += o[2] >>> 16;
                    o[2] &= 0xffff;
                    o[2] += m[3] * n[2];
                    o[1] += o[2] >>> 16;
                    o[2] &= 0xffff;
                    o[1] += m[1] * n[3];
                    o[0] += o[1] >>> 16;
                    o[1] &= 0xffff;
                    o[1] += m[2] * n[2];
                    o[0] += o[1] >>> 16;
                    o[1] &= 0xffff;
                    o[1] += m[3] * n[1];
                    o[0] += o[1] >>> 16;
                    o[1] &= 0xffff;
                    o[0] += (m[0] * n[3]) + (m[1] * n[2]) + (m[2] * n[1]) + (m[3] * n[0]);
                    o[0] &= 0xffff;
                    return [(o[0] << 16) | o[1], (o[2] << 16) | o[3]];
                },
                x64Rotl = function(m, n) {
                    n %= 64;
                    if (n === 32) {
                        return [m[1], m[0]];
                    }
                    else if (n < 32) {
                        return [(m[0] << n) | (m[1] >>> (32 - n)), (m[1] << n) | (m[0] >>> (32 - n))];
                    }
                    else {
                        n -= 32;
                        return [(m[1] << n) | (m[0] >>> (32 - n)), (m[0] << n) | (m[1] >>> (32 - n))];
                    }
                },

                x64LeftShift = function(m, n) {
                    n %= 64;
                    if (n === 0) {
                        return m;
                    }
                    else if (n < 32) {
                        return [(m[0] << n) | (m[1] >>> (32 - n)), m[1] << n];
                    }
                    else {
                        return [m[1] << (n - 32), 0];
                    }
                },
                x64Xor = function(m, n) {
                    return [m[0] ^ n[0], m[1] ^ n[1]];
                },
                x64Fmix = function(h) {
                    h = x64Xor(h, [0, h[0] >>> 1]);
                    h = x64Multiply(h, [0xff51afd7, 0xed558ccd]);
                    h = x64Xor(h, [0, h[0] >>> 1]);
                    h = x64Multiply(h, [0xc4ceb9fe, 0x1a85ec53]);
                    h = x64Xor(h, [0, h[0] >>> 1]);
                    return h;
                };

            return function (key, seed) {
                key = key || "";
                seed = seed || 0;
                var remainder = key.length % 16;
                var bytes = key.length - remainder;
                var h1 = [0, seed];
                var h2 = [0, seed];
                var k1 = [0, 0];
                var k2 = [0, 0];
                var c1 = [0x87c37b91, 0x114253d5];
                var c2 = [0x4cf5ad43, 0x2745937f];
                for (var i = 0; i < bytes; i = i + 16) {
                    k1 = [((key.charCodeAt(i + 4) & 0xff)) | ((key.charCodeAt(i + 5) & 0xff) << 8) | ((key.charCodeAt(i + 6) & 0xff) << 16) | ((key.charCodeAt(i + 7) & 0xff) << 24), ((key.charCodeAt(i) & 0xff)) | ((key.charCodeAt(i + 1) & 0xff) << 8) | ((key.charCodeAt(i + 2) & 0xff) << 16) | ((key.charCodeAt(i + 3) & 0xff) << 24)];
                    k2 = [((key.charCodeAt(i + 12) & 0xff)) | ((key.charCodeAt(i + 13) & 0xff) << 8) | ((key.charCodeAt(i + 14) & 0xff) << 16) | ((key.charCodeAt(i + 15) & 0xff) << 24), ((key.charCodeAt(i + 8) & 0xff)) | ((key.charCodeAt(i + 9) & 0xff) << 8) | ((key.charCodeAt(i + 10) & 0xff) << 16) | ((key.charCodeAt(i + 11) & 0xff) << 24)];
                    k1 = x64Multiply(k1, c1);
                    k1 = x64Rotl(k1, 31);
                    k1 = x64Multiply(k1, c2);
                    h1 = x64Xor(h1, k1);
                    h1 = x64Rotl(h1, 27);
                    h1 = x64Add(h1, h2);
                    h1 = x64Add(x64Multiply(h1, [0, 5]), [0, 0x52dce729]);
                    k2 = x64Multiply(k2, c2);
                    k2 = x64Rotl(k2, 33);
                    k2 = x64Multiply(k2, c1);
                    h2 = x64Xor(h2, k2);
                    h2 = x64Rotl(h2, 31);
                    h2 = x64Add(h2, h1);
                    h2 = x64Add(x64Multiply(h2, [0, 5]), [0, 0x38495ab5]);
                }
                k1 = [0, 0];
                k2 = [0, 0];
                switch(remainder) {
                    case 15:
                        k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 14)], 48));
                    case 14:
                        k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 13)], 40));
                    case 13:
                        k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 12)], 32));
                    case 12:
                        k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 11)], 24));
                    case 11:
                        k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 10)], 16));
                    case 10:
                        k2 = x64Xor(k2, x64LeftShift([0, key.charCodeAt(i + 9)], 8));
                    case 9:
                        k2 = x64Xor(k2, [0, key.charCodeAt(i + 8)]);
                        k2 = x64Multiply(k2, c2);
                        k2 = x64Rotl(k2, 33);
                        k2 = x64Multiply(k2, c1);
                        h2 = x64Xor(h2, k2);
                    case 8:
                        k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 7)], 56));
                    case 7:
                        k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 6)], 48));
                    case 6:
                        k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 5)], 40));
                    case 5:
                        k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 4)], 32));
                    case 4:
                        k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 3)], 24));
                    case 3:
                        k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 2)], 16));
                    case 2:
                        k1 = x64Xor(k1, x64LeftShift([0, key.charCodeAt(i + 1)], 8));
                    case 1:
                        k1 = x64Xor(k1, [0, key.charCodeAt(i)]);
                        k1 = x64Multiply(k1, c1);
                        k1 = x64Rotl(k1, 31);
                        k1 = x64Multiply(k1, c2);
                        h1 = x64Xor(h1, k1);
                }
                h1 = x64Xor(h1, [0, key.length]);
                h2 = x64Xor(h2, [0, key.length]);
                h1 = x64Add(h1, h2);
                h2 = x64Add(h2, h1);
                h1 = x64Fmix(h1);
                h2 = x64Fmix(h2);
                h1 = x64Add(h1, h2);
                h2 = x64Add(h2, h1);
                return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
            };
        })();

        //define a queue.
        function Q(limit) {
            var size = limit || 50, list=[];
            this.push = function(data){
                if (data==null) {
                    return false;
                }
                if (list.length == size) {
                    this.pop();
                }
                list.unshift(data);
                return true;
            }
            this.pop = function() {
                return list.pop();
            }
            this.size = function() {
                return list.length;
            }
            this.getData = function() {
                return list;
            }
        }

        /*JS event handler https://github.com/purplebamboo/JsEvent */
        var JsEvent = function(){
            this._callbacks = {};
            this._fired = {};
        };
        JsEvent.prototype.bind = function(obj, type, fn) {
            if (obj.attachEvent) {
                obj['e' + type + fn] = fn;
                obj[type + fn] = function() {
                    obj['e' + type + fn](window.event);
                }
                obj.attachEvent('on' + type, obj[type + fn]);
            } else obj.addEventListener(type, fn, false);
        }

        JsEvent.prototype.bindOnce = function(obj, type, fn) {
            var self = this;
            var fnProxy = function(){
                fn.apply(this,arguments);
                self.unbind(obj, type, fnProxy);
            }
            this.bind(obj, type, fnProxy);
            return this;
        }

        JsEvent.prototype.unbind = function(obj, type, fn) {
            if (obj.detachEvent) {
                obj.detachEvent('on' + type, obj[type + fn]);
                obj[type + fn] = null;
            } else obj.removeEventListener(type, fn, false);
        }

        JsEvent.prototype.addListener = function(eventname, callback) {
            this._callbacks[eventname] = this._callbacks[eventname] || [];
            this._callbacks[eventname].push(callback);
            return this;
        }

        JsEvent.prototype.once = function(eventname,callback){
            var self = this;
            var callproxy = function(){
                callback.apply(self,arguments);
                self.removeListener(eventname, callproxy);
            }
            self.addListener(eventname,callproxy);
            return this;
        }

        JsEvent.prototype.removeListener = function(eventname,callback){
            var cbs = this._callbacks,cbList,cblength;
            if(!eventname) return this;
            if(!callback){
                cbs[eventname] = [];
            }else{
                cbList = cbs[eventname];
                if (!cbList) return this;
                cblength = cbList.length;
                for (var i = 0; i < cblength; i++) {
                    if (callback === cbList[i]) {
                        cbList.splice(i, 1);
                        break;
                    }
                }
            }
        }

        JsEvent.prototype.fire = function(eventname,data){
            var cbs = this._callbacks,fd = this._fired,cbList,i,l;
            if(!cbs[eventname]) return this;
            cbList = cbs[eventname];
            if (cbList) {
                for (i = 0, l = cbList.length; i < l; i++) {
                    cbList[i].apply(this,Array.prototype.slice.call(arguments, 1));
                }
            }
        }

        JsEvent.prototype._when = function(){
            var events,callback,isOnce,i,l,self,argsLength,bindMethod;
            argsLength = arguments.length;
            events = Array.prototype.slice.apply(arguments, [0, argsLength - 2]);
            callback = arguments[argsLength - 2];
            isOnce = arguments[argsLength - 1];
            if (typeof callback !== "function") {
                return this;
            }
            self = this;
            l = events.length;
            var isOk = function(){
                var data = [];
                var isok = true;
                for (var i = 0; i < l; i++) {

                    if(!self._fired.hasOwnProperty(events[i])||!self._fired[events[i]].hasOwnProperty("data")){
                        isok = false;
                        break;
                    }
                    var d = self._fired[events[i]].data;
                    data.push(d);
                }
                if(isok) callback.apply(null, [data]);

            }
            bindMethod = isOnce ? "once" : "addListener";
            var _bind =function(key){
                self[bindMethod](key, function(data){
                    self._fired[key] = self._fired[key] || {};
                    self._fired[key].data = data;
                    isOk();
                })
            }
            for(i=0;i<l;i++){
                _bind(events[i]);
            }
        }

        JsEvent.prototype.when = function(){
            var args = Array.prototype.concat.apply([], arguments);
            args.push(false);
            this._when.apply(this, args);
            return this;
        }

        JsEvent.prototype.whenOnce = function(){
            var args = Array.prototype.concat.apply([], arguments);
            args.push(true);
            this._when.apply(this, args);
            return this;
        }

        JsEvent.prototype.after = function(eventName, times, callback){
            if (times === 0) {
                callback.apply(null,[]);
                return this;
            }
            var self = this;
            var dataArray = [];
            var afterFun = function(data){
                dataArray.push(data);
                times--;
                if(times < 1){
                    self.removeListener(eventName, afterFun);
                    callback.apply(self,[dataArray]);
                }
            }
            self.addListener(eventName,afterFun);
            return this;
        }

        var LZString = (function(){
            var keyStrUriSafe = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$";
            var f = String.fromCharCode;
            var baseReverseDic = {};
            var getBaseValue = function(alphabet, character) {
                if (!baseReverseDic[alphabet]) {
                    baseReverseDic[alphabet] = {};
                    for (var i=0 ; i<alphabet.length ; i++) {
                        baseReverseDic[alphabet][alphabet.charAt(i)] = i;
                    }
                }
                return baseReverseDic[alphabet][character];
            }
            var _compress = function (uncompressed, bitsPerChar, getCharFromInt) {
                if (uncompressed == null) return "";
                var i, value,
                    context_dictionary= {},
                    context_dictionaryToCreate= {},
                    context_c="",
                    context_wc="",
                    context_w="",
                    context_enlargeIn= 2, // Compensate for the first entry which should not count
                    context_dictSize= 3,
                    context_numBits= 2,
                    context_data=[],
                    context_data_val=0,
                    context_data_position=0,
                    ii;

                for (ii = 0; ii < uncompressed.length; ii += 1) {
                    context_c = uncompressed.charAt(ii);
                    if (!Object.prototype.hasOwnProperty.call(context_dictionary,context_c)) {
                        context_dictionary[context_c] = context_dictSize++;
                        context_dictionaryToCreate[context_c] = true;
                    }

                    context_wc = context_w + context_c;
                    if (Object.prototype.hasOwnProperty.call(context_dictionary,context_wc)) {
                        context_w = context_wc;
                    } else {
                        if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
                            if (context_w.charCodeAt(0)<256) {
                                for (i=0 ; i<context_numBits ; i++) {
                                    context_data_val = (context_data_val << 1);
                                    if (context_data_position == bitsPerChar-1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                }
                                value = context_w.charCodeAt(0);
                                for (i=0 ; i<8 ; i++) {
                                    context_data_val = (context_data_val << 1) | (value&1);
                                    if (context_data_position == bitsPerChar-1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            } else {
                                value = 1;
                                for (i=0 ; i<context_numBits ; i++) {
                                    context_data_val = (context_data_val << 1) | value;
                                    if (context_data_position ==bitsPerChar-1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = 0;
                                }
                                value = context_w.charCodeAt(0);
                                for (i=0 ; i<16 ; i++) {
                                    context_data_val = (context_data_val << 1) | (value&1);
                                    if (context_data_position == bitsPerChar-1) {
                                        context_data_position = 0;
                                        context_data.push(getCharFromInt(context_data_val));
                                        context_data_val = 0;
                                    } else {
                                        context_data_position++;
                                    }
                                    value = value >> 1;
                                }
                            }
                            context_enlargeIn--;
                            if (context_enlargeIn == 0) {
                                context_enlargeIn = Math.pow(2, context_numBits);
                                context_numBits++;
                            }
                            delete context_dictionaryToCreate[context_w];
                        } else {
                            value = context_dictionary[context_w];
                            for (i=0 ; i<context_numBits ; i++) {
                                context_data_val = (context_data_val << 1) | (value&1);
                                if (context_data_position == bitsPerChar-1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }


                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        // Add wc to the dictionary.
                        context_dictionary[context_wc] = context_dictSize++;
                        context_w = String(context_c);
                    }
                }

                if (context_w !== "") {
                    if (Object.prototype.hasOwnProperty.call(context_dictionaryToCreate,context_w)) {
                        if (context_w.charCodeAt(0)<256) {
                            for (i=0 ; i<context_numBits ; i++) {
                                context_data_val = (context_data_val << 1);
                                if (context_data_position == bitsPerChar-1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                            }
                            value = context_w.charCodeAt(0);
                            for (i=0 ; i<8 ; i++) {
                                context_data_val = (context_data_val << 1) | (value&1);
                                if (context_data_position == bitsPerChar-1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        } else {
                            value = 1;
                            for (i=0 ; i<context_numBits ; i++) {
                                context_data_val = (context_data_val << 1) | value;
                                if (context_data_position == bitsPerChar-1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = 0;
                            }
                            value = context_w.charCodeAt(0);
                            for (i=0 ; i<16 ; i++) {
                                context_data_val = (context_data_val << 1) | (value&1);
                                if (context_data_position == bitsPerChar-1) {
                                    context_data_position = 0;
                                    context_data.push(getCharFromInt(context_data_val));
                                    context_data_val = 0;
                                } else {
                                    context_data_position++;
                                }
                                value = value >> 1;
                            }
                        }
                        context_enlargeIn--;
                        if (context_enlargeIn == 0) {
                            context_enlargeIn = Math.pow(2, context_numBits);
                            context_numBits++;
                        }
                        delete context_dictionaryToCreate[context_w];
                    } else {
                        value = context_dictionary[context_w];
                        for (i=0 ; i<context_numBits ; i++) {
                            context_data_val = (context_data_val << 1) | (value&1);
                            if (context_data_position == bitsPerChar-1) {
                                context_data_position = 0;
                                context_data.push(getCharFromInt(context_data_val));
                                context_data_val = 0;
                            } else {
                                context_data_position++;
                            }
                            value = value >> 1;
                        }


                    }
                    context_enlargeIn--;
                    if (context_enlargeIn == 0) {
                        context_enlargeIn = Math.pow(2, context_numBits);
                        context_numBits++;
                    }
                }

                value = 2;
                for (i=0 ; i<context_numBits ; i++) {
                    context_data_val = (context_data_val << 1) | (value&1);
                    if (context_data_position == bitsPerChar-1) {
                        context_data_position = 0;
                        context_data.push(getCharFromInt(context_data_val));
                        context_data_val = 0;
                    } else {
                        context_data_position++;
                    }
                    value = value >> 1;
                }

                // Flush the last char
                while (true) {
                    context_data_val = (context_data_val << 1);
                    if (context_data_position == bitsPerChar-1) {
                        context_data.push(getCharFromInt(context_data_val));
                        break;
                    }
                    else context_data_position++;
                }
                return context_data.join('');
            }
            var _decompress=function(length, resetValue, getNextValue) {
                var dictionary = [],
                    next,
                    enlargeIn = 4,
                    dictSize = 4,
                    numBits = 3,
                    entry = "",
                    result = [],
                    i,
                    w,
                    bits, resb, maxpower, power,
                    c,
                    data = {val:getNextValue(0), position:resetValue, index:1};

                for (i = 0; i < 3; i += 1) {
                    dictionary[i] = i;
                }

                bits = 0;
                maxpower = Math.pow(2,2);
                power=1;
                while (power!=maxpower) {
                    resb = data.val & data.position;
                    data.position >>= 1;
                    if (data.position == 0) {
                        data.position = resetValue;
                        data.val = getNextValue(data.index++);
                    }
                    bits |= (resb>0 ? 1 : 0) * power;
                    power <<= 1;
                }

                switch (next = bits) {
                    case 0:
                        bits = 0;
                        maxpower = Math.pow(2,8);
                        power=1;
                        while (power!=maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb>0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        c = f(bits);
                        break;
                    case 1:
                        bits = 0;
                        maxpower = Math.pow(2,16);
                        power=1;
                        while (power!=maxpower) {
                            resb = data.val & data.position;
                            data.position >>= 1;
                            if (data.position == 0) {
                                data.position = resetValue;
                                data.val = getNextValue(data.index++);
                            }
                            bits |= (resb>0 ? 1 : 0) * power;
                            power <<= 1;
                        }
                        c = f(bits);
                        break;
                    case 2:
                        return "";
                }
                dictionary[3] = c;
                w = c;
                result.push(c);
                while (true) {
                    if (data.index > length) {
                        return "";
                    }

                    bits = 0;
                    maxpower = Math.pow(2,numBits);
                    power=1;
                    while (power!=maxpower) {
                        resb = data.val & data.position;
                        data.position >>= 1;
                        if (data.position == 0) {
                            data.position = resetValue;
                            data.val = getNextValue(data.index++);
                        }
                        bits |= (resb>0 ? 1 : 0) * power;
                        power <<= 1;
                    }

                    switch (c = bits) {
                        case 0:
                            bits = 0;
                            maxpower = Math.pow(2,8);
                            power=1;
                            while (power!=maxpower) {
                                resb = data.val & data.position;
                                data.position >>= 1;
                                if (data.position == 0) {
                                    data.position = resetValue;
                                    data.val = getNextValue(data.index++);
                                }
                                bits |= (resb>0 ? 1 : 0) * power;
                                power <<= 1;
                            }

                            dictionary[dictSize++] = f(bits);
                            c = dictSize-1;
                            enlargeIn--;
                            break;
                        case 1:
                            bits = 0;
                            maxpower = Math.pow(2,16);
                            power=1;
                            while (power!=maxpower) {
                                resb = data.val & data.position;
                                data.position >>= 1;
                                if (data.position == 0) {
                                    data.position = resetValue;
                                    data.val = getNextValue(data.index++);
                                }
                                bits |= (resb>0 ? 1 : 0) * power;
                                power <<= 1;
                            }
                            dictionary[dictSize++] = f(bits);
                            c = dictSize-1;
                            enlargeIn--;
                            break;
                        case 2:
                            return result.join('');
                    }

                    if (enlargeIn == 0) {
                        enlargeIn = Math.pow(2, numBits);
                        numBits++;
                    }

                    if (dictionary[c]) {
                        entry = dictionary[c];
                    } else {
                        if (c === dictSize) {
                            entry = w + w.charAt(0);
                        } else {
                            return null;
                        }
                    }
                    result.push(entry);

                    // Add w+entry[0] to the dictionary.
                    dictionary[dictSize++] = w + entry.charAt(0);
                    enlargeIn--;

                    w = entry;

                    if (enlargeIn == 0) {
                        enlargeIn = Math.pow(2, numBits);
                        numBits++;
                    }

                }
            }
            return {compressToEncodedURIComponent: function (input) {
                    if (input == null) return "";
                    return _compress(input, 6, function(a){return keyStrUriSafe.charAt(a);});
                },decompressFromEncodedURIComponent:function(compressed){
                    if (!compressed||compressed==null||compressed=="") return undefined;
                    compressed = compressed.replace(/ /g, "+");
                    return _decompress(compressed.length, 32, function(index) { return getBaseValue(keyStrUriSafe, compressed.charAt(index)); });}
            }
        })()

        if(flashEnable&&!swfobject){
            /*!    SWFObject v2.3.20130521 <http://github.com/swfobject/swfobject>
             is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
             */
            var swfobject=function(){var D="undefined",r="object",T="Shockwave Flash",Z="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",S="SWFObjectExprInst",x="onreadystatechange",Q=window,h=document,t=navigator,V=false,X=[],o=[],P=[],K=[],I,p,E,B,L=false,a=false,m,G,j=true,l=false,O=function(){var ad=typeof h.getElementById!=D&&typeof h.getElementsByTagName!=D&&typeof h.createElement!=D,ak=t.userAgent.toLowerCase(),ab=t.platform.toLowerCase(),ah=ab?/win/.test(ab):/win/.test(ak),af=ab?/mac/.test(ab):/mac/.test(ak),ai=/webkit/.test(ak)?parseFloat(ak.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,aa=t.appName==="Microsoft Internet Explorer",aj=[0,0,0],ae=null;if(typeof t.plugins!=D&&typeof t.plugins[T]==r){ae=t.plugins[T].description;if(ae&&(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&t.mimeTypes[q].enabledPlugin)){V=true;aa=false;ae=ae.replace(/^.*\s+(\S+\s+\S+$)/,"$1");aj[0]=n(ae.replace(/^(.*)\..*$/,"$1"));aj[1]=n(ae.replace(/^.*\.(.*)\s.*$/,"$1"));aj[2]=/[a-zA-Z]/.test(ae)?n(ae.replace(/^.*[a-zA-Z]+(.*)$/,"$1")):0}}else{if(typeof Q.ActiveXObject!=D){try{var ag=new ActiveXObject(Z);if(ag){ae=ag.GetVariable("$version");if(ae){aa=true;ae=ae.split(" ")[1].split(",");aj=[n(ae[0]),n(ae[1]),n(ae[2])]}}}catch(ac){}}}return{w3:ad,pv:aj,wk:ai,ie:aa,win:ah,mac:af}}(),i=function(){if(!O.w3){return}if((typeof h.readyState!=D&&(h.readyState==="complete"||h.readyState==="interactive"))||(typeof h.readyState==D&&(h.getElementsByTagName("body")[0]||h.body))){f()}if(!L){if(typeof h.addEventListener!=D){h.addEventListener("DOMContentLoaded",f,false)}if(O.ie){h.attachEvent(x,function aa(){if(h.readyState=="complete"){h.detachEvent(x,aa);f()}});if(Q==top){(function ac(){if(L){return}try{h.documentElement.doScroll("left")}catch(ad){setTimeout(ac,0);return}f()}())}}if(O.wk){(function ab(){if(L){return}if(!/loaded|complete/.test(h.readyState)){setTimeout(ab,0);return}f()}())}}}();function f(){if(L||!document.getElementsByTagName("body")[0]){return}try{var ac,ad=C("span");ad.style.display="none";ac=h.getElementsByTagName("body")[0].appendChild(ad);ac.parentNode.removeChild(ac);ac=null;ad=null}catch(ae){return}L=true;var aa=X.length;for(var ab=0;ab<aa;ab++){X[ab]()}}function M(aa){if(L){aa()}else{X[X.length]=aa}}function s(ab){if(typeof Q.addEventListener!=D){Q.addEventListener("load",ab,false)}else{if(typeof h.addEventListener!=D){h.addEventListener("load",ab,false)}else{if(typeof Q.attachEvent!=D){g(Q,"onload",ab)}else{if(typeof Q.onload=="function"){var aa=Q.onload;Q.onload=function(){aa();ab()}}else{Q.onload=ab}}}}}function Y(){var aa=h.getElementsByTagName("body")[0];var ae=C(r);ae.setAttribute("style","visibility: hidden;");ae.setAttribute("type",q);var ad=aa.appendChild(ae);if(ad){var ac=0;(function ab(){if(typeof ad.GetVariable!=D){try{var ag=ad.GetVariable("$version");if(ag){ag=ag.split(" ")[1].split(",");O.pv=[n(ag[0]),n(ag[1]),n(ag[2])]}}catch(af){O.pv=[8,0,0]}}else{if(ac<10){ac++;setTimeout(ab,10);return}}aa.removeChild(ae);ad=null;H()}())}else{H()}}function H(){var aj=o.length;if(aj>0){for(var ai=0;ai<aj;ai++){var ab=o[ai].id;var ae=o[ai].callbackFn;var ad={success:false,id:ab};if(O.pv[0]>0){var ah=c(ab);if(ah){if(F(o[ai].swfVersion)&&!(O.wk&&O.wk<312)){w(ab,true);if(ae){ad.success=true;ad.ref=z(ab);if(ad)ad.id=ab;ae(ad)}}else{if(o[ai].expressInstall&&A()){var al={};al.data=o[ai].expressInstall;al.width=ah.getAttribute("width")||"0";al.height=ah.getAttribute("height")||"0";if(ah.getAttribute("class")){al.styleclass=ah.getAttribute("class")}if(ah.getAttribute("align")){al.align=ah.getAttribute("align")}var ak={};var aa=ah.getElementsByTagName("param");var af=aa.length;for(var ag=0;ag<af;ag++){if(aa[ag].getAttribute("name").toLowerCase()!="movie"){ak[aa[ag].getAttribute("name")]=aa[ag].getAttribute("value")}}R(al,ak,ab,ae)}else{b(ah);if(ae){ae(ad)}}}}}else{w(ab,true);if(ae){var ac=z(ab);if(ac&&typeof ac.SetVariable!=D){ad.success=true;ad.ref=ac;if(ad&&ac)ad.id=ac.id}ae(ad)}}}}}X[0]=function(){if(V){Y()}else{H()}};function z(ac){var aa=null,ab=c(ac);if(ab&&ab.nodeName.toUpperCase()==="OBJECT"){if(typeof ab.SetVariable!==D){aa=ab}else{aa=ab.getElementsByTagName(r)[0]||ab}}return aa}function A(){return !a&&F("6.0.65")&&(O.win||O.mac)&&!(O.wk&&O.wk<312)}function R(ad,ae,aa,ac){var ah=c(aa);aa=W(aa);a=true;E=ac||null;B={success:false,id:aa};if(ah){if(ah.nodeName.toUpperCase()=="OBJECT"){I=J(ah);p=null}else{I=ah;p=aa}ad.id=S;if(typeof ad.width==D||(!/%$/.test(ad.width)&&n(ad.width)<310)){ad.width="310"}if(typeof ad.height==D||(!/%$/.test(ad.height)&&n(ad.height)<137)){ad.height="137"}var ag=O.ie?"ActiveX":"PlugIn",af="MMredirectURL="+encodeURIComponent(Q.location.toString().replace(/&/g,"%26"))+"&MMplayerType="+ag+"&MMdoctitle="+encodeURIComponent(h.title.slice(0,47)+" - Flash Player Installation");if(typeof ae.flashvars!=D){ae.flashvars+="&"+af}else{ae.flashvars=af}if(O.ie&&ah.readyState!=4){var ab=C("div");
                aa+="SWFObjectNew";ab.setAttribute("id",aa);ah.parentNode.insertBefore(ab,ah);ah.style.display="none";y(ah)}u(ad,ae,aa)}}function b(ab){if(O.ie&&ab.readyState!=4){ab.style.display="none";var aa=C("div");ab.parentNode.insertBefore(aa,ab);aa.parentNode.replaceChild(J(ab),aa);y(ab)}else{ab.parentNode.replaceChild(J(ab),ab)}}function J(af){var ae=C("div");if(O.win&&O.ie){ae.innerHTML=af.innerHTML}else{var ab=af.getElementsByTagName(r)[0];if(ab){var ag=ab.childNodes;if(ag){var aa=ag.length;for(var ad=0;ad<aa;ad++){if(!(ag[ad].nodeType==1&&ag[ad].nodeName=="PARAM")&&!(ag[ad].nodeType==8)){ae.appendChild(ag[ad].cloneNode(true))}}}}}return ae}function k(aa,ab){var ac=C("div");ac.innerHTML="<object classid='clsid:D27CDB6E-AE6D-11cf-96B8-444553540000'><param name='movie' value='"+aa+"'>"+ab+"</object>";return ac.firstChild}function u(ai,ag,ab){var aa,ad=c(ab);ab=W(ab);if(O.wk&&O.wk<312){return aa}if(ad){var ac=(O.ie)?C("div"):C(r),af,ah,ae;if(typeof ai.id==D){ai.id=ab}for(ae in ag){if(ag.hasOwnProperty(ae)&&ae.toLowerCase()!=="movie"){e(ac,ae,ag[ae])}}if(O.ie){ac=k(ai.data,ac.innerHTML)}for(af in ai){if(ai.hasOwnProperty(af)){ah=af.toLowerCase();if(ah==="styleclass"){ac.setAttribute("class",ai[af])}else{if(ah!=="classid"&&ah!=="data"){ac.setAttribute(af,ai[af])}}}}if(O.ie){P[P.length]=ai.id}else{ac.setAttribute("type",q);ac.setAttribute("data",ai.data)}ad.parentNode.replaceChild(ac,ad);aa=ac}return aa}function e(ac,aa,ab){var ad=C("param");ad.setAttribute("name",aa);ad.setAttribute("value",ab);ac.appendChild(ad)}function y(ac){var ab=c(ac);if(ab&&ab.nodeName.toUpperCase()=="OBJECT"){if(O.ie){ab.style.display="none";(function aa(){if(ab.readyState==4){for(var ad in ab){if(typeof ab[ad]=="function"){ab[ad]=null}}ab.parentNode.removeChild(ab)}else{setTimeout(aa,10)}}())}else{ab.parentNode.removeChild(ab)}}}function U(aa){return(aa&&aa.nodeType&&aa.nodeType===1)}function W(aa){return(U(aa))?aa.id:aa}function c(ac){if(U(ac)){return ac}var aa=null;try{aa=h.getElementById(ac)}catch(ab){}return aa}function C(aa){return h.createElement(aa)}function n(aa){return parseInt(aa,10)}function g(ac,aa,ab){ac.attachEvent(aa,ab);K[K.length]=[ac,aa,ab]}function F(ac){ac+="";var ab=O.pv,aa=ac.split(".");aa[0]=n(aa[0]);aa[1]=n(aa[1])||0;aa[2]=n(aa[2])||0;return(ab[0]>aa[0]||(ab[0]==aa[0]&&ab[1]>aa[1])||(ab[0]==aa[0]&&ab[1]==aa[1]&&ab[2]>=aa[2]))?true:false}function v(af,ab,ag,ae){var ad=h.getElementsByTagName("head")[0];if(!ad){return}var aa=(typeof ag=="string")?ag:"screen";if(ae){m=null;G=null}if(!m||G!=aa){var ac=C("style");ac.setAttribute("type","text/css");ac.setAttribute("media",aa);m=ad.appendChild(ac);if(O.ie&&typeof h.styleSheets!=D&&h.styleSheets.length>0){m=h.styleSheets[h.styleSheets.length-1]}G=aa}if(m){if(typeof m.addRule!=D){m.addRule(af,ab)}else{if(typeof h.createTextNode!=D){m.appendChild(h.createTextNode(af+" {"+ab+"}"))}}}}function w(ad,aa){if(!j){return}var ab=aa?"visible":"hidden",ac=c(ad);if(L&&ac){ac.style.visibility=ab}else{if(typeof ad==="string"){v("#"+ad,"visibility:"+ab)}}}function N(ab){var ac=/[\\\"<>\.;]/;var aa=ac.exec(ab)!=null;return aa&&typeof encodeURIComponent!=D?encodeURIComponent(ab):ab}var d=function(){if(O.ie){window.attachEvent("onunload",function(){var af=K.length;for(var ae=0;ae<af;ae++){K[ae][0].detachEvent(K[ae][1],K[ae][2])}var ac=P.length;for(var ad=0;ad<ac;ad++){y(P[ad])}for(var ab in O){O[ab]=null}O=null;for(var aa in swfobject){swfobject[aa]=null}swfobject=null})}}();return{registerObject:function(ae,aa,ad,ac){if(O.w3&&ae&&aa){var ab={};ab.id=ae;ab.swfVersion=aa;ab.expressInstall=ad;ab.callbackFn=ac;o[o.length]=ab;w(ae,false)}else{if(ac){ac({success:false,id:ae})}}},getObjectById:function(aa){if(O.w3){return z(aa)}},embedSWF:function(af,al,ai,ak,ab,ae,ad,ah,aj,ag){var ac=W(al),aa={success:false,id:ac};if(O.w3&&!(O.wk&&O.wk<312)&&af&&al&&ai&&ak&&ab){w(ac,false);M(function(){ai+="";ak+="";var an={};if(aj&&typeof aj===r){for(var aq in aj){an[aq]=aj[aq]}}an.data=af;an.width=ai;an.height=ak;var ar={};if(ah&&typeof ah===r){for(var ao in ah){ar[ao]=ah[ao]}}if(ad&&typeof ad===r){for(var am in ad){if(ad.hasOwnProperty(am)){var ap=(l)?encodeURIComponent(am):am,at=(l)?encodeURIComponent(ad[am]):ad[am];if(typeof ar.flashvars!=D){ar.flashvars+="&"+ap+"="+at}else{ar.flashvars=ap+"="+at}}}}if(F(ab)){var au=u(an,ar,al);if(an.id==ac){w(ac,true)}aa.success=true;aa.ref=au;if(aa&&au) aa.id=au.id}else{if(ae&&A()){an.data=ae;R(an,ar,al,ag);return}else{w(ac,true)}}if(ag){ag(aa)}})}else{if(ag){ag(aa)}}},switchOffAutoHideShow:function(){j=false},enableUriEncoding:function(aa){l=(typeof aa===D)?true:aa},ua:O,getFlashPlayerVersion:function(){return{major:O.pv[0],minor:O.pv[1],release:O.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(ac,ab,aa){if(O.w3){return u(ac,ab,aa)}else{return undefined}},showExpressInstall:function(ac,ad,aa,ab){if(O.w3&&A()){R(ac,ad,aa,ab)}},removeSWF:function(aa){if(O.w3){y(aa)}},createCSS:function(ad,ac,ab,aa){if(O.w3){v(ad,ac,ab,aa)}},addDomLoadEvent:M,addLoadEvent:s,getQueryParamValue:function(ad){var ac=h.location.search||h.location.hash;
                    if(ac){if(/\?/.test(ac)){ac=ac.split("?")[1]}if(ad==null){return N(ac)}var ab=ac.split("&");for(var aa=0;aa<ab.length;aa++){if(ab[aa].substring(0,ab[aa].indexOf("="))==ad){return N(ab[aa].substring((ab[aa].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var aa=c(S);if(aa&&I){aa.parentNode.replaceChild(I,aa);if(p){w(p,true);if(O.ie){I.style.display="block"}}if(E){E(B)}}a=false}},version:"2.3"}}();
        }

        'use strict';
        var cors = (function() {
            var win = window,
                CORSxhr = (function () {
                    var xhr;
                    if (win.XMLHttpRequest && ('withCredentials' in new win.XMLHttpRequest())) {
                        xhr = win.XMLHttpRequest;
                    } else if (win.XDomainRequest) {
                        xhr = win.XDomainRequest;
                    }
                    return xhr;
                }()), methods = ['head', 'get', 'post', 'put', 'delete'], cors = {};

            function Request(options) {
                this.init(options);
            }

            Request.prototype.init = function (options) {
                var that = this;
                that.xhr = new CORSxhr();
                that.method = options.method;
                that.url = options.url;
                that.success = options.success;
                that.error = options.error;
                try { //not compatible with IE lower version.
                    that.xhr.timeout = 2000; // 毫秒数
                    that.xhr.ontimeout = function (e) {};
                    if (options.credentials === true) {
                        that.xhr.withCredentials = true;
                    }
                }catch(e){}
                var sendData = (options.params)?options.params:options.data;
                that.headers = options.headers;
                that.send(sendData);
                return that;
            };

            Request.prototype.send = function (data) {
                var that = this;
                if (that.success !== undefined) {
                    that.xhr.onload = function () {
                        that.success.call(this, this.responseText);
                    };
                }
                if (that.error !== undefined) {
                    that.xhr.error = function () {
                        that.error.call(this, this.responseText);
                    };
                }
                that.xhr.open(that.method, that.url, true);
                that.xhr.withCredentials=true;
                if (that.headers !== undefined) {
                    that.setHeaders();
                }
                if(data)
                    that.xhr.send(data);
                else
                    that.xhr.send();
                return that;
            };

            Request.prototype.setHeaders = function () {
                var that = this,
                    headers = that.headers,
                    key;
                try {
                    for (key in headers) {
                        if (headers.hasOwnProperty(key)) {
                            that.xhr.setRequestHeader(key, headers[key]);
                        }
                    }
                }catch(e){}
                return that;
            };

            for (var i=0; i < methods.length; i++) {
                (function () {
                    var method = methods[i];
                    cors[method] = function (url, success) {
                        var options = {};
                        if (url === undefined) {
                            throw new Error('CORS: url must be defined');
                        }
                        if (typeof url === 'object') {
                            options = url;
                        } else {
                            if (typeof success === 'function') {
                                options.success = success;
                            }
                            options.url = url;
                        }
                        options.method = method.toUpperCase();
                        return new Request(options).xhr;
                    };
                }());
            }
            return cors;
        })();

        var pdata = {basic: {}, header: {}, navigator: {}, screenData:{}, sysfonts:{}, geoAndISP:{}, webGL:{}, webRtc:{}, battery:{}, browserType:{}, performanceTiming:{}, canvasFp:{}, visTime:[], flash:{}, other:{}}; //定义需要获取的数据

        /*-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-start to get data asynchronize =-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/
        var latitude, longitude;
        /**
         (function getLocation(){
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition(function(position){
                latitude = position.coords.latitude;
                longitude = position.coords.longitude;
            });
        }
    })(); */

        var mediaSources = [], ipaddrs = [], iceCandidates = [];
        var deviceCount, hasMicrophone, hasWebcam, hasSpeakers, iceSupport;
        /*try{
         if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
         //enumerateDevices() not supported.
         } else {
         navigator.mediaDevices.enumerateDevices().then(function(devices) {
         deviceCount = devices.length;
         devices.forEach(function(device) {
         mediaSources.push({"id":device.deviceId, "kind":device.kind, "label":device.label, "groupid":device.groupId});
         if (device.kind === 'audioinput')
         hasMicrophone = true;
         else if (device.kind === 'audiooutput')
         hasSpeakers = true;
         else if (device.kind === 'videoinput')
         hasWebcam = true;
         });
         }).catch(function(err) {
         log(err.name + ": " + err.message);
         });

         }
         }catch(e){}*/

        var getIPs = function(callback){
            try {
                var ip_dups = {};
                var RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
                var useWebKit = !!window.webkitRTCPeerConnection;

                if(!RTCPeerConnection){
                    //create an iframe node
                    var iframe = document.createElement('iframe');
                    iframe.style.display = 'none';
                    //invalidate content script
                    iframe.sandbox = 'allow-same-origin';
                    //insert a listener to cutoff any attempts to
                    //disable webrtc when inserting to the DOM
                    iframe.addEventListener("DOMNodeInserted", function(e){
                        e.stopPropagation();
                    }, false);
                    iframe.addEventListener("DOMNodeInsertedIntoDocument", function(e){
                        e.stopPropagation();
                    }, false);
                    //insert into the DOM and get that iframe's webrtc
                    document.documentElement.appendChild(iframe);
                    var win = iframe.contentWindow;
                    RTCPeerConnection = win.RTCPeerConnection
                        || win.mozRTCPeerConnection
                        || win.webkitRTCPeerConnection;
                    useWebKit = !!win.webkitRTCPeerConnection;
                }
                var mediaConstraints = {
                    optional: [{RtpDataChannels: true}]
                };

                var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
                var pc = new RTCPeerConnection(servers, mediaConstraints);

                function handleCandidate(candidate) {
                    if(!candidate) return;
                    var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{0,4}){5})/;
                    var ip = ip_regex.exec(candidate);
                    if(ip === null || ip.length<1){
                        return;
                    }
                    var ip_addr = ip[1];
                    if (ip_dups[ip_addr] === undefined)
                        callback(ip_addr);
                    ip_dups[ip_addr] = true;
                }

                pc.onicecandidate = function (ice) {
                    iceSupport = true;
                    if (ice.candidate) {
                        handleCandidate(ice.candidate.candidate);
                        if (ice.candidate.candidate)
                            iceCandidates.push(ice.candidate.candidate);
                    }
                };
                pc.createDataChannel("");

                pc.createOffer(function (result) {
                    pc.setLocalDescription(result, function () {
                    }, function () {
                    });
                }, function () {
                }).catch(function(err){});

                setTimeout(function () {
                    try {
                        if (pc && pc.localDescription && pc.localDescription.sdp) {
                            var lines = pc.localDescription.sdp.split('\n');
                            lines.forEach(function (line) {
                                if (undefined!=line&&line.indexOf('a=candidate:') === 0)
                                    handleCandidate(line);
                            });
                        }
                    }catch (err) {
                    }
                }, 100);
            }catch(e){}
        }
        getIPs(function(ip){ipaddrs.push(ip);});

        /*-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-get data asynchronize end-=-=-=-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=*/

        var basic = function(){
            var getOs = function(){
                var os = "Other";
                var userAgent = navigator.userAgent.toLowerCase();
                if(userAgent.indexOf("windows phone") >= 0){
                    os = "Windows Phone";
                } else if(userAgent.indexOf("win") >= 0){
                    os = "Windows";
                } else if(userAgent.indexOf("android") >= 0){
                    os = "Android";
                } else if(userAgent.indexOf("linux") >= 0){
                    os = "Linux";
                } else if(userAgent.indexOf("iphone") >= 0 || userAgent.indexOf("ipad") >= 0 ){
                    os = "iOS";
                } else if(userAgent.indexOf("mac") >= 0){
                    os = "Mac";
                }
                return os;
            }
            return {
                "platform":navigator.platform.toLowerCase(),
                "os":getOs(),
                "architecture":navigator.oscpu,
                "DeviceType":(("ontouchstart" in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0))?"mobileDevice":"desktop",
                "Browser":(function(){
                    var ua= navigator.userAgent, tem,
                        M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
                    if(/trident/i.test(M[1])){
                        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
                        return 'IE '+(tem[1] || '');
                    }
                    if(M[1]=== 'Chrome'){
                        tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
                        if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
                    }
                    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
                    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
                    return M.join(' ');
                })(),
                "localStorage":!!getWindowProp("localStorage"),
                "sessionStorage":!!getWindowProp("sessionStorage")
            };
        }
        function getWindowProp(p){
            try{
                return window[p];
            }catch(e){
                log(e);
            }
            return null;
        }
        var header = function(){
            return {
                "Connection":navigator.onLine,
                //"Accept":"--XX",
                //"Upgrade-Insecure-Requests":"--XX",
                //"Accept-Encoding":"--XX",
                //"Accept-Language":"--XX",
                "historyLength":history.length
            };
        }

        var navigatorData = function(){

            var getIEPlugins = function(){
                var result = [];
                if((Object.getOwnPropertyDescriptor && Object.getOwnPropertyDescriptor(window, "ActiveXObject")) || ("ActiveXObject" in window)) {
                    var names = [
                        "AcroPDF.PDF", // Adobe PDF reader 7+
                        "Adodb.Stream",
                        "AgControl.AgControl", // Silverlight
                        "DevalVRXCtrl.DevalVRXCtrl.1",
                        "MacromediaFlashPaper.MacromediaFlashPaper",
                        "Msxml2.DOMDocument",
                        "Msxml2.XMLHTTP",
                        "PDF.PdfCtrl", // Adobe PDF reader 6 and earlier, brrr
                        "QuickTime.QuickTime", // QuickTime
                        "QuickTimeCheckObject.QuickTimeCheck.1",
                        "RealPlayer",
                        "RealPlayer.RealPlayer(tm) ActiveX Control (32-bit)",
                        "RealVideo.RealVideo(tm) ActiveX Control (32-bit)",
                        "Scripting.Dictionary",
                        "SWCtl.SWCtl", // ShockWave player
                        "Shell.UIHelper",
                        "ShockwaveFlash.ShockwaveFlash", //flash plugin
                        "Skype.Detection",
                        "TDCCtl.TDCCtl",
                        "WMPlayer.OCX", // Windows media player
                        "rmocx.RealPlayer G2 Control",
                        "rmocx.RealPlayer G2 Control.1"
                    ];
                    for(var i=0; i<names.length; i++){
                        var name = names[i];
                        try {
                            new ActiveXObject(name); // eslint-disable-no-new
                            result.push({"pluginName":name});
                        } catch(e) {

                        }
                    }
                }
                return result;
            }

            var plugins = function(){
                var ret = getIEPlugins();
                for(var i = 0, l = navigator.plugins.length; i < l; i++) {
                    ret.push({"fileName":navigator.plugins[i].filename, "pluginName":navigator.plugins[i].name, "Description":navigator.plugins[i].description, "Version":navigator.plugins[i].version} );
                }
                return ret;
            }
            var mimeTypes = function(){
                var ret = [];
                for(var i = 0, l=navigator.mimeTypes.length; i < l; i++) {
                    ret.push({"type":navigator.mimeTypes[i].type, "Description":navigator.mimeTypes[i].description});
                }
                return ret;
            }

            var getDoNotTrack = function () {
                if(navigator.doNotTrack) {
                    return navigator.doNotTrack;
                } else if (navigator.msDoNotTrack) {
                    return navigator.msDoNotTrack;
                } else if (window.doNotTrack) {
                    return window.doNotTrack;
                } else {
                    return undefined;
                }
            }

            return {
                "numMimeTypes":navigator.mimeTypes.length,
                "numPlugins":navigator.plugins.length,
                "useragent":navigator.userAgent,
                "plugins": plugins(),
                "language":navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage,
                "vendor":window.navigator.vendor,
                "mimeTypes":mimeTypes(),
                "appVersion":window.navigator.appVersion,
                "numCPU":window.navigator.hardwareConcurrency,
                "appName":window.navigator.appName,
                "appCodeName":window.navigator.appCodeName,
                "cookieEnabled":navigator.cookieEnabled,
                "cpuClass":window.navigator.cpuClass,
                "doNotTrack":getDoNotTrack(),
                "platform":navigator.platform,
                "product":window.navigator.product,
                "productSub":window.navigator.productSub,
                "vendorSub":window.navigator.vendorSub,
                "buildID" : navigator.buildID
            };
        }

        var jsFontsKey = function() {

            var that = this;
            // doing js fonts detection in a pseudo-async fashion
            var that = this;
            // doing js fonts detection in a pseudo-async fashion
            function fontTest(baseFonts, fontList, available, unAvailable) {
                var fontTestContainer = domDocument.createElement('div');
                fontTestContainer.style.cssText = 'position: absolute; left: 0; font-size: ' + testSize + ';';

                //we use m or w because these two characters take up the maximum width.
                // And we use a LLi so that the same matching fonts can get separated
                var testString = "mmmmmmmmmmlli";

                //we test using 72px font size, we may use any size. I guess larger the better.
                var testSize = "72px";

                // div to load spans for the base fonts
                var baseFontsDiv = domDocument.createElement("div");

                // div to load spans for the fonts to detect
                var fontsDiv = domDocument.createElement("div");

                var defaultSize = [];

                // creates a span where the fonts will be loaded
                var createSpan = function(font) {
                    var s = domDocument.createElement("span");
                    /*
                     * We need this css as in some weird browser this
                     * span elements shows up for a microSec which creates a
                     * bad user experience
                     */
                    s.style.cssText = 'position: absolute; left: 0; font-family: ' + font + ';';
                    s.innerText = s.textContent = testString;
                    return s;
                };

                // creates spans for the base fonts and adds them to baseFontsDiv
                var initializeBaseFontsSpans = function() {
                    var spans = [];
                    for (var index = 0, length = baseFonts.length; index < length; index++) {
                        var s = createSpan(baseFonts[index]);
                        baseFontsDiv.appendChild(s);
                        spans[index] = s;
                    }
                    return spans;
                };

                // creates spans for the fonts to detect and adds them to fontsDiv
                var initializeFontsSpans = function() {
                    var defaultFonts = baseFonts.join(',');
                    var fontsSpans = [];
                    for (var i = 0, l = fontList.length; i < l; i++) {
                        var s = createSpan("'" + fontList[i] + "'," + defaultFonts);
                        fontsDiv.appendChild(s);
                        fontsSpans[i] = s;
                    }
                    return fontsSpans;
                };

                // checks if a font is available
                var isFontAvailable = function(fontName, fontSpan) {
                    var size = fontSpan.offsetWidth + '*' + fontSpan.offsetHeight
                    if(!Array.prototype.indexOf){
                        return myIndexOf(defaultSize,size)==-1;
                    }
                    return defaultSize.indexOf(size) == -1;
                };

                // create spans for base fonts
                var baseFontsSpans = initializeBaseFontsSpans();

                // add the spans to the DOM
                fontTestContainer.appendChild(baseFontsDiv);

                // create spans for fonts to detect
                var fontsSpans = initializeFontsSpans();

                // add all the spans to the DOM
                fontTestContainer.appendChild(fontsDiv);

                // add to domContainer
                domContainer.appendChild(fontTestContainer);

                // get the default width for the three base fonts
                for (var index = 0, length = baseFonts.length; index < length; index++) {
                    defaultSize[index] = baseFontsSpans[index].offsetWidth + '*' + baseFontsSpans[index].offsetHeight;
                }

                // check available fonts
                for (var i = 0, l = fontList.length; i < l; i++) {
                    if (isFontAvailable(fontList[i], fontsSpans[i])) {
                        available.push(fontList[i]);
                    } else {
                        unAvailable.push(fontList[i]);
                    }
                }

                return fontTestContainer;
            }

            // a font will be compared against all the three default fonts.
            // and if it doesn't match all 3 then that font is not available.
            var baseFonts = ["monospace", "sans-serif", "serif"];
            var fontList = [
                "AbadiMTCondensedLight","AcademyEngravedLET","ADOBECASLONPRO","AdobeGaramond","ADOBEGARAMONDPRO","AlbertusExtraBold","AlbertusMedium","AmazoneBT","AmericanTypewriter","AmericanTypewriterCondensed","AmerTypeMdBT",
                "AndaleMono","AntiqueOlive","AppleChancery","AppleColorEmoji","AppleSDGothicNeo","ARCHER","ArialHebrew","ArialMT","ARNOPRO","ArrusBT","AuroraCnBT","AvantGardeBkBT","AvantGardeMdBT","AVENIR","Ayuthaya","Bandy",
                "BanglaSangamMN","BankGothic","BankGothicMdBT","Baskerville","BauerBodoni","Bazooka","Bembo","BenguiatBkBT","BernhardFashionBT","BernhardModBT","BigCaslon","BinnerD","BitstreamVeraSansMono","BlackadderITC",
                "BlairMdITCTT","Bodoni72","Bodoni72Oldstyle","Bodoni72Smallcaps","BodoniMTCondensed","Boulder","BradleyHand","BradleyHandITC","BremenBdBT","Calligrapher","CaslonOpnfaceBT","Cezanne","CGOmega","CGTimes",
                "Chalkboard","ChalkboardSE","Chalkduster","Charlesworth","CharterBdBT","CharterBT","Chaucer","ChelthmITCBkBT","Clarendon","ClarendonCondensed","CloisterBlackBT","Cochin","ComicSans","Copperplate","CopperplateGothic",
                "CopperplGothBdBT","Cornerstone","Coronet","Courier","Cuckoo","Dauphin","DBLCDTemp","DELICIOUS","Denmark","Didot","DIN","English111VivaceBT","EngraversGothicBT","EuphemiaUCAS","EUROSTILE","Exotc350BdBT","FangSong",
                "Fixedsys","FONTIN","Fransiscan","Freefrm721BlkBT","FrnkGothITCBkBT","Fruitger","FRUTIGER","Futura","FuturaBkBT","FuturaBlackBT","FuturaLtBT","FuturaMdBT","FuturaZBlkBT","GalliardBT","GeezaPro","Geneva","Geometr231BT",
                "Geometr231HvBT","Geometr231LtBT","GeoSlab703LtBT","GeoSlab703XBdBT","GillSans","GOTHAM","GOTHAMBOLD","GoudyHandtooledBT","GoudyOLStBT","GujaratiSangamMN","GurmukhiMN","Heather","HeitiSC","HeitiTC","HELV","Helvetica",
                "HelveticaNeue","Herald","HiraginoKakuGothicProN","HiraginoMinchoProN","HoeflerText","Humanst521BT","Humanst521CnBT","Humanst521LtBT","Incised901BdBT","Incised901BT","Incised901LtBT","INCONSOLATA","Informal011BT",
                "INTERSTATE","JazzLET","Jenson","Jester","KabelBkBT","KabelUltBT","Kailasa","KaiTi","KannadaSangamMN","KaufmannBdBT","KaufmannBT","KorinnaBT","Krungthep","LetterGothic","Lithograph","LithographLight","LongIsland",
                "LUCIDAGRANDE","LydianBT","MalayalamSangamMN","Marigold","Marion","MarkerFelt","Market","MatisseITC","MicrosoftYaHei","Minion","MinionPro","Modern","Monaco","MonaLisaSolidITCTT","MONO","MrsEaves","MSLineDraw",
                "MSSansSerif","MSSerif","MUSEO","MYRIAD","MYRIADPRO","Nadeem","NEVIS","NewsGothBT","NewsGothic","NewsGothicMT","Noteworthy","NSimSun","OldCentury","OnyxBT","OPTIMA","OriyaSangamMN","OSAKA","OzHandicraftBT",
                "PalaceScriptMT","Palatino","PartyLET","Pegasus","PetitaBold","Pickwick","Poster","PosterBodoniBT","PRINCETOWNLET","PTBarnumBT","Pythagoras","RageItalic","Ribbon131BdBT","Roman","SantaFeLET","SavoyeLET","Sceptre",
                "Script","SCRIPTINA","ScriptMTBold","Serifa","SerifaBT","SerifaThBT","ShelleyVolanteBT","Sherwood","Signboard","SILKSCREEN","SimHei","SimSun","SinhalaSangamMN","SketchRockwell","Skia","SmallFonts","SnellRoundhand",
                "Socket","SouvenirLtBT","Staccato222BT","Steamer","Storybook","Styllo","Subway","Swis721BlkExBT","Swiss911XCmBT","SynchroLET","System","TamilSangamMN","Technical","Teletype","TeluguSangamMN","Terminal","Thonburi",
                "Times","TimesNewRomanPS","Trajan","TRAJANPRO","Tristan","Tubular","TwCenMTCondensed","TwCenMTCondensedExtraBold","TypoUprightBT","Unicorn","Univers","UniversCE55Medium","UniversCondensed","Vagabond","VisualUI",
                "Westminster","WHITNEY","ZapfElliptBT","ZapfHumnstBT","ZapfHumnstDmBT","Zapfino","ZurichBlkExBT","ZurichExBT","ZWAdobeF","等线","等线Light","宋体-方正超大字符集"
            ];

            fontList = baseFonts.concat(fontList).concat(Dictionary.FONTS);

            var available = [];
            var unAvailable = [];

            fontTest(baseFonts, fontList, available, unAvailable);
            if (available.length && unAvailable.length) {
                fontTest(available.slice(0, 1), unAvailable, available, []);
            }

            return available;
        }

        var screenData = function(){
            return {
                "width":screen.width,
                "height":screen.height,
                "availWidth":screen.availWidth,
                "availHeight":screen.availHeight,
                "colorDepth":screen.colorDepth,
                "pixelDepth":screen.pixelDepth,
                "devicePixelRatio":window.devicePixelRatio || 1,
                "realWidth":screen.width*(window.devicePixelRatio || 1),
                "realHeight":screen.height*(window.devicePixelRatio || 1)
            };
        }

        var geoAndISP = function(){
            return {
                "latitude":latitude,
                "longitude":longitude,
                "ClientTimezoneOffset":new Date().getTimezoneOffset()
            };
        }

        var webRtc = function(){
            return {
                "shouldBeSupported":  (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia)?true:false,
                "deviceEnum": false,//(navigator.mediaDevices && navigator.mediaDevices.enumerateDevices)?true:false,
                "mediaSources":mediaSources,
                "AudioContext": !!window.AudioContext || !!window.webkitAudioContext,
                "hasMic": hasMicrophone,
                "hasWebcam": hasWebcam,
                "hasSpeaker": hasSpeakers,
                "deviceCount": deviceCount,
                "IceSupport": iceSupport,
                "IceCandidates": iceCandidates,
                //"SDP": "--",
                "IPADDR":ipaddrs
            };
        }

        var getBatteryInfo = function(e){
            var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery || navigator.msBattery;
            if(battery){
                e={
                    "charging": battery.charging,
                    "level": battery.level,
                    "dischargingTime": battery.dischargingTime
                }
            } else {
                if(typeof navigator.getBattery=="function")
                    navigator.getBattery().then(function(battery) {
                        e= {
                            "charging": battery.charging,
                            "level": battery.level,
                            "dischargingTime": battery.dischargingTime
                        }
                    });
            }
            e={};
        }
        var getCanvasFp = function(cavasFp){
            var canvas = domDocument.createElement("canvas");
            var ctx = null;
            idleRunner(function(){
                if(canvas.getContext)
                    ctx = canvas.getContext("2d");
            });
            idleRunner(function(){
                if(!!(canvas.getContext&&ctx)){
                    canvas.width = 2000;
                    canvas.height = 200;
                    canvas.style.display = "inline";
                    ctx.rect(0, 0, 10, 10);
                    ctx.rect(2, 2, 6, 6);
                    var canvasWinding = (ctx.isPointInPath(5, 5, "evenodd") === false);
                    ctx.textBaseline = "alphabetic";
                    ctx.fillStyle = "#f60";
                    ctx.fillRect(125, 1, 62, 20);
                    ctx.fillStyle = "#069";
                    try {
                        ctx.font = "11pt Arial";
                    }catch(e){}
                    ctx.fillText("http://www.ctrip.com", 2, 15);
                    ctx.fillStyle = "rgba(102, 204, 0, 0.2)";
                    ctx.font = "18pt Arial";
                    ctx.fillText("携程", 4, 45);

                    ctx.globalCompositeOperation = "multiply";
                    ctx.fillStyle = "rgb(255,0,255)";
                    ctx.beginPath();
                    ctx.arc(50, 50, 50, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = "rgb(0,255,255)";
                    ctx.beginPath();
                    ctx.arc(100, 50, 50, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = "rgb(255,255,0)";
                    ctx.beginPath();
                    ctx.arc(75, 100, 50, 0, Math.PI * 2, true);
                    ctx.closePath();
                    ctx.fill();
                    ctx.fillStyle = "rgb(255,0,255)";
                    ctx.arc(75, 75, 75, 0, Math.PI * 2, true);
                    ctx.arc(75, 75, 25, 0, Math.PI * 2, true);
                    ctx.fill("evenodd");

                    var canvasData = canvas.toDataURL();
                    cavasFp.canvasWinding=canvasWinding;
                    cavasFp.canvasData=murmurHash3(canvasData, 0);
                }
                try {
                    canvas.remove();
                }catch(e){}
            });
        }
        var webgl=function(webgl){
            var contextNames = [];
            var maxAnisotropy = function(gl) {
                var anisotropy, ext = gl.getExtension("EXT_texture_filter_anisotropic") || gl.getExtension("WEBKIT_EXT_texture_filter_anisotropic") || gl.getExtension("MOZ_EXT_texture_filter_anisotropic");
                return ext ? (anisotropy = gl.getParameter(ext.MAX_TEXTURE_MAX_ANISOTROPY_EXT), 0 === anisotropy && (anisotropy = 2), anisotropy) : null;
            }

            var maxColorBuffers = function(a){
                var b = 1,
                    e = a.getExtension('WEBGL_draw_buffers');
                null != e && (b = a.getParameter(e.MAX_DRAW_BUFFERS_WEBGL));
                return b
            }

            var fragmentShaderFloatIntPrecision = function(a){
                try {
                    var b = a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_FLOAT),
                        e = 0 !== b.precision ? 'highp/' : 'mediump/',
                        b = a.getShaderPrecisionFormat(a.FRAGMENT_SHADER, a.HIGH_INT);
                    return e += 0 !== b.rangeMax ? 'highp' : 'lowp'
                } catch (c) {
                    return 'Not Available'
                }
            }

            var fa2s = function(fa) {
                if(fa==null)
                    return null;
                return "[" + fa[0] + ", " + fa[1] + "]";
            };
            var allnames = ["webgl2","experimental-webgl2","webgl","experimental-webgl"];
            var gl = null;
            var cs = domDocument.createElement("canvas");
            var getContextName = function(name){
                try{
                    var t = cs.getContext(name,{stencil:true});
                    if(!!t) {
                        contextNames.push(name);
                        if(!gl)
                            gl=t;
                    }
                }catch(e){}
            }
            idleRunner(function(){
                getContextName(allnames[0]);
            });
            idleRunner(function(){
                getContextName(allnames[1]);
            });
            idleRunner(function(){
                getContextName(allnames[2]);
            });
            idleRunner(function(){
                getContextName(allnames[3]);
            });
            idleRunner(function(){
                try {
                    cs.remove();
                }catch(e){}
                if(!gl) { webgl.isSupported=false;return;}
                var maskedRV = (function getUnmaskedVendor(a){
                    var b = {
                        renderer: 'Not Available',
                        vendor: 'Not Available'
                    },e = a.getExtension('WEBGL_debug_renderer_info');
                    null != e && (b.renderer = a.getParameter(e.UNMASKED_RENDERER_WEBGL), b.vendor = a.getParameter(e.UNMASKED_VENDOR_WEBGL));
                    return b
                })(gl);
                webgl.isSupported=true;
                webgl.WebGLVendor=gl.getParameter(gl.VENDOR);
                webgl.WebGLRenderer=gl.getParameter(gl.RENDERER);
                webgl.unMaskedVendor= maskedRV.vendor;
                webgl.unMaskedRenderer=maskedRV.renderer;
                webgl.maxColorBuffers=maxColorBuffers(gl);
                webgl.isEnabled=gl.isEnabled(gl.STENCIL_TEST);
                webgl.glVersion=gl.getParameter(gl.VERSION);
                webgl.shadingLanguageVersion=gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
                webgl.redBits=gl.getParameter(gl.RED_BITS);
                webgl.greenBits=gl.getParameter(gl.GREEN_BITS);
                webgl.blueBits=gl.getParameter(gl.BLUE_BITS);
                webgl.alphaBits=gl.getParameter(gl.ALPHA_BITS);
                webgl.maxRenderBufferSize=gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
                webgl.maxCombinedTextureImageUnits=gl.getParameter(gl.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
                webgl.maxCubeMapTextureSize=gl.getParameter(gl.MAX_CUBE_MAP_TEXTURE_SIZE);
                webgl.maxFragmentUniformVectors=gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
                webgl.maxTextureImageUnits=gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS);
                webgl.maxTextureSize=gl.getParameter(gl.MAX_TEXTURE_SIZE);
                webgl.maxVaryingVectors=gl.getParameter(gl.MAX_VARYING_VECTORS);
                webgl.maxVertexAttributes=gl.getParameter(gl.MAX_VERTEX_ATTRIBS);
                webgl.maxVertexUniformVectors=gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
                webgl.aliasedLineWidthRange=fa2s(gl.getParameter(gl.ALIASED_LINE_WIDTH_RANGE));
                webgl.aliasedPointSizeRange=fa2s(gl.getParameter(gl.ALIASED_POINT_SIZE_RANGE));
                webgl.maxViewportDimensions=fa2s(gl.getParameter(gl.MAX_VIEWPORT_DIMS));
                webgl.maxAnisotropy=maxAnisotropy(gl);
                webgl.vertexShaderBestPrecision=gl.getShaderPrecisionFormat?gl.getShaderPrecisionFormat(gl.VERTEX_SHADER, gl.MEDIUM_FLOAT).precision:0;
                webgl.maxVertexTextureImageUnits=gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
                webgl.fragmentShaderBestPrecision=gl.getShaderPrecisionFormat?gl.getShaderPrecisionFormat(gl.FRAGMENT_SHADER, gl.MEDIUM_FLOAT).precision:0;
                webgl.depthBits=gl.getParameter(gl.DEPTH_BITS);
                webgl.stencilBits=gl.getParameter(gl.STENCIL_BITS);
                webgl.fragmentShaderFloatIntPrecision=fragmentShaderFloatIntPrecision(gl);
                webgl.extensions=gl.getSupportedExtensions();
                webgl.hardwareConcurrency=navigator.hardwareConcurrency;
                webgl.contextNames=contextNames;
            });
        }
        var getBrowserType = function(){
            var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0; // Opera 8.0+
            var isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
            var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0; // At least Safari 3+: "[object HTMLElementConstructor]"
            var isIE = /*@cc_on!@*/false || !!document.documentMode; // Internet Explorer 6-11
            var isEdge = !isIE && !!window.StyleMedia; // Edge 20+
            var isChrome = !!window.chrome && !!window.chrome.webstore; // Chrome 1+
            var isBlink = (isChrome || isOpera) && !!window.CSS; // Blink engine detection
            var u = navigator.userAgent, app = navigator.appVersion;
            return {
                "isOpera":isOpera,
                "isFirefox":isFirefox,
                "isSafari":isSafari,
                "isIE":isIE,
                "isEdge":isEdge,
                "isChrome":isChrome,
                "isBlink":isBlink,
                "isWebKit": u.indexOf('AppleWebKit') > -1,
                "isWeixin": u.indexOf('MicroMessenger') > -1, //whether is WeChat. The most popular IM in China
                "isQQ": u.match(/\sQQ/i) == " qq" //whether is QQ. The most popular IM in China
            };
        }

        var getTiming = function(){
            if(typeof performance != 'undefined') {
                if (performance && performance.timing) {
                    var ret = {};
                    for(var p in performance.timing){
                        if(typeof performance.timing[p] == "number")
                            ret[p] = performance.timing[p];
                    }
                    return ret;
                }
            }
            return {};
        }

        var getVisitPageTime = function(){
            var pagetimes, ptname = "page_time";
            if(null!=getWindowProp("localStorage")){
                pagetimes = localStorage.getItem(ptname);
            }
            var cookie_pagetime=CookieUtil.get(ptname);
            if(pagetimes&&pagetimes!=null&&cookie_pagetime){
                var root_domain = rootDomain();
                var op_ = {"path": "/", "domain": root_domain};
                CookieUtil.remove(ptname, op_);
            }
            if((!pagetimes||pagetimes==null)&&cookie_pagetime)
                pagetimes = cookie_pagetime;
            if(!/^[0-9,]*$/.test(pagetimes))
                pagetimes = LZString.decompressFromEncodedURIComponent(pagetimes);
            if(!pagetimes||pagetimes==null) pagetimes=[];
            else pagetimes = pagetimes.split(",");
            if(pagetimes.length>24)
                pagetimes = pagetimes.slice(pagetimes.length-24);
            pagetimes.push(""+new Date()*1);
            var cookieString = pagetimes.join(",");
            cookieString = LZString.compressToEncodedURIComponent(cookieString);
            if(null!=getWindowProp("localStorage")){
                localStorage.setItem(ptname,cookieString);
            }else {
                if (cookieString && cookieString.length > 200) {
                    var root_domain = rootDomain();
                    var op_ = {"path": "/", "domain": root_domain};
                    CookieUtil.remove(ptname, op_);
                } else {
                    setCookieValue(ptname, cookieString);
                }
            }
            return pagetimes;
        }


        var otherInfo = function(){
            var getAdBlock = function(){
                var ads = document.createElement("div");
                ads.innerHTML = "&nbsp;";
                ads.className = "adsbox";
                var result = false;
                try {
                    if(document.body){
                        document.body.appendChild(ads);
                        result = document.getElementsByClassName("adsbox")[0].offsetHeight === 0;
                        document.body.removeChild(ads);
                    }
                } catch (e) {
                    result = false;
                }
                return result;
            }

            var getHasLiedLanguages = function(){
                if(typeof navigator.languages !== "undefined"){
                    try {
                        var firstLanguages = navigator.languages[0].substr(0, 2);
                        if(firstLanguages !== navigator.language.substr(0, 2)){
                            return true;
                        }
                    } catch(err) {
                        return true;
                    }
                }
                return false;
            }

            var getHasLiedResolution = function(){
                if(screen.width < screen.availWidth){
                    return true;
                }
                if(screen.height < screen.availHeight){
                    return true;
                }
                return false;
            }

            var getHasLiedOs = function(){
                var userAgent = navigator.userAgent.toLowerCase();
                var oscpu = navigator.oscpu;
                var platform = navigator.platform.toLowerCase();
                var os;
                //We extract the OS from the user agent (respect the order of the if else if statement)
                if(userAgent.indexOf("windows phone") >= 0){
                    os = "Windows Phone";
                } else if(userAgent.indexOf("win") >= 0){
                    os = "Windows";
                } else if(userAgent.indexOf("android") >= 0){
                    os = "Android";
                } else if(userAgent.indexOf("linux") >= 0){
                    os = "Linux";
                } else if(userAgent.indexOf("iphone") >= 0 || userAgent.indexOf("ipad") >= 0 ){
                    os = "iOS";
                } else if(userAgent.indexOf("mac") >= 0){
                    os = "Mac";
                } else{
                    os = "Other";
                }
                // We detect if the person uses a mobile device
                var mobileDevice;
                if (("ontouchstart" in window) ||
                    (navigator.maxTouchPoints > 0) ||
                    (navigator.msMaxTouchPoints > 0)) {
                    mobileDevice = true;
                } else{
                    mobileDevice = false;
                }

                if(mobileDevice && os !== "Windows Phone" && os !== "Android" && os !== "iOS" && os !== "Other"){
                    return true;
                }

                // We compare oscpu with the OS extracted from the UA
                if(typeof oscpu !== "undefined"){
                    oscpu = oscpu.toLowerCase();
                    if(oscpu.indexOf("win") >= 0 && os !== "Windows" && os !== "Windows Phone"){
                        return true;
                    } else if(oscpu.indexOf("linux") >= 0 && os !== "Linux" && os !== "Android"){
                        return true;
                    } else if(oscpu.indexOf("mac") >= 0 && os !== "Mac" && os !== "iOS"){
                        return true;
                    } else if(oscpu.indexOf("win") === 0 && oscpu.indexOf("linux") === 0 && oscpu.indexOf("mac") >= 0 && os !== "other"){
                        return true;
                    }
                }

                //We compare platform with the OS extracted from the UA
                if(platform.indexOf("win") >= 0 && os !== "Windows" && os !== "Windows Phone"){
                    return true;
                } else if((platform.indexOf("linux") >= 0 || platform.indexOf("android") >= 0 || platform.indexOf("pike") >= 0) && os !== "Linux" && os !== "Android"){
                    return true;
                } else if((platform.indexOf("mac") >= 0 || platform.indexOf("ipad") >= 0 || platform.indexOf("ipod") >= 0 || platform.indexOf("iphone") >= 0) && os !== "Mac" && os !== "iOS"){
                    return true;
                } else if(platform.indexOf("win") === 0 && platform.indexOf("linux") === 0 && platform.indexOf("mac") >= 0 && os !== "other"){
                    return true;
                }

                if(typeof navigator.plugins === "undefined" && os !== "Windows" && os !== "Windows Phone"){
                    //We are are in the case where the person uses ie, therefore we can infer that it's windows
                    return true;
                }

                return false;
            }

            var getHasLiedBrowser = function () {
                var userAgent = navigator.userAgent.toLowerCase();
                var productSub = navigator.productSub;

                var browser;
                if(userAgent.indexOf("firefox") >= 0){
                    browser = "Firefox";
                } else if(userAgent.indexOf("opera") >= 0 || userAgent.indexOf("opr") >= 0){
                    browser = "Opera";
                } else if(userAgent.indexOf("chrome") >= 0){
                    browser = "Chrome";
                } else if(userAgent.indexOf("safari") >= 0){
                    browser = "Safari";
                } else if(userAgent.indexOf("trident") >= 0){
                    browser = "Internet Explorer";
                } else{
                    browser = "Other";
                }

                if((browser === "Chrome" || browser === "Safari" || browser === "Opera") && productSub !== "20030107"){
                    return true;
                }

                var tempRes = eval.toString().length;
                if(tempRes === 37 && browser !== "Safari" && browser !== "Firefox" && browser !== "Other"){
                    return true;
                } else if(tempRes === 39 && browser !== "Internet Explorer" && browser !== "Other"){
                    return true;
                } else if(tempRes === 33 && browser !== "Chrome" && browser !== "Opera" && browser !== "Other"){
                    return true;
                }

                var errFirefox;
                try {
                    throw "a";
                } catch(err){
                    try{
                        err.toSource();
                        errFirefox = true;
                    } catch(errOfErr){
                        errFirefox = false;
                    }
                }
                if(errFirefox && browser !== "Firefox" && browser !== "Other"){
                    return true;
                }
                return false;
            }

            return {
                "adblock":getAdBlock(),
                "hasLiedLanguages":getHasLiedLanguages(),
                "hasLiedResolution":getHasLiedResolution(),
                "hasLiedOs":getHasLiedOs()
            }
        }

        var rootDomain = function(){
            var root_domain = location.hostname;
            var special_domain = ["ctrip.co.kr", "ctrip.co.id", "ctrip.co.th", "ctrip.com.hk","thetrainpal.co.uk"];
            var sdf=true;
            for(var i= 0, j=special_domain.length; i<j; i++){
                if(root_domain.indexOf(special_domain[i])>0){
                    root_domain = special_domain[i];
                    sdf = false;
                    break;
                }
            }
            if(sdf) {
                var temp = root_domain.split('.').reverse();
                if (temp.length > 1) {
                    if(temp[temp.length-1]=="www") {
                        var ret="";
                        for(var i=temp.length-2;i>=0;i--)
                            ret += temp[i]+".";
                        root_domain = ret.substring(0,ret.length-1);
                    }else
                        root_domain = temp[1] + '.' + temp[0];
                }
            }
            return root_domain;
        }



        var setCookieValue = function(key, value){
            if(value)
                value = value.replace(/^\s+|\s+$/g,'');
            else {
                return;
            }
            var root_domain = rootDomain();
            var op_={"path":"/", "expires":new Date(2098,1,1), "domain":root_domain};
            CookieUtil.set(key, value, op_);
            window.CHLOROFP_STATUS="set_cookie_success";
            if(key==G_NAME || key==S_NAME||key==D_NAME)
                existsRsgGuid = true;
        }

        function cleanObject(ds1){
            for(var p in ds1){
                if(ds1[p]==undefined || ds1[p]==null || ds1[p]==NaN)
                    delete ds1[p]
                else {
                    if (typeof ds1[p] == "object") {
                        if (hasProp(ds1[p]))
                            cleanObject(ds1[p]);
                        else
                            delete ds1[p];
                    } else if (Object.prototype.toString.call(ds1[p]) === '[object Array]') {
                        if(ds1[p].length<1)
                            delete ds1[p];
                    }
                }
            }
        }

        var init = function(){
            idleRunner(function() {
                window.CHLOROFP_STATUS="basic";
                pdata.basic = basic();
            });
            idleRunner(function() {
                window.CHLOROFP_STATUS="header";
                pdata.header = header();
            });
            idleRunner(function() {
                window.CHLOROFP_STATUS="navigatorData";
                pdata.navigator = navigatorData();
            });
            idleRunner(function() {
                window.CHLOROFP_STATUS="screenData";
                pdata.screenData = screenData();
            });
            idleRunner(function() {
                window.CHLOROFP_STATUS="geoAndISP";
                pdata.geoAndISP = geoAndISP();
            });
            idleRunner(function() {
                window.CHLOROFP_STATUS="webRtc";
                pdata.webRtc = webRtc();
            });
            idleRunner(function() {
                window.CHLOROFP_STATUS="getBatteryInfo";
                getBatteryInfo(pdata.battery);
            });
            idleRunner(function() {
                window.CHLOROFP_STATUS="getBrowserType";
                pdata.browserType = getBrowserType();
            });
            idleRunner(function() {
                window.CHLOROFP_STATUS="getTiming";
                pdata.performanceTiming = getTiming();
            });
            idleRunner(function() {
                window.CHLOROFP_STATUS="getVisitPageTime";
                pdata.visTime = getVisitPageTime();
            });
            idleRunner(function() {
                window.CHLOROFP_STATUS="otherInfo";
                pdata.other = otherInfo();
            });
            idleRunner(function() {
                window.CHLOROFP_STATUS="jsFontsKey";
                pdata.sysfonts = jsFontsKey();
            });
            window.CHLOROFP_STATUS="webgl";
            webgl(pdata.webGL);
            window.CHLOROFP_STATUS="getCanvasFp";
            getCanvasFp(pdata.canvasFp);
            idleRunner(function() {
                window.CHLOROFP_STATUS="cleanObject";
                cleanObject(pdata);
            });
        }

        var wheel = function(jsevent, obj, callback){ //compatible with different browsers for the mouse wheel
            var wheelType = "mousewheel"
            try{
                document.createEvent("MouseScrollEvents")
                wheelType = "DOMMouseScroll"
            }catch(e){}
            jsevent.bind(obj, wheelType, function(event){
                if ("wheelDelta" in event){//统一为±120，其中正数表示为向上滚动，负数表示向下滚动
                    var delta = event.wheelDelta
                    //opera 9x系列的滚动方向与IE保持一致，10后修正
                    if( window.opera && opera.version() < 10 )
                        delta = -delta;
                    //由于事件对象的原有属性是只读，我们只能通过添加一个私有属性delta来解决兼容问题
                    event.delta = Math.round(delta) /120; //修正safari的浮点 bug
                }else if( "detail" in event ){
                    event.wheelDelta = -event.detail * 40//为FF添加更大众化的wheelDelta
                    event.delta = event.wheelDelta /120  //添加私有的delta
                }
                if(dydata && dydata.wheelDeltaData) {
                    dydata.wheelDeltaData.push(event.wheelDelta);
                    eventFlag = true;
                }
                callback.call(obj,event);//修正IE的this指向
            });
        }

        var dydata = {keypress:false, scroll:false, click:false, mousemove:false, mousemoveData:new Q(), keypressData:new Q(), mouseclickData:new Q(), wheelDeltaData:new Q()};
        var eventFlag = false, scrollFlag = false;

        var setEventFlag = function(){
            eventFlag = true;
        }

        var eventData = function(){
            var je = new JsEvent();
            var eventFun = function(t){
                if(dydata[t])
                    return true;
                dydata[t] = true;
                setEventFlag();
                return true;
            }

            function mouseMoveSpeed(initE, callback) {
                var x = initE.clientX,
                    y = initE.clientY,
                    t = currTimes();
                return function(e) {
                    var newX = e.clientX,
                        newY = e.clientY,
                        newT = currTimes();
                    if(newT-t<moveSpeedMinTime)
                        return;
                    if(newT-t>moveSpeedMaxTime){
                        x = newX;
                        y = newY;
                        t = newT;
                        return;
                    }
                    var x_dist = Math.abs(newX - x),
                        y_dist = Math.abs(newY - y),
                        interval = newT - t,
                        d = Math.round(Math.sqrt(x_dist*x_dist+y_dist*y_dist));
                    if(d<moveSpeedMinDist){
                        x = newX;
                        y = newY;
                        t = newT;
                        return;
                    }
                    var velocity = Math.round((d/(interval/1000))*1000);
                    callback(velocity, t, x, y, newT, newX, newY, d);
                    x = newX;
                    y = newY;
                    t = newT;
                };
            }

            function mouseClickSpeed(initE, callback) {
                var x = initE.clientX,
                    y = initE.clientY,
                    t = currTimes();
                return function(e) {
                    var newX = e.clientX,
                        newY = e.clientY,
                        newT = currTimes();
                    if(newT-t<mouseClickMinTime)
                        return;
                    if(newT-t>mouseClickMaxTime){
                        x = newX;
                        y = newY;
                        t = newT;
                        return;
                    }
                    var interval = newT - t;
                    callback(interval, x, y, newX, newY);
                    x = newX;
                    y = newY;
                    t = newT;
                };
            }

            function keyPressSpeed(initE, callback) {
                var t = currTimes();
                return function(e) {
                    var newT = currTimes();
                    if(newT-t<keypressMinTime)
                        return;
                    if(newT-t>keypressMaxTime){
                        t = newT;
                        return;
                    }
                    var interval = newT - t;
                    callback(interval);
                    t = newT;
                };
            }

            je.bindOnce(document.body, 'keypress', function(e){eventFun('keypress');});
            je.bindOnce(document.body, 'mousemove', function(e){eventFun('mousemove');});
            je.bindOnce(document.body, 'click', function(e){eventFun('click');});
            var mms, mcs, kps;

            //收集鼠标移动数据信息
            je.bind(document.body, "mousemove", function(e){
                if(!mms){
                    mms = mouseMoveSpeed(e, function(v, t1, x1, y1, t2, x2, y2, d){
                        dydata.mousemoveData.push(v);
                        setEventFlag();
                    });
                } else {
                    mms(e);
                }
            });

            //收集鼠标点击数据信息
            je.bind(document.body, "mousedown", function(e){
                mcs = mouseClickSpeed(e, function(interval, x1, y1, x2, y2){
                    dydata.mouseclickData.push({interval:interval, x1:x1, y1:y1, x2:x2, y2:y2});
                    setEventFlag();
                });
            });
            je.bind(document.body, "mouseup", function(e){
                if(mcs){
                    mcs(e);
                    mcs = null;
                }
            });


            //收集击键数据信息
            je.bind(document.body, "keydown", function(e){
                kps = keyPressSpeed(e, function(interval){
                    dydata.keypressData.push(interval);
                    setEventFlag();
                });
            });
            je.bind(document.body, "keyup", function(e){
                if(kps){
                    kps(e);
                    kps = null;
                }
            });

            setTimeout(function(){je.bindOnce(window, 'scroll', function(e){eventFun('scroll');})}, 1000); //为了误捕捉自动滚动做延迟处理
            wheel(je, document, function(e1){eventFun('scroll');});
        }

        var isUseIframe = function(){
            return !('XMLHttpRequest' in window && 'withCredentials' in new XMLHttpRequest());
        }

        //如果是ie8以下则用form提交 if the browser under IE8, submit by form-submit.
        var initForm = function(){
            form1 = document.createElement("form");
            form1.id = "deviceForm";
            form1.name = "deviceForm";
            if(document.body)
                document.body.appendChild(form1);
            form1.target="deviceIframe_t_";
            form1.action="url";
            form1.method="post";
            form1.setAttribute("style", "display:none");
            dataInput = createField(form1, "key", "value");
            createField(form1, "iframe", "true");
            createField(form1, "version", version);
            createField(form1, "serverName", serverName);
        }

        var createField = function(form, key, value){
            var field = document.createElement("input");
            field.type = "hidden";
            field.name = key;
            field.value = value;
            field.id = key+"_d__";
            form.appendChild(field);
            return field;
        }

        var createIframe = function(){
            var ifdom = document.getElementById("deviceIframe_t_");
            if(ifdom) { //remove iframe for some browser could report error when doing multiple subming
                if(document.body)
                    document.body.removeChild(ifdom);
                ifdom = null;
            }
            if(!document.getElementById("deviceIframe_t_")) {
                var iframe = document.createElement('iframe');
                iframe.id = "deviceIframe_t_";
                iframe.width = 0;
                iframe.height = 0;
                iframe.marginHeight = 0;
                iframe.marginWidth = 0;
                if(document.body)
                    document.body.appendChild(iframe);
                document.getElementById('deviceIframe_t_').contentWindow.name = 'deviceIframe_t_';
                iframe.setAttribute("style", "display:none");
                var state = 0;
                new JsEvent().bind(iframe, "load", function () {
                    if (state === 1) {
                        window.CHLOROFP_STATUS="iframe_data_back";
                        guid = iframe.contentWindow.name;
                        if (verifyGuid(guid)) {
                            if(guid.indexOf("|")>0){
                                var tmp_ = guid.split("|");
                                guid = tmp_[0];
                                window.CHLOROFP_IP=tmp_[1];
                                setCookieValue("_RF1", tmp_[1]);
                                if(tmp_.length>2){
                                    rsg_ = tmp_[2];
                                    setCookieValue(S_NAME, rsg_);
                                }
                                if(tmp_.length>3){
                                    rdg_ = tmp_[3];
                                    setCookieValue(D_NAME, rdg_);
                                }
                            }
                            setCookieValue(G_NAME, guid);
                            if(null!=getWindowProp("localStorage")){
                                localStorage.setItem(G_NAME,guid);
                            }
                            iframe.contentWindow.document.write('');
                            iframe.contentWindow.close();
                            if(document.body)
                                document.body.removeChild(iframe);
                            return;
                        }
                    } else if (state === 0) {
                        state = 1;
                        submiting = false;
                        if(iframe.contentWindow)
                            iframe.contentWindow.location = 'about:blank';
                    }
                });
            }
        }

        var submit_ = function (url, key, value) {
            if(submiting) { //no effact for browser under IE8
                return setTimeout(function(){
                    submit_(url, key, value);
                }, 30);
            }
            submiting = true;
            if(!isUseIframe()){
                var params = key+"="+value + "&version="+version + "&serverName="+serverName;
                if(guid)
                    params += "&guid="+guid;
                if(rdg_)
                    params +="&dg="+rdg_;
                cors.post({
                    'url':  url,
                    'credentials': true,
                    'params': params,
                    'method': 'post',
                    "headers": {
                        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    'success': function (data) {
                        window.CHLOROFP_STATUS="data_back";
                        submiting = false;
                        if(data) {
                            window.CHLOROFP_STATUS="data_exist";
                            if(verifyGuid(data.split("\n")[0])) {
                                guid = data.split("\n")[0];
                                if(guid.indexOf("|")>0){
                                    var tmp_ = guid.split("|");
                                    guid = tmp_[0];
                                    window.CHLOROFP_IP=tmp_[1];
                                    setCookieValue("_RF1", tmp_[1]);
                                    if(tmp_.length>2){
                                        rsg_ = tmp_[2];
                                        setCookieValue(S_NAME, rsg_);
                                    }
                                    if(tmp_.length>3){
                                        rdg_ = tmp_[3];
                                        setCookieValue(D_NAME, rdg_);
                                    }
                                }
                                setCookieValue(G_NAME, guid);
                                if(null!=getWindowProp("localStorage")){
                                    localStorage.setItem(G_NAME,guid);
                                }
                                return;
                            }
                        }
                        window.CHLOROFP_STATUS="data_not_exist";
                    },
                    'error': function () {
                        log("cors error");
                        window.CHLOROFP_STATUS="cors_error";
                        submiting = false;
                    }
                });
            } else {
                createIframe();
                form1.action = url;
                dataInput.name = key;
                dataInput.value = value;
                if(guid){
                    var gn = document.getElementById("guid_d__");
                    if(gn){
                        gn.value = guid;
                    } else {
                        createField(form1, "guid", guid);
                    }
                }
                if(rdg_){
                    var dg = document.getElementById("dg_d__");
                    if(dg){
                        dg.value = rdg_;
                    } else {
                        createField(form1, "dg", rdg_);
                    }
                }
                form1.submit();
            }
        }

        var verifyGuid=function(uid){
            return uid&&(uid.split("-").length==5 || uid.split("-").length==6);
        }
        var did = function(){
            window.CHLOROFP_STATUS = "init";
            init();
            idleRunner(function(){
                window.CHLOROFP_STATUS = "init_end";
                try {
                    if (device_callback__) {
                        device_callback__(pdata);
                    }
                } catch (e) {
                }
                try {
                    document.body.removeChild(iframeContainer);
                } catch (e) {
                }
                window.CHLOROFP_STATUS = "before_submit";
                submit_(surl, "data", stringify(pdata));
            });
        }

        var dyt;
        var sendEvenetData = function(){
            if(eventFlag) {
                if(dyt) {
                    if ((new Date() * 1 - dyt) < dyInterval){
                        return;
                    }
                }
                var tmp = {};
                for(var p in dydata){
                    if(p.length>4 && p.substr(p.length - 4, 4)=="Data")
                        tmp[p] = dydata[p].getData();
                    else
                        tmp[p] = dydata[p];
                }

                dyt = new Date()*1;
                eventFlag = false;
                submit_(durl, "data",stringify(tmp));
            }
        }

        var getFlashData = function(){
            if(!flashEnable) return;
            window.CHLOROFP_STATUS="get_flash_data_start";
            if(swfobject.hasFlashPlayerVersion("9.0.0")) {
                var swfContainerId = "flash_device_";
                var addFlashDivNode = function () {
                    var node = document.createElement("div");
                    node.setAttribute("id", swfContainerId);
                    if(document.body)
                        document.body.appendChild(node);
                };
                var loadSwfAndGetInfo = function (done) {
                    var hiddenCallback = "___fp_swf_loaded";
                    window[hiddenCallback] = function (fdata) {
                        done(fdata);
                    };
                    addFlashDivNode();
                    var flashvars = {onReady: hiddenCallback};
                    var flashparams = {allowScriptAccess: "always", menu: "false"};
                    if(verifyGuid(guid)) {
                        flashvars.guid_ = guid;
                    } else {
                        guid = null;
                    }
                    if(rsg_) {
                        flashvars.rsg_ = rsg_;
                    } else {
                        rsg_ = null;
                    }
                    if(rdg_){
                        flashvars.rdg_ = rdg_;
                    }else{
                        rdg_ = null;
                    }
                    swfobject.embedSWF(swf, swfContainerId, "1", "1", "9.0.0", false, flashvars, flashparams, {"style":"position:absolute; width: 1px; height: 1px; left: -1000px; top: -1000px;"});
                }
                loadSwfAndGetInfo(function (fdata) {
                    pdata.flash = fdata;
                    if(pdata.flash && pdata.flash.guid && guid != pdata.flash.guid) {
                        guid = pdata.flash.guid;
                        if(verifyGuid(guid)) {
                            setCookieValue(G_NAME, guid);
                            if(null!=getWindowProp("localStorage")){
                                localStorage.setItem(G_NAME,guid);
                            }
                        }
                    }
                    if(pdata.flash && pdata.flash.rsg && rsg_ != pdata.flash.rsg) {
                        rsg_ = pdata.flash.rsg;
                        setCookieValue(S_NAME, rsg_);
                    }
                    if(pdata.flash && pdata.flash.rdg && rdg_ != pdata.flash.rdg) {
                        rdg_ = pdata.flash.rdg;
                        setCookieValue(D_NAME, rdg_);
                    }
                });
            }
        }


        var intervalID = setInterval(function(){

            if(existsRsgGuid && guid && rsg_&&rdg_){
                try {
                    if (!CookieUtil.get(G_NAME)) {
                        setCookieValue(G_NAME, guid);
                        if(null!=getWindowProp("localStorage")){
                            localStorage.setItem(G_NAME,guid);
                        }
                    }
                    if (!CookieUtil.get(S_NAME))
                        setCookieValue(S_NAME, rsg_);
                    if (!CookieUtil.get(D_NAME))
                        setCookieValue(D_NAME, rdg_);
                }catch(e){
                    if(intervalID)
                        clearInterval(intervalID);
                }
            }

        }, 1000);

        //ready(function(){
        if(CookieUtil.get(G_NAME)) {
            guid = CookieUtil.get(G_NAME);
            existsRsgGuid = true;
        } else if(CookieUtil.get("guid__")) {
            guid = CookieUtil.get("guid__");
            setCookieValue(G_NAME, guid);
        }
        if(!guid&&null!=getWindowProp("localStorage")){
            guid = localStorage.getItem(G_NAME);
        }
        if(CookieUtil.get(S_NAME))
            rsg_ = CookieUtil.get(S_NAME);
        if(CookieUtil.get(D_NAME))
            rdg_ = CookieUtil.get(D_NAME);
        getFlashData();
        if(isUseIframe())
            initForm();
        setTimeout(did, (flashEnable&&swfobject.hasFlashPlayerVersion("9.0.0"))?300:100); //如果安装有flash则延时300毫秒,否则延时100毫秒
        if(isCollectDynaData){ //
            eventData();
            setInterval(sendEvenetData, 500);
        }
        //});
        function Encoder(){
            this.version=7;
            this.DYNAMIC_VERSION=2;
            this.performanceKeyList=["navigationStart","unloadEventStart","unloadEventEnd","redirectStart","redirectEnd"
                ,"fetchStart","domainLookupStart","domainLookupEnd","connectStart","connectEnd","requestStart","responseStart","responseEnd"
                ,"domLoading","domInteractive","domContentLoadedEventStart","domContentLoadedEventEnd","domComplete","loadEventStart","loadEventEnd"];
            this.stringify = (typeof JSON === "undefined" || typeof JSON.stringify === "undefined")?
                function (obj) {
                    var t = typeof(obj);
                    if (t != "object" || obj === null) {
                        if (t == "string") obj = '"'+obj+'"';
                        return String(obj);
                    }
                    else {
                        var n, v, json = [], arr = (obj && obj.constructor == Array);
                        for (n in obj) {
                            v = obj[n]; t = typeof(v);
                            if(v===undefined || v==="--") // || !hasProp(v)
                                continue;
                            if (t == "string") v = '"'+v+'"';
                            else if (t == "object" && v !== null) v = this.stringify(v);
                            json.push((arr ? "" : '"' + n + '":') + String(v));
                        }
                        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
                    }
                }:JSON.stringify;
            this.binarySearch=function(arr,fromIndex,toIndex,key){
                var low = fromIndex;
                var high = toIndex - 1;

                while (low <= high) {
                    var mid = (low + high) >>> 1;
                    var cmp = (arr[mid]==key)?0:(arr[mid]>key?1:-1);
                    if (cmp < 0)
                        low = mid + 1;
                    else if (cmp > 0)
                        high = mid - 1;
                    else
                        return mid; // key found
                }
                return -(low + 1);  // key not found.
            }

            this.toBytes = function(str){
                if(undefined==str) return [];
                var utf8 = [];
                str=str+"";
                for (var i=0; i < str.length; i++) {
                    var charcode = str.charCodeAt(i);
                    if (charcode < 0x80) utf8.push(charcode);
                    else if (charcode < 0x800) {
                        utf8.push(0xc0 | (charcode >> 6),
                            0x80 | (charcode & 0x3f));
                    }
                    else if (charcode < 0xd800 || charcode >= 0xe000) {
                        utf8.push(0xe0 | (charcode >> 12),
                            0x80 | ((charcode>>6) & 0x3f),
                            0x80 | (charcode & 0x3f));
                    }
                    else {
                        // let's keep things simple and only handle chars up to U+FFFF...
                        utf8.push(0xef, 0xbf, 0xbd); // U+FFFE "replacement character"
                    }
                }
                return utf8;
            }
            this.x64Xor = function(m, n) {
                return [m[0] ^ n[0], m[1] ^ n[1]];
            };
            this.ipV4StringToInteger = function(string) {
                if(undefined==string) return 0;
                var parts = string.split(".");

                var sum = 0;

                for(var i = 0; i < 4; i++) {
                    var partVal = Number(parts[i]);
                    sum = (sum << 8) + partVal;
                }

                return sum;
            };
            this.serializeBooleanSegment=function(data,buf){
                var basic = data.basic;
                var header = data.header;
                var navigator = data.navigator;
                var webGL = data.webGL;
                var webRtc = data.webRtc;
                var battery = data.battery;
                var browserType = data.browserType;
                var flash = data.flash;
                var canvasFp = data.canvasFp;
                var other = data.other;
                buf.put(this.serializeInByte([(basic)?basic.localStorage:false,(basic)?basic.sessionStorage:false,(header)?header.Connection:false,(navigator)?navigator.cookieEnabled:false,
                    (webGL)?webGL.isSupported:false,(webGL)?webGL.isEnabled:false,(webRtc)?webRtc.shouldBeSupported:false,(webRtc)?webRtc.deviceEnum:false]));
                buf.put(this.serializeInByte([(webRtc)?webRtc.AudioContext:false,(webRtc)?webRtc.hasMic:false,(webRtc)?webRtc.hasWebcam:false,(webRtc)?webRtc.hasSpeaker:false,
                    (webRtc)?webRtc.IceSupport:false,(battery)?battery.charging:false,(browserType)?browserType.isWeixin:false,(browserType)?browserType.isQQ:false]));
                buf.put(this.serializeInByte([(browserType)?browserType.isOpera:false,(browserType)?browserType.isFirefox:false,(browserType)?browserType.isSafari:false,(browserType)?browserType.isIE:false,
                    (browserType)?browserType.isEdge:false,(browserType)?browserType.isChrome:false,(browserType)?browserType.isBlink:false,(browserType)?browserType.isWebKit:false]));

                var b = this.serializeInByte([(other)?other.adblock:false,(other)?other.hasLiedLanguages:false,(other)?other.hasLiedResolution:false,(other)?other.hasLiedOs:false]);
                b = this.serializeEnumValue( this.getValue(webGL,"fragmentShaderFloatIntPrecision",Dictionary.WEBGL_fragmentShaderFloatIntPrecision[4]),
                    b,0x7<<1,1, Dictionary.WEBGL_fragmentShaderFloatIntPrecision,4);
                buf.put(b);
                buf.put(this.serializeInByte([(flash)?flash.hasPrinting:false,(flash)?flash.hasScreenBroadcast:false,(flash)?flash.hasScreenPlayback:false,(flash)?flash.hasStreamingVideo:false,
                    (flash)?flash.hasStreamingAudio:false,(flash)?flash.hasVideoEncoder:false,(flash)?flash.isDebugger:false,(flash)?flash.hasEmbeddedVideo:false]));
                buf.put(this.serializeInByte([(flash)?flash.localFileReadDisable:false,(flash)?flash.hasIME:false,(flash)?flash.hasAudio:false,(flash)?flash.hasTLS:false,
                    (flash)?flash.avHardwareDisable:false,(flash)?flash.hasAccessibility:false,(flash)?flash.hasAudioEncoder:false,(flash)?flash.hasMP3:false]));
                b = this.serializeInByte([(flash)?flash.supports32BitProcesses:false,(flash)?flash.supports64BitProcesses:false,(flash)?flash.lsoStorageTest:false,(canvasFp)?canvasFp.canvasWinding:false]);

                var v=(undefined==basic)?Dictionary.BASIC_DeviceType[0]:basic.DeviceType;
                b=this.serializeEnumValue(undefined==v?Dictionary.BASIC_DeviceType[0]:v,b,0x1<<3,3,Dictionary.BASIC_DeviceType,0);
                v=(undefined==basic)?Dictionary.BASIC_os[4]:basic.os;
                b=this.serializeEnumValue(undefined==v?Dictionary.BASIC_os[4]:v,b,0x7,0,Dictionary.BASIC_os,4);
                buf.put(b);
            }
            this.serializeInByte=function(data){
                var b =0;
                for(var i=0;i<data.length;i++){
                    if(data[i])
                        b|=(1<<(7-i));
                }
                return b;
            }
            this.serializeEnumValue=function(value,ref,mask,startPos,enumValues,def){
                var i = def;
                if(undefined!=enumValues) {
                    i = this.binarySearch(enumValues, 0, enumValues.length, value.toLowerCase());
                    if (i < 0) i = def;
                }
                return ((ref&(~mask)) | ((i<<startPos)&mask));
            }
            this.serializeTouchPlayerCpuArch=function(flash,buf){
                var b=0;
                b =  this.serializeEnumValue( this.getValue(flash,"touchscreenType",Dictionary.FLASH_touchScreenType[1]),b,0x3<<6,6,Dictionary.FLASH_touchScreenType,1);
                b =  this.serializeEnumValue( this.getValue(flash,"playerType",Dictionary.FLASH_playerType[3]),b, 0x7<<3,3,Dictionary.FLASH_playerType,3);
                b =  this.serializeEnumValue( this.getValue(flash,"cpuArchitecture",Dictionary.FLASH_cpuArchitecture[1]),b,0x7,0,Dictionary.FLASH_cpuArchitecture,1);
                buf.put(b);
            }
            this.getValue = function (json,key,def,dictionary) {
                var v=(undefined==json?def:(undefined==json[key]?def:json[key]));
                if(undefined!=dictionary) {
                    if( (typeof v=='string')&&v.constructor==String) v= v.toLowerCase();
                    var ix = this.binarySearch(dictionary, 0, dictionary.length,v);
                    if (ix < 0)//not found
                        return def;
                }
                return v;
            }
            this.serializeHistoryLen = function(header,buf){
                var historyLength = this.getValue(header,"historyLength",0);
                if(historyLength>255)
                    buf.put(255);
                else
                    buf.put(historyLength);
            }
            this.serializeNumCpuHardwareFragment=function(navigator,webGL,buf){
                var b =0;
                b =  this.serializeNumCpuOrHardwareConcurrency( this.getValue(navigator,"numCPU",1),b,0x7<<5,5);
                b =  this.serializeNumCpuOrHardwareConcurrency( this.getValue(navigator,"hardwareConcurrency",1),b,0x7<<2,2);
                buf.put(b);
            }
            this.serializeNumCpuOrHardwareConcurrency = function(num,b,mask,startPos){
                var x;
                switch (num){
                    case 2: x=1;break;
                    case 4: x=2;break;
                    case 8: x=3;break;
                    case 16: x=4;break;
                    case 32: x=5;break;
                    case 64: x=6;break;
                    case 128: x=7;break;
                    default: x=0;break;
                }
                return (b&(~mask)) | ((x<<startPos)&mask);
            }
            this.serializeEnumValOneByte=function(val,dictionary,buf){
                var ix =  this.binarySearch(dictionary,0,dictionary.length,val.toLowerCase());
                if(ix<0)//not found
                    buf.put(Dictionary.UNKOWN_IX);
                else
                    buf.put(ix);
            }
            this.serializeTrackColorLevel=function(navigator,flash,battery,buf){
                var b = 0;
                b =  this.serializeEnumValue( this.getValue(navigator,"doNotTrack",Dictionary.NAVIGATOR_doNotTrack[2]),b,0x3<<6,6,Dictionary.NAVIGATOR_doNotTrack,2);
                b =  this.serializeEnumValue( this.getValue(flash,"screenColor",Dictionary.FLASH_screenColor[3]),b,0x3<<4,4,Dictionary.FLASH_screenColor,3);
                b =  this.serializeBatteryLevel( this.getValue(battery,"level"),b,0x0f,0);
                buf.put(b);
            }
            this.serializeBatteryLevel=function(val,ref,mask,startPos){
                if(val>1) {
                    log("the value must less than or equal 1.");
                    return ref;
                }
                return (ref&(~mask)) | (((val*10)<<startPos)&mask);
            }
            this.serializeBatteryDischarg=function(battery,buf){
                var discharging = (undefined==battery?undefined:battery.discharging);
                var discharg;
                if(null == discharging) discharg = 0;
                else if(discharging=="Infinity") discharg = -32768;
                else discharg = discharging;
                buf.putShort(discharg);
            }
            this.serializeCanvasData=function(canvasData,buf){
                if(undefined==canvasData){buf.put(0);return;}
                buf.put(canvasData.length%2!=0?canvasData.length/2+1
                    :canvasData.length/2);
                for(var i=0;i<canvasData.length;i++){
                    if(i%2==1){
                        buf.put(parseInt(canvasData.substring(i-1,i+1),16));
                    }
                }
                if(canvasData.length%2!=0)
                    buf.put(parseInt(canvasData.substring(canvasData.length-1),16));
            }
            this.serializeGeoAndISP=function(geoAndISP,buf){
                var timeZone =  this.getValue(geoAndISP,"ClientTimezoneOffset",-1);
                if(-1==timeZone)
                    buf.put(-1);
                else
                    buf.put(timeZone/15);
                buf.putFloat( this.getValue(geoAndISP,"latitude",0));
                buf.putFloat( this.getValue(geoAndISP,"longitude",0));
            }
            this.serializeScreenData=function(screenData,buf){
                this.serializeWidthAndHeight(buf, this.getValue(screenData,"width",0), this.getValue(screenData,"height",0));
                this.serializeWidthAndHeight(buf, this.getValue(screenData,"availWidth",0), this.getValue(screenData,"availHeight",0));
                this.serializeWidthAndHeight(buf, this.getValue(screenData,"realWidth",0), this.getValue(screenData,"realHeight",0));
                buf.put( this.getValue(screenData,"colorDepth",0));
                buf.put( this.getValue(screenData,"pixelDepth",0));
                buf.put( this.getValue(screenData,"devicePixelRatio",0))
            }
            this.serializeWidthAndHeight=function(buf,width,height){
                //width and height occupied 3B
                buf.putShort(width|((height&0x0f)<<12));
                buf.put(height>>>4);
            }
            this.serializeWebGLFixedSegment=function(webgl,buf){
                var aliasedLineWidthRange =  this.getValue(webgl,"aliasedLineWidthRange",undefined);
                var aliasedPointSizeRange =  this.getValue(webgl,"aliasedPointSizeRange",undefined);
                var maxViewportDimensions =  this.getValue(webgl,"maxViewportDimensions",undefined);
                buf.put( this.getValue(webgl,"maxColorBuffers",0));
                buf.put( this.getValue(webgl,"redBits",0));
                buf.put( this.getValue(webgl,"greenBits",0));
                buf.put( this.getValue(webgl,"blueBits",0));
                buf.put( this.getValue(webgl,"alphaBits",0));
                buf.putShort( this.getValue(webgl,"maxRenderBufferSize",0));
                buf.put( this.getValue(webgl,"maxCombinedTextureImageUnits",0));
                buf.putShort( this.getValue(webgl,"maxCubeMapTextureSize",0));
                buf.putShort( this.getValue(webgl,"maxFragmentUniformVectors",0));
                buf.put( this.getValue(webgl,"maxTextureImageUnits",0));
                buf.putShort( this.getValue(webgl,"maxTextureSize",0));
                buf.put( this.getValue(webgl,"maxVaryingVectors",0,0));
                buf.put( this.getValue(webgl,"maxVertexAttributes",0));
                buf.putShort( this.getValue(webgl,"maxVertexUniformVectors",0));
                buf.put( this.getValue(webgl,"maxAnisotropy",0));
                buf.put( this.getValue(webgl,"vertexShaderBestPrecision",0));
                buf.put( this.getValue(webgl,"maxVertexTextureImageUnits",0));
                buf.put( this.getValue(webgl,"fragmentShaderBestPrecision",0));
                buf.put( this.getValue(webgl,"depthBits",0));
                buf.put( this.getValue(webgl,"stencilBits",0));

                this.serializeRange(aliasedLineWidthRange,buf,false);
                this.serializeRange(aliasedPointSizeRange,buf,false);
                this.serializeRange(maxViewportDimensions,buf,true);
            }
            this.serializeRange=function(range,buf,twoBytes){
                if(undefined==range) {
                    if(twoBytes)
                        buf.putShort(0);
                    else
                        buf.put(0);
                    buf.putShort(0);
                    return;
                }
                var strArr = range.substring(1,range.length-1).split(",");
                var floor = parseInt(strArr[0].trim());
                var upper = parseInt(strArr[1].trim());
                if(twoBytes)
                    buf.putShort(floor);
                else
                    buf.put(floor);
                buf.putShort(upper);
            }
            this.serializeFlashFixedSegment=function(flash,buf){
                buf.put( this.getValue(flash,"pixelAspectRatio",0));
                buf.put( this.getValue(flash,"screenDPI",0));
                buf.putShort( this.getValue(flash,"screenResolutionX",0));
                buf.putShort( this.getValue(flash,"screenResolutionY",0));
                this.serializeEnumValOneByte( this.getValue(flash,"language","zh-cn"),Dictionary.NAVIGATOR_language,buf);
            }
            this.serializeUserAgent=function(navigator,buf){
                var ua =  this.getValue(navigator,"useragent",undefined);
                if(undefined==ua) buf.putShort(0);
                else{
                    var bs =  this.toBytes(ua);
                    buf.putShort(bs.length);
                    buf.putBytes(bs);
                }
            }
            this.serializePlugins=function(plugins,buf){
                if(undefined==plugins||plugins.length==0){
                    buf.put(0);
                    buf.put(0);
                    return;
                }
                var start = buf.position();
                //set length
                buf.put(0);
                buf.put(0);
                var ix;
                var inDictionary = 0;
                var notInDictionary = 0;
                var b = new ByteBuffer();
                var body;
                var buffer = new ByteBuffer();
                var name;
                var version;
                for(var i=0;i<plugins.length;i++){
                    body = plugins[i];
                    name = body.pluginName;
                    version = body.Version;
                    ix =  this.binarySearch(Dictionary.NAVIGATOR_plugins,0,Dictionary.NAVIGATOR_plugins.length,name);
                    var vb = this.toBytes(version);
                    if(ix<0){
                        notInDictionary++;
                        var nb =this.toBytes(name);
                        buffer.put(nb.length);
                        buffer.putBytes(nb);
                        buffer.put(vb.length);
                        buffer.putBytes(vb);
                    }else {
                        b.put(ix);
                        b.put(vb.length);
                        b.putBytes(vb);
                        inDictionary++;
                    }
                }
                buf.putAtIndex(start,inDictionary);
                buf.putAtIndex(start+1,notInDictionary);
                buf.putBytes(b.getBytes());
                buf.putBytes(buffer.getBytes());
            }
            this.serializeMimeTypeOrFonts=function(fonts,buf,dictionary,twoByte){
                if(undefined==fonts||fonts.length==0){
                    if(!twoByte){
                        buf.put(0);
                        buf.put(0);
                    }else{
                        buf.putShort(0);
                        buf.putShort(0);
                    }
                    return;
                }
                fonts=myUnique(fonts);
                var start = buf.position();
                if(!twoByte) {
                    buf.put(0);
                    buf.put(0);
                }else{
                    buf.putShort(0);
                    buf.putShort(0);
                }
                var ix;
                var inDictionary = 0;
                var notInDictionary = 0;
                var b = new ByteBuffer();
                var buffer = new ByteBuffer();
                var body;
                for(var i=0;i<fonts.length;i++){
                    body = fonts[i];
                    ix =  this.binarySearch(dictionary,0,dictionary.length,body);
                    if(ix<0){
                        notInDictionary++;
                        var nb = this.toBytes(body);
                        buffer.put(nb.length);
                        buffer.putBytes(nb);
                    }else {
                        b.put(ix);
                        inDictionary++;
                    }
                }
                if(!twoByte) {
                    buf.putAtIndex(start,inDictionary);
                    buf.putAtIndex(start+1,notInDictionary);
                    buf.putBytes(b.getBytes());
                }else {
                    buf.putShortAtIndex(start,inDictionary);
                    buf.putShortAtIndex(start+2,notInDictionary);
                    buf.putBytes(b.getBytes());
                }
                buf.putBytes(buffer.getBytes());
            }
            this.serializeContextName=function(vals, buf){
                if(undefined==vals||vals.length==0){
                    buf.put(0);
                    return;
                }
                var size = 0;
                var flag = 0;
                var pos = buf.position();
                buf.put(flag);
                var val;
                for(var i=0;i<vals.length;i++){
                    val = vals[i];
                    if(val==Dictionary.WEBGL_contextName_experimental)
                        flag|=0x02;
                    else if(val==Dictionary.WEBGL_contextName_webgl)
                        flag|=0x04;
                    else {
                        size++;
                        var bytes =  this.toBytes(val);
                        buf.put(bytes.length);
                        buf.putBytes(bytes);
                    }
                }
                if(size>0x1f) {
                    log("UnsupportedOperationException:elements size could not greater than 31");
                    return;
                }
                if(size>0) flag= (flag|0x01)|(size<<3);
                buf.putAtIndex(pos,flag);
            }
            this.serializeWebGLExtensions=function(extensions, buf){
                if(undefined==extensions||extensions.length==0){
                    buf.put(0);
                    return;
                }
                buf.put(extensions.length);
                var extension;
                var ix;
                for(var i=0;i<extensions.length;i++){
                    extension = extensions[i];
                    ix =  this.binarySearch(Dictionary.WEBGL_EXTENSIONS,0,Dictionary.WEBGL_EXTENSIONS.length,extension);
                    if(ix<0&&undefined!=extension){
                        var bytes =  this.toBytes(extension);
                        buf.put(-bytes.length);
                        buf.putBytes(bytes);
                    }else{
                        buf.put(ix);
                    }
                }
            }
            this.serializeIp=function(ips, buf){
                if(undefined==ips||ips.length==0){
                    buf.put(0);
                    return;
                }
                var startPos = buf.position();
                buf.put(0);
                var ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
                var len=0;
                for(var i=0;i<ips.length;i++){
                    if(!ipv4Regex.exec(ips[i]))
                        continue;
                    buf.putInt( this.ipV4StringToInteger(ips[i]));
                    len++;
                }
                buf.putAtIndex(startPos,len);
            }
            this.serializeVisTime=function(visTime,buf){
                if(undefined==visTime||visTime.length==0){
                    buf.put(0);
                    return;
                }
                var bytes =  this.timeSeriesToBytes(visTime);
                buf.put(bytes.length);
                buf.putBytes(bytes);
            }
            this.longToBytes2 = function(time){
                if(undefined==time) time=0;
                var longStr = parseInt(time).toString(16);
                //console.log(longStr);
                var bytes=[0,0,0,0,0,0,0,0];
                for(var i=longStr.length,j=7;i>0;i-=2,j--){
                    //console.log(longStr.substring(i-2,i));
                    bytes[j]=parseInt(longStr.substring(i-2,i),16);
                }
                return bytes;
            }
            this.longToInt=function(l){
                if(undefined==l) l=0;
                var longStr = parseInt(l).toString(16);
                var bytes=[0,0];
                for(var i=longStr.length,j=1;i>0;i-=8,j--){
                    bytes[j]=parseInt(longStr.substring(i-8,i),16);
                }
                return bytes;
            }
            this.longBitLen = function(l){
                var len1 = l[0].toString(2).length;
                var len2 = (len1!=0)?32:l[1].toString(2).length;
                return len1+len2;

            }
            this.timeSeriesToBytes = function(times){
                times.sort();
                var max=times[times.length-1];
                var maxIntArr =  this.longToInt(max);
                var minIntArr =  this.longToInt(times[0]);
                var xorArr = this.x64Xor(maxIntArr,minIntArr);
                var commonByteLen=parseInt((64- this.longBitLen(xorArr))/8);//common bytes length
                var size=times.length;
                var memSize=commonByteLen+1+(8-commonByteLen)*size;
                var data=new Array(memSize);
                data[0]=size & 0xFF;
                var maxbytes =  this.longToBytes2(max);
                for(var j=1;j<=commonByteLen;j++){
                    data[j]=(maxbytes[j-1]);
                }
                var unCommonLen = 8-commonByteLen;
                for(var i=0;i<size;i++){
                    var t =  this.longToBytes2(times[i]);
                    for(var k=1;k<=unCommonLen;k++){
                        data[commonByteLen+i*unCommonLen+k]=t[commonByteLen+k-1];
                    }
                }
                return data;
            }
            this.serializePerformanceTimeing=function(performanceTiming,buf){
                if(undefined==performanceTiming||performanceTiming.length==0){
                    buf.put(0);
                    return;
                }
                var delta=new Array( this.performanceKeyList.length-1);
                var n=0;
                var empty=true;
                var pre=performanceTiming[ this.performanceKeyList[0]];
                for(var m=1;m< this.performanceKeyList.length;m++){
                    var next=performanceTiming[this.performanceKeyList[m]];
                    if(next==undefined || next==0){
                        delta[n++]=undefined;
                    }else{
                        var d=next-pre;
                        delta[n++]=d;
                        empty=false;
                    }
                }
                var  byteBuffer = new ByteBuffer();
                if(pre==undefined || empty){
                    buf.put(1);
                    buf.put(-1);
                    return;
                }
                byteBuffer.putBytes( this.longToBytes2(pre));
                var b=[0,0,0,0,0];
                byteBuffer.putBytes(b);
                for(var i=0;i<delta.length;i++){
                    var index=parseInt(i/4);
                    var offset=parseInt(i%4*2);
                    var mask=0;
                    if(delta[i]==undefined) mask=0;
                    else if(delta[i]<=256) mask=0x1;
                    else if(delta[i]<=65535) mask=0x2;
                    else mask=0x3;
                    b[index]=b[index] | (mask<<offset);
                    if(mask==0x1){
                        byteBuffer.put(delta[i]& 0xFF);
                    }else if(mask==0x2){
                        byteBuffer.put(delta[i]& 0xFF);
                        byteBuffer.put(((delta[i]>>8)& 0xFF));
                    }else if(mask==0x3){
                        byteBuffer.put(delta[i]& 0xFF);
                        byteBuffer.put((delta[i]>>8)& 0xFF);
                        byteBuffer.put((delta[i]>>16)& 0xFF);
                    }
                }
                for(var i=0;i<b.length;i++){
                    byteBuffer.putAtIndex(8+i, b[i]);
                }
                buf.put(byteBuffer.position());
                buf.putBytes(byteBuffer.getBytes());
            }
            this.serializeOther=function(json,buf){
                var basic = json.basic;
                var navigator = json.navigator;
                var webGL  = json.webGL;
                var webRtc = json.webRtc;
                var flash   = json.flash;
                this.serializeStringWithByteLength( this.getValue(basic,"platform",undefined),buf);
                this.serializeStringWithByteLength( this.getValue(basic,"architecture",undefined),buf);
                this.serializeStringWithByteLength( this.getValue(basic,"Browser",undefined),buf);

                this.serializeStringWithByteLength( this.getValue(navigator,"vendor",undefined),buf);
                this.serializeStringWithByteLength( this.getValue(navigator,"appVersion",undefined),buf);
                this.serializeStringWithByteLength( this.getValue(navigator,"appName",undefined),buf);
                this.serializeStringWithByteLength( this.getValue(navigator,"appCodeName",undefined),buf);
                this.serializeStringWithByteLength( this.getValue(navigator,"cpuClass",undefined),buf);
                this.serializeStringWithByteLength( this.getValue(navigator,"platform",undefined),buf);
                this.serializeStringWithByteLength( this.getValue(navigator,"product",undefined),buf);
                this.serializeStringWithByteLength( this.getValue(navigator,"productSub",undefined),buf);
                this.serializeStringWithByteLength( this.getValue(navigator,"vendorSub",undefined),buf);
                this.serializeStringWithByteLength( this.getValue(navigator,"buildID",undefined),buf);

                if(null!=webGL&&undefined!=webGL) {
                    this.serializeStringWithByteLength( this.getValue(webGL, "WebGLVendor",undefined), buf);
                    this.serializeStringWithByteLength( this.getValue(webGL, "WebGLRenderer",undefined), buf);
                    this.serializeStringWithByteLength( this.getValue(webGL, "unMaskedVendor",undefined), buf);
                    this.serializeStringWithByteLength( this.getValue(webGL, "unMaskedRenderer",undefined), buf);
                    this.serializeStringWithByteLength( this.getValue(webGL, "glVersion",undefined), buf);
                    this.serializeStringWithByteLength( this.getValue(webGL, "shadingLanguageVersion",undefined), buf);
                }

                if(null!=webRtc&&undefined!=webRtc) {
                    var ms =  this.getValue(webRtc, "mediaSources",undefined);
                    //ms=[{id:"787bbaf475c2cbfaeb1c4dc774a018fb2f605e2a6d247a7444dd356e5d6976f5",kind:"audioinput",label:"",groupid:"4037905827"},{id:"787bbaf475c2cbfaeb1c4dc774a018fb2f605e2a6d247a743655555",kind:"2wersdf",label:"",groupid:"cddfsfs"}];
                    var msList=undefined;
                    if(undefined!=ms) {
                        msList = [];
                        for (var i = 0; i < ms.length; i++) {
                            msList[i] =  this.stringify(ms[i]);
                        }
                    }

                    this.serializeStringList(msList,buf);
                    buf.put(this.getValue(webRtc, "deviceCount",0));
                    this.serializeStringList( this.getValue(webRtc, "IceCandidates",undefined), buf);
                }

                if(null!=flash&&undefined!=flash) {
                    this.serializeStringWithByteLength( this.getValue(flash, "version",undefined), buf);
                    this.serializeStringWithByteLength( this.getValue(flash, "guid",undefined), buf);
                    this.serializeStringWithByteLength( this.getValue(flash, "manufacturer",undefined), buf);
                    this.serializeStringWithByteLength( this.getValue(flash, "os",undefined), buf);
                    this.serializeStringWithByteLength( this.getValue(flash, "maxLevelIDC",undefined), buf);
                    this.serializeStringWithByteLength(this.getValue(flash, "rsg",undefined),buf);
                    this.serializeStringWithByteLength(this.getValue(flash, "rdg",undefined),buf);
                }
            }
            this.serializeStringList=function(list,buf){
                if(undefined==list||list.length==0){
                    buf.put(0);
                    return;
                }
                buf.put(list.length);
                for(var s=0;s<list.length;s++) {
                    var bytes =  this.toBytes(list[s]);
                    buf.put(bytes.length);
                    buf.putBytes(bytes);
                }
            }
            this.serializeStringWithByteLength=function(val,buf){
                if(undefined==val) {
                    buf.put(0);
                    return;
                }
                if(val.length>255)
                    val = val.substring(0,255);
                var bytes =  this.toBytes(val);
                if(bytes.length>255)
                    bytes.splice(255,bytes.length-255);
                buf.put(bytes.length);
                buf.putBytes(bytes);
            }
            this.serializeShortArray=function(json,key,buf){
                var value = json[key];
                if(undefined==value||value.length==0){
                    buf.put(0);
                }else{
                    buf.put(value.length);
                    for(var i=0;i<value.length;i++){
                        buf.putShort(value[i]);
                    }
                }
            }
            this.serializeMouseclickData=function(json,buf) {
                var mouseclickData = json.mouseclickData;
                if(undefined==mouseclickData||mouseclickData.length==0){
                    buf.put(0);
                }else{
                    buf.put(mouseclickData.length);
                    for(var m=0;m<mouseclickData.length;m++){
                        var interval = mouseclickData[m]["interval"];
                        var x1 =   mouseclickData[m]["x1"];
                        var y1 =   mouseclickData[m]["y1"];
                        var x2 =   mouseclickData[m]["x2"];
                        var y2 =   mouseclickData[m]["y2"];
                        buf.putInt(interval);
                        buf.putShort(x1);
                        buf.putShort(y1);
                        buf.putShort(x2);
                        buf.putShort(y2);
                    }
                }
            }
            this.serializeWheelDeltaData=function(json,buf) {
                var wheelDeltaData = json.wheelDeltaData;
                if(undefined==wheelDeltaData||wheelDeltaData.length==0){
                    buf.put(0);
                }else{
                    var b = 0;
                    var lc=0;
                    var tmp;
                    var pos = 0;
                    var bytes = new Array(parseInt(wheelDeltaData.length%2==0?wheelDeltaData.length/2:wheelDeltaData.length/2+1));
                    for(var i=0;i<wheelDeltaData.length;i++){
                        tmp = wheelDeltaData[i];
                        var radix = tmp/120;
                        if(i%2==1) {lc=4;}
                        else {lc=0;}
                        if(radix<0) {
                            b |= ((0x8<<lc) | ((-radix)<<lc));
                        }else {
                            b |= (radix<<lc);
                        }
                        if(i%2==1) {
                            bytes[pos++] = b;
                            b=0;
                        }
                    }
                    if(wheelDeltaData.length%2!=0)
                        bytes[pos]=b;
                    buf.put(bytes.length);
                    buf.putBytes(bytes);
                }
            }
            this.getSimpleSortedPlugins=function(data){
                var navigator = data.navigator;
                var plugins = this.getValue(navigator,"plugins",undefined);
                var arr = [];
                var container = {};
                if(null!=plugins&&undefined!=plugins) {
                    for (var i = 0;i < plugins.length; i++) {
                        if (undefined != plugins[i]&&undefined!=plugins[i].pluginName) {
                            var tmp={};
                            tmp.pluginName = plugins[i].pluginName;
                            if(undefined!=plugins[i].Version)
                                tmp.Version = plugins[i].Version;
                            if(!container[tmp.pluginName]){
                                arr.push(tmp);
                                container[tmp.pluginName] = 1;
                            }
                        }
                    }
                    var by = function (name) {
                        return function (o, p) {
                            var a, b;
                            if (typeof o === "object" && typeof p === "object" && o && p) {
                                a = o[name];
                                b = p[name];
                                if (a === b) {
                                    return 0;
                                }
                                if (typeof a === typeof b) {
                                    return a < b ? -1 : 1;
                                }
                                return typeof a < typeof b ? -1 : 1;
                            }
                            else {
                                throw ("error");
                            }
                        }
                    }
                    //sort
                    arr.sort(by("pluginName"));
                    return arr;
                }
                return undefined;
            }
            this.getUniqueSortedMimeType=function(data){
                var navigator = data.navigator;
                var mimeTypes = this.getValue(navigator,"mimeTypes",undefined);
                var types = [];
                var container = {};
                if(null!=mimeTypes&&undefined!=mimeTypes) {
                    for (var i = 0;i < mimeTypes.length; i++) {
                        if (undefined != mimeTypes[i]&&undefined!=mimeTypes[i].type&&!container[mimeTypes[i].type]) {
                            types.push(mimeTypes[i].type);
                            container[mimeTypes[i].type] = 1;
                        }
                    }
                    //sort
                    types.sort();
                    return types;
                }
                return undefined;
            }
            this.browserFp=function(data){
                var screenData = data.screenData;
                var canvasFp = data.canvasFp;
                var navigator = data.navigator;
                var flash = data.flash;
                var basic = data.basic;
                var other = data.other;
                var geoAndISP = data.geoAndISP;
                var fpdata={};
                var fill= function (json,key,value) {
                    if(value==undefined) return;
                    json[key]=value;
                }
                fill(fpdata,"width",this.getValue(screenData,"width",0));
                fill(fpdata,"height",this.getValue(screenData,"height",0));
                fill(fpdata,"canvas",this.getValue(canvasFp,"canvasData",undefined));
                fill(fpdata,"userAgent",this.getValue(navigator,"useragent",undefined));
                fill(fpdata,"timeZone",this.getValue(geoAndISP,"ClientTimezoneOffset",-1));
                fill(fpdata,"platform",this.getValue(basic,"platform",undefined));
                fill(fpdata,"os",this.getValue(basic,"os",Dictionary.BASIC_os[4],Dictionary.BASIC_os));
                fill(fpdata,"numCpu",this.getValue(navigator,"numCPU",1,Dictionary.CPUNUM_LIST));
                fill(fpdata,"hardwareConcurrency",this.getValue(navigator,"hardwareConcurrency",1,Dictionary.CPUNUM_LIST));
                fill(fpdata,"language",this.getValue(navigator,"language","zh-cn",Dictionary.NAVIGATOR_language));
                fill(fpdata,"cpuClass",this.getValue(navigator,"cpuClass",undefined));
                fill(fpdata,"plugins",this.getSimpleSortedPlugins(data));
                fill(fpdata,"mimeTypes",this.getUniqueSortedMimeType(data));
                fill(fpdata,"doNotTrack",this.getValue(navigator,"doNotTrack",Dictionary.NAVIGATOR_doNotTrack[2],Dictionary.NAVIGATOR_doNotTrack));
                fill(fpdata,"localStorage",this.getValue(basic,"localStorage",false,Dictionary.BOOLEAN_ENUM));
                fill(fpdata,"sessionStorage",this.getValue(basic,"sessionStorage",false,Dictionary.BOOLEAN_ENUM));
                fill(fpdata,"cookieEnabled",this.getValue(navigator,"cookieEnabled",false,Dictionary.BOOLEAN_ENUM));
                fill(fpdata,"hasIME",this.getValue(flash,"hasIME",false,Dictionary.BOOLEAN_ENUM));
                fill(fpdata,"hasMP3",this.getValue(flash,"hasMP3",false,Dictionary.BOOLEAN_ENUM));
                fill(fpdata,"hasTLS",this.getValue(flash,"hasTLS",false,Dictionary.BOOLEAN_ENUM));
                fill(fpdata,"hasPrinting",this.getValue(flash,"hasPrinting",false,Dictionary.BOOLEAN_ENUM));
                fill(fpdata,"hasStreamingAudio",this.getValue(flash,"hasStreamingAudio",false,Dictionary.BOOLEAN_ENUM));
                fill(fpdata,"hasStreamingVideo",this.getValue(flash,"hasStreamingVideo",false,Dictionary.BOOLEAN_ENUM));
                fill(fpdata,"adblock",this.getValue(other,"adblock",false,Dictionary.BOOLEAN_ENUM));
                var str = this.stringify(fpdata);
                //console.log("fpstr:"+str);
                //alert("fpstr:"+str);
                var fp =  murmurHash3(str,0);
                //console.log("browserFp:"+fp);
                return fp;
            }
            this.encodeStatic =  function(data){
                var header = data.header;
                var navigator = data.navigator;
                var screenData = data.screenData;
                var sysfonts = data.sysfonts;
                var webGL = data.webGL;
                var webRtc = data.webRtc;
                var battery = data.battery;
                var performanceTiming = data.performanceTiming;
                var visTime = data.visTime;
                var flash = data.flash;
                var canvasFp = data.canvasFp;
                var geoAndISP = data.geoAndISP;
                var buf = new ByteBuffer();
                buf.put(this.version);
                var extension =0;//the last two bit represent the loader type,such as desktop or h5.
                if(null!=canvasFp&&undefined!=canvasFp)
                    extension|=0x8000;
                if(null!=flash&&undefined!=flash)
                    extension|=0x4000;
                if(null!=webGL&&undefined!=webGL)
                    extension|=0x2000;
                if(null!=webRtc&&undefined!=webRtc)
                    extension|=0x1000;
                if(null!=geoAndISP&&undefined!=geoAndISP)
                    extension|=0x0800;
                if(null!=sysfonts&&undefined!=sysfonts)
                    extension|=0x0400;
                buf.putShort(extension);
                buf.putBytes([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
                this.serializeBooleanSegment(data,buf);
                this.serializeTouchPlayerCpuArch(flash,buf);
                this.serializeHistoryLen(header,buf);
                this.serializeNumCpuHardwareFragment(navigator,webGL,buf);
                this.serializeEnumValOneByte( this.getValue(navigator,"language","zh-cn"),Dictionary.NAVIGATOR_language,buf);
                this.serializeTrackColorLevel(navigator,flash,battery,buf);
                this.serializeBatteryDischarg(battery,buf);
                if(null!=canvasFp&&undefined!=canvasFp)
                    this.serializeCanvasData(canvasFp.canvasData,buf);
                if(null!=geoAndISP&&undefined!=geoAndISP)
                    this.serializeGeoAndISP(geoAndISP,buf);
                this.serializeScreenData(screenData,buf);
                if(null!=webGL&&undefined!=webGL)
                    this.serializeWebGLFixedSegment(webGL,buf);
                if(null!=flash&&undefined!=flash)
                    this.serializeFlashFixedSegment(flash,buf);
                this.serializeUserAgent(navigator,buf);
                buf.putShortAtIndex(3,buf.position());
                var plugins =  this.getValue(navigator,"plugins",undefined);
                this.serializePlugins(plugins,buf);
                buf.putShortAtIndex(5, buf.position()-buf.getShort(3));
                var pos = buf.position();
                var mimeTypes  =  this.getValue(navigator,"mimeTypes",undefined);
                var types = [];
                if(null!=mimeTypes&&undefined!=mimeTypes)
                    for(var i = 0,j=0;i<mimeTypes.length;i++) {
                        if (undefined != mimeTypes[i]) {
                            types[j] = mimeTypes[i].type;
                            j++;
                        }
                    }
                this.serializeMimeTypeOrFonts(types,buf,Dictionary.NAVIGATOR_mimeTypes,false);
                buf.putShortAtIndex(7,buf.position()-pos);
                pos = buf.position();
                if(null!=sysfonts&&undefined!=sysfonts)
                    this.serializeMimeTypeOrFonts(sysfonts,buf,Dictionary.FONTS,true);
                buf.putIntAtIndex(9,buf.position()-pos);
                pos = buf.position();
                if(null!=flash&&undefined!=flash) {
                    this.serializeMimeTypeOrFonts(flash.fontNames, buf, Dictionary.FONTS, true);
                }
                buf.putIntAtIndex(13, buf.position()-pos);
                pos = buf.position();
                if(null!=webGL&&undefined!=webGL) {
                    this.serializeContextName(webGL.contextNames,buf);
                    buf.putAtIndex(17, buf.position()-pos);
                    pos = buf.position();
                    this.serializeWebGLExtensions(webGL.extensions, buf);
                }
                buf.putAtIndex(18,buf.position()-pos);
                pos = buf.position();
                if(null!=webRtc&&undefined!=webRtc) {
                    this.serializeIp(webRtc.IPADDR, buf);
                }
                buf.putAtIndex(19,buf.position()-pos);
                pos = buf.position();
                this.serializeOther(data,buf);
                buf.putShortAtIndex(20,buf.position()-pos);
                pos = buf.position();
                this.serializeVisTime(visTime,buf);
                buf.putAtIndex(22,buf.position()-pos);
                this.serializePerformanceTimeing(performanceTiming,buf);
                //browerfp is same serialized as canvas data
                var browserfp = this.browserFp(data);
                this.serializeCanvasData(browserfp,buf);
                buf.putInt(buf.checkSum());
                return buf.getBytes();
            }
            this.encodeDynamic = function(data){
                if(undefined==data) return;
                var buf = new ByteBuffer();
                var b=0;
                b|=((data.keypress!=undefined)&&data.keypress)?0x80:0;
                b|=((data.scroll!=undefined)&&data.scroll)?0x40:0;
                b|=((data.click!=undefined)&&data.click)?0x20:0;
                buf.put(this.DYNAMIC_VERSION);
                buf.put(b);
                this.serializeShortArray(data,"mousemoveData",buf);
                this.serializeShortArray(data,"keypressData",buf);
                this.serializeMouseclickData(data,buf);
                this.serializeWheelDeltaData(data,buf);
                return buf.getBytes();
            }
        }
        function ByteBuffer() {
            this.pos = 0;//byte array current position
            this.bytes = new Array();
            this.checkSum = function () {
                var mSum = 0;
                for (var i = 0; i < this.bytes.length; i++) {
                    mSum += (this.bytes[i] >= 0) ? this.bytes[i] : (this.bytes[i] + 256);
                }
                return mSum;
            }
            this.get = function (ix) {
                return this.bytes[ix];
            }
            this.getShort = function (ix) {
                return (this.bytes[ix] << 8) | this.bytes[ix + 1];
            }
            this.position = function () {
                return this.pos;
            }
            this.getBytes = function () {
                return this.bytes;
            }
            this.put = function (byte) {
                this.bytes[this.pos] = byte;
                this.pos++;
            }
            this.putAtIndex = function (index, byte) {
                this.bytes[index] = byte;
            }
            this.putBytes = function (arr) {
                for (var i = 0; i < arr.length; i++) {
                    this.put(arr[i]);
                }
            }
            this.putInt = function (int) {
                this.toBytes(int, 4);
            }
            this.putIntAtIndex = function (index, int) {
                this.toBytesAtIndex(int, 4, index);
            }
            this.putShort = function (short) {
                this.toBytes(short, 2);
            }
            this.putShortAtIndex = function (index, short) {
                this.toBytesAtIndex(short, 2, index);
            }
            this.putLong = function (long) {
                this.toBytes(long, 8);
            }
            this.putLongAtIndex = function (index, long) {
                this.toBytesAtIndex(long, 8, index);
            }
            this.putFloat = function (float) {
                this.putInt(this.toFloat32(float));
            }

            this.toBytesAtIndex = function (x, byteSize, index) {
                var i = byteSize;
                do {
                    this.bytes[index - 1 + i] = x & (255);
                    i--;
                    x = x >> 8;
                } while (i)
            }
            this.toFloat32 = function (value) {
                var bytes = 0;
                switch (value) {
                    case Number.POSITIVE_INFINITY:
                        bytes = 0x7F800000;
                        break;
                    case Number.NEGATIVE_INFINITY:
                        bytes = 0xFF800000;
                        break;
                    //case +0.0: bytes = 0x40000000; break;
                    //case -0.0: bytes = 0xC0000000; break;
                    case 0:
                        bytes = 0;
                        break;
                    default:
                        if (Number.isNaN(value)) {
                            bytes = 0x7FC00000;
                            break;
                        }

                        if (value <= -0.0) {
                            bytes = 0x80000000;
                            value = -value;
                        }

                        var exponent = Math.floor(Math.log(value) / Math.log(2));
                        var significand = ((value / Math.pow(2, exponent)) * 0x00800000) | 0;

                        exponent += 127;
                        if (exponent >= 0xFF) {
                            exponent = 0xFF;
                            significand = 0;
                        } else if (exponent < 0) exponent = 0;

                        bytes = bytes | (exponent << 23);
                        bytes = bytes | (significand & ~(-1 << 23));
                        break;
                }
                return bytes;
            };
            this.toBytes = function (x, byteSize) {
                var i = byteSize;
                do {
                    this.bytes[this.pos - 1 + i] = x & (255);
                    i--;
                    x = x >> 8;
                } while (i)
                this.pos += byteSize;
            }
        }
    }
})();