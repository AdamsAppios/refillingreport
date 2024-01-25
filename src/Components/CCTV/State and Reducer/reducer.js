import {actionTypes} from './actionTypes';

export const reducer = (state, action) => {
    switch (action.type) {
        case actionTypes.ADJUST_COUNT:
            switch (action.option) {
                case 'dealer':
                    return { ...state, multipleCount: "1" , dealer: state.dealer + action.adjustment };
                case 'pickup':
                    return { ...state, multipleCount: "1", pickup: state.pickup + action.adjustment };
                case 'small':
                    return { ...state, multipleCount: "1", small: state.small + action.adjustment };
                case 'square':
                    return { ...state, multipleCount: "1", square: state.square + action.adjustment };
                case 'smallSquare':
                    return { ...state, multipleCount: "1",squareSmall: state.squareSmall + action.adjustment };
                default:
                    return state;
            }
        case actionTypes.SET_SELECTED_OPTION:
            return { ...state, selectedOption: action.value };
        case actionTypes.SET_VALUE:
            return { ...state, [action.field]: action.value };
        case actionTypes.INCREMENT_VALUE:
            return { ...state, [action.field]: state[action.field] + action.value * state.multipleCount };
        case actionTypes.DECREMENT_VALUE:
            return { ...state, [action.field]: state[action.field] - action.value * state.multipleCount };
        case actionTypes.TOGGLE_COLOR:
            return {
                ...state,
                isBlue: action.color === 'blue' ? !state.isBlue : false,
                isRed: action.color === 'red' ? !state.isRed : false
            };
        case actionTypes.RESET_COLOR:
            return { ...state, isBlue: false, isRed: false };
        case actionTypes.SAVE_DATA:
            const dataString = `
                Date=${state.date_monitored};
                Time=${state.cctvTime};
                Dropdown=${state.selectedDropdownValue};
                Dealer=${state.dealer};
                Pickup=${state.pickup};
                Small=${state.small};
                Square=${state.square};
                SmallSquare=${state.squareSmall};
            `;
            return { ...state, textAreaValue: dataString };

        case actionTypes.LOAD_DATA:
            const values = action.value.split(";").reduce((acc, item) => {
                const [key, value] = item.split("=").map(str => str.trim());
                if (key && value) acc[key] = value;
                return acc;
            }, {});

            return {
                ...state,
                date_monitored: values.Date || state.date,
                cctvTime: values.Time || state.time,
                selectedDropdownValue: values.Dropdown || state.selectedDropdownValue,
                dealer: Number(values.Dealer) || state.dealerCount,
                pickup: Number(values.Pickup) || state.pickupCount,
                small: Number(values.Small) || state.smallCount,
                square: Number(values.Square) || state.squareCount,
                squareSmall: Number(values.SmallSquare) || state.smallSquareCount
            };
        case actionTypes.LOAD_DATA_FROM_DJANGO_SERVER:
            return { ...state, ...action.dataToLoad};
        case actionTypes.SET_INPUT_VALUE:
            return { ...state, [action.inputName]: action.inputValue };

        default:
            return state;
    }
};

