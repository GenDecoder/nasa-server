/**
 * Created by Mario on 25/11/2016.
 */
var speedBump = angular.module('speedBump', []);

speedBump.factory('speedBump', function($window, $document, $compile, $timeout, $templateRequest, $rootScope) {
    var draggable = function() {
        return {
            move : function(box, x, y){
                box.style.left = x + 'px';
                box.style.top = y + 'px';
            },
            startMoving : function(box, e) {
                e = e || window.event;
                var posX = e.clientX;
                var posY = e.clientY;
                var eWi = box.offsetWidth;
                var eHe = box.offsetHeight;
                var cWi = window.innerWidth;
                var cHe = window.innerHeight;
                var diffY = posY - box.style.top.replace('px','');
                var diffX = posX - box.style.left.replace('px','');

                document.onmousemove = function(e) {
                    e = e || window.event;
                    var posX = e.clientX;
                    var posY = e.clientY;
                    var aX = posX - diffX;
                    var aY = posY - diffY;
                    if (aX < 0) aX = 0;
                    if (aY < 0) aY = 0;
                    if (aX + eWi > cWi) aX = cWi - eWi;
                    if (aY + eHe > cHe) aY = cHe - eHe;
                    draggable.move(box, aX, aY);
                }
            },
            stopMoving : function(){
                document.onmousemove = function() {}
            }
        }
    }();

    return function(config) {
        if (document.querySelector('.e-m-box'))
            return false;
        var scope;
        var body;
        var header;
        var footer;
        var initialTop;
        var initialLeft;
        var doc = $document.find('body');
        var win = angular.element($window);
        var overFlow = doc.css('overflow');
        var box = angular.element('<div class = "e-m-box"/></div>');
        var backDrop = angular.element('<div class = "e-m-back-drop"></div>');

        var onResize = function () {
            enhance(true);
        };
        var enhance = function (isResize) {
            var boxWidth = box.prop('offsetWidth');
            var boxHeight = box.prop('offsetHeight');
            box.css({
                left: (initialLeft || ($window.innerWidth/2 - boxWidth/2)) + 'px' ,
                top: (initialTop || ($window.innerHeight/2 - boxHeight/2)) + 'px'
            });
            !isResize && $compile(box)(scope);
        };
        var setModal = function (html) {
            box
                .css(config.style)
                .addClass(config.cls)
                .append(angular.element(html));
            enhance();
        };
        var setHeader = function (html) {
            header
                .append(html)
                .css(config.header.style || {})
                .addClass(config.header.cls);
            enhance();
        };
        var setBody = function (html) {
            body
                .append(html)
                .css(config.body.style || {})
                .addClass(config.body.cls);
            config.afterBodyrender();
            enhance();
        };
        var setFooter = function (html) {
            footer
                .append(html)
                .css(config.footer.style)
                .addClass(config.footer.cls);
            enhance();
        };
        var setUpHeader = function () {
            if (config.header) {
                header = angular.element('<div class = "e-m-header"></div>');
                if (config.header.templateUrl) $templateRequest(config.header.templateUrl).then(setHeader);
                else if (config.header.template) setHeader(config.header.template);
                else if (config.header.title || config.header.trigger) setHeader(
                    '<div class = "e-m-title">' + config.header.title + '</div>' +
                    (config.header.trigger ? '<div class = "e-m-trigger" ng-click = "closeModal();">' + config.header.trigger + '</div>' : '')
                );
                else header = null;
                box.append(header);
            }
        };
        var setUpBody = function () {
            if (config.body) {
                body = angular.element('<div class = "e-m-body"></div>');
                if (config.body.templateUrl) $templateRequest(config.body.templateUrl).then(setBody);
                else if (config.body.template) setBody(config.body.template);
                else if (config.body.icon || config.body.content) setBody(
                    (config.body.icon ? '<div class = "e-m-icon">' + config.body.icon + '</div>' : '') +
                    '<div class = "e-m-content"><div class = "e-m-content-cell">' + config.body.content + '</div></div>'
                );
                else body = null;
                box.append(body);
            }
        };
        var setUpFooter = function () {
            if (config.footer) {
                footer = angular.element('<div class = "e-m-footer"></div>');
                if (config.footer.templateUrl) $templateRequest(config.footer.templateUrl).then(setFooter);
                else if (config.footer.template) setFooter(config.footer.template);
                else if (config.footer.buttons.length) {
                    var footerCell = angular.element('<div class = "e-m-footer-cell"></div>');
                    angular.forEach(config.footer.buttons, function (obj) {
                        footerCell.append(
                            angular.element('<div class = "e-m-button">' + obj.html + '</div>').on('click', function () {
                                (obj.click || function () {})({
                                    close: scope.closeModal
                                });
                            })
                        );
                    });
                    setFooter(footerCell);
                }
                else footer = null;
                box.append(footer);
            }
        };
        var setUpAll = function () {
            /** BOX */
            if (config.templateUrl)
                $templateRequest(config.templateUrl).then(setModal);
            else if (config.template)
                setModal(config.template);
            else {
                setUpHeader();
                setUpBody();
                setUpFooter();
            }
        };
        var initialize = function () {
            box
                .css(config.style)
                .addClass(config.cls)
                .on('mousedown', function (e) {
                    e.stopPropagation();
                });
            win.on('resize', onResize);
            config.draggable && box
                .on('mousedown', function (event) {
                    draggable.startMoving(this, event);
                })
                .on('mouseup', draggable.stopMoving);
            config.blockScroll && doc.css('overflow', 'hidden');
            config.closeOnBlur && win.one('mousedown', scope.closeModal);
            config.lifeTime && $timeout(scope.closeModal, config.lifeTime);
            config.backDrop ? doc.append(backDrop.append(box)) : doc.append(box);
            config.closeOnEsc && win.one('keyup',function(e) { e.keyCode === 27 && scope.closeModal(); });
            initialTop = box.prop('offsetTop');
            initialLeft = box.prop('offsetLeft');
        };
        /** Extend config object */
        config = angular.extend({
            style: {},
            backDrop: true,
            lifeTime: false,
            theme: 'default',
            draggable: false,
            blockScroll: true,
            closeOnBlur: false,
            closeOnEsc: false
        }, config || {});
        /** Scope management */
        scope = config.scope;
        if (!scope)
            scope = $rootScope.$new();
        scope.closeModal = function () {
            config.onClose();
            box.remove();
            backDrop.remove();
            win.off('resize', onResize);
            doc.css('overflow', overFlow);            
        };
        initialize();
        setUpAll();
    };
});
