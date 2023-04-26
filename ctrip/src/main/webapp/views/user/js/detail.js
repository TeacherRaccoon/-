jQuery(function () {
    var orderId = jQuery('#orderId').val();
    var webSite = jQuery('#webSite').val();
    var qb_o = jQuery('#qb_o').val();
    var ticketOrderListUrl = jQuery('#ticketOrderListUrl').val();
    var base_txtdivs = jQuery(".base_txtdiv"),
        hidden_boxes = jQuery(".hidden_box"),
        hidden_btns = jQuery(".hidden_close a");
    var csrfToken = jQuery("#csrf_Token").val();

    base_txtdivs.each(function (index, element) {
        jQuery(element).bind('click', function () {
            var item = hidden_boxes.eq(index);
            if (item.is(':visible')) {
                item.addClass('hidden');
            } else {
                item.removeClass('hidden');
            }
            return this;
        });
    });

    hidden_btns.each(function (index, element) {
        jQuery(element).bind('click', function (event) {
            event.stopPropagation();
            jQuery(this.parentNode.parentNode.parentNode).addClass('hidden');
            return this;
        });
    });
    //商家电话
    jQuery('#business_phone').hover(
        function () {
            jQuery(this).parent().find('.expand_block').show();

        }, function () {
            jQuery(this).parent().find('.expand_block').hide();
        });

    //console.log("common in detail.js");
    //console.log(cQuery);

    jQuery('#reSendSMSBtn').bind('click', reSendSMS);
    // 老取消
    jQuery('#cancelOrderBtn').bind('click', onCancelOrder);
    // 新取消
    jQuery('#cancelOrderBtnNew').bind('click', cancelOrderBtnNew);
    // 新退订 
    jQuery('#unscriberOderBtn').bind('click', onUnScribeOrder);
    // 老退订
    jQuery('#unscriberOderBtnOld').bind('click', onUnScribeOrderOld);
    jQuery('#delOrderBtn').bind('click', onDeleteOrder);
    jQuery('#modifyUseDateBtn').bind('click', onModifyOrder);

    // 查询退款进度
    jQuery('#j-search-refund').bind('click', queryRefund);

    jQuery('#printOrderBtn').bind('click', (function () {
        var orderBox = jQuery('.order_box');
        return function (event) {
            window.print();
            return;
            var newWindow = window.open("打印窗口", "_blank");
            var docStr = orderBox.html();
            newWindow.document.write(docStr);
            newWindow.document.close();
            newWindow.print();
            newWindow.close();
        };
    })());

    // 2015 02 取消订单_弹框
    // 
    jQuery('#unscriberOderBtn, #cancelOrderBtnNew').find("i").bind("mouseenter", function () {
        var _this = this;
        this.timeoutId = setTimeout(function () {
            jQuery(_this).parent().next().show();
        }, 200)
    }).bind("mouseleave", function () {
        var _this = this;
        clearTimeout(this.timeoutId)
        jQuery(this).parent().next().hide();
    });

    // 查询退款进度
    function queryRefund() {
        showRefundDialog();
    };

    var showRefundDialog = (function () {
        var refundDialog = jQuery("#refundDialog");
        var form = jQuery("#ctripForm");
        var close = refundDialog.find('.order_masking_hd a');
        refundDialog.find(".order_masking_content").css("padding", 0);
        var isLoad = false;

        close.bind('click', function (event) {
            event.stopPropagation();
            showMask(false);
            refundDialog.hide();
        });

        // 每次重设 iframe 
        var resetIframeFunc = function () {
            jQuery("#formRefund").remove();
            jQuery("<iframe id='formRefund' class='refund_form_progress_bar' name='formRefund' src='javascript:;' frameborder='0'></iframe>").appendTo(jQuery("#refundIframeContainer"));
        };

        return function () {
            resetIframeFunc();

            form.attr("target", "formRefund");
            form.submit();
            isLoad = true;

            showMask(true);
            refundDialog.show();
            center(refundDialog);
        }
    })()

    // 申请电子发票 Form
    var electronicInvoiceConfirm = (function () {
        var elecConfirm = jQuery('#EInvoiceSuccessDialog');
        var _OrderID,
            _InvoiceType,
            _Title,
            _Content,
            _ConnectMobile,
            _Email;

        // 关闭
        elecConfirm.on('click', '.mask_cancel_container .invoice_confirm_hd a', function (e) {
            e.stopPropagation();
            elecConfirm.hide();
            showMask(false);
        });

        // 返回
        elecConfirm.on('click', '#eInvoiceConfirmBack', function (e) {
            e.stopPropagation();
            elecConfirm.hide();
            showMask(false);
        });

        // 确定
        elecConfirm.on('click', '#eInvoiceConfirmOK', function (e) {
            e.stopPropagation();

            var url = webSite + "/OrderDetail/ApplyInvoiceOP";
            jQuery.ajax({
                url: url,
                type: "POST",
                data: {
                    "OrderID": _OrderID,
                    "InvoiceType": _InvoiceType,
                    "Title": _Title,
                    "Content": _Content,
                    "ConnectMobile": _ConnectMobile,
                    "Email": _Email
                },
                success: function (data) {
                    if (data.Code === "0") {
                        location.href = ticketOrderListUrl;
                    } else {
                        elecConfirm.hide();
                        showError();
                    }
                },
                error: function () {
                    elecConfirm.hide();
                    showError();
                }
            });
        });

        return function (OrderID, InvoiceType, Title, Content, ConnectMobile, Email) {
            showMask(true);
            center(elecConfirm);
            elecConfirm.show();

            _OrderID = OrderID;
            _InvoiceType = InvoiceType;
            _Title = Title;
            _Content = Content;
            _ConnectMobile = ConnectMobile;
            _Email = Email;
        };
    })();
    var electronicInvoiceApply = (function () {
        var eInvoiceTitle = jQuery('#eInvoiceTitle'),
            eInvoiceMobile = jQuery('#eInvoiceMobile'),
            eInvoiceContent = jQuery('#eInvoiceContent'),
            eInvoiceSubmit = jQuery('#eInvoiceSubmit'),
            eInvoiceEmail = jQuery('#eInvoiceEmail');

        // 抬头
        eInvoiceTitle.bind('keyup', function () {
            if (eInvoiceTitle.val().indexOf("公司") >= 0 ||
                eInvoiceTitle.val().indexOf("集团") >= 0) {
                $(this).css({
                    "borderColor": "red"
                });
                eInvoiceTitle.data('flag', 'red');
            } else {
                $(this).css({
                    "borderColor": "#CCC"
                });
                eInvoiceTitle.data('flag', '');
            }
        });

        // 手机
        eInvoiceMobile.bind('keyup', function () {
            var result = /^17[0-9]{9}$|^13[0-9]{9}$|^15[0-9]{9}$|^18[0-9]{9}$|^14[0-9]{9}$|^00852[6,9,8,5][0-9]{7}$|^852[6,9,8,5][0-9]{7}$|^65[0-9]{8}$|^601[0-9]{8}$|^886[0-9]{9}$/.test(eInvoiceMobile.val());
            if (result) {
                $(this).css({
                    "borderColor": "#CCC"
                });
                eInvoiceMobile.data('flag', '');
            } else {
                $(this).css({
                    "borderColor": "red"
                });
                eInvoiceMobile.data('flag', 'red');
            }
        });
        // 邮箱
        eInvoiceEmail.bind('keyup', function () {
            var result = /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(eInvoiceEmail.val());
            if (result) {
                $(this).css({
                    "borderColor": "#CCC"
                });
                eInvoiceEmail.data('flag', '');
            } else {
                $(this).css({
                    "borderColor": "red"
                });
                eInvoiceEmail.data('flag', 'red');
            }
        });

        // 提交
        eInvoiceSubmit.bind('click', function () {
            if (eInvoiceTitle.val() == "" || eInvoiceTitle.data('flag') == 'red') {
                return;
            }
            if (eInvoiceMobile.val() == "" || eInvoiceMobile.data('flag') == 'red') {
                return;
            }
            if (eInvoiceEmail.val() == "" || eInvoiceEmail.data('flag') == 'red') {
                return;
            }

            electronicInvoiceConfirm(orderId, 2, eInvoiceTitle.val(), eInvoiceContent.val(), eInvoiceMobile.val(), eInvoiceEmail.val());
        });

        return function () {
        };
    })();
    jQuery('#EInvoiceCb').bind('click', function () {
        jQuery('#EInvoiceForm').hide();

        if (jQuery('#EInvoiceCb').is(':checked')) {
            jQuery('#EInvoiceForm').show();

            jQuery('#PInvoiceCb').attr('checked', false);
            jQuery('#PInvoiceForm').hide();

            electronicInvoiceApply();
        } else {
            jQuery('#EInvoiceForm').hide();
        }
    });

    // 电子发票提示
    jQuery('#EInvoiceTip').bind('mouseenter', function () {
        var that = this;
        this.timeoutId = setTimeout(function () {
            jQuery(that).next().show();
        }, 100);
    }).bind('mouseleave', function () {
        var that = this;
        clearTimeout(this.timeoutId);
        jQuery(that).next().hide();
    }).bind('click', function () {
        window.open(jQuery(this).data('url'), '_blank');
    });

    // 电子发票下载
    jQuery('#elecInvoiceDown').bind('click', function (event) {
        event.stopPropagation();

        var _code = jQuery('#elecInvoiceCode').val();
        var _no = jQuery('#elecInvoiceNo').val();
        var _url = webSite + "/OrderDetail/GetEInvoicePDF";

        var form = jQuery("<form>");   //定义一个form表单
        form.attr('style', 'display:none');   //在form表单中添加查询参数
        form.attr('target', '');
        form.attr('method', 'post');
        form.attr('action', _url);

        var input1 = jQuery('<input>');
        input1.attr('type', 'hidden');
        input1.attr('name', 'id');
        input1.attr('value', orderId);

        var input2 = jQuery('<input>');
        input2.attr('type', 'hidden');
        input2.attr('name', 'code');
        input2.attr('value', _code);

        var input3 = jQuery('<input>');
        input3.attr('type', 'hidden');
        input3.attr('name', 'no');
        input3.attr('value', _no);

        form.append(input1);   //将查询参数控件提交到表单上
        form.append(input2);
        form.append(input3);
        jQuery('body').append(form);  //将表单放置在web中 
        form.submit();

        //jQuery.ajax({
        //    url: _url,
        //    type: "POST",
        //    data: {
        //        "id": orderId,
        //        "code": _code,
        //        "no": _no
        //    },
        //    success: function (data) {
        //        //window.open(data);
        //        var blob = new Blob([data]);
        //        var link = document.createElement('a');
        //        link.href = window.URL.createObjectURL(blob);
        //        link.download = "订单" + orderId + ".pdf";
        //        link.click();


        //    }
        //});
    });

    // 申请纸质发票 Form
    var paperInvoiceConfirm = (function () {
        var paperConfirm = jQuery('#PInvoiceSuccessDialog');
        var _OrderID,
            _InvoiceType,
            _Title,
            _Content,
            _ConnectMobile,
            _DeliveryAddress,
            _DeliveryType,
            _Receiver;

        // 关闭
        paperConfirm.on('click', '.mask_cancel_container .invoice_confirm_hd a', function (e) {
            e.stopPropagation();
            paperConfirm.hide();
            showMask(false);
        });

        // 返回
        paperConfirm.on('click', '#pInvoiceConfirmBack', function (e) {
            e.stopPropagation();
            paperConfirm.hide();
            showMask(false);
        });

        // 确定
        paperConfirm.on('click', '#pInvoiceConfirmOK', function (e) {
            e.stopPropagation();

            var url = webSite + "/OrderDetail/ApplyInvoiceOP";
            jQuery.ajax({
                url: url,
                type: "POST",
                data: {
                    "OrderID": _OrderID,
                    "InvoiceType": _InvoiceType,
                    "Title": _Title,
                    "Content": _Content,
                    "ConnectMobile": _ConnectMobile,
                    "DeliveryAddress": _DeliveryAddress,
                    "DeliveryType": _DeliveryType,
                    "Receiver": _Receiver
                },
                success: function (data) {
                    if (data.Code === "0") {
                        location.href = ticketOrderListUrl;
                    } else {
                        elecConfirm.hide();
                        showError();
                    }
                },
                error: function () {
                    elecConfirm.hide();
                    showError();
                }
            });
        });

        return function (OrderID, InvoiceType, Title, Content, ConnectMobile, DeliveryAddress, DeliveryType, Receiver) {
            showMask(true);
            center(paperConfirm);
            paperConfirm.show();

            _OrderID = OrderID;
            _InvoiceType = InvoiceType;
            _Title = Title;
            _Content = Content;
            _ConnectMobile = ConnectMobile;
            _DeliveryAddress = DeliveryAddress;
            _DeliveryType = DeliveryType;
            _Receiver = Receiver;
        };
    })();
    var paperInvoiceApply = (function () {
        var pInvoiceTitle = jQuery('#pInvoiceTitle'),
            pInvoiceContent = jQuery('#pInvoiceContent'),
            pInvoiceDeliveryType = jQuery('#pInvoiceDeliveryType'),
            pInvoiceReciver = jQuery('#pInvoiceReciver'),
            pInvoiceMobile = jQuery('#pInvoiceMobile'),
            pInvoiceDeliveryAddress = jQuery('#pInvoiceDeliveryAddress'),
            pInvoiceSubmit = jQuery('#pInvoiceSubmit');

        // 抬头
        pInvoiceTitle.bind('keyup', function () {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "borderColor": "red"
                });
                pInvoiceTitle.data('flag', 'red');
            } else {
                $(this).css({
                    "borderColor": "#CCC"
                });
                pInvoiceTitle.data('flag', '');
            }
        });

        // 收件人
        pInvoiceReciver.bind('keyup', function () {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "borderColor": "red"
                });
                pInvoiceReciver.data('flag', 'red');
            } else {
                $(this).css({
                    "borderColor": "#CCC"
                });
                pInvoiceReciver.data('flag', '');
            }
        });

        // 手机
        pInvoiceMobile.bind('keyup', function () {
            var result = /^17[0-9]{9}$|^13[0-9]{9}$|^15[0-9]{9}$|^18[0-9]{9}$|^14[0-9]{9}$|^00852[6,9,8,5][0-9]{7}$|^852[6,9,8,5][0-9]{7}$|^65[0-9]{8}$|^601[0-9]{8}$|^886[0-9]{9}$/.test(pInvoiceMobile.val());
            if (result) {
                $(this).css({
                    "borderColor": "#CCC"
                });
                pInvoiceMobile.data('flag', '');
            } else {
                $(this).css({
                    "borderColor": "red"
                });
                pInvoiceMobile.data('flag', 'red');
            }
        });

        // 地址
        pInvoiceDeliveryAddress.bind('keyup', function () {
            if ($(this).val().length <= 0) {
                $(this).css({
                    "borderColor": "red"
                });
                pInvoiceDeliveryAddress.data('flag', 'red');
            } else {
                $(this).css({
                    "borderColor": "#CCC"
                });
                pInvoiceDeliveryAddress.data('flag', '');
            }
        });

        // 提交
        pInvoiceSubmit.bind('click', function () {
            if (pInvoiceTitle.val() == "" || pInvoiceTitle.data('flag') == 'red') {
                return;
            }
            if (pInvoiceReciver.val() == "" || pInvoiceReciver.data('flag') == 'red') {
                return;
            }
            if (pInvoiceMobile.val() == "" || pInvoiceMobile.data('flag') == 'red') {
                return;
            }
            if (pInvoiceDeliveryAddress.val() == "" || pInvoiceDeliveryAddress.data('flag') == 'red') {
                return;
            }

            paperInvoiceConfirm(orderId, 1, pInvoiceTitle.val(), pInvoiceContent.val(), pInvoiceMobile.val(), pInvoiceDeliveryAddress.val(), pInvoiceDeliveryType.val(), pInvoiceReciver.val());
        });

        return function () {
        };
    })();
    jQuery('#PInvoiceCb').bind('click', function () {
        jQuery('#PInvoiceForm').hide();

        if (jQuery('#PInvoiceCb').is(':checked')) {
            jQuery('#PInvoiceForm').show();

            jQuery('#EInvoiceCb').attr('checked', false);
            jQuery('#EInvoiceForm').hide();

            paperInvoiceApply();
        } else {
            jQuery('#PInvoiceForm').hide();
        }
    });

    // 重发短信
    function reSendSMS() {
        if (jQuery('#reSendSMSBtn').hasClass('btn_display')) {
            return false;
        } else {
            showReSendSMSDialog();
        }

    }

    var showReSendSMSDialog = (function () {
        var resendSMSDialog = jQuery('#resendSMSDialog'),
            titleSpan = resendSMSDialog.find('.order_masking_hd span'),
            close = resendSMSDialog.find('.order_masking_hd a'),
            ok = resendSMSDialog.find('input:first'),
            cc = resendSMSDialog.find('input:last');

        close.bind('click', function (event) {
            event.stopPropagation();
            resendSMSDialog.hide();
            showMask(false);
        });

        cc.bind('click', function (event) {
            event.stopPropagation();
            resendSMSDialog.hide();
            showMask(false);
        });

        ok.bind('click', function (event) {
            event.stopPropagation();
            var url = webSite + "/OrderDetail/ReSendSMS?qb_o=" + qb_o;
            jQuery.ajax({
                url: url,
                type: "POST",
                data: {
                    "orderId": orderId
                },
                success: function (data) {
                    if (data.Code === "0") {
                        resendSMSDialog.hide();
                        showReSendSMSSuccessDialog();
                    } else if (data.Code === "-1") {
                        resendSMSDialog.hide();
                        showReSendSMSFail1Dialog();
                    } else if (data.Code === "-2") {
                        resendSMSDialog.hide();
                        showReSendSMSFail2Dialog();
                    } else {
                        resendSMSDialog.hide();
                        showError();
                    }
                },
                error: function () {
                    resendSMSDialog.hide();
                    showError();
                }
            });

        });

        return function () {
            showMask(true);
            resendSMSDialog.show();
            center(resendSMSDialog);
        }
    })();

    var showReSendSMSSuccessDialog = (function () {
        var resendSMSSuccessDialog = jQuery('#resendSMSSuccessDialog'),
            titleSpan = resendSMSSuccessDialog.find('.order_masking_hd span'),
            close = resendSMSSuccessDialog.find('.order_masking_hd a'),
            ok = resendSMSSuccessDialog.find('input:first');

        close.bind('click', function (event) {
            event.stopPropagation();
            resendSMSSuccessDialog.hide();
            showMask(false);
        });

        ok.bind('click', function (event) {
            event.stopPropagation();
            resendSMSSuccessDialog.hide();
            showMask(false);
        });

        return function () {
            jQuery('#reSendSMSBtn').addClass('btn_display').attr('value', '已发送');
            showMask(true);
            resendSMSSuccessDialog.show();
            center(resendSMSSuccessDialog);
        };
    })();

    var showReSendSMSFail1Dialog = (function () { //返回的值-1
        var resendSMSFailDialog = jQuery('#resendSMSFail1Dialog'),
            titleSpan = resendSMSFailDialog.find('.order_masking_hd span'),
            close = resendSMSFailDialog.find('.order_masking_hd a'),
            ok = resendSMSFailDialog.find('input:first');

        close.bind('click', function (event) {
            event.stopPropagation();
            resendSMSSuccessDialog.hide();
            showMask(false);
        });

        ok.bind('click', function (event) {
            event.stopPropagation();
            resendSMSFailDialog.hide();
            showMask(false);
        });

        return function () {
            showMask(true);
            resendSMSFailDialog.show();
            center(resendSMSFailDialog);
        };
    })();

    var showReSendSMSFail2Dialog = (function () { //返回的值-1
        var resendSMSFailDialog2 = jQuery('#resendSMSFail2Dialog'),
            titleSpan = resendSMSFailDialog2.find('.order_masking_hd span'),
            close = resendSMSFailDialog2.find('.order_masking_hd a'),
            ok = resendSMSFailDialog2.find('input:first');

        close.bind('click', function (event) {
            event.stopPropagation();
            resendSMSFailDialog2.hide();
            showMask(false);
        });

        ok.bind('click', function (event) {
            event.stopPropagation();
            resendSMSFailDialog2.hide();
            showMask(false);
        });

        return function () {
            showMask(true);
            resendSMSFailDialog2.show();
            center(resendSMSFailDialog2);
        };
    })();

    // 新退订订单处理，针对已经付款的情况
    function onUnScribeOrder(event) {
        if (jQuery(this).hasClass('btn_disable')) return;

        if (jQuery(this).hasClass('btn_Insurance_ForJS')) {
            // alert(0);   //保险 可独退
            showInsuranceProductDialog(3);
        } else {
            showProductDialog(0);
        }
    };

    // 针对 保险可独退
    var showInsuranceProductDialog = (function () {

        var refundInsuranceDialog = jQuery('#productDialog');
        var hiddenIDs = jQuery("#RefundOrderItemsIDs");

        // 更改 取消按钮 状态
        var setCancelBtnStatus = function () {
            var cancelBtn = jQuery("#UnscribeInsuranceCancle");
            if (hiddenIDs.val().length == 0) {
                cancelBtn.addClass("btn_disable").removeClass("btn_blue_middle");
            } else {
                cancelBtn.removeClass("btn_disable").addClass("btn_blue_middle");
            }
        };

        // 更改 隐藏字段 值
        var setHiddenIDsValue = function () {
            var insuranceCBs = refundInsuranceDialog.find(".detail_ForJS");

            var idsStr = "";
            hiddenIDs.val(idsStr);
            for (var i = 0; i < insuranceCBs.length; i++) {
                if (jQuery(insuranceCBs[i]).attr("checked") != "checked") {
                } else {
                    if (i == insuranceCBs.length - 1) {
                        idsStr += jQuery(insuranceCBs[i]).attr("id");
                    }
                    else {
                        idsStr += jQuery(insuranceCBs[i]).attr("id") + ",";
                    }
                }
            }
            hiddenIDs.val(idsStr);
        };

        // 更改 退款 总金额
        var setTotalAmountForCheckbox = function () {
            var insuranceCBs = refundInsuranceDialog.find(".detail_ForJS");
            var totalSpan = refundInsuranceDialog.find(".order_masking_product .product_header .price");

            var totalAmount = 0.0;
            totalSpan.text("¥ - -");

            for (var i = 0; i < insuranceCBs.length; i++) {
                if (jQuery(insuranceCBs[i]).attr("checked") != "checked") {
                } else {
                    totalAmount += Number(jQuery(insuranceCBs[i]).val());
                }
            }

            // 赋值
            if (totalAmount > 0) {
                totalSpan.text("¥ " + totalAmount);
            }

            // 二次赋值
            var flagTotal = true;
            for (var j = 0; j < insuranceCBs.length; j++) {
                if (jQuery(insuranceCBs[j]).attr("checked") != "checked") {
                    flagTotal = false;
                }
            }
            if (flagTotal === true) {
                totalSpan.text("¥ " + jQuery("#refundInsuraceTotalAmount").val());
            }
        };

        // "X"
        refundInsuranceDialog.on("click", ".order_masking_hd a", function () {
            refundInsuranceDialog.hide();
            showMask(false);
        });

        // 返回
        refundInsuranceDialog.on("click", "#UnscribeBack", function () {
            refundInsuranceDialog.hide();
            showMask(false);
        });

        // 取消订单
        refundInsuranceDialog.on("click", "#UnscribeInsuranceCancle", function () {
            if (jQuery(this).hasClass("btn_disable")) {
                return;
            } else {
                refundInsuranceDialog.hide();
                showReasonDialog(_type);   // _type=3
                //alert(0);
            }
        });

        // 复选框 orderItem
        refundInsuranceDialog.on("click", ".detail_OrderItem_ForJS", function () {
            if (jQuery(this).attr("checked") == "checked") {
                if (refundInsuranceDialog.find(".detail_InsuranceItem_ForJS")[0]) {
                    refundInsuranceDialog.find(".detail_InsuranceItem_ForJS").attr("checked", true);
                }
            } else {
            }

            setHiddenIDsValue();
            setCancelBtnStatus();
            setTotalAmountForCheckbox();
        });

        // 复选框 insuranceItem
        refundInsuranceDialog.on("click", ".detail_InsuranceItem_ForJS", function () {
            if (jQuery(this).attr("checked") == "checked") {
            } else {
                refundInsuranceDialog.find(".detail_ForJS").each(function () {
                    jQuery(this).attr("checked", false);
                });
            }

            setHiddenIDsValue();
            setCancelBtnStatus();
            setTotalAmountForCheckbox();
        });


        // 有保险的退订
        return function (type) {
            _type = type;
            jQuery.ajax({
                url: '/thingstodo-booking-ShoppingWebSite/orderdetail/OrderRefundOptions',
                type: 'POST',
                data: {
                    id: orderId,
                    orderStatus: $('#orderStaus').val()
                },
                dataType: 'html',
                success: function (data) {

                    $('#sRefundDialog').remove();
                    $('#refundOtherDialog').remove();

                    if (data.indexOf('sRefundDialog') > -1) {
                        $(document.body).append(data);
                    }


                    var orderStatus = $('#refundOrderStatus').val();
                    $('#orderStatus').val(orderStatus);

                    var dialogHtml = '';
                    var refundDialogFlag = $('#sRefundDialog').length && $.trim($('#sRefundDialog .customer-message').text());
                    if (refundDialogFlag) {
                        dialogHtml = $('#sRefundDialog');

                    } else {
                        dialogHtml = $('#refundOtherDialog');
                    }
                    var _dialogHtml = dialogHtml.length ? dialogHtml.html() : data;
                    showMask(true);
                    refundInsuranceDialog.find('.mask_cancel_container').html(_dialogHtml);

                    refundInsuranceDialog.show();
                    center(refundInsuranceDialog);
                    if (refundDialogFlag) {
                        refundInsuranceDialog.on("click", ".js_cancel", function () {
                            refundInsuranceDialog.hide();
                            showMask(false);
                        });
                        refundInsuranceDialog.on("click", ".js_con_cancel", function () {
                            showMask(true);
                            refundInsuranceDialog.find('.mask_cancel_container').html($('#refundOtherDialog').html());

                            refundInsuranceDialog.find('.order_masking_hd span').text('取消订单');
                            // refundInsuranceDialog.show();
                        });
                    }
                }
            });
        };
    })();

    // 老退订订单处理, 
    function onUnScribeOrderOld(event) {
        if (jQuery(this).hasClass('btn_disable')) return;
        showReasonDialog(0);
    };

    // 老取消订单处理
    function onCancelOrder(event) {
        if (jQuery(this).hasClass('btn_disable')) return;
        showReasonDialog(1);
    };

    // 新的取消订单处理，弹出明细，对应景区现付
    function cancelOrderBtnNew(event) {
        if (jQuery(this).hasClass('btn_disable')) return;
        showProductDialog(1);
    };

    //删除订单处理
    function onDeleteOrder(event) {
        showDeleteDialog();
    };
    //修改使用日期
    function onModifyOrder(event) {
        if (jQuery(this).hasClass('btn_disable')) return;
        showModifyDialog(0);
    }

    // 0 取消订单 1 退订订单   3 保险可独退
    var showProductDialog = (function () {
        var productDialog = jQuery('#productDialog');

        // close
        productDialog.on("click", ".order_masking_hd a", function () {
            productDialog.hide();
            showMask(false);
        });

        // cc
        productDialog.on("click", "#UnscribeBack", function () {
            productDialog.hide();
            showMask(false);
        });

        // ok
        productDialog.on("click", "#UnscribeCancle", function () {
            productDialog.hide();
            var refundAmount = productDialog.find('.price').text().replace(/￥|¥/, '') || 0;
            showReasonDialog(_type, refundAmount);
        });

        //没有保险的退订
        return function (type) {
            _type = type;
            jQuery.ajax({
                url: '/thingstodo-booking-ShoppingWebSite/orderdetail/OrderRefundOptions',
                data: {
                    id: orderId,
                    orderStatus: $('#orderStaus').val()
                },
                type: 'POST',
                dataType: 'html',
                success: function (data) {

                    $('#sRefundDialog').remove();
                    $('#refundOtherDialog').remove();

                    if (data.indexOf('sRefundDialog') > -1) {
                        $(document.body).append(data);
                    }

                    var orderStatus = $('#refundOrderStatus').val();
                    $('#orderStatus').val(orderStatus);

                    var dialogHtml = '';
                    var refundDialogFlag = $('#sRefundDialog').length && $.trim($('#sRefundDialog .customer-message').text());
                    if (refundDialogFlag) {
                        dialogHtml = $('#sRefundDialog');
                    } else {
                        dialogHtml = $('#refundOtherDialog');
                    }
                    showMask(true);
                    var _dialogHtml = dialogHtml.length ? dialogHtml.html() : data;
                    productDialog.find('.mask_cancel_container').html(_dialogHtml);

                    productDialog.find('.order_masking_hd span').text('取消订单');
                    productDialog.show();
                    center(productDialog);
                    if (refundDialogFlag) {
                        productDialog.on("click", ".js_cancel", function () {
                            productDialog.hide();
                            showMask(false);
                        });
                        productDialog.on("click", ".js_con_cancel", function () {
                            showMask(true);
                            productDialog.find('.mask_cancel_container').html($('#refundOtherDialog').html());

                            productDialog.find('.order_masking_hd span').text('取消订单');
                            productDialog.show();
                        });
                    }
                }
            });
        }
    })();

    //显示 取消原因 对话框
    var showReasonDialog = (function () {
        var reasonDialog = jQuery('#reasonDialog'),
            titleSpan = reasonDialog.find('.order_masking_hd span'),
            reasonSpan = reasonDialog.find('.j-flag'),
            select = reasonDialog.find('ul a'),
            textareaWrapper = reasonDialog.find('.textarea-wrapper'),
            textarea = reasonDialog.find('textarea'),
            textareaLimit = reasonDialog.find('.limit'),
            ok = reasonDialog.find('input:first'),
            cc = reasonDialog.find('input:last'),
            close = reasonDialog.find('.order_masking_hd a'),
            _type = 0,
            _refundAmount = 0,
            _reason = '',
            _remark = '';

        // "X"
        close.bind('click', function (event) {
            event.stopPropagation();
            reasonDialog.hide();
            showMask(false);
        });

        // 返回
        cc.bind('click', function (event) {
            event.stopPropagation();
            reasonDialog.hide();
            showMask(false);
        });

        // 原因框
        textarea.bind("focus", function () {
            textarea.css({
                "border-color": "#ccc"
            })
        })

        // 确定
        ok.bind('click', function (event) {
            event.stopPropagation();
            _reason = reasonDialog.find(".select").attr("data-value");
            _reason_index = reasonDialog.find(".select").attr("data-index");
            _remark = textarea.val();
            if (_reason_index == 100 && _remark.length === 0) {
                textarea.css({
                    "border-color": "red"
                })
                return;
            }
            // reasonDialog.hide();
            var para = {};
            if (_type == 3) {
                var urlInsurance = '/OrderDetail/UnsubscribeOrderForInsurance?qb_o=' + qb_o;
                urlInsurance = webSite + urlInsurance;

                para = {
                    id: orderId,
                    orderStatus: $('#orderStaus').val(),
                    reason: _reason,
                    remark: _remark,
                    refundAmount: _refundAmount,
                    orderItemIDs: jQuery("#RefundOrderItemsIDs").val(),
                    csrfToken: csrfToken
                }
                unsubscribeAction(urlInsurance,para);

            } else {
                var url = !!_type ? '/OrderDetail/CancelOrder?qb_o=' + qb_o : '/OrderDetail/UnsubscribeOrder?qb_o=' + qb_o;
                url = webSite + url;

                 para = {
                     id: orderId,
                     orderStatus: !_type ? $('#orderStaus').val() : '',
                     reason: _reason,
                     refundAmount: !_type ? _refundAmount : '',
                     remark: _remark,
                     csrfToken: csrfToken
                 }
                unsubscribeAction(url,para);
            }


        });
        //发起退订请求
        function unsubscribeAction(url,parm){
            jQuery.ajax({
                url: url,
                type: "POST",
                data: parm,
                success: function (data) {
                    unsubscribeResult(data,url,parm)
                },
                error: function () {
                    reasonDialog.hide();
                    showError();
                    jQuery('#unscriberOderBtn').addClass('btn_disable');
                }
            });

        }
        //退订的结果处理
        function unsubscribeResult(data,url,parm) {

            reasonDialog.hide();
            if (data.IsRefundAmountChange) {
                var message = data.CustomerMessage;
                var pDialog = $('#productDialog');

                $('#orderStatus').val(data.OrderStatus);

                pDialog.find('.mask_cancel_container').html($('#sRefundDialog').html());
                center(pDialog);
                $('#productDialog .customer-message').text(message);
                showMask(true);
                pDialog.show();
                pDialog.unbind('click');
                pDialog.on('click','.js_cancel',function(){
                    pDialog.hide();
                    showMask(false);
                });
                pDialog.find(".js_con_cancel").addClass('js_again');
                pDialog.on('click', '.js_again', function () {
                    //再调用一次
                    parm.refundAmount = data.RefundAmount;
                    unsubscribeAction(url,parm);
                    pDialog.hide();
                    showMask(false);
                })

            } else {
                if (data.Code == '0') {
                    showSucc(_type);
                } else {
                    showError();
                }
                jQuery('#unscriberOderBtn').addClass('btn_disable');
            }
        }

        //  原因选项   2015 02 取消订单_弹框
        select.bind('click', function (event) {
            event.stopPropagation();
            select.removeClass("select");
            var data = jQuery(this).attr("data-value");
            if (jQuery(this).addClass("select").attr("data-index") === "100") {
                textareaWrapper.show();
            } else {
                textareaWrapper.hide();
            }
        });

        // 原因款 字数提示
        textarea.bind('keyup', function () {
            var val = jQuery(this).val();
            var rest = 100 - val.length;
            if (rest >= 0) {
                textareaLimit.html("您还可以输入" + rest + "字");
            } else {
                textarea.val(val.slice(0, -1));
            }
        });

        // 2015 02 取消订单_弹框
        return function (type, refundAmount) {
            _type = type;
            _refundAmount = refundAmount;
            titleSpan.text("取消订单");
            if (type == 3) {
                reasonSpan.text("退订原因");
            } else {
                reasonSpan.text(type == 0 ? '取消原因' : '退订原因');
            }
            // select.val('0');
            textarea.val();
            showMask(true);
            reasonDialog.show();
            center(reasonDialog);
        }
    })();

    var showOrderConfirm = (function (type) {
        var confirmDialog = jQuery('#confirmDialog'),
            titleSpan = confirmDialog.find('.order_masking_hd span'),
            tipSpan = confirmDialog.find('.order_masking_bd span:eq(1)'),
            ok = confirmDialog.find('input:first'),
            cc = confirmDialog.find('input:last'),
            close = confirmDialog.find('.order_masking_hd a'),
            _type = 0;


        close.bind('click', function (event) {
            event.stopPropagation();
            confirmDialog.hide();
            showMask(false);
        });

        cc.bind('click', function (event) {
            event.stopPropagation();
            confirmDialog.hide();
            showMask(false);
        });

        ok.bind('click', function (event) {
            event.stopPropagation();
            confirmDialog.hide();
            showReasonDialog(_type);
        });

        return function (type) {
            _type = type;
            titleSpan.text("取消订单");
            tipSpan.text(type == 0 ? '取消' : '退订');
            showMask(true);
            confirmDialog.show();
            center(confirmDialog);
        }
    })();

    var showSucc = (function (type) {
        var succDialog = jQuery('#succDialog'),
            titleSpan = succDialog.find('.order_masking_hd span'),
            close = succDialog.find('.order_masking_hd a'),
            cancelTip = succDialog.find('p:eq(0)'),
            unscribeTip = succDialog.find('p:eq(1)'),
            waitTip = succDialog.find('p:eq(2)'),
            timedown = succDialog.find('.timedown'),
            _timeId = null;

        close.bind('click', function (event) {
            event.stopPropagation();
            showMask(false);
            succDialog.hide();
        });

        return function (type) {
            titleSpan.text("取消订单");
            if (!!type) {
                cancelTip.hide();
                unscribeTip.show();
                waitTip.show();
            } else {
                cancelTip.show();
                unscribeTip.hide();
                waitTip.hide();
            }
            showMask(true);
            succDialog.show();
            center(succDialog);

            if (!!_timeId) {
                clearInterval(_timeId);
            }
            var i = 3;
            timedown.text(i)
            _timeId = setInterval(function () {
                timedown.text(--i);
                if (i <= 0) {
                    showMask(false);
                    succDialog.hide();
                    clearInterval(_timeId);
                    location.href = ticketOrderListUrl;
                }
            }, 1000);
        }
    })();

    var showError = (function () {
        var errDialog = jQuery('#errDialog'),
            close = errDialog.find('.order_masking_hd a'),
            ok = errDialog.find('input:first');

        close.bind('click', function (event) {
            event.stopPropagation();
            showMask(false);
            errDialog.hide();
        });

        ok.bind('click', function (event) {
            showMask(false);
            errDialog.hide();
        });

        return function () {
            showMask(true);
            errDialog.show();
            center(errDialog);
        }
    })();

    var showDeleteDialog = (function (type) {
        var delDialog = jQuery('#delDialog'),
            titleSpan = delDialog.find('.order_masking_hd span'),
            ok = delDialog.find('input:first'),
            cc = delDialog.find('input:last'),
            close = delDialog.find('.order_masking_hd a');

        close.bind('click', function (event) {
            event.stopPropagation();
            showMask(false);
            delDialog.hide();
        });

        cc.bind('click', function (event) {
            event.stopPropagation();
            delDialog.hide();
            showMask(false);
        });

        ok.bind('click', function (event) {
            event.stopPropagation();
            var url = webSite + "/OrderDetail/DeleteOrder?qb_o=" + qb_o;
            jQuery.ajax({
                url: url,
                type: "POST",
                data: {
                    "id": orderId
                },
                success: function (data) {
                    if (data.Code == '0') {
                        location.href = ticketOrderListUrl;
                    } else {
                        delDialog.hide();
                        showError();
                    }
                },
                error: function () {
                    delDialog.hide();
                    showMask(false);
                }
            });

        });

        return function () {
            titleSpan.text('删除订单');
            showMask(true);
            delDialog.show();
            center(delDialog);
        }
    })();

    var showModifySucDialog = (function (type) {

        var modifySuccDialog = jQuery('#modifySuccDialog');
        // close
        modifySuccDialog.on("click", ".order_masking_hd a", function () {
            modifySuccDialog.hide();
            showMask(false);
        });

        // ok
        modifySuccDialog.on("click", ".btn_blue_middle", function () {
            showMask(false);
            modifySuccDialog.hide();
            location.reload();
        });
        return function (type) {
            showMask(true);
            modifySuccDialog.show();
            center(modifySuccDialog);
        };
    })();

    var showModifyDialog = (function (type) {
        var modifyUseDateDialog = jQuery('#modifyUseDateDialog');
        // close
        modifyUseDateDialog.on("click", ".order_masking_hd a", function () {
            modifyUseDateDialog.hide();
            showMask(false);
        });

        // cc
        modifyUseDateDialog.on("click", "#ModifyBack", function () {
            modifyUseDateDialog.hide();
            showMask(false);
        });

        // ok
        modifyUseDateDialog.on("click", "#ModifyOrder", function (e) {
            e.stopPropagation();

            var url = webSite + "/OrderDetail/ApplyModifyOptions";
            var applyModifyData = [];
            var hasDirty = false;
            var nochangeId;
            $(".calendar").each(function () {
                var inputUsedateId = "#txtUseDate_" + $(this).data("sectionid");
                if ($(inputUsedateId).val() == "" || $(inputUsedateId).data("usedate") == $(inputUsedateId).val()) {
                    if (!nochangeId) {
                        nochangeId = inputUsedateId;
                    }
                }
                else {
                    hasDirty = true;
                    applyModifyData[applyModifyData.length] = {
                        "OrderItemIds": $(inputUsedateId).data("orderitemids"),
                        "NewUseDate": $(inputUsedateId).val()
                    };
                }
            });
            if (!hasDirty) {
                $(nochangeId).jmp({
                    message: "请选择使用日期"
                });
                return;
            }
            var postData = {"OrderId": orderId, "Sections": cQuery.stringifyJSON(applyModifyData)};
            jQuery.ajax({
                url: url,
                type: "POST",
                data: postData,
                success: function (data) {
                    modifyUseDateDialog.hide();
                    if (data.Code === "0") {
                        showModifySucDialog(0);
                    } else {
                        showError();
                    }
                },
                error: function () {
                    modifyUseDateDialog.hide();
                    showError();
                }
            });
        });
        return function (type) {
            _type = type;
            var url = webSite + "/OrderDetail/OrderModifyOptions/" + orderId;
            jQuery.ajax({
                url: url,
                type: 'POST',
                dataType: 'html',
                success: function (data) {
                    showMask(true);
                    modifyUseDateDialog.find('.mask_cancel_container').html(data);
                    $(".calendar").each(function () {
                        var inputUsedateId = "#txtUseDate_" + $(this).data("sectionid");
                        $(inputUsedateId).val($(inputUsedateId).data("usedate"));
                        jQuery(".modify_refundrule").click(function () {
                            if (jQuery(this).hasClass("modify_refundruleclose")) {
                                $(this).parent().parent().next().hide();
                                jQuery(this).removeClass("modify_refundruleclose");
                            }
                            else {
                                $(this).parent().parent().next().show();
                                jQuery(this).addClass("modify_refundruleclose");
                            }
                        });

                        $(this).priceCalendar({
                            id: $(this).data("sectionid"),
                            listeners: {
                                onSelect: function (id, obj) {
                                    if ($("#txtUseDate_" + id).val() != obj.date && $("#txtUseDate_" + id).data("usedate") != obj.date) {
                                        $("#txtUseDate_" + id).val(obj.date);
                                        $("#txtUseDate_" + id).jmp("destroy");
                                        $("#calendar_" + id).addClass("modify_hidden");
                                    }
                                }
                            }
                        }).setData($(this).data("price"));
                        ;
                    });
                    jQuery(".calendar_input").click(function () {
                        var sectionid = $(this).data("sectionid");
                        $("#calendar_" + sectionid).toggleClass('modify_hidden');
                    });
                    modifyUseDateDialog.show();
                    center(modifyUseDateDialog);
                }
            });
        }
    })();


    var showMask = (function mask(flg) {
        var mask = jQuery('.mask');
        return function (flg) {
            if (!!flg) {
                mask.show();
            } else {
                mask.hide();
            }
        }
    })();

    function center(dialog) {
        var win = jQuery(window); //当前窗口
        var brsW = win.width();
        var brsH = win.height();
        var sclL = win.scrollLeft();
        var sclT = win.scrollTop();
        var curW = dialog.width();
        var curH = dialog.height();
        //计算对话框居中时的左边距
        var left = sclL + (brsW - curW) / 2;
        //计算对话框居中时的上边距
        var top = sclT + (brsH - curH) / 2;
        //设置对话框在页面中的位置
        dialog.css({
            'position': 'absolute',
            'left': left,
            'top': top
        });
    };

    jQuery('.order_masking').css('z-index', '1000');
    jQuery(window).resize((function () {
        var reasonDialog = jQuery('#reasonDialog'),
            confirmDialog = jQuery('#confirmDialog'),
            succDialog = jQuery('#succDialog'),
            errDialog = jQuery('#errDialog'),
            delDialog = jQuery('#delDialog');
        return function () {
            if (!!reasonDialog.is(":visible")) {
                center(reasonDialog);
            }
            if (!!confirmDialog.is(":visible")) {
                center(confirmDialog);
            }
            if (!!succDialog.is(":visible")) {
                center(succDialog);
            }
            if (!!delDialog.is(":visible")) {
                center(delDialog);
            }
            if (!!errDialog.is(":visible")) {
                center(errDialog);
            }
        }
    })());

    jQuery("textarea[maxlength]").keyup(textAreaMaxLength).blur(textAreaMaxLength);

    function textAreaMaxLength() {
        var area = jQuery(this);
        var max = parseInt(area.attr("maxlength"), 10);
        if (max > 0) {
            if (area.val().length > max) {
                area.val(area.val().substr(0, max));
            }
        }
        return this;
    }

    var DsnAmend = (function () {
        var $ = jQuery;
        var tpl = {
            dsnConfirmDialog: ['<div id="dialog_step1" class="order_masking dsn dialog_dsn" style="width: 100%;height: 181px;">',
                '    <div class="mask_cancel_container dsn">',
                '        <div class="order_masking_hd dsn"><span></span><a href="javascript:;" class="dialog_hide">×</a></div>',
                '        <div class="order_dialog_content">',
                '            <p class="normal">{{content}}</p>',
                '        </div>',
                '        <div class="btn_col">',
                '            <input type="button" class="btn_middle dialog_hide" value="暂不修改">',
                '            <input type="button" class="btn_middle btn_orange continue"  value="确认修改">',
                '        </div>',
                '    </div>',
                '</div>'].join(""),
            dsnSubmitDialog: ['<div id="dialog_step2" class="order_masking dsn dialog_dsn" style="width: 100%;">',
                '    <div class="mask_cancel_container dsn">',
                '        <div class="order_masking_hd dsn"><span>修改取票人</span><a href="javascript:;" class="dialog_hide">×</a></div>',
                '        <div class="order_dialog_content">',
                '<ul class="fill_box"> ' +
                '<li class="fill_box_item"><label>姓名&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</label><div class="input_sec"><input type="text" role="input" class="name_input input_m " name="customerName" value="" data-regex="checkName" placeholder="请输入姓名"></div></li>' +
                '<li class="fill_box_item"><label>证件信息&nbsp;&nbsp;:&nbsp;&nbsp;&nbsp;</label>' +
                '<div class="select_box">' +
                '       <div class="select_input"><span>身份证</span><i></i></div>' +
                '<ul class="select_list" style="display: none;">' +
                '<li data-type="1">身份证</li>' +
                '<li data-type="2">护照</li>' +
                '</ul>' +
                '</div>' +
                '<div class="input_sec">' +
                '<input type="text" role="input" class="input_m input_s " value="" name="idCard" data-type="1" data-regex="checkIdCard" placeholder="取票时须出示证件"></div></li>' +
                '<ul>',
                '        </div>',
                '        <div class="btn_col">',
                '            <input type="button" class="btn_middle dialog_hide" value="取消">',
                '            <input type="button" class="btn_middle btn_orange" id="dsnSubmit" value="提交">',
                '        </div>',
                '    </div>',
                '</div>'].join(""),
            dsnResponseDialog: ['<div id="dialog_step3" class="order_masking dsn dialog_dsn" style="width: 100%;">',
                '<div class="mask_container" >',
                '        <div class="order_dialog_content" >',
                '            <p class="title normal">{{title}}</p>',
                '            <p class="normal">{{content}}</p>',
                '        </div>',
                '        <div class="btn_col">',
                '            <input type="button" class="btn_middle dialog_hide" value="知道了">',
                '        </div>',
                ' </div>',
                '</div>'].join(""),

        };
        var util = {
            tplToHtml: function (tpl, data) {
                return tpl.replace(/{{(\w+)}}/g, function () {
                    return data[arguments[1]];
                });
            },
            regex: {
                hasCnChar: function (str) {
                    return /[\u0100-\uffff]/.test(str);
                },
                isCnChar: function (str) {
                    return /^[\u4e00-\u9fa5]+$/.test(str);
                },
                isEnChar: function (str) {
                    return /^[A-Za-z][A-Za-z\s]*[A-Za-z]$/.test(str);
                },
                checkCnName: function (str) {
                    if ('' === str)
                        return [false, "请输入中文名"];
                    if (this.isCnChar(str) && str.length === 1)
                        return [false, "中文姓名不可少于2个汉字。"];
                    if (this.isEnChar(str))
                        return [false, "请输入正确的中文名。"];
                    if (!/^[\u4e00-\u9fa5a-zA-Z-]+$/.test(str))
                        return [false, "中文姓名只能包含汉字（至少一个）、字母和连字符，请重新填写。"];
                    if (/\u5c0f\u59d0|\u5148\u751f|\u592a\u592a|\u592b\u4eba/.test(str))
                        return [true, '您提交的姓名中含有称谓，请确认是否为您证件上的姓名'];
                    return [true,];
                },
                checkEnName: function (str) {
                    if ('' === str)
                        return [false, '请输入英文名字'];
                    if (!/^[^\/]+\/[^\/]+$/.test(str))
                        return [false, "请填写正确的英文姓名，姓名格式为姓/名，姓与名之间用/分隔，如Green/Jim King"];
                    if (/[^a-zA-Z. \/'-]/.test(str))
                        return [false, "英文姓名中包含非法字符，请检查"];
                    var name = str.split('/');
                    if (/[^a-zA-Z]/.test(name[0]))
                        return [false, "英文的姓中只能包含字母"];
                    if (!/^[a-zA-Z]/.test(name[1]))
                        return [false, "英文的名必须以字母开头"];
                    return [true,];
                },
                checkName: function (str, bl) { //bl 是否选择了身份证
                    if ('' === str)
                        return [false, '请输入姓名'];
                    if (this.hasCnChar(str))
                        return this.checkCnName(str);
                    else {
                        if (bl && bl === 1) {
                            return [false, '请保持姓名与证件上的姓名一致。'];
                        }
                        return this.checkEnName(str);
                    }
                },
                checkIdCard: function (idcard) {

                    var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
                    var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X

                    function IdCardValidate(idCard) {
                        idCard = trim(idCard.replace(/ /g, "")); //去掉字符串头尾空格
                        if (idCard.length == 15) {
                            return isValidityBrithBy15IdCard(idCard); //进行15位身份证的验证
                        } else if (idCard.length == 18) {
                            var a_idCard = idCard.split(""); // 得到身份证数组
                            if (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(a_idCard)) { //进行18位身份证的基本验证和第18位的验证
                                return true;
                            } else {
                                return false;
                            }
                        } else {
                            return false;
                        }
                    }

                    /**
                     * 判断身份证号码为18位时最后的验证位是否正确
                     * @param a_idCard 身份证号码数组
                     * @return
                     */
                    function isTrueValidateCodeBy18IdCard(a_idCard) {
                        var sum = 0; // 声明加权求和变量
                        if (a_idCard[17].toLowerCase() == 'x') {
                            a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
                        }
                        for (var i = 0; i < 17; i++) {
                            sum += Wi[i] * a_idCard[i]; // 加权求和
                        }
                        valCodePosition = sum % 11; // 得到验证码所位置
                        if (a_idCard[17] == ValideCode[valCodePosition]) {
                            return true;
                        } else {
                            return false;
                        }
                    }

                    /**
                     * 验证18位数身份证号码中的生日是否是有效生日
                     * @param idCard 18位书身份证字符串
                     * @return
                     */
                    function isValidityBrithBy18IdCard(idCard18) {
                        var year = idCard18.substring(6, 10);
                        var month = idCard18.substring(10, 12);
                        var day = idCard18.substring(12, 14);
                        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                        // 这里用getFullYear()获取年份，避免千年虫问题
                        if (temp_date.getFullYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                            return false;
                        } else {
                            return true;
                        }
                    }

                    /**
                     * 验证15位数身份证号码中的生日是否是有效生日
                     * @param idCard15 15位书身份证字符串
                     * @return
                     */
                    function isValidityBrithBy15IdCard(idCard15) {
                        var year = idCard15.substring(6, 8);
                        var month = idCard15.substring(8, 10);
                        var day = idCard15.substring(10, 12);
                        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
                        // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法
                        if (temp_date.getYear() != parseFloat(year) || temp_date.getMonth() != parseFloat(month) - 1 || temp_date.getDate() != parseFloat(day)) {
                            return false;
                        } else {
                            return true;
                        }
                    }

                    //去掉字符串头尾空格
                    function trim(str) {
                        return str.replace(/(^\s*)|(\s*$)/g, "");
                    }


                    if ('' === idcard) {
                        return [false, '请输入身份证号码'];
                    } else if (!IdCardValidate(idcard)) {
                        return [false, '请输入正确的身份证号码'];
                    } else {
                        return [true, ""];
                    }
                },
                checkNull: function (str) {
                    return '' === str;
                },
                checkCard: function (str) {
                    if (this.checkNull(str))
                        return [false, '请输入证件号'];
                    return [true,]
                },
                checkRegfun: function (ele) {
                    var that = this;
                    var regName = ele.data('regex');
                    var val = $.trim(ele.val());
                    if (!that[regName]) {
                        return true;
                    }
                    var bl = that[regName].call(that, val);
                    if (!bl[0]) {
                        ele.jmp('error', {
                            message: bl[1]
                        });
                        return false;
                    } else {
                        ele.jmp("destroy");
                        return true;
                    }
                }
            }
        };
        var methods = {
            bindEvent: function () {
                var $body = $(document.body);
                var that = this;
                //关闭弹窗
                $body.on('click', '.dialog_hide', function () {
                    var $order_masking = $(this).parents('.order_masking');
                    $order_masking.remove();
                    showMask(false);
                });
                //点击修改按钮
                $body.on('click', '#amend_dsn', function () {
                    that.bindAmendEvent();
                });
                //继续修改
                $body.on('click', '.continue', function () {
                    that.bindContinueEvent();
                });
                $body.on('click', '.select_input', function (e) {
                    that.bindSelectInput(e);
                });
                $body.on('click', '.select_list li', function () {
                    that.bindSelectListEvent(this)
                });
                $body.on('input keyup', '.fill_box [name="idCard"]', function () {
                    var val = $(this).val();
                    var formatVal = val.replace(/\s*/g, '').replace(/(\d{6})(\d{8})(\d{1,4})/, '$1 $2 $3');
                    $(this).val(formatVal);
                });
                $body.on('focus', '#dialog_step2 [role="input"]', function () {
                    $(this).jmp("destroy");
                });
                $body.on('click', '#dsnSubmit', function () {
                    that.bindSubmitEvent(this);
                })

            },
            bindAmendEvent: function (ele) {
                var that = this;
                showMask(true);
                var IsHaveInsurance = _param.IsHaveInsurance;
                if (IsHaveInsurance) {
                    var confirmData = {
                        content: '您已购买保险，修改证件信息成功后保险将自动退订，是否继续修改？'
                    };
                    var dsnConfirmDialog = util.tplToHtml(tpl.dsnConfirmDialog, confirmData);

                    $('.order_box').append(dsnConfirmDialog);
                } else {
                    that.bindContinueEvent();
                }


            },
            bindContinueEvent: function () {
                //console.log('common in continue');
                var $dialogStep1 = $('#dialog_step1');
                !!$dialogStep1.length && $('#dialog_step1').remove();
                $('.order_box').append(tpl.dsnSubmitDialog);

            },
            bindSelectInput: function (e) {
                var $this = $(e.currentTarget);
                var selectList = $this.next();
                if (selectList.is(":hidden")) {
                    e.stopPropagation();
                }
                selectList.slideToggle(200);
                $this.closest(".fill_box_item").find(".input_m").jmp("destroy");
            },
            bindSelectListEvent: function (ele) {
                var $this = $(ele);
                var type = $this.data("type");
                $this.parent().slideUp(200).prev().find("span").html($this.html());

                var cardRegex = type == 1 ? "checkIdCard" : "checkCard";
                var fillBox = $this.closest(".fill_box_item");
                var input = fillBox.find(".input_m").eq(0);
                input.data({
                    "regex": cardRegex,
                    "type": type
                });
            },
            bindSubmitEvent: function (ele) {
                var err = 0;
                $('#dialog_step2 [role="input"]').each(function (i, item) {
                    if (!util.regex.checkRegfun($(item))) {
                        err++
                    }
                });
                if (!!err) {
                    return;
                }
                var $this = $(ele);
                var that = this;
                $this.attr('disabled', 'disabled');
                var customerName = $('.fill_box [name="customerName"]').val();
                var $idCard = $('.fill_box [name="idCard"]');
                var certificatesNumber = $idCard.val().replace(/\s/g, '').toUpperCase();
                var certificatesType = $idCard.data('type');
                /*  提交证件信息
                 http://piao.ctrip.uat.qa.nt.ctripcorp.com/thingstodo-booking-ShoppingWebSite/orderdetail/ModifyCertificates?
                 // orderId=3026625369&orderItemId=1212&customerName=test&certificatesNumber=11&certificatesType=2*/
                $.ajax({
                    url: webSite + '/orderdetail/ModifyCertificates',
                    data: {
                        orderId: $('#orderId').val(),
                        orderItemId: _param.Disney_OrderItemID,
                        customerName: customerName,
                        certificatesNumber: certificatesNumber,
                        certificatesType: certificatesType
                    },
                    type: 'POST',
                    success: function (res) {
                        $this.removeAttr('disabled');
                        var response = {};
                        if (res.Code === '0') {
                            response = {
                                title: '申请已提交',
                                content: '申请成功后，将以短信通知您'
                            };
                        } else {
                            response = {
                                title: '申请提交失败',
                                content: '如有需要请致电携程客服'
                            };
                        }

                        that.dsnResponse(response);

                    },
                    error: function (err) {
                        $this.removeAttr('disabled');
                    }
                })


            },
            dsnResponse: function (res) {
                var dsnResponDialog = util.tplToHtml(tpl.dsnResponseDialog, res);
                $('#dialog_step2').remove();
                $('.order_box').append(dsnResponDialog);
                window.location.reload();
            },
            init: function () {
                this.bindEvent();
                $('.amend-dsn_1').css({
                    'line-height': '26px'
                }).jmp('warn', {
                    message: '正在为您修改证件信息，请耐心等待'

                })
            }

        };
        methods.init();


    })();


})
