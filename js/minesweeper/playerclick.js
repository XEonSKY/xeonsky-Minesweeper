class minesweeper_playerclick {
    constructor(x, y, mines, click) {
        this.width = x;
        this.height = y;
        this.mines = mines;
        this.click = click;
        this.flag = click;
        this.index_mines = 0;
        this.index_click = 0;
        this.index_dblclick = 0;
        this.index_coin = 0;
        this.win = false;
        if (!save.getItem('maxcoin')) {
            save.setItem('maxcoin', 0)
        }
        this.index_mcoin = save.getItem('maxcoin');
        this.first = true;
    }
    has_mines(x, y) {
        for (let index = 0; index < this.mines.length; index++) {
            const element = this.mines[index];
            if (element[0] == x && element[1] == y) {
                return true;
            }
        }
        return false;
    }
    move_miner(x, y) {
        let line = 0;
        for (let index = 0; index < this.mines.length; index++) {
            const element = this.mines[index];
            if (element[0] == x && element[1] == y) {
                line = index;
            }
        }
        let t_x = 0, t_y = 0;
        for (let y_index = 0; y_index < this.height; y_index++) {
            for (let x_index = 0; x_index < this.width; x_index++) {
                if (!this.has_mines(x_index, y_index)) {
                    if (x_index != x && y_index != y) {
                        t_x = x_index, t_y = y_index;
                    }
                }
            }
        }
        this.mines[line] = [t_x, t_y];
    }
    dblclick_mines(x, y) {
        if (this.flag[y][x]) {
            this.flag[y][x] = false;
            this.index_dblclick--;
            $('.rower_dc_' + y + '_' + x).removeClass('mine_flag_icon');
            $("#minesweeper-index #index-flag").text(this.index_dblclick);
            return false;
        } else {
            this.flag[y][x] = true;
            this.index_dblclick++;
            $('.rower_dc_' + y + '_' + x).addClass('mine_flag_icon');
            $("#minesweeper-index #index-flag").text(this.index_dblclick);
        }
    }
    click_mines(x, y, loop = '') {
        if (this.first) {
            if (this.has_mines(x, y)) {
                this.move_miner(x, y);
            }
            this.first = false;
        }
        setTimeout(() => {
            if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
                if (!this.click[y][x]) {
                    this.click[y][x] = true;
                    $("#minesweeper-renderer .row_" + y + ' .tile_' + x + ' .mine_blank').fadeOut(100);
                    setTimeout(() => {
                        $("#minesweeper-renderer .row_" + y + ' .tile_' + x).append('<div class="mine_mine"></div>');
                        if (this.is_mines(x, y)) {
                            let otp = ''
                            otp = '雷';
                            this.index_click--;
                            $("#minesweeper-renderer .row_" + y + ' .tile_' + x + ' .mine_mine').text(otp);
                            this.boom_mines();
                            if (loop != 'boom') {
                                $("#minesweeper-alert").fadeIn();
                                $("#emo-title").text("你失败了");
                            }
                        } else {
                            let otp;
                            otp = this.around_mines(x, y);
                            this.index_coin = this.index_coin + otp + 1;
                            if (otp == 0) {
                                otp = '';
                                for (let y_index = -1; y_index < 2; y_index++) {
                                    for (let x_index = -1; x_index < 2; x_index++) {
                                        if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
                                            this.click_mines(x + x_index, y + y_index);
                                        }
                                    }
                                }
                            }
                            $("#minesweeper-renderer .row_" + y + ' .tile_' + x + ' .mine_mine').text(otp);
                        }
                        this.index_click++;
                        $("#minesweeper-index #index-click").text(this.index_click);
                        $("#minesweeper-index #index-coin").text(this.index_coin);
                        $("#emo-coin").text(this.index_coin);
                        if (save.getItem('maxcoin') < this.index_coin) {
                            save.setItem('maxcoin', this.index_coin)
                        }
                        if (this.width * this.height - this.index_click == this.mines.length) {
                            this.win = true;
                        }
                    }, 100);
                }
            }
        }, 0);
    }
    boom_mines() {
        for (let index = 0; index < this.mines.length; index++) {
            const element = this.mines[index];
            this.click_mines(element[0], element[1], 'boom');
        }
    }
    around_mines(x, y) {
        let mines = 0;
        for (let y_index = -1; y_index < 2; y_index++) {
            for (let x_index = -1; x_index < 2; x_index++) {
                if (x >= 0 && y >= 0 && x < this.width && y < this.height) {
                    if (this.is_mines(x + x_index, y + y_index)) {
                        mines++;
                    }
                }
            }
        }
        return mines;
    }
    is_mines(x, y) {
        for (let index = 0; index < this.mines.length; index++) {
            const element = this.mines[index];
            if (element[0] == x && element[1] == y) {
                return true;
            }
        }
        return false;
    }
}