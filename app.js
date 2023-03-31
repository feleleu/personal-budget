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

    getAllRecords() {
        let expenses = [];
        const id = localStorage.getItem('id');

        for(let i = 1; i <= id; i++) {
            let expense = JSON.parse(localStorage.getItem(i));

            if(expense === null) continue;

            expense.id = i;
            expenses.push(expense);
        }
        return expenses;
    }

    search(expense) {
        let expensesFilter = [];
        expensesFilter = this.getAllRecords();
        
        if(expense.year != '') expensesFilter = expensesFilter.filter(d => d.year == expense.year);
        if(expense.month != '') expensesFilter = expensesFilter.filter(d => d.month == expense.month);
        if(expense.day != '') expensesFilter = expensesFilter.filter(d => d.day == expense.day);
        if(expense.type != '') expensesFilter = expensesFilter.filter(d => d.type == expense.type);
        if(expense.description != '') expensesFilter = expensesFilter.filter(d => d.description == expense.description);
        if(expense.value != '') expensesFilter = expensesFilter.filter(d => d.value == expense.value);

        return expensesFilter;
    }

    delete(id) {
        localStorage.removeItem(id);
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

        year.value = ''
        month.value = ''
        day.value = ''
        type.value = ''
        description.value = ''
        value.value = ''

    } else {
        titleModel.innerHTML = 'Error na gravação';
        modalBody.innerHTML = 'Existem campos obrigatórios que não foram preechidos';
        modalHeader.className = 'modal-header text-danger';
        buttonModal.className = 'btn btn-danger';
        buttonModal.innerHTML = 'Voltar e corrigir';
        
        meuModal.show();
    }
}

function loadsExpenseList(expenses = Array(), filter = false) {

    if(expenses.length == 0 && filter == false) expenses = bd.getAllRecords();
    
    let expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    expenses.forEach(function(d) {
        let line = expenseList.insertRow();
        
        switch (parseInt(d.type)) {
            case 1:
                d.type = 'Alimentação';
                break;
            case 2:
                d.type = 'Educação';
                break;
            case 3:
                d.type = 'Lazer';
                break;
            case 4:
                d.type = 'Saúde';
                break;
            case 5:
                d.type = 'Transporte';
                break;
        }

        let btn = document.createElement("button");
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-trash"></i>';
        btn.id = `id_expense_${d.id}`;
        btn.onclick = function() {
            let id = this.id.replace('id_expense_', '');
            bd.delete(id);
            window.location.reload();
        }

        line.insertCell(0).innerHTML = `${d.day}/${d.month}/${d.year}`;
        line.insertCell(1).innerHTML = d.type;
        line.insertCell(2).innerHTML = d.description;
        line.insertCell(3).innerHTML = d.value;
        line.insertCell(4).append(btn);
    });
    
}

function searchExpenses() {
    let year = document.getElementById('year').value;
    let month = document.getElementById('month').value;
    let day = document.getElementById('day').value;
    let type = document.getElementById('type').value;
    let description = document.getElementById('description').value;
    let value = document.getElementById('value').value;

    let expense = new Expense(year, month, day, type, description, value);

    let expenses = bd.search(expense);
    
    loadsExpenseList(expenses, true);
}

function yearsList() {
    const date = new Date();
    const currentYear = date.getFullYear();

    let selectYear = document.getElementById('year');

    for(let i = 3; i > 0; i--) {
        const dto = currentYear - i;
        createElementOption('year', dto, dto);
    }

    for(let i = 0; i < 3; i++) {
        const dto = currentYear + i;
        createElementOption('year', dto, dto);
    }
}

function createElementOption(idElement, text, value) {
    let element = document.getElementById(idElement);
    let option = document.createElement("option");
    option.text = text;
    option.value = value;
    element.appendChild(option);
}
