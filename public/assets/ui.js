//vanilla JS for hamburger menu functionality
//==================================================
(function (window, document) {

    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink'),
        navLink = document.getElementById('L1'),
        content  = document.getElementById('main');
   

    function toggleClass(element, className) {
        var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
    }

    function toggleAll(e) {
        var active = 'active';
        
        e.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
        
    }

    menuLink.onclick = function (e) {
        toggleAll(e);
        
    };

    navLink.onclick = function(e) {
        var selected = 'pure-menu-selected';
        if(!selected){
            toggleClass(navLink, selected);
        console.log("CLICK!!!!!!" + e);
        console.log(navLink);
        console.log(navLink.classList); 
        } else{
            return
        }
       
    } 
    
    content.onclick = function(e) {
        if (menu.className.indexOf('active') !== -1) {
            toggleAll(e);
        }
    };

    // active class toggle on menu link clicks
    // var el = document.querySelector('.nav');
    // console.log(el);
    // console.log("=============================");
    // el.onclick = function() {
    // el.classList.toggle('pure-menu-selected');
    // }  var el = document.querySelector('.nav');
    // console.log(el);
    // console.log("=============================");
    // el.onclick = function() {
    // el.classList.toggle('pure-menu-selected');
    // }

  
}(this, this.document));