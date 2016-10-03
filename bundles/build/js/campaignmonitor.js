//$(document).ready(function () {
//    $("#cm_templatename_submit").click(function (e) {
//
//        e.preventDefault();
//
//        $('#notifications').empty();
//
//        var e = "";
//
//        var emailrendercontent=$(".emailrender").html();
//        $("#download-layout").html(emailrendercontent);
//
//        var t = $("#download-layout");
//        var contentattr=$('[st-content]').attr( "st-content" );
//        t.find(".preview, .configuration, .drag, .remove, .colorSelectorinner, .confirmbox").remove();
//        t.find(".module").addClass("removeClean");
//        t.find(".box-element").addClass("removeClean");
//        t.find(".module .module .module .module .module .removeClean").each(function () {
//            cleanHtml(this)
//        });
//        t.find(".module .module .module .module .removeClean").each(function () {
//            cleanHtml(this)
//        });
//        t.find(".module .module .module .removeClean").each(function () {
//            cleanHtml(this)
//        });
//        t.find(".module .module .removeClean").each(function () {
//            cleanHtml(this)
//        });
//
//        t.find(".module .removeClean").each(function () {
//            cleanHtml(this)
//        });
//        t.find(".removeClean").each(function () {
//            cleanHtml(this)
//        });
//        t.find(".removeClean").remove();
//        t.find(".addremove").remove();
//        //t.find(".mce-content-body").remove();
//        t.find(".mce-content-body").removeClass("mce-content-body");
//
//        $('img').each(function(){
//            var abspath=$(this).prop('src');
//            $(this).attr('src',abspath);
//        });
//        t.find('[st-image]').each(function(){
//            $(this).attr("editable","true");
//        });
//        $('#download-layout').find('[st-sortable]').each(function(){
//            var sortable_index = $(this).index();
//            var repeaterattr=$(this).attr( "st-sortable" );
//            $(this).wrap('<layout label="'+repeaterattr+sortable_index+'"></layout>');
//        });
//        //wrap text with <singleline>
//
//        $('#download-layout').find('[st-title]').each(function() {
//            var data = [];
//            var titlelabel=$(this).attr("st-title");
//            $(this).find('p').contents().each(function() {
//                if ( this.nodeType === Node.TEXT_NODE ) {
//                    data.push(this);
//                }
//            }).end().append( $('<singleline label='+titlelabel+'/>').append(data) );
//        });
//
//        //wrap text with <multiline>
//        $('#download-layout').find('[st-content]').each(function() {
//            var contentlabel=$(this).attr("st-content");
//            $(this).find('p').wrapInner('<multiline label='+contentlabel+'/>');
//        });
//
//        ////////ADD SINGLE TAG FOR <a> TAGS
//        $('#download-layout').find('[st-title]').each(function() {
//            var data = [];
//            var titlelabel=$(this).attr("st-title");
//            $(this).find('a').contents().each(function() {
//                if ( this.nodeType === Node.TEXT_NODE ) {
//                    data.push(this);
//                }
//            }).end().append( $('<singleline label='+titlelabel+'/>').append(data) );
//        });
//
//        //////////////////////////
//        $('#download-layout').find('singleline:empty').each(function() {
//            $(this).remove();
//        });
//
//        //REMOVE EMPTY SINGLELINE TAGS
//        $('#download-layout').find('singleline').each(function() {
//            if (!$.trim($(this).text()).length && !$(this).children().length)
//            {
//                $(this).remove();
//            }
//        });
//        t.find('p').css({'margin':'0','padding':'0','marginBottom':'0'});
//        t.find(".mce-content-body").removeClass("mce-content-body");
//        t.find('.innerbg').closest('.devicewidth').attr('hasbackground');
//        t.find(".innerbg").remove();
//        t.find(".buttonbg").remove();
//
//
//        //$("#download-layout .emailrender").removeClass("ui-sortable");
//        //$("#download-layout .row-fluid").removeClass("clearfix").children().removeClass("column");
//
//        formatSrc = $.htmlClean($("#download-layout").html(), {
//            format: true,
//            allowComments:true,
//            allowedAttributes: [
//                                ["class"],
//                                ["id"],
//                                ["width"],
//                                ["height"],
//                                ["style"],
//                                ["align"],
//                                ["cellspacing"],
//                                ["cellpadding"],
//                                ["bgcolor"],
//                                ["valign"],
//                                ["border"],
//                                ["label"],
//                                ["editable"],
//                                // ["st-content"],
//                                // ["st-title"],
//                                // ["st-sortable"],
//                                // ["st-image"],
//                                // ["mc:edit"],
//                                // ['mc:label'],
//                                // ["mc:repeatable"],
//
//                                ]
//        });
//
//        $("#download-layout").html(formatSrc);
//
//        //$('#download-layout').find('[st-content]').attr("mc:edit",contentattr);
//        //$('#download-layout').find('[st-sortable]').attr("mc:repeatable", "x");
//
//        // $('#download-layout').find('[st-content]').each(function(){
//        //      var contentattr=$(this).attr( "st-content" );
//        //      $(this).attr("mc:edit",contentattr);
//
//        //  });
//
//        //  $('#download-layout').find('[st-image]').each(function(){
//        //      var imageattr=$(this).attr( "st-image" );
//        //      $(this).attr("mc:edit",imageattr);
//        //      $(this).attr("mc:label","image");
//
//        //  });
//
//        /////////////////END ADD THE CAMPAIGN MONITOR TAGS HERE////////////////
//        var addcmtags= $("#download-layout").html();
//
//        ///////////////////////////////
//        templateheader=$('textarea.templatehead').text();
//        templatefooter='</body></html>';
//        $("#downloadModal textarea").empty();
//        var cm_unsubscribe='<table width="600" align="center" class="devicewidth"><tr><td style="color:#ffffff;font-size:12px,text-align:center;"><unsubscribe>Unsubscribe</unsubscribe></td></tr></table>';
//        var repeateropen="<repeater>";
//        var repeaterclose="</repeater>";
//        $("#downloadModal textarea").val(templateheader+repeateropen+addcmtags+repeaterclose+cm_unsubscribe+templatefooter);
//
//        var $cm_upload=$("#downloadModal textarea").val();
//        var $cm_user_api_key=$(".campaignmonitor_user_apis").val();
//        var $cm_template_name=$(".cm_templatename_field").val();
//        var $cm_client_id = $('#cm_clientid :selected').val();
//        $('#cm_templatename_submit').addClass('uploading');
//        $('#notifications').append('<div class="note"><div class="note_green"></div><div class="note_msg">Exporting</div></div>');
//        var sitename=$('#sitename').val();
//        var cm_templateedit_id = $("#cm_templateedit_id").val();
//        $.ajax({
//            url:"/editor/exportcampaignmonitor",
//            type: 'POST',
//            data: {
//                html: $cm_upload,
//                template_name: $cm_template_name,
//                client_id: $cm_client_id,
//                templateedit_id: cm_templateedit_id
//            }
//        }).done(function(result) {
//            $('#notifications').find('.note').remove();
//            $('#notifications').append(result);
//            $('#notifications').find('.note').delay(3000).queue(function() {
//            $(this).remove();
//          });
//        });
//
////        $.ajax
////        (
////                        {
////                            url:sitename+"/wp-admin/admin-ajax.php",
////                            type:'POST',
////                            data:'action=my_special_ajax_call20&campaignmonitor_html=' +$cm_upload+'&cm_user_api=' +$cm_user_api_key+'&cm_template_name=' +$cm_template_name+'&cm_client_id='+$cm_client_id,
////                            success:function(results)
////                            {
////                                $('#notifications').find('.note').remove();
////                                var result= results;
////                                $('#notifications').append(result);
////                                $('#notifications').find('.note').delay(3000).queue(function() {
////                                    $(this).remove();
////                                });
////
////                            }
////
////                        }
////        );
//
//
//    });
//
//});
