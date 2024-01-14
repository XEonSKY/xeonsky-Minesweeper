class minesweeper {
    constructor(x, y, count, maps = false, clicker = false) {
        this.width = x;
        this.height = y;
        this.count = count;
        this.click = [];
        this.clicker = clicker;
        this.output_mines();
        this.minesweeper = {};
        this.minesweeper.create = new minesweeper_create(this.width, this.height, this.count);
        if (maps) {
            this.minesweeper.create.mines = maps;
        }
        this.minesweeper.playerclick = new minesweeper_playerclick(this.width, this.height, this.minesweeper.create.mines, this.click);
        this.display_mines();
        setInterval(() => {
            try {
                if (this.minesweeper.playerclick.win) {
                    $("#minesweeper-alert").fadeIn();
                    $("#emo-title").text("你赢了");
                    this.minesweeper.playerclick.win = false
                }
            } catch (e) { }
        }, 100);
    }
    click_mines(x, y) {
        this.minesweeper.playerclick.click_mines(x, y);
        this.display_mines();
    }
    dblclick_mines(x, y) {
        this.minesweeper.playerclick.dblclick_mines(x, y);
    }
    output_mines() {
        setTimeout(() => {
            $("#minesweeper-renderer").empty();
            for (let height_index = 0; height_index < this.height; height_index++) {
                this.click[height_index] = [];
                $("#minesweeper-renderer").append('<div class="mine_row row_' + height_index + '"></div>');
                setTimeout(() => {
                    for (let width_index = 0; width_index < this.width; width_index++) {
                        $("#minesweeper-renderer .row_" + height_index).append(
                            '<div class="mine_tile tile_' + width_index + '"></div>'
                        );
                        $("#minesweeper-renderer .row_" + height_index + ' .tile_' + width_index).append(
                            '<div class="mine_blank rower_dc_' + height_index + '_' + width_index + '" onclick="try_mine(' + width_index + ',' + height_index + ')"></div>'
                        );
                        $("#minesweeper-renderer .row_" + height_index).addClass('show');
                    }
                    let clicker = this.clicker;
                    if (clicker) {
                        for (let y_index = 0; y_index < clicker.length; y_index++) {
                            for (let x_index = 0; x_index < clicker[y_index].length; x_index++) {
                                if (clicker[y_index][x_index]) {
                                    if (this.minesweeper.playerclick.is_mines(x_index, y_index)) {
                                        continue;
                                    } else {
                                        console.log(x_index, y_index);
                                        let x = x_index;
                                        let y = y_index
                                        this.minesweeper.playerclick.click_mines(x_index, y_index);
                                        this.display_mines();
                                    }
                                }
                            }
                        }
                    }
                }, 0)
            }
        }, 0)
    }
    display_mines() {
        $("#minesweeper-index #index-miner").text(this.minesweeper.create.mines.length);
        $("#minesweeper-index #index-click").text(this.minesweeper.playerclick.index_click);
        $("#minesweeper-index #index-coin").text(this.minesweeper.playerclick.index_coin);
        $("#minesweeper-index #index-mcoin").text(this.minesweeper.playerclick.index_mcoin);
        $("#emo-coin span").text(this.minesweeper.playerclick.index_coin);
    }
}