$(function () {
    //对首页管理员数据进行渲染
    getcount();
    //对首页头待处理业务数量渲染
    heads();

    aacas()
});

var $zz=$("#zz1 h2");
/**
 * 获取管理员总数
 */
function getcount() {
    requestAjax("/background/administrator/getAdminCount", {}, function (data) {
        makePage(data.data);
    })
}

/**
 * 制作分页条
 * @param count
 */
function makePage(count) {
    layui.use(['laypage', 'layer']  , function() {
        var laypage = layui.laypage
            , layer = layui.layer;

        //总页数低于页码总数
        laypage.render({
            elem: 'demo1',
            limit: 10,
            count: count //数据总数
            ,jump: function(obj, first) {
                getData(obj.curr,obj.limit)
            }
        });
    });
}

/**
 * 首页管理员数据页面显示
 * @param curr
 * @param limit
 */
function getData(curr,limit){
    requestAjax("/background/administrator/getIdfinInfoEntry",{curr:curr,limit:limit},function (data) {
        $("#bb1").empty();
        for ( var i in data.data) {
            var role;
            if (data.data[i].role===0)
                role="超级管理员";
            else  if (data.data[i].role===1)
                role="业务员";
            else  if (data.data[i].role===2)
                role="风控员";
            else
                role="财务员";
            $("#bb1").append("<tr style='border:1px solid lavender;'>\n" +
                "                <td>"+data.data[i].id+"</td>\n" +
                "                <td>"+data.data[i].name+"</td>\n" +
                "                <td>"+data.data[i].account+"</td>\n" +
                "                <td>"+role+"</td>\n" +
                "                <th>"+(data.data[i].status?'启用':'停用')+"</th>\n" +
                "                <td>"+data.data[i].amount+"</td>\n" +
                "            </tr>")
        }
    });
}





/**
 * 首页头待处理业务数量
 * 扇型
 */
function heads() {
    var  a1={value:0, color: "#F7464A", highlight: "#FF5A5E", label: "风控待审批"};
    var a2={value:0, color: "#46BFBD", highlight: "#5AD3D1", label: "财务待处理"};
    var a3= {value: 0, color: "#578ebe", highlight: "#5E9ACE", label: "业务待处理"};
    var a4= {value:0, color: "#4f5c65", highlight: "#949FB1", label: "审批通过"};
    requestAjax("/background/administrator/getStatusFindNum",{},function (data) {
        console.log(data)
        if (data.result){
            for ( var i in data.data) {
                var status = data.data[i].status;
                if (status===1||status===5||status===8){
                    var counts= parseInt($zz.eq(0).text().substr(0,$zz.eq(0).text().length-1))+data.data[i].count;
                    $zz.eq(0).html(counts+"<span>件</span>");
                    a3= {value: counts, color: "#578ebe", highlight: "#5E9ACE", label: "业务待处理"};
                }else
                if (status===2||status===4){
                    var counts= parseInt($zz.eq(1).text().substr(0,$zz.eq(1).text().length-1))+data.data[i].count;
                    $zz.eq(1).html(counts+"<span>件</span>");
                    a1={value:counts, color: "#F7464A", highlight: "#FF5A5E", label: "风控待审批"};
                }else
                if (status===3||status===7){
                    var counts= parseInt($zz.eq(2).text().substr(0,$zz.eq(2).text().length-1))+data.data[i].count;
                    $zz.eq(2).html(counts+"<span>件</span>");
                    a2={value:counts, color: "#46BFBD", highlight: "#5AD3D1", label: "财务待处理"};
                }else
                if (status===6){
                    var counts= parseInt($zz.eq(3).text().substr(0,$zz.eq(3).text().length-1))+data.data[i].count;
                    $zz.eq(3).html(counts+"<span>件</span>");
                    a4= {value:counts, color: "#4f5c65", highlight: "#949FB1", label: "审批通过"};
                }
            }
            var doughnutData=[a1,a2,a3,a4];
            var ctx = document.getElementById("Canvas1").getContext("2d");
            window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, { responsive: false });
        }
    });
}


function aacas() {
    requestAjax("/background/timeIine/getTime",{},function (data) {
        Canvas2([data.d1,data.d2,data.d3,data.d4,data.d5])
    });
}



function Canvas2(a1) {
    var lineChartData = {
        labels: [GetDay(-2), GetDay(-1),GetDay(0), GetDay(1),GetDay(2) ],
        datasets: [
            {
                fillColor: "rgba(220,220,220,0.2)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(220,220,220,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                data: a1
            }
        ]
    }
    var ctx = document.getElementById("Canvas2").getContext("2d");
    window.myLine = new Chart(ctx).Line(lineChartData, {
        bezierCurve: false,
    });
}

