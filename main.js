(function() {

    // Menu class
    function Menu(element)
    {
        this.menuElement = element;
        this.subMenu = null;
        this.selectedItem = null;

        var self = this;
        this.menuElement.addEventListener("click", function(event) {self.onMenuClick(event)}, true);
        window.addEventListener("click", function(event) {self.hideMenu(event)}, true);
    }
    Menu.prototype.getElement = function getElement()
    {
        return this.menuElement;
    };
    Menu.prototype.hideMenu = function hideMenu(event)
    {   if(!(event.target.id === "searchInput"))
        {
            this.unSelectMenuItem();
            this.hideSubMenu();
        }
    }
    Menu.prototype.showSubMenu = function showSubMenu(id)
    {
        if(this.subMenu) {
            this.hideSubMenu();
        }
        
        var header = document.getElementById("header");
        header.classList.add('menuSelected');
        var subMenu = document.getElementById(id);
        this.subMenu = subMenu;
        subMenu.style.display = "flex";
    };
    Menu.prototype.hideSubMenu = function hideSubMenu(event)
    {
        var header = document.getElementById("header");
        header.classList.remove('menuSelected');
        if(this.subMenu) {
            this.subMenu.style.display = "none";
        }
    };
    Menu.prototype.selectMenuItem = function selectMenuItem(clickedElement)
    {
        this.unSelectMenuItem();
        this.selectedItem = clickedElement;
        clickedElement.classList.add('selected');
    };
    Menu.prototype.unSelectMenuItem = function unSelectMenuItem()
    {
        if(this.selectedItem)
        {
            this.selectedItem.classList.remove('selected');
        }
    };
    Menu.prototype.onMenuClick = function onMenuClick(event)
    {
        event.preventDefault();
        var clickedElement = event.target;

        if(clickedElement.tagName === "A") {
                var id = clickedElement.id.replace("item", "");
                this.selectMenuItem(clickedElement);
                this.showSubMenu("submenu" + id);
        }
    }

    // App class
    function App()
    {
        this.menu = null;
    }

    App.prototype.init = function()
    {
        var menuElement = document.getElementById("mainNavigation");
        this.menu = new Menu(menuElement);
    };

    var app = new App();
    app.init();
})();