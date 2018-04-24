$.fn.eachSlice=function(e,c){for(var l=$(this),n=0;n<l.length;n+=e)c.call(l.slice(n,n+e).get(),n/e);return l};

function updateColInput() {
  var colValues = [];
  $(".input-cols .input-container").each(function(){
    var currentValue = $(this).children("input").val();
    var currentSizing = $(this).children("select").val();
    var currentMix = currentValue + currentSizing;
    colValues.push(currentMix)
  });
  var newCols = colValues.join(" ");  
  $('#grid-container').css('grid-template-columns', newCols);   
}

function updateRowInput() {
  var rowValues = [];
  $(".input-rows .input-container").each(function(){
    var currentValue = $(this).children("input").val();
    var currentSizing = $(this).children("select").val();
    var currentMix = currentValue + currentSizing;
    rowValues.push(currentMix);
  });
  var newRows = rowValues.join(" ");  
  $('#grid-container').css('grid-template-rows', newRows);   
}

function updateRowGapInput() {
  var gapValues = [];
  $(".input-row-gap .input-container").each(function(){
    var currentValue = $(this).children("input").val();
    var currentSizing = $(this).children("select").val();
    var currentMix = currentValue + currentSizing;
    gapValues.push(currentMix);
  });
  var newGaps = gapValues.join(" ");  
  $('#grid-container').css('grid-row-gap', newGaps);     
}

function updateColGapInput() {
  var gapValues = [];
  $(".input-col-gap .input-container").each(function(){
    var currentValue = $(this).children("input").val();
    var currentSizing = $(this).children("select").val();
    var currentMix = currentValue + currentSizing;
    gapValues.push(currentMix);
  });
  var newGaps = gapValues.join(" ");  
  $('#grid-container').css('grid-column-gap', newGaps);     
}

function updateGrid() { 
  $('#grid-container').html('');  
  
  updateColInput();
  updateRowInput();
  updateRowGapInput();  
  updateColGapInput();

  var numGrid = document.getElementById('grid-container').style.gridTemplateRows;
  var numGridToo = document.getElementById('grid-container').style.gridTemplateColumns; 
  
  var colNumber = numGridToo.split(" ").length;
  var rowNumber = numGrid.split(" ").length;
  var spaceCount = (numGrid.split(" ").length) * (numGridToo.split(" ").length) ;
  
  $("#grid-container").append(new Array(++spaceCount).join('<section><div><input type="checkbox"><span data-row="" data-col=""></span></div></section>'));
  
  $('section').each(function(i){
      var num = (i%colNumber) + 1;
      $(this).find("span").attr("data-col", num);
  });
  
  $('section').eachSlice(colNumber, function(colNumber) {
      var reRow = colNumber + 1;
      $(this).find("span").attr("data-row", reRow);
  });
  
  var areaRowsArr = Array(rowNumber).fill(".");
  var areaColsArr = Array(colNumber).fill(".");
  
  var areaRowsArrTotal = [].concat(...Array(colNumber).fill(areaRowsArr));
  var areaRowsArrTotal = _.chunk(areaRowsArrTotal, colNumber); 
 
  var areaRowsArrTotalString = "";
  $.each( areaRowsArrTotal, function(i,val) { areaRowsArrTotalString += "\'" + val.join(" ") + "\'" + " "; });  

  document.getElementById('grid-container').style.gridTemplateAreas = areaRowsArrTotalString;   

};

function removeRows() { $('.input-rows').children().last().remove(); updateGrid(); }
function removeCols() { $('.input-cols').children().last().remove(); updateGrid(); }

