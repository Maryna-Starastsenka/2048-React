const squareHelpers = {
    getSquareBackgroundColor: (value) => {
        switch (value) {
            case 2:
                return '#EBDCD0';
            case 4:
                return '#E9DBBA';
            case 8:
                return '#E9A067';
            case 16:
                return '#F08151';
            case 32:
                return '#F2654F';
            case 64:
                return '#F1462C';
            case 128:
                return '#E7C65E';
            case 256:
                return '#E8C350';
            case 512:
                return '#E8BE40';
            case 1024:
                return '#E8BB31';
            case 2048:
                return '#E7B723';
            default:
                return '#C2B3A3';
        }
    },

    getSquareColor: (value) => {
        return value > 4 ? '#f9f6f2' : '#776e65';
    },

    getSquareFontSize: (value) => {
        return value >= 1000 ? '30px' : value >= 100 ? '35px' : '45px';
    }
}