'use strict';

var UserService = function($rootScope, $log) {
    $log.log('UserService');

    var list = [];

    var strings = [
        "PARKOUR!",
        "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...",
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
    ];

    var namegen = {
        generateString: function(inLength) {
            var s = '';
            for (var i = 0; i < inLength; i++) {
                s += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
            }
            return s;
        },
        generateName: function(inMin, inMax) {
            return this.generateString(Math.floor(Math.random() * (inMax - inMin + 1) + inMin));
        }
    };


    var generateCount = 50000;
    var generateData = function() {
        var names = [], data = [];
        for (var i = 0; i < generateCount; i++) {
            names.push(namegen.generateName(4, 8));
        }
        names.sort();
        for (var i = 0; i < generateCount; i++) {
            var name = names[i];
            var divider = name.charAt(0);
            if (divider === (names[i - 1] || '').charAt(0)) {
                divider = null;
            }
            data.push({
                id: i,
                name: name,
                divider: divider,
                details: strings[i % 3],
                time: '8:29pm'
            });
        }
        return data;
    };
    this.getFriends = function() {
        if (this.getCount()) {
            return list;
        }
        list = generateData();
        return list;
    };
    this.getCurrent = function() {
        return {
            id: 0,
            name: 'Brandon Walsh'
        };
    };
};

module.exports = UserService;