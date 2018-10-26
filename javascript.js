//created by Oliver Brotchie (ob10)

//global variables (This is bad code design but its also a lot easier/nessesary for a lot of the funcitons)
var products = new Array();
var productBoxes = document.getElementsByClassName("product");
var modalData;
var modalType;
var loggedIn = false;
var logInDetails;
var clicks = 0;
var inputType = 1;
var product;
var returnedProducts= new Array();



//variables needed for my scrolling nav function
var nav = document.getElementById("topNav");
var prevOffset = 0;
var scrolled = false;
var initialScroll = false;
var navOpen = false;
window.onscroll = function () { scrollNav(true, false, false) };


//called on loading the page
function loadDoc() {
    getEngine();
    retiveProducts();
    if (window.location.href.includes("Products.xhtml")) {
        displayProducts("any",productBoxes.length)
        returnProducts();
    }

    //sets the active tabs on the modal
    activeTab(1);
    activeTab(5);
    activeTab(11);

    circularize();

    //login();

    //handles searching
    document.getElementById("searchBox").addEventListener("keypress", function (event) {
        var key = event.which || event.keyCode;
        if (key === 13) { // 13 is enter
            window.open("Products.xhtml#" + document.getElementById("searchBox").value, "_self");
            if(window.location.href.includes("Products.xhtml")){
                window.location.reload(true);
            }
        }
    })

    //redirects user to a better browser
    if (getEngine() == "IE" || getEngine() == "Safari" || getEngine() == "Unknown") {
        window.open("https://www.google.com/chrome/", "_self");
    }

    //binds a double click funciton to the snav items
    document.getElementById('snav-1').addEventListener('mouseup', checkDoubleClick("bike"), false);
    document.getElementById('snav-2').addEventListener('mouseup', checkDoubleClick("accesories"), false);
    document.getElementById('snav-3').addEventListener('mouseup', checkDoubleClick("tools"), false);
}

//used for searching when already on the products page
function reload(data){
    window.open("Products.xhtml#" + data, "_self");
    window.location.reload(true);
}

//Gives text inputs a pretty animation
function setActive(id) {

    var x = document.getElementById(id)
    x.previousElementSibling.classList.add("textActive");

    monitorFocus(x);
}


function removeActive(x){
    x.previousElementSibling.classList.remove("textActive");
}

//had to write my own "onfocusout=" function because xhtml dosent support it
function monitorFocus(x){
    if(x == document.activeElement){
        setTimeout(function () {
            monitorFocus(x);
        }, 100);
    } else {
        removeActive(x);
    }
}

//used to determine the type of modal that is opened
function retunResult() {
    switch (modalType) {
        case 1:
            checkout();
            break;
        case 2:
            determineLoginType();
            break;
    }

}

//used to determine whether the user is logging in or signing up
function determineLoginType() {
    if (document.getElementById("loginTab").classList.contains("active")) {
        if (document.getElementById("username").value == "" || document.getElementById("password").value == "") {
            alert("Please enter both your username or password to login");
        } else {

        }
    } else {
        if (document.getElementById("usernameS").value == "" || document.getElementById("passwordS").value == "" || document.getElementById("name").value == "" || document.getElementById("email").value == "") {
            alert("Please enter values for all the fields");
        } else {

        }
    }
}

//takes the data from the modal and sends it to the checkout page
function checkout() {
    window.open("Checkout.xhtml#" + modalData[0] + "," + modalData[3], "_self");
}

//used at checkout to grab the correct product and display it
function loadProduct() {
    if (window.location.href.includes("#")) {
        var x = window.location.href.split("#")[1];
        if (x.includes(",")) {
            x = x.split(",");

            for(var i = 0; i<products.length;i++){
                if(products[i][0].toLowerCase().includes(x[0])){
                    product = products[i];
                }
            }
        }
    }

    if (product != null) {
        document.getElementById('productName').innerHTML = "Product name: " + "\u00a0" + product[0];
        document.getElementById('price').innerHTML = "Price per item: " + "\u00a0" + product[3];
    }
}

//switches sign in/sign up content
function loginContent(type) {
    if (type == 1) {
        document.getElementById("loginContent1").style.display = "block";
        document.getElementById("loginContent2").style.display = "none";
        inputType = 1;
    } else {
        document.getElementById("loginContent2").style.display = "block";
        document.getElementById("loginContent1").style.display = "none";
        inputType = 2;
    }
}



