export default {
    install: function(Vue) {
            Vue.prototype.tablesMerge = function tablesMergeCell($table, colIndex,rowIndex) {
                $table.data('col-content', '');     // 存放单元格内容
                $table.data('col-rowspan', 1);      // 存放计算的rowspan值 默认为1
                $table.data('col-td', $());         // 存放发现的第一个与前一行比较结果不同td(jQuery封装过的), 默认一个"空"的jquery对象
                $table.data('trNum', $('tbody tr', $table).length);     // 要处理表格的总行数, 用于最后一行做特殊处理时进行判断之用
                // 我们对每一行数据进行"扫面"处理 关键是定位col-td, 和其对应的rowspan
                $('tbody tr', $table).each(function(index) {
                    var $tr = $(this);
                    // td:eq中的colIndex即列索引
                    var $td = $('td:eq(' + colIndex + ')', $tr);
                    var currentContent = $td.html();
                    if(opts.automatic){     // 内容
                        // 第一次时走此分支
                        if ($table.data('col-content') == '') {
                            $table.data('col-content', currentContent);
                            $table.data('col-td', $td);
                        } else {
                            // 上一行与当前行内容相同
                            if ($table.data('col-content') == currentContent) {
                                addRowspan();   // 上一行与当前行内容相同则col-rowspan累加, 保存新值
                            }else{
                                newRowspan();   // 上一行与当前行内容不同
                            }
                        }
                    }else{      // 指定
                        if(opts.rows.length>0){
                            if(opts.rows[0].length==undefined){
                                for(var i=0; i<opts.rows.length; i++){
                                    customRowspan(opts.rows[i],opts.rows.length);
                                }
                            }else{
                                for(var i=0; i<opts.rows[rowIndex].length; i++){
                                    customRowspan(opts.rows[rowIndex][i],opts.rows[rowIndex].length);
                                }
                            }
                        }
                    }
                    function customRowspan(val,len){
                        if(index==val){
                            if ($table.data('col-content') == '') {
                                if(currentContent==''){
                                    currentContent = true;
                                }
                                $table.data('col-content', currentContent);
                                $td.attr('rowspan', len);
                            }else{
                                $td.hide();
                            }
                        }
                    }
                    function addRowspan(){
                        var rowspan = $table.data('col-rowspan') + 1;
                        $table.data('col-rowspan', rowspan);
                        // 值得注意的是 如果用了$td.remove()就会对其他列的处理造成影响
                        $td.hide();
                        // 最后一行的情况比较特殊一点
                        // 比如最后2行 td中的内容是一样的, 那么到最后一行就应该把此时的col-td里保存的td设置rowspan
                        if (++index == $table.data('trNum')) {
                            $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
                        }
                    }
                    function newRowspan(){
                        // col-rowspan默认为1, 如果统计出的col-rowspan没有变化, 不处理
                        if ($table.data('col-rowspan') != 1) {
                            $table.data('col-td').attr('rowspan', $table.data('col-rowspan'));
                        }
                        // 保存第一次出现不同内容的td, 和其内容, 重置col-rowspan
                        $table.data('col-td', $td);
                        $table.data('col-content', $td.html());
                        $table.data('col-rowspan', 1);
                    }
                });
            }
    }
}