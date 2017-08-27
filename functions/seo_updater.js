var AutoSEO = {
    version: "1.2.0",
    dateUpdated: "1/8/2017",
    author: "Tyler Hasenoehrl / Coder Swartz",
    textarea: null,
    submitTitleAndDescription: null,
    clearTitleDescriptionButton: null,
    elHook: null,
    pageContainers: null,
    pageNames: null,
    pages: null,
    error: false,
    translation: {
      Residents: "Current Residents",
      Reviews: ">> Reviews",
      Suggestions: "Suggestion Box",
      "Photos": "Photo Gallery",
      "Privacy Policy": ">> Privacy Policy",
      "Climate Control": "Climate Controlled Units"
      
    },
    init: function() {
      // init properties
      this.textarea = $("#pasteSEO");
      
      this.submitTitleAndDescription = $("#submitTitleAndDescription");
      this.clearTitleDescriptionButton = $("#clearTitleDescription");
      
      this.elHook = $(".container-header")
      this.pageContainers = $(".seo-editor table tbody")[0];
      this.pageNames = $("tr td:nth-child(1)", this.pageContainers);
      this.titles = $("tr td:nth-child(2) .seo-title", this.pageContainers);
      this.descriptions = $("td:nth-child(3) .seo-description", this.pageContainers);
      // check if already on page
      if (this.textarea.length === 0) {
        this.createTextarea();
        this.createClearTitleDescriptionButton();
        this.createSubmitTitleAndDescriptionButton();
      }
    },
    
    // Create Text Area
    createTextarea: function() {
      this.textarea = $("<textarea id='pasteSEO' rows='50' >");
      // cannot do multi-line placeholder via attribut due to specs, but you can do it through JS ;)
      this.textarea.attr("placeholder", "Paste your SEO strategy from a spreadsheet here.\r\n\r\n" +
        "Column 1 = Page Name\r\nColumn 2 = Title Tag\r\nColumn 3 = Meta Description\r\n\r\nColumn 4 = H1\r\n\r\n" +
        "SEO Strategy Updater v"+this.version+"\r\nUpdated: "+this.dateUpdated+"\r\nBy: "+this.author);
      this.elHook.after(this.textarea);
    },
    
    // Create Buttons
    createSubmitTitleAndDescriptionButton: function() {
      this.submitTitleDescriptionButton = $("<button class='green btn' id='submitTitleAndDescription' style='float: right; margin-top: 10px; margin-right: 10px;'>"
        +"Auto Update </button>");
      this.textarea.after(this.submitTitleDescriptionButton);
      this.submitTitleAndDescriptionButtonEvent();
    },
    createClearTitleDescriptionButton: function() {
      this.clearTitleDescriptionButton = $("<button class='btn red' id='clearTitleDescription' style='float: right; margin-top: 10px; margin-right: 10px;'>"+
        "Clear Strategies</button>");
      this.textarea.after(this.clearTitleDescriptionButton);
      this.clearTitleDescriptionButtonEvent();
    },
    // Button Events
    submitTitleAndDescriptionButtonEvent: function() {
      this.submitTitleDescriptionButton.click(function(e) {
        e.preventDefault();
        this.setTitlesDescriptions();
      }.bind(this));
    },
    clearTitleDescriptionButtonEvent: function() {
      this.clearTitleDescriptionButton.click(function(e) {
        // focus text area to trigger an ember update, otherwise nothing gets passed to the server
        $("textarea", this.titles).val("").focus();
        $("textarea", this.descriptions).val("").focus();
        // refocus back to the top
        this.textarea.focus();
      }.bind(this));
    },
    // Applying & Parsing
    setTitlesDescriptions: function() {
      var pages = this.getPageNames();
      this.error = false;
      pages.each(function(i, e) {
        this.applyTitlesDescriptions(e);
      }.bind(this));
      if (this.error) {
        alert("Check the console for a list of page(s) that did not match");
      }
      // refocus back to the top
      //this.textarea.focus();
    },
    applyTitlesDescriptions: function(pageName) {
      var el = this.getElByPageName(pageName);
      var page = this.getPage(pageName);
      
      if (el.length == 0 || !page) {
        if (this.translation.hasOwnProperty(pageName))
        {
          var translatedPageName = this.translation[pageName];
          el = this.getElByPageName(pageName);
          page = this.getPage(translatedPageName);
          
              //Enable the Update SEO Button
              var inputs = document.getElementsByClassName('btn-save');
      for(var i = 0; i < inputs.length; i++) {
          inputs[i].disabled = false;
      }
          
          if (el.length == 0 || !page) {
            console.log("Missing Page: ", pageName, " Via Translation: ", translatedPageName);
            this.error = true;
          }
        }
        else {
          console.log("Missing Page: ", pageName);
          this.error = true;
        }
        
      }
      
      if (el.length != 0 && page) {
        var title = $("textarea:eq(0)", el.parent());
        var description = $("textarea:eq(1)", el.parent());

        // focus text area to trigger an ember update, otherwise nothing gets passed to the server
        //console.log("EL",textarea)
        title.focus();
        // if empty just the path, otherwise a newline and the path
        title.val(page.title);
        
        description.focus();
        description.val(page.description);
      }
    },
    parseSEO: function() {
      this.pages = this.textarea.map(function(i, e) {
        // split on new lines
        return $(e).val().split(/\n/).map(function(e, i) {
          // split on tabs
          var redirect = e.split(/\t/);
          // return new Redirect object
          return new SEOPage(redirect[0], redirect[1], redirect[2], redirect[3], redirect[4]);
        })
      });
      return this.pages;
    },
    getPage: function(name) {
      this.parseSEO();
      var page = this.pages.filter(function(i, e){
        return e.page == name;
      });
      return page.length > 0 ? page[0] : false;
    },
    // unused
    getPageNames: function() {
      return this.pageNames.map(function(i, e) {
        return $(e).text().trim();
      });
    },
    getElByPageName: function(pageName) {
      return this.pageNames.filter(function(i, e) {
        return $(e).text().trim().toLowerCase() == pageName.trim().toLowerCase();
      });
    }
  }
  var SEOPage = function(page, title, description) {
    this.page = page.trim();
    this.title = title.trim();
    this.description = description.trim();
  };
  AutoSEO.init();