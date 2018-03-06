/* todo 
add alter that replaces .com .org .info .net with g5static.com
Check and see if the webulr has "/" at the end of the string
remove the add redirects button once it is clicked to prevent duplicate redirects being added and add in a save button
check if word is our , in , and then dont auto place it
*/
var AutoRedirects = {
    version: "1.1 Beta",
    dateUpdated: "5/16/2017",
    author: "Tyler Hasenoehrl",
    textarea: null,
    submitTitleAndDescription: null,
    clearTitleDescriptionButton: null,
    elHook: null,
    pageContainers: null,
    pageNames: null,
    error: false,
    init: function () {
        // init properties
        this.textarea = $("#pasteRedirects");

        this.submitTitleAndDescription = $("#submitTitleAndDescription");
        this.clearTitleDescriptionButton = $("#clearTitleDescription");

        this.elHook = $(".container-header")
        this.pageContainers = $(".redirects div div")[0];
        this.pageNames = $("div .title", this.pageContainers);
        this.redirects = $("div .secondary-content div textarea", this.pageContainers);
        // check if already on page
        if (this.textarea.length === 0) {
            this.createTextarea();
            this.createClearTitleDescriptionButton();
            this.createSubmitTitleAndDescriptionButton();
            this.addStyles();
        }
    },
    addStyles: function () {
        //add style sheet
        var css = '#pasteRedirects { height:auto;} .redirects > .ember-view {clear: both;} select.redirectPage {display: inline-block; width: auto; float: right; margin: .5em 0em;} p.redirect { float: left;} .matchingRule { width: 100%; overflow: auto; padding: 5px 10px; } .matchingRule:nth-child(even) { background-color: #fff; }',
            head = document.head || document.getElementsByTagName('head')[0],
            style = document.createElement('style');

        style.type = 'text/css';
        if (style.styleSheet) {
            style.styleSheet.cssText = css;
        } else {
            style.appendChild(document.createTextNode(css));
        }

        head.appendChild(style);
    },
    // Create Text Area
    createTextarea: function () {
        this.textarea = $("<textarea id='pasteRedirects' rows='10' >");
        // cannot do multi-line placeholder via attribut due to specs, but you can do it through JS ;)
        this.textarea.attr("placeholder", "Paste your Scraped URLs in this box. The first one must be the URL that your want to strip out." +
            "\r\nAuto Redirect Version: " + this.version + "\r\nUpdated: " + this.dateUpdated + "\r\nBy: " + this.author);
        this.elHook.after(this.textarea);
    },

    // Create Buttons
    createSubmitTitleAndDescriptionButton: function () {
        this.submitTitleDescriptionButton = $("<button class='green btn' id='submitTitleAndDescription' style='float: right; margin-top: 10px; margin-right: 10px;'>"
            + "match</button>");
        this.textarea.after(this.submitTitleDescriptionButton);
        this.submitTitleAndDescriptionButtonEvent();
    },
    createClearTitleDescriptionButton: function () {
        this.clearTitleDescriptionButton = $("<button class='btn red' id='clearTitleDescription' style='float: right; margin-top: 10px; margin-right: 10px;'>" +
            "Clear Redirects</button>");
        this.textarea.after(this.clearTitleDescriptionButton);
        this.clearTitleDescriptionButtonEvent();
    },
    // Button Events
    submitTitleAndDescriptionButtonEvent: function () {
        this.submitTitleDescriptionButton.click(function (e) {
            e.preventDefault();
            this.autoApplyRedirects();
        }.bind(this));
    },
    clearTitleDescriptionButtonEvent: function () {
        this.clearTitleDescriptionButton.click(function (e) {
            // focus text area to trigger an ember update, otherwise nothing gets passed to the server
            $(this.redirects).val("").focus();
            // refocus back to the top
            this.textarea.focus();
        }.bind(this));
    },

    autoApplyRedirects: function () {

        //create array of page names and redirects
        var pageNamesArray = [];
        var redirectsArray = [];
        var redirectText = $('#pasteRedirects').val().split(/\n/);
        this.pageNames.map(function (i, e) {
            //add page name to array
            pageNamesArray.push($(e).text().trim());
        });
        // put redirects in array
        for (var i = 0; i < redirectText.length; i++) {
            // only push this line if it contains a non whitespace character.
            if (/\S/.test(redirectText[i])) {
                redirectsArray.push($.trim(redirectText[i]));
            }
        }
        //get first URL to find and replace
        var webURL = redirectsArray[0];
        var newRedirects = [];
        for (var i = 1, l = redirectsArray.length; i < l; i++) {
            var fullRedirect = redirectsArray[i];
            //replace the website url with nothing 
            var newRedirect = fullRedirect.replace(webURL, "");

            //decrease the index in the array to skip the web url 
            n = i - 1;

            //check if the last charcter in the url is "/" if so replace it
            if (newRedirect.substring(newRedirect.length - 1) == "/") {
                newRedirect = newRedirect.substring(0, newRedirect.length - 1);
            }
            //set url as the new redirect and add $ to the end to stop them from redirect looping
            newRedirects[n] = newRedirect + "$";
        }

        // hide the input box and other elements
        document.getElementById("pasteRedirects").style.display = "none";
        document.getElementById("clearTitleDescription").style.display = "none";
        document.getElementById("submitTitleAndDescription").style.display = "none";
        $('.container-header').after("<div class='matchingRedirects'></div>");

        //set the array for redirects that cannot be auto placed
        var placeredirect = [];
        var placedredirect = [];

        autoRedirects(pageNamesArray, newRedirects);
        //create matching function
        for (var i = 0, l = placeredirect.length; i < l; i++) {
            var redirect = placeredirect[i];
            //create a select box for each page on each redirect
            $(".matchingRedirects").append(function () {
                var matchingRule = $('<div class="matchingRule"></div>');
                var elem = $('<select  class="redirectPage"></select>');
                for (var ri = 0, rl = pageNamesArray.length; ri < rl; ri++) {
                    var pagename = pageNamesArray[ri];
                    elem.append('<option value="' + pagename + '">' + pagename + '</option>');
                }
                var redirectURL = placeredirect[i];
                var returnedElm = matchingRule.append(elem);
                returnedElm = returnedElm.prepend('<p class="redirect">' + placeredirect[i] + '</p>')
                return returnedElm;
            });
        }

        // add submit button for matching rules 
        $('.matchingRedirects').after("<button class='green btn' id='submitRedirects' style='float: right; margin-top: 10px; margin-right: 10px;'>Place Redirects</button>");

        //match the redirects
        $("#submitRedirects").click(function () {
            $(".matchingRule").each(function (i, obj) {
                var redirectpage = $(".redirectPage option:selected", this).text();
                var redirect = $(".redirect", this).text();
                //find the text box to add the redirect to
                matchingRules(redirectpage, redirect);

            });
        });
        function matchingRules(redirectpage, redirect) {

            var pageTitles = $('.redirects .ember-view .ember-view .collection-item');
            var redirectTextarea = $('.redirects .ember-view .ember-view .collection-item .secondary-content textarea');

            $(pageTitles).each(function (i) {
                pageTitles = $('.title', this).text();
                redirectTextarea = $('.secondary-content textarea', this);
                // if the page name matches the selected page enter it in the text area
                if (pageTitles === redirectpage) {

                    //check if the text area is empty
                    if (!redirectTextarea.val()) {
                        redirectTextarea.focus();
                        redirectTextarea.val(redirect);
                    }
                    else {
                        // get existing value 
                        existingValue = redirectTextarea.val();
                        redirectTextarea.focus();
                        redirectTextarea.val(existingValue + '\n' + redirect);
                    }
                }
            });
        }

        function autoRedirects(pageNamesArray, newRedirects) {
            //iterate throught the arrays and check if there is a page name in the URL
            for (var i = 0, l = newRedirects.length; i < l; i++) {
                var Redirect = newRedirects[i];
                //check if the pageName
                for (var ipn = 0, lpn = pageNamesArray.length; ipn < lpn; ipn++) {
                    var PageName = pageNamesArray[ipn];
                    //set old page to null to each time the loop is run
                    var oldPageName = null;
                    //check if PageName has a space
                    if (PageName.indexOf(' ') >= 0) {
                        //pageName does have space grab the first part of the string and use that
                        oldPageName = PageName;
                        PageName = PageName.substr(0, PageName.indexOf(' '));
                    }
                    if (Redirect.toLowerCase().indexOf(PageName.toLowerCase()) !== -1) {
                        if (oldPageName !== null) {
                            if ($.inArray(Redirect, placedredirect) == -1) {
                            matchingRules(oldPageName, Redirect);
                            //set oldPageName to null 
                            //push the redirect to the placedredirect array
                            placedredirect.push(Redirect);
                        }
                        }
                        else {
                            if ($.inArray(Redirect, placedredirect) == -1) {
                            //place recirect in this loop
                            matchingRules(PageName, Redirect);
                            //push the redirect to the placedredirect array
                            placedredirect.push(Redirect);
                        }
                        }
                    }
                    else {
                        var arrayIndex = pageNamesArray.length - 1;
                        //push the redirect into the array for manual matching
                        //check if this is the last page name in the array if it is not do not enter
                        if (ipn == arrayIndex) {
                            if ($.inArray(Redirect, placedredirect) == -1) {
                                //it is not in the placedredirect and needs to me manually placed
                                //check if the placeredirect is not in the array
                                if ($.inArray(Redirect, placeredirect) == -1) {
                                    //redirect is not already in the array
                                    placeredirect.push(Redirect);
                                }
                            }
                        }
                    }
                }
            }
        }
    },
}
AutoRedirects.init();