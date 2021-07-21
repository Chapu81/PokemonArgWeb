import Vue from 'vue';

Vue.filter('currency_format', num => {
    if (parseFloat(num)) {
        num +='';
        let splitStr = num.split('.');
        let splitLeft = splitStr[0];
        if (splitStr[1]) {
            var decim = splitStr[1].split('');

        if (decim.length > 2) {
                let cant = (decim.length - 2);

        for (let i = 0; i < cant; i++)
                    decim.pop();
        }

        else if (decim.length == 1)
                decim.push('0');
    }

        let splitRight = splitStr.length > 1 ? ',' + decim.join('') : ',00';
        let regx       = /(\d+)(\d{3})/;

        while (regx.test(splitLeft))
            splitLeft = splitLeft.replace(regx, '$1' + '.' + '$2');

        return splitLeft + splitRight;
    }

    else return '0'
});