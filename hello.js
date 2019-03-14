module.exports = function (n, author,chat) {
    if (n == 7 || n == 8) {
        if (author == "<@271890700029788160>") {
            chat = "Morning! I made you some_br_rice balls. (Hope you enjoy them)";
        } else {
            chat = "Morning.. There's some nori+on+the_br_table if you're hungry";
        }
    }
    if (n > 8 && n < 11) {
        chat = "Sup";
    }
    if (n == 11 || n == 12) {
        chat = "You should probably eat lunch if_br_you haven't already";
    }
    if (n == 18 || n == 19) {
        chat = "Yawn.. That was a good nap_br_Oh its night already. You should probably eat dinner";
    }
    if (n == 20) {
        chat = "I'm getting a bit sleepy..";
    }
    if (chat == "") {
        chat = "zzz";
    }
    return chat;
}