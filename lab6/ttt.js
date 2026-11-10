class joc {
    pturn = true
    crtturn = true
    turnnum = 0

    board = []
    length = 9
    
    constructor(pturn) {
        for (var i = 0;i < 9; i++) {
            this.board[i] = '?'
        }

        this.pturn = pturn
    }

    printtt() {
        for (var i = 0; i < 3; i++) {
            let print_string = "| "
            for (var j = 0; j < 3; j++) {
                let idx = i * 3 + j;
                let x = '';
                if (this.board[idx] == '?')
                    x = i * 3 + j + 1;
                else
                    x = this.board[idx]
    
                print_string += x + " | "
            }
    
            console.log(print_string)
        }
    }
    
    change(idx, turn) {
        let x = ''
        if (turn == true)
            x = 'X'
        else 
            x = 'O'
        this.board[idx] = x
    }
    
    valid(idx) {
        if (idx < 0 || idx >= 9) return false
        if (this.board[idx] != '?') return false
    
        return true
    }
    
    win() {
        if (this.board[0] == this.board[4] && this.board[4] == this.board[8] && this.board[0] != '?') return this.board[0]
        if (this.board[2] == this.board[4] && this.board[4] == this.board[6] && this.board[2] != '?') return this.board[2]
    
        for (let i = 0; i < 3; i++) {
            if (this.board[i] == this.board[i + 3] && this.board[i + 3] == this.board[i + 6] && this.board[i] != '?') return this.board[i]
        }
    
        for (let i = 0; i < 3; i++) {
            if (this.board[i * 3] == this.board[i * 3 + 1] && this.board[i * 3 + 1] == this.board[i * 3 + 2] && this.board[i * 3] != '?') return this.board[i * 3]
        }
    
        return null
    }
    
    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      
    
    computer_move() {
        let idx = this.getRandomInt(0, 8)
        while (this.valid(idx) == false) {
            idx = this.getRandomInt(0, 8)
        }
    
        return idx
    }
    
    loop() {
        let idx = null
        if (this.crtturn === this.pturn) {
            idx = prompt("Unde vrei să pui următorul semn?")
            idx--
        } else {
            idx = this.computer_move()
        }
        if (this.valid(idx) == true) {
            this.turnnum++
            this.change(idx, this.crtturn)
            this.printtt()
            this.crtturn = !this.crtturn
        } else {
            alert("Pozitie invalida")
        }
    
        if (this.win() != null) {
            this.crtturn = !this.crtturn
            if (this.crtturn == this.pturn)
                alert(`Bravo, ${this.pname}, ai câștigat!`)
            else {
                alert(`Ai pierdut :(`)
            }
            return true;
        }
    
        if (this.turnnum == 9) {
            alert(`Remiză!`)
            return true;
        }

        return false
    }
}

let pname = prompt("Hai să jucăm X și 0. Cum te cheamă?")
let start = null

start = prompt(`Bună, ${pname}. Cu ce vrei să joci? X sau 0? X începe primul.`)

let pturn = true

if (start == '0')
    pturn = false

let game1 = new joc(pturn)
let game2 = new joc(pturn)

let game1_ended = false
let game2_ended = false

while (true) {
    if (!game1_ended) {
        console.log('GAME 1')
        game1_ended = game1.loop()
        console.log('--------------------')
    }
    if (!game2_ended) {
        console.log('GAME 2')
        game2_ended = game2.loop()
        console.log('--------------------')
    }
    
    if (!!game1_ended || !game2_ended) {
        console.log()
        console.log()
        console.log()
    }
}