$(document).ready(function () {

    $('#viewcode_btn').click(function(e){

        e.preventDefault();

        $('.darkoverlay_viewcode').fadeIn(500);

        var e = "";
        var emailrendercontent=$(".emailrender").html();
        $("#download-layout").html(emailrendercontent);
        var t = $("#download-layout");
        t.find(".preview, .configuration, .move_controls, .addremove, .colorSelectorinner").remove();
        t.find(".module").addClass("removeClean");
        t.find(".box-element").addClass("removeClean");
        t.find(".module .module .module .module .module .removeClean").each(function () {
            cleanHtml(this)
        });
        t.find(".module .module .module .module .removeClean").each(function () {
            cleanHtml(this)
        });
        t.find(".module .module .module .removeClean").each(function () {
            cleanHtml(this)
        });
        t.find(".module .module .removeClean").each(function () {
            cleanHtml(this)
        });

        t.find(".module .removeClean").each(function () {
            cleanHtml(this)
        });
        t.find(".removeClean").each(function () {
            cleanHtml(this)
        });
        t.find(".removeClean").remove();
        t.find('.mce-content-body').removeClass('mce-content-body');
        //$("#download-layout .emailrender").removeClass("ui-sortable");
        //$("#download-layout .row-fluid").removeClass("clearfix").children().removeClass("column");
        formatSrc = $.htmlClean($("#download-layout").html(), {
            format: true,
            allowComments:true,
            allowedAttributes: [
                ["class"],
                ["width"],
                ["height"],
                ["style"],
                ["align"],
                ["cellspacing"],
                ["cellpadding"],
                ["bgcolor"],
                ["valign"],
                ["border"],
                // ["st-content"],
                // ["st-sortable"],
                // ["st-image"],
                // ["mc:edit"],
                // ['mc:label'],
                // ["mc:repeatable"],
            ]
        });

        //$("#download-layout").html(formatSrc);
        var templateHtml = "<html>\n"
            + "<head>" + $('textarea.templatehead').text() + "</head>"
            + "<body";
        for(var attrName in bodyAttrs) {
            var value = bodyAttrs[attrName];
            templateHtml += " " + attrName + "=\"" + value + "\"";
        }
        templateHtml += ">"
            + formatSrc
            + "</body>\n</html>";

        var $body = $(templateHtml).find("body");

        // $('.viewcodebox').find('#viewcode_area').empty();
        //$('.viewcodebox').find('textarea#viewcode_area').val(templateheader+formatSrc+templatefooter);
        $('.viewcodebox').find('textarea#viewcode_area').val(templateHtml);
    });


    ////close
    $(' .viewcodeclose').click(function(){
        $(this).parents('.darkoverlay_viewcode').fadeOut(500);
    });
    $('.viewcode_close').click(function(){
        $(this).parents('.darkoverlay_viewcode').fadeOut(500);
    });

});