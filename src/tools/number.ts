export function floatToPercentString(floatValue:number,unit='%'):string{
    return Math.round(floatValue*100).toFixed(0)+unit;
}

export function formatNumber(integerNumber:number,unit=''):string{

    const reg = '\\d(?=(\\d{' + (3) + '})+$)';
    const num = integerNumber.toFixed(0);

    return num.replace(new RegExp(reg, 'g'), '$&' + ('\u00A0'))+unit;


}