//Places the order
function placeOrder() {
    if (loggedIn == false) {
        alert("Please login or sign up before purchasing a product");
    } else if (product == null) {
        alert("Please select a product before trying to purchase one");
    } else {
        if (document.getElementById("adress").value == "" || document.getElementById("postCode").value == "" || document.getElementById("number").value == "" || document.getElementById("quantity").value == "") {
            alert("Please fill in all fields");
        } else {

        }
    }
}

//fired when the login button is clicked
function openLogin() {
    if (loggedIn) {
        window.open("Account.xhtml", "_self");
    } else {
        openModal(0, 2);
        setloginName("testuser");
    }
}

//sets the login button text
function setloginName(username) {
    document.getElementById("login").innerHTML = username;
    document.getElementById("loginMobile").innerHTML = username;
    loggedIn = true;
}

//used to bind a double click funciton
function checkDoubleClick(data) {
    return  function () {
        clicks++;
        setTimeout(function () {
            if (clicks > 1) {
                DoubleClick(data);
            } else {
                clicks = 0;
            }
        }, 250);
    }


}

//this function fires when a double click is registered
function DoubleClick(data) {
    window.open("Products.xhtml#" + data, "_self");
}

//used instead of a link so that is the user is already home it dosent reload the page
function goHome() {
    if (!(window.location.href.includes("Home.xhtml"))) {
        window.open("Home.xhtml", "_self");
    }
}

//circularises elements with the class "circle"
function circularize() {
    var x = document.getElementsByClassName("circle");

    for (i = 0; i < x.length; i++) {
        x[i].style.width = x[i].offsetHeight + "px";
        x[i].style.lineHeight = x[i].offsetHeight + "px";
    }
}

//activates tabs in the modal
function activeTab(tab) {
    if (tab < 5) {
        for (i = 1; i <= 4; i++) {
            document.getElementById("tab-" + i).classList.remove('active');
        }
    } else if (tab < 11) {
        for (i = 5; i <= 10; i++) {
            document.getElementById("tab-" + i).classList.remove('active');
        }
    } else {
        document.getElementById("loginTab").classList.remove('active');
        document.getElementById("signUpTab").classList.remove('active');
    }

    switch (tab) {

        case 1:
            document.getElementById("tab-1").classList.add('active');
            if (!(modalData === undefined || modalData.length == 0)) {
                document.getElementById("tab-text").innerHTML = modalData[2];

                setTimeout(function () {
                    if (modalData === undefined) {
                        activeTab(1);
                    }
                }, 200);
            } else {
                setTimeout(function () {
                    activeTab(1);
                }, 200);
            }
            break;
        case 2:
            document.getElementById("tab-2").classList.add('active');
            document.getElementById("tab-text").innerHTML = "A full specs list will be given inside the product manual";
            break;
        case 3:
            document.getElementById("tab-3").classList.add('active');
            document.getElementById("tab-text").innerHTML = "Any product may be returned for a full refund as long as its undamaged."
            break;
        case 4:
            document.getElementById("tab-4").classList.add('active');
            document.getElementById("tab-text").innerHTML = "Sizing only available for bottles. Sizes range from 250ml at xx-small to 4000ml at x-large"
            break;

        case 5:
            document.getElementById("tab-5").classList.add('active');
            break;
        case 6:
            document.getElementById("tab-6").classList.add('active');
            break;
        case 7:
            document.getElementById("tab-7").classList.add('active');
            break;
        case 8:
            document.getElementById("tab-8").classList.add('active');
            break;
        case 9:
            document.getElementById("tab-9").classList.add('active');
            break;
        case 10:
            document.getElementById("tab-10").classList.add('active');
            break;
        case 11:
            document.getElementById("loginTab").classList.add('active');
            break;
        case 12:
            document.getElementById("signUpTab").classList.add('active');
            break;
    }
}

//handles opening the side nav for mobile and desktop

function openNav() {
    openOverlay("sideNavOverlay");
    if (window.screen.width >= 992) {
        translateElement("sidenav", 0, "x");

    } else {
        translateElement("s-sidenav", 0, "x");
    }
    navOpen = true;
}

//opens the side nav extension
function openExtender(type, productType) {
    translateElement("navExtended", 0, "x");

    for (i = 1; i <= 3; i++) {
        document.getElementById("snav-" + i).classList.remove('active');
    }


    document.getElementById("snav-" + type).classList.add('active');

    displayProducts(productType, 2);
}

//used for displaying products in the sidenav
function displayImages(number,max) {

    for (i = 0; i < max; i++) {
    
        productBoxes[i].style.display = "none";
    }
    for (i = 0; i < number; i++) {
        productBoxes[i].style.display = "inherit";
    }

}
//handles opening and closing of the modal
function closeModal() {
    document.getElementById("modal").style.display = "none";
    document.getElementById("modal-footer").style.display = "none";
    activeTab(1);
    activeTab(5)
    modalData = undefined;
    document.getElementById("modalOverlay").style.display = "none";

}

