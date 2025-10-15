let mines = Object;
let setting = save.getItem("config") || {};
if (!setting.width) {
    setting.width = 12;
}
if (!setting.height) {
    setting.height = 12;
}
if (!setting.count) {
    setting.count = 20;
}
if (!setting.server) {
    setting.server = 'http://game.xeonsky.top/minesweeper/';
}
$(document).ready(function () {
    pcolor();
    $("#lighter").click(function () {
        if (save.getItem('dark')) {
            save.getItem('dark', false);
            pcolor();
        } else {
            save.getItem('dark', true);
            pcolor();
        }
    });
    mines = new minesweeper(setting.width, setting.height, setting.count);
    $("#mine-width").val(setting.width);
    $("#mine-height").val(setting.height);
    $("#mine-count").val(setting.count);
    $("#mine-server").val(setting.server);
    $("#active-index").click(function (e) {
        $("#minesweeper-index").toggleClass('active');
    });
    $("#renew-mines").click(function () {
        delete mines;
        mines = new minesweeper(setting.width, setting.height, setting.count);
        $("#minesweeper-alert").fadeOut();
    });
    $("#mine_save").click(function (e) {
        setting.width = $("#mine-width").val();
        setting.height = $("#mine-height").val();
        setting.count = $("#mine-count").val();
        setting.server = $("#mine-server").val();
        save.getItem("config", setting);
        mines = new minesweeper(setting.width, setting.height, setting.count);
        $("#minesweeper-setting").toggleClass("active");
        $("#minesweeper-alert").fadeOut();
    });
    $("#renew-set").click(function (e) {
        $("#mine-width").val(setting.width);
        $("#mine-height").val(setting.height);
        $("#mine-count").val(setting.count);
        $("#mine-server").val(setting.server);
        $("#minesweeper-setting").toggleClass("active");
    });
    $("#renew-cmines").click(function (e) {
        let x = mines.width;
        let y = mines.height;
        let c = mines.count;
        let m = mines.minesweeper.create.mines;
        delete mines;
        mines = new minesweeper(x, y, c, m);
        $("#minesweeper-alert").fadeOut();
    });
    $("#renew-duck").click(function (e) {
        let x = mines.width;
        let y = mines.height;
        let c = mines.count;
        let m = mines.minesweeper.create.mines;
        let cl = mines.minesweeper.playerclick.click;
        delete mines;
        mines = new minesweeper(x, y, c, m, cl);
        $("#minesweeper-alert").fadeOut();
    });
    $("#hide_set").click(function (e) {
        $("#minesweeper-setting").toggleClass("active");
    });
});
function pcolor() {
    if (save.getItem('dark')) {
        $("#pcolor").attr("href", "./css/light.css");
    } else {
        $("#pcolor").attr("href", "");
    }
}
// 左键事件
function try_mine(x, y) {
    mines.click_mines(x, y)
}
// 右键事件
document.oncontextmenu = function (e) {
    let path = e.srcElement.classList[1];
    let cut_arr = [];   // 输出数组
    try {
        while (path.match('_')) {   // 开始切割
            let index = path.lastIndexOf("_"); // 定位最后一个斜杠
            cut_arr[cut_arr.length] = path.substring(index + 1, path.length);   // 开始切割
            path = path.substring(0, index);    // 输出原料
        }
        if (cut_arr[2] == 'dc') {
            mines.dblclick_mines(cut_arr[0], cut_arr[1]);
        }
    } catch (e) {
        return false;
    }
    return false;
}