class Save_Service {
    wait;
    store = {};

    constructor() { }

    async load() {
        this.store = "";
        this.store = localStorage.getItem("com.xeonsky.minesweeper");
        try {
            if (typeof this.store == "string") {
                this.store = JSON.parse(this.store);
            } else {
                this.store = {};
                this.save();
            }
        } catch (error) {
            this.store = {};
            this.save();
        }
        return true
    }

    save() {
        localStorage.setItem("com.xeonsky.minesweeper", JSON.stringify(this.store));
    }

    setItem(key, value) {
        this.store[key] = value;
        this.save();
    }

    getItem(key) {
        return this.store[key] ? this.store[key] : null;
    }
}
const save = new Save_Service();