//used to open the modal 
function openModal(id, type) {

    document.getElementById("modal1").style.display = "none";
    document.getElementById("modal2").style.display = "none";

    if (type == 1) {
        modalType = 1;
        document.getElementById("modal1").style.display = "inherit";

        modalData = products[id];
    } else {
        modalType = 2;
        document.getElementById("modal2").style.display = "inherit";
    }
    document.getElementById("modal").style.display = "block";
    document.getElementById("modal-footer").style.display = "block";
    openOverlay("modalOverlay");
}


// handles opening and closing of any overlays
function closeOverlay(overlayID) {
    document.getElementById(overlayID).classList.add('fadeOut');

    setTimeout(function () {
        document.getElementById(overlayID).style.display = "none";
        document.getElementById(overlayID).classList.remove('fadeOut');

    }, 500);

}

//closes inputed overlay
function openOverlay(overlayID) {
    document.getElementById(overlayID).style.display = "block";

    document.getElementById(overlayID).classList.add('fadeIn');

    setTimeout(function () {
        document.getElementById(overlayID).classList.remove('fadeIn');

    }, 500);
}

//closes any open side navs
function closeNav() {
    navOpen = false;
    translateElement("sidenav", -105, "x");
    translateElement("s-sidenav", -105, "x");
    translateElement("navExtended", -155, "x");
    document.getElementById('navExtended').style.display = "none";

    setTimeout(function () {
        document.getElementById('navExtended').style.display = "block";
    }, 500);

    closeSearch();
    if (!(window.location.href.includes("Products.xhtml"))) {
        displayImages(0,6);
    }



    for (i = 1; i <= 3; i++) {
        document.getElementById("snav-" + i).classList.remove('active');
    }

    closeOverlay("sideNavOverlay");
}

//sets the focus on a spesified element
function setFocus(id) {
    document.getElementById(id).focus();
}

//handles the look of the search bar on click
function closeSearch() {
    document.getElementById('searchOverlay').style.display = "none";
    document.getElementById("searchBar").style.backgroundColor = "rgba(0,0,0,0)";
    document.getElementById("searchBar").style.color = "#fff";
    document.getElementById("magnify").style.color = "#fff";
}

// changes the look of the search box when it is selected
function activateSearch() {
    document.getElementById("searchBar").style.backgroundColor = "#fff";
    document.getElementById("searchBar").style.color = "rgba(0,0,0,0.87)";
    document.getElementById("magnify").style.color = "rgba(0,0,0,0.87)"
    document.getElementById("searchOverlay").style.display = "block";
    setFocus("searchBox");
}

//moves elements about the screen
function translateElement(id, end, axis) {
    if (axis == "x") {
        document.getElementById(id).style.transform = "translateX(" + end + "%)";
    } else {
        document.getElementById(id).style.transform = "translateY(" + end + "%)";
    }

}

//finds the bottom px of an element
function findBot(id) {
    return document.getElementById(id).offsetTop + document.getElementById(id).offsetHeight;
}

//This section of code minimises the topnav bar on mobile devices when scrolling down the page to maximise space on the small screen space
function scrollNav(mobile, tablet, desktop) {
    var navBottom = findBot("topNav");

    if ((mobile == true && isTouchDevice("mobile") || tablet == true && isTouchDevice("tablet") || desktop == true && isTouchDevice() == false) && navOpen == false) {
        // handles scrolling down
        if (window.pageYOffset > prevOffset) {

            if (!scrolled) {

                if (window.pageYOffset > navBottom) {
                    if (!initialScroll) {
                        translateElement("topNav", -105, "y");
                        scrolled = true;
                        initialScroll = true;
                    } else {
                        prevOffset = window.pageYOffset

                        //creates a buffer so that the nav does not scroll instantly
                        setTimeout(function () {
                            if (window.pageYOffset > prevOffset) {
                                translateElement("topNav", -105, "y");
                                scrolled = true;
                            }
                        }, 250);
                    }
                }


            }


            // handles scrolling up
        } else if (window.pageYOffset < prevOffset) {

            if (scrolled) {

                if (window.pageYOffset <= navBottom) {
                    translateElement("topNav", 0, "y");
                    scrolled = false;
                    initialScroll = false;
                }


                prevOffset = window.pageYOffset

                //creates a buffer so that the nav does not scroll instantly
                setTimeout(function () {
                    if (window.pageYOffset < prevOffset) {
                        translateElement("topNav", 0, "y");
                        scrolled = false;
                    }
                }, 350);


            }

        } else { }


        prevOffset = window.pageYOffset;


    }
}


