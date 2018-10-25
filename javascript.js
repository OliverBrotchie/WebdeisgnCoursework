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

//called on loading the page
function loadDoc() {
    getEngine();
    retiveProducts();
    if (window.location.href.includes("Products.xhtml")) {
        displayProducts("any",productBoxes.length)
        returnProducts();
    }
    activeTab(1);
    activeTab(5);

    activeTab(11);

    circularize();

    //login();

    document.getElementById("searchBox").addEventListener("keypress", function (event) {
        var key = event.which || event.keyCode;
        if (key === 13) { // 13 is enter
            window.open("https://www.google.co.uk/search?q=" + document.getElementById("searchBox").value, "_self");
        }
    })

    //redirects user to a better browser
    if (getEngine() == "IE" || getEngine() == "Safari" || getEngine() == "Unknown") {
        window.open("https://www.google.com/chrome/", "_self");
    }


    document.getElementById('snav-1').addEventListener('mouseup', checkDoubleClick("bike"), false);
    document.getElementById('snav-2').addEventListener('mouseup', checkDoubleClick("accesories"), false);
    document.getElementById('snav-3').addEventListener('mouseup', checkDoubleClick("tools"), false);
}



function setActive(id) {
    var x = document.getElementById(id).previousElementSibling;
    if (x.classList.contains("textActive")) {
        x.classList.remove("textActive");
    } else {
        x.classList.add("textActive");
    }
}

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

function checkout() {
    window.open("Checkout.xhtml#" + modalData[0] + "," + modalData[3], "_self");
}

function loadProduct() {
    if (window.location.href.includes("#")) {
        var x = window.location.href.split("#")[1];
        if (x.includes(",")) {
            x = x.split(",");
            product = x;
        }
    }

    if (product != null) {
        document.getElementById('productName').innerHTML = "Product name: " + "\u00a0" + product[0];
        document.getElementById('price').innerHTML = "Price per item: " + "\u00a0" + product[1];
    }
}

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


function openLogin() {
    if (loggedIn) {
        window.open("Account.xhtml", "_self");
    } else {
        openModal(0, 2);
        setloginName("testuser")
    }
}

function setloginName(username) {
    document.getElementById("login").innerHTML = username;
    document.getElementById("loginMobile").innerHTML = username;
    loggedIn = true;
}


function checkDoubleClick(data) {
    return function (data) {
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


function DoubleClick(data) {
    window.open("Products.xhtml#" + data, "_self");
}

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
            document.getElementById("tab-text").innerHTML = "Lorem ipsum dolor sit amet, ne suas periculis vim, qui dicta mediocrem ex. Sit viris moderatius eloquentiam id, dictas forensibus ut vim, quo probo insolens ea. Cum et essent fierent definitionem, in graeco malorum ius. Vidit deserunt eu est. Eam populo nusquam et, at inani euismod tractatos vis.";
            break;
        case 3:
            document.getElementById("tab-3").classList.add('active');
            document.getElementById("tab-text").innerHTML = "The Right Bike Guarantee lets you return any new bike within 30 days and swap it for a different one. <br/><br/> If you're not happy with your new bike for any reason, just bring it back to one of our stores and we'll exchange it as long as it's clean and isn't broken - by this we mean things like buckled wheels, crash damage, broken components, cracked frames etc. Worn brakes and tyres are acceptable."
            break;
        case 4:
            document.getElementById("tab-4").classList.add('active');
            document.getElementById("tab-text").innerHTML = "The best way to find out what size of frame you should get is to come in store and try the bike out yourself!"
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
        displayImages(0,16);
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

//This section of code minimises the top nav bar on mobile devices to maximise on the small screen space
// Whilst Global variables are messy, they are nessisary for this functionality

var nav = document.getElementById("topNav");
var navBottom = findBot("topNav");
var prevOffset = 0;
var scrolled = false;
var initialScroll = false;
var navOpen = false;

window.onscroll = function () { scrollNav(true, false, false) };


function findBot(id) {
    return document.getElementById(id).offsetTop + document.getElementById(id).offsetHeight;
}


function scrollNav(mobile, tablet, desktop) {

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


//currently taking a dummy value
function retiveProducts() {
    /*var xhttp = new XMLHttpRequest();
    var text;
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            text = this.responseText;

            
        }
    };
    xhttp.open("GET", "productlist.text", true);
    xhttp.send();*/

    splitProducts("response1,bike,This is a description for response one,$100,media/bikeimage.jpg,1;response2,bike,this is a description for response two,$600,media/bikeimage.jpg,2")

}

//splits a list of products and places in the products variable
function splitProducts(result) {
    result = result.split(";")

    for (i = 0; i <= result.length - 1; i++) {
        var temp = result[i];
        temp = temp.split(",");
        products.push([temp[0], temp[1], temp[2], temp[3], temp[4], temp[5]]);
    }

    //name,type,description,price,image,id
}

//displays products of spesified type
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

function returnProducts() {
    var searchTerm;
    var searchBoxes = document.getElementsByClassName("searchProduct");

    if (!(products.length == 0)) {

        if(window.location.href.includes("#")){

            document.getElementById("searchResults").style.display = "block";

            
            searchTerm = window.location.href.split("#")[1].toString().toLowerCase();
            
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
            document.getElementById("searchResultsTitle").innerHTML = "Search Results:"

            /*removes duplicates
            for(var i = 0; i<returnedProducts.length;i++){
                for(var j = i; j<returnedProducts.length;j++){
                    if(returnedProducts[j][5]==returnedProducts[i][5]){

                        returnedProducts.splice(j, 1);
                    }
                }
            }*/

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
            document.getElementById("searchResultsTitle").innerHTML = "Sorry no products were found matching the description of:  '" + searchTerm + "'";
        }
    
    }
}

function searchForProducts(searchTerm) {

    for(var i = 0; i<products.length;i++){

        for(var j = 0; j<products[i].length;j++){
            if(products[i][j].toLowerCase().includes(searchTerm)){
                returnedProducts.push(products[i])
            } 
        }
    }
}



