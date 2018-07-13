export default class Utilities {

    /**
     * Returns the input string cut to desired size
     *
     * @param {string} text
     * @param {number} size - positive integer
     *
     */

    showLess(text, size) {
        if (text.length <= size) {
            return text
        }
        let array = text.split(' ')
        let result = ''

        if (!text.includes(' ')) {
            return text.slice(0, size - 3) + '...'
        }

        if (size < 4) {
            return ".".repeat(size)
        }

        result = array[0]

        for (let i = 1 i < array.length i++) {
            if (result.length + 4 + array[i].length > size) {
                return result + '...'
            }
            result += ` ${array[i]}`
        }
    }
    /**
     * Converts kinvey time to bulgarian time eg.
     * (day/month/year hours:minutes)
     * 13/12/2016 14:34
     * @param {string} t
     */

    ConvertTime(t){
        let time = new Date((Date.parse(t)))

        return `${time.getDay()+4}/${time.getMonth()+1}/${time.getFullYear()} ` +
            `${time.getHours()}:${('0' + time.getMinutes()).slice(-2)}`
    }
}