$(document).ready(function() {

  updateGrid();

  $('#add-column').on("click", function() {
    $(".input-cols").append("<div class='input-container'><input type='number' min='0' step='0.25' value='1'><select name='' id=''><option value='fr'>fr</option><option value='px'>px</option><option value='%'>%</option></select></div>");
    updateGrid();
  });

  $('body').on('click', '#add-row', function() {
    $(".input-rows").append("<div class='input-container'><input type='number' min='0' step='0.25' value='1'><select name='' id=''><option value='fr'>fr</option><option value='px'>px</option><option value='%'>%</option></select></div>");
    updateGrid();
  });


  $(document).on('change','section input[type=checkbox]',function () {

    var addAreaContainer = $("#add-area-container").detach(); 
    $(this).closest("div").append(addAreaContainer);
    $('#add-area-container').addClass('active');

  });

  $('#remove-row').on("click", function() { removeRows(); });
  $('#remove-col').on("click", function() { removeCols(); });

  $(document).on('change','.input-cols select, .input-rows select, .input-gaps select',function () { updateGrid(); });
  $(document).on('input','.input-cols input, .input-rows input, .input-gaps input',function () { updateGrid(); });

  $(document).on('input','#area-name',function () { $("#add-area").prop("disabled", false); });

  $(document).on('click','#add-area',function () { 
        
    $(this).prop("disabled", true);
    var selectedCol = [];
    var selectedRow = [];
    var areaColors = ["rgba(48, 5, 72, 0.3)","rgba(5, 72, 60, 0.3)","rgba(21, 72, 5, 0.3)","rgba(72, 67, 5, 0.3)","rgba(72, 5, 5, 0.3)","rgba(9, 5, 72, 0.3)","rgba(76, 175, 80, 0.3)","rgba(175, 163, 76, 0.3)","rgba(0, 150, 136, 0.3)"];
    var randomColor = areaColors[Math.floor(Math.random() * areaColors.length)];
    $('section input:checked').each(function(i){
        var thisCol = $(this).siblings("span").data("col");
        var thisRow = $(this).siblings("span").data("row"); 
        selectedCol.push(thisCol);
        selectedRow.push(thisRow);    
    });  
    var thisColUniques = _.uniq(selectedCol);
    var thisRowUniques = _.uniq(selectedRow);

    var areaCols = thisColUniques.join(" / ");   
    var areaRows = thisRowUniques.join(" / ");    

    var maxCol = _.maxBy(thisColUniques);
    var minCol = _.minBy(thisColUniques);
    var minRow = _.minBy(thisRowUniques);  
    if (thisRowUniques.length == 1 ) { var maxRow = _.maxBy(thisRowUniques); } else { var maxRow = _.maxBy(thisRowUniques) + 1 }

    var areaName = $('#area-name').val();
    
  if (thisColUniques.length > 1 && thisRowUniques.length == 1 ) {
      $("#grid-container").append("<section data-name='"+areaName+"' class='saved-area' style='grid-row:"+areaRows+" / "+areaRows+";grid-column:"+minCol+" / span "+maxCol+"'><div style='background-color:"+randomColor+"'></div></section>");
  } else if (thisColUniques.length == 1 && thisRowUniques.length > 1 ) {
    $("#grid-container").append("<section data-name='"+areaName+"' class='saved-area' style='grid-row:"+minRow+" /  "+maxRow+";grid-column:"+areaCols+" / "+areaCols+"'><div style='background-color:"+randomColor+"'></div></section>");  
  } else if (thisColUniques.length == 1 && thisRowUniques.length == 1 ) {
    $("#grid-container").append("<section data-name='"+areaName+"' class='saved-area' style='grid-row:"+areaRows+" / "+areaRows+";grid-column:"+areaCols+" / "+areaCols+"'><div style='background-color:"+randomColor+"'></div></section>");  
  } else if (thisColUniques.length > 1 && thisRowUniques.length > 1 ) {
    $("#grid-container").append("<section data-name='"+areaName+"' class='saved-area' style='grid-row:"+minRow+" /  "+maxRow+";grid-column:"+minCol+" / span "+maxCol+"'><div style='background-color:"+randomColor+"'></div></section>");    
  }

    $("section input[type=checkbox]:checked").prop("checked", false);
    $('#area-name').val("");
    $('#add-area-container').removeClass('active');
  });

  $('.code-modal-backdrop, .code-modal-close').on("click", function() { $('.code-modal').removeClass("active"); });

  $('#get-code').on("click", function() {
    var currentGap = document.getElementById('grid-container').style.gap;       
    var currentRows = document.getElementById('grid-container').style.gridTemplateRows;
    var currentCols = document.getElementById('grid-container').style.gridTemplateColumns; 
    var currentAreas = document.getElementById('grid-container').style.gridTemplateAreas;   
    $('.code-modal').addClass("active");   
    $('.code-modal-code').remove();
    $('.code-modal-content').append("<div class='code-modal-code'>.grid-container { <div>display: grid;</div><div>grid-template-columns: "+currentCols+";</div><div>grid-template-rows: "+currentRows+";</div><div>grid-template-areas: "+currentAreas+";</div><div>grid-gap: "+currentGap+";</div> } </div> "); 
    
    //if ($("section[data-name]").length) { $('.code-modal-content').append("<div class='code-modal-code'><span class='code-modal-comment'>// Use data-area attribute to position your elements in the areas.</span></div> "); }

    $("section[data-name]").each(function(i){
      var savedArea = $(this).data("name");
      var currentRows = $(this).css('grid-row');   
      var currentCols = $(this).css('grid-column');   
      $('.code-modal-content').append('<div class="code-modal-code">[data-area="'+savedArea+'"] {<div>grid-row: '+currentRows+';</div><div>grid-column: '+currentCols+';</div>}</div>');     
    });

  });

});
