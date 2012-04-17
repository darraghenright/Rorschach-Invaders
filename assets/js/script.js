//          
// generate a random boolean value            
//

var randBool = function() {
    return !!Math.round(Math.random());
};

//
// fill an array with values from a provided function
//

var arrayFill = function(array, decr, fn) {
    while (decr--) array.push(fn());
}

//
// toggle class name on a provided element
//

var toggle = function(el, css) {
    el.classList.contains(css) ? el.classList.remove(css) : el.classList.add(css);
}

//
// grab the 'mirror' of a selected element; i.e: an element 
// with a matching class in another parent container
// 

var mirror = function(el) {
    var mirrorId = 'left' == el.parentElement.parentElement.id ? 'right' : 'left'
    var parent = document.getElementById(mirrorId);
    return parent.getElementsByClassName(el.classList[1])[0];
}

//
// toggle passed css class to an element under 
// cursor and its 'mirrored' element
//

var handleMouseEventOnCell = function(e, css) {
    if (e.target.classList.contains('cell')) {
        toggle(e.target, css);
        toggle(mirror(e.target), css);
    }
}; 

var handleClearButtonEvent = function() {  
    var cells = document.getElementById('matrix')
        .getElementsByClassName('on');

    for (var i = cells.length; i--;) {
        cells[i].classList.remove('on');
    }        
};

//
//
//

var init = function() {
    
    // some initial declarations/definitions
    
    var cell, 
        rowLeft, 
        rowRight,
        cols = 6,
        rows = 8,
        matrix = [],
        divLeft  = document.getElementById('left'),
        divRight = document.getElementById('right');
        divMatrix = document.getElementById('matrix'),
        btnClear  = document.getElementById('clear'),
        btnRandom = document.getElementById('random');
    
    //
    // blank
    //
    
    divLeft.innerHTML  = null;
    divRight.innerHTML = null;

    //
    // fill matrix with random values
    //

    arrayFill(matrix, (cols * rows), randBool);

    //
    // iterate!        
    //

    matrix.forEach(function(isTrue, index) {

        // init each new row
        if (index % cols == 0) {

            // create new rows
            rowLeft  = document.createElement('div');
            rowRight = document.createElement('div');

            // attach new rows
            divLeft.appendChild(rowLeft);
            divRight.appendChild(rowRight);
            }

            // create a new cell
            cell = document.createElement('div');

            // numeric class names: legal in HTML5. yay!
            cell.classList.add('cell');
            cell.classList.add(index);

            // add class if current array element is true
            isTrue && cell.classList.add('on');

            // append, clone, prepend
            rowLeft.appendChild(cell);
            rowRight.insertBefore(cell.cloneNode(), rowRight.firstElementChild);
    });

    //
    // register various listeners
    //
    
    btnClear.addEventListener('click', handleClearButtonEvent);
    btnRandom.addEventListener('click', init);
    
    divMatrix.addEventListener('click', function(e) {
        handleMouseEventOnCell(e, 'on'); 
    });
    
    divMatrix.addEventListener('mouseover', function(e) { 
        handleMouseEventOnCell(e, 'over'); 
    });
    
    divMatrix.addEventListener('mouseout', function(e) { 
        handleMouseEventOnCell(e, 'over'); 
    });

};

// TODO
// cleanup wherever
// handle button events could be neater
// add initial 'init' to onload event
// fix randomise = clear before append

window.onload = init();
