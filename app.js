
let currency = {
    parseCurB: this.parseCurB,
    beginD: 90.00,
    endD: 110.00,
    beginB: 33.50,
    endB: 35.50,
    beginRM: 2.70,
    endRM: 2.99,
    button: document.querySelector('#buttonTotal'),
    totalEl: document.querySelector('#total'),
    init() {
        this.renderDol = this.renderValues('D', 'Dollar', '#dol', this.beginD, this.endD, 0.1);
        this.renderBat = this.renderValues('B', 'Baht', '#bat', this.beginB, this.endB, 0.01);
        this.renderRubM = this.renderValues('RM', 'Rubles', '#rubM', this.beginRM, this.endRM, 0.01);
        this.buttonListener();
        this.inputListener();


    },
    inputListener() {
        const inpt = document.querySelector('#rubles')
        inpt.addEventListener('input', e => {
            e.target.value = e.target.value.replace(/\D/g, '').replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
        })
    },
    beforeInit() {
        setTimeout(() => { this.init() }, 300);
    },

    renderValues(idName, name, element, begin, end, count) {

        el = document.querySelector(element);
        let str = '';
        for (i = begin; i < end; i = i + count) {
            str += `<option value="${i.toFixed(2)}" id="c${idName}">${i.toFixed(2)}</option>`;
        }
        if (element === '#bat') {
            res = `<select name="curr${name}" id="curr${name}" >${str}</select> <span>В value+ курс: ${parseCurB}</span>`;
        } else {
            res = `<select name="curr${name}" id="curr${name}" >${str}</select>`;
        }
        el.innerHTML = res;
        this.getAverageValues(begin, end);
    },
    getAverageValues(b, e) {
        let averageValues = ((b + e) / 2).toFixed(2);
        document.querySelector(`option[value = "${averageValues}"]`).setAttribute("selected", "selected");
    },
    getCurrentValues(el, currentV) {
        // this.current = current;
        if (currentV == 'rub') {
            return this.currentV = document.querySelector(el).value.split(/\s+/).join('');

        } else {
            return this.currentV = document.querySelector(el).value;
        }


    },

    buttonListener() {
        this.button.addEventListener('click', this.showTotal.bind(this))
    },
    showTotal() {
        this.renderTotal();
    },
    renderTotal() {

        let totalRub = this.getCurrentValues('#rubles', 'rub');
        let totalRubF = new Intl.NumberFormat('ru-RU').format(totalRub);
        let totalDol = this.getCurrentValues('#currDollar', 'dol');
        let totalBatToDol = this.getCurrentValues('#currBaht', 'batToDol');
        let totalRubM = this.getCurrentValues('#currRubles', 'rubM');


        this.totalBat = Math.floor((totalRub / totalDol) * totalBatToDol);
        let totalBatF = new Intl.NumberFormat('ru-RU').format(this.totalBat);
        let totalBatM = Math.floor(totalRub / totalRubM);
        let totalBatMF = new Intl.NumberFormat('ru-RU').format(totalBatM);
        this.totalCount(totalRubF, totalDol, totalBatToDol, totalBatF, totalBatMF);
    },

    totalCount(totalRubF, totalDol, totalBatToDol, totalBat, totalBatMF) {
        let str = `
            <p>Ваши <span id="rubQ">${totalRubF}</span> рублей</p>
            <p>По курсу доллара <span id="currentDol">${totalDol}</span></p>
            <p>И курсу баты в доллар <span id="currenrBat">${totalBatToDol}</span></p>
            <p>Вы получите на Пхукете: <span id="totalBat"> ${totalBat} бат</span></p>
            <p>У менял вы получите: <span id="totalChanger">${totalBatMF} бат</span></p>`;

        this.totalEl.innerHTML = str;
        this.totalEl.classList.add('visible')

    }

}
currency.beforeInit();