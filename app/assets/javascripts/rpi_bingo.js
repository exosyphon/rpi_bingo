var __bind = function (fn, me) {
    return function () {
        return fn.apply(me, arguments);
    };
};

jQuery(function () {
    return window.chatController = new RpiBingo.Controller($('#chat').data('uri'), true);
});

window.RpiBingo = {};

RpiBingo.User = (function () {
    function User(_at_user_name) {
        this.user_name = _at_user_name;
        this.serialize = __bind(this.serialize, this);
    }

    User.prototype.serialize = function () {
        return {
            user_name: this.user_name
        };
    };

    return User;
})();

RpiBingo.Controller = (function () {
    Controller.prototype.template = function (message) {
        var html;
        html = "<div class=\"message\" >\n  <label class=\"label label-info\">\n    [" + message.received + "] " + message.user_name + "\n  </label>&nbsp;\n  " + message.msg_body + "\n</div>";
        return $(html);
    };

    Controller.prototype.userListTemplate = function (userList) {
        var user, userHtml, _i, _len;
        userHtml = "";
        for (_i = 0, _len = userList.length; _i < _len; _i++) {
            user = userList[_i];
            userHtml = userHtml + ("<li>" + user.user_name + "</li>");
        }
        return $(userHtml);
    };

    function Controller(url, useWebSockets) {
        this.createGuestUser = __bind(this.createGuestUser, this);
        this.updateUserInfo = __bind(this.updateUserInfo, this);
        this.updateUserList = __bind(this.updateUserList, this);
        this.sendMessage = __bind(this.sendMessage, this);
        this.newMessage = __bind(this.newMessage, this);
        this.bingo = __bind(this.bingo, this);
        this.bindEvents = __bind(this.bindEvents, this);
        this.messageQueue = [];
        this.dispatcher = new WebSocketRails('rpibingo.herokuapp.com/websocket', useWebSockets);
        this.dispatcher.on_open = this.createGuestUser;
        this.bindEvents();
    }

    Controller.prototype.bindEvents = function () {
        this.dispatcher.bind('new_message', this.newMessage);
        this.dispatcher.bind('user_list', this.updateUserList);
        $('input#user_name').on('keyup', this.updateUserInfo);
        $('#12').css("background", "red");
        $('#12').text("free space");

        $('#0').on('click', this.sendMessage);
        $('#1').on('click', this.sendMessage);
        $('#2').on('click', this.sendMessage);
        $('#3').on('click', this.sendMessage);
        $('#4').on('click', this.sendMessage);
        $('#5').on('click', this.sendMessage);
        $('#6').on('click', this.sendMessage);
        $('#7').on('click', this.sendMessage);
        $('#8').on('click', this.sendMessage);
        $('#9').on('click', this.sendMessage);
        $('#10').on('click', this.sendMessage);
        $('#11').on('click', this.sendMessage);
        $('#13').on('click', this.sendMessage);
        $('#14').on('click', this.sendMessage);
        $('#15').on('click', this.sendMessage);
        $('#16').on('click', this.sendMessage);
        $('#17').on('click', this.sendMessage);
        $('#18').on('click', this.sendMessage);
        $('#19').on('click', this.sendMessage);
        $('#20').on('click', this.sendMessage);
        $('#21').on('click', this.sendMessage);
        $('#22').on('click', this.sendMessage);
        $('#23').on('click', this.sendMessage);
        $('#24').on('click', this.sendMessage);

        $('#bingo').on('click', this.bingo);
    };

    Controller.prototype.newMessage = function (message) {
        this.messageQueue.push(message);
        return this.appendMessage(message);
    };

    Controller.prototype.bingo = function (event) {
        event.preventDefault();
        this.dispatcher.trigger('new_message', {
            msg_body: 'has bingo`d!!!'
        });
        location.reload();
        return;
    };

    Controller.prototype.sendMessage = function (event) {
        event.preventDefault();
        if (event.valueOf().currentTarget.style.background !== 'red') {
            event.valueOf().currentTarget.style.background = 'red';
            this.dispatcher.trigger('new_message', {
                msg_body: 'Played: ' + event.valueOf().currentTarget.outerText
            });
        }
        return;
    };

    Controller.prototype.updateUserList = function (userList) {
        return $('#user-list').html(this.userListTemplate(userList));
    };

    Controller.prototype.updateUserInfo = function (event) {
        this.user.user_name = $('input#user_name').val();
        $('#username').html(this.user.user_name);
        return this.dispatcher.trigger('change_username', this.user.serialize());
    };

    Controller.prototype.appendMessage = function (message) {
        var messageTemplate;
        messageTemplate = this.template(message);
        $('#chat').append(messageTemplate);
        messageTemplate.slideDown(140);

        if (message.msg_body.indexOf('bingo') > 0) {
            location.reload();
            return;
        }
    };

    Controller.prototype.createGuestUser = function () {
        var rand_num;
        rand_num = Math.floor(Math.random() * 1000);
        this.user = new RpiBingo.User('Guest_' + rand_num);
        $('#username').html(this.user.user_name);
        $('input#user_name').val(this.user.user_name);
        return this.dispatcher.trigger('new_user', this.user.serialize());
    };

    return Controller;
})();