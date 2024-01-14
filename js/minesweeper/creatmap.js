class minesweeper_create {
    constructor(x, y, count) {
        this.width = x;
        this.height = y;
        this.count = count;
        this.mines = [];
        this.lay_mines();
    }
    lay_mines() {
        if (this.width * this.height - 2 < this.count) {
            this.count = this.width * this.height - 2;
        }
        for (let mine_index = 0; mine_index < this.count; mine_index++) {
            let m_x = 0, m_y = 0;
            m_x = this.rand(0, this.width);
            m_y = this.rand(0, this.height);
            this.mines[mine_index] = this.renew_mines(m_x, m_y);
            this.index_mines = this.index_mines + 1;
        }
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
    renew_mines(x, y) {
        if (this.has_mines(x, y)) {
            for (let y_index = x; y_index < this.height; y_index++) {
                for (let x_index = y; x_index < this.width; x_index++) {
                    if (!this.has_mines(x_index, y_index)) {
                        return [x_index, y_index];
                    }
                }
            }
            for (let y_index = 0; y_index < this.height; y_index++) {
                for (let x_index = 0; x_index < this.width; x_index++) {
                    if (!this.has_mines(x_index, y_index)) {
                        return [x_index, y_index];
                    }
                }
            }
        } else {
            return [x, y];
        }
    }
    rand(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
}