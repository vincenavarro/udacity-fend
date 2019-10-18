// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

/**
 * Handles form input options.
 */
$('input[type=number]').one('click', function () {
    $(this).val('');
});


$('input[type=submit]').click(function (event) {
    event.preventDefault();
    inputGrid();
});

$(document).keypress(function (event) {
    if (event.which == 13) {
        inputGrid();
    }
});

/**
 * Apply color from color picker to a square on the grid.
 */
$(document).on('click', '#pixelCanvas tr td', function () {
    let colorCode = $('#colorPicker').val();
    $(this).attr('style', 'background-color:' + colorCode + ';')
})

/**
 * @description Get values from grid entry form and soft sanity check.
 */
function inputGrid() {
    const gridHeight = $('#inputHeight').val(); // inputWidth possible typo in the HTML source file?
    const gridWidth = $('#inputWidth').val();
    if (gridWidth <= 0 || gridHeight <= 0) {
        alert('Grid dimensions must be one (1) or higher in either direction.');
    } else {
        makeGrid(gridHeight, gridWidth);
    }
}

/**
 * @description Generates a table grid per the <a href='https://review.udacity.com/#!/rubrics/641/view'>Pixel Art Maker rubric</a>.
 * @param {number} height
 * @param {number} width
 */

function makeGrid(height, width) {
    $('#pixelCanvas').empty();
    for (let row = 0; row < height; row++) {
        $('#pixelCanvas').append('<tr></tr>').hide().fadeIn('slow');
        //console.log('Row Triggered ' + row);
    };
    for (let col = 0; col < width; col++) {
        $('tr').append('<td></td>').hide().fadeIn('slow');
        //console.log('Column Triggered ' + col);
    };
    //alternate method not allowable by ruberic
    //let rowString = '<tr></tr>'.repeat(height);
    //let colString = '<td></td>'.repeat(width);
    //$('#pixelCanvas').append(rowString);
    //$('tr').append(colString);
}
