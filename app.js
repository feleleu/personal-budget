class Expense {
    constructor(year, month, day, type, description, value) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.type = type;
        this.description = description;
        this.value = value;
    }

    validateData() {
        for(let i in this) {
            if(this[i] === undefined || this[i] === '' || this[i] === null) {
                return false;
            }
        }
        return true;
    }
}

class Bd {

    constructor() {
        let id = localStorage.getItem('id');

        if(id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getById() {
        let nextId = localStorage.getItem('id');
        return parseInt(nextId) + 1;
    }

    record(d) {
        let id = this.getById();
        
        localStorage.setItem(id, JSON.stringify(d));
        localStorage.setItem('id', id);
    }
}

let bd = new Bd();

function registerExpense() {
    let year = document.getElementById('year');
    let month = document.getElementById('month');
    let day = document.getElementById('day');
    let type = document.getElementById('type');
    let description = document.getElementById('description');
    let value = document.getElementById('value');

    let expense = new Expense(
        year.value,
        month.value,
        day.value,
        type.value,
        description.value,
        value.value
    );

    let meuModal = new bootstrap.Modal(document.getElementById('alertModal'));
    let titleModel =  document.getElementById('alertModalLabel');
    let modalHeader =  document.getElementById('modalHeader');
    let modalBody =  document.getElementById('modalBody');
    let buttonModal =  document.getElementById('buttonModal');

    if(expense.validateData()) {
        bd.record(expense);

        titleModel.innerHTML = 'Registro inserido com sucesso';
        modalBody.innerHTML = 'Despesa foi cadastrada com sucesso!';
        modalHeader.className = 'modal-header text-success';
        buttonModal.className = 'btn btn-success';
        buttonModal.innerHTML = 'Voltar';

        meuModal.show();
    } else {
        titleModel.innerHTML = 'Error na gravação';
        modalBody.innerHTML = 'Existem campos obrigatórios que não foram preechidos';
        modalHeader.className = 'modal-header text-danger';
        buttonModal.className = 'btn btn-danger';
        buttonModal.innerHTML = 'Voltar e corrigir';
        
        meuModal.show();
    }
}