//tests is a string is a number
function isANumber(str) {
    return !/\D/.test(str);
}

//finds the device type
function isTouchDevice() {
    return 'ontouchstart' in document.documentElement;
}

function isTouchDevice(type) {
    if ('ontouchstart' in document.documentElement) {
        if (screen.width < 420 && type == "mobile") {
            return true;
        } else if (screen.width >= 420 && type == "tablet") {
            return true;
        }
    }
    return false;
}

//fids the browser type
function getEngine() {
    var browser = "Unknown";

    if (/*@cc_on!@*/false || !!document.documentMode) {
        browser = "IE"
    } else if (!(/*@cc_on!@*/false || !!document.documentMode) && !!window.StyleMedia) {
        browser = "Edge"
    } else if (/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification)) {
        browser = "Safari"
    } else if (typeof InstallTrigger !== 'undefined') {
        browser = "Firefox"
    } else if (!!window.chrome && !!window.chrome.webstore) {
        browser = "Chrome"
    }

    return browser;
}


//retrieves the products from the server 
function retiveProducts() {

    //currently taking dummy values
    splitProducts("response1,bike,This is a description for response one,$100,media/bikeimage.jpg,1;response2,bike,this is a description for response two,$600,media/bikeimage.jpg,2")

}

//splits a list of products and places in the products variable
function splitProducts(result) {
    result = result.split(";")

    for (i = 0; i <= result.length - 1; i++) {
        var temp = result[i];
        temp = temp.split(",");
        products.push([temp[0], temp[1], temp[2], "$"+ temp[3], temp[4], temp[5]]);
    }

    //name,type,description,price,image,id
}

//displays products of spesified type in all available boxes marked with the product class
function displayProducts(type, max) {
    var counter = 0;

    if (!(products.length == 0)) {


        for (var i = 0; i <= products.length - 1; i++) {


            if ((products[i][1] == type || type == "any")&& counter <= max - 1) {

                productBoxes[counter].addEventListener("click", bindOnClick(counter));


                productBoxes[counter].children[0].src = products[i][4];
                productBoxes[counter].children[1].innerHTML = products[i][0];
                productBoxes[counter].children[2].innerHTML = products[i][3];

                closeModal();



                counter++;
            }
        }

        displayImages(counter,max);


    

    }

}

//Javascript is wierd with variable handeling so onclick needs to be bound
function bindOnClick(counter) {
    return function () {
        openModal(counter, 1);
    };
}

//This handles searching for products on the products page
function returnProducts() {
    var searchTerm;
    var searchBoxes = document.getElementsByClassName("searchProduct");

    if (!(products.length == 0)) {

        if(window.location.href.includes("#")){

            document.getElementById("searchResults").style.display = "block";

            
            searchTerm = window.location.href.split("#")[1].toString().toLowerCase().replace("%20", "");;
            
            //searches for products relating to the given search term
            searchForProducts(searchTerm);

            if(searchTerm.search("s")==searchTerm.length-1){
                searchForProducts(searchTerm.replace("s",""));
            }


            if(searchTerm.search("es")==searchTerm.length-2){
                searchForProducts(searchTerm.replace("es",""));
            }
            

        }
        for(var i = 0; i<searchBoxes.length;i++){
            searchBoxes[i].style.display="none";
        }

        if (!(returnedProducts.length == 0)) {

            //displayes search results
            document.getElementById("searchResultsTitle").innerHTML = "Search Results:"

            returnedProducts = returnedProducts.filter(function(item, position, self) {
                return self.indexOf(item) == position;
            })

            for(var i = 0; i<returnedProducts.length;i++){
                
                searchBoxes[i].addEventListener("click", bindOnClick(i));


                searchBoxes[i].children[0].src = returnedProducts[i][4];
                searchBoxes[i].children[1].innerHTML = returnedProducts[i][0];
                searchBoxes[i].children[2].innerHTML = returnedProducts[i][3];

                searchBoxes[i].style.display="block";
            }
        } else{
            //if there is no results returned it displays this
            document.getElementById("searchResultsTitle").innerHTML = "Sorry no products were found matching the description of:  '" + searchTerm + "'";
        }
    
    }
}

//searches for any products within the products array pretaining to the input variable
function searchForProducts(searchTerm) {

    for(var i = 0; i<products.length;i++){

        for(var j = 0; j<products[i].length;j++){
            if(products[i][j].toLowerCase().includes(searchTerm)){
                returnedProducts.push(products[i])
            } 
        }
    }
}