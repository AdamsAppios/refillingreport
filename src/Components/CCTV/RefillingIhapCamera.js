import {initialState } from './State and Reducer/state';
import {actionTypes} from './State and Reducer/actionTypes';
import {reducer} from './State and Reducer/reducer';
import InputGroup from './components/InputGroup';
import RadioButtonGroup from './components/RadioButtonGroup';
import ButtonGroup from './components/ButtonGroup';
import DropdownSelectorGroup from './components/DropdownSelectorGroup';
import { toggleBackgroundColor } from './Utilities/utils';
import { useReducer, useEffect, useState } from 'react';
import axios from 'axios';


const RefillingIhapCamera = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    //const [urlSaveLocation, setUrlSaveLocation] = useState('/api/talambansave/');
    //const [urlLoadLocation, setUrlLoadLocation] = useState("/api/talambanload/");
    const [urlLocations, setUrlLocations] = useState({
        saveLocation: '/api/talambansave/',
        loadLocation: '/api/talambanload/'
      });
      
    const radioOptions = [
        { value: 'dealer', label: 'Dealer' },
        { value: 'pickup', label: 'Pickup' },
        { value: 'small', label: 'Small' },
        { value: 'square', label: 'Square' },
        { value: 'smallSquare', label: 'Small Square' },
    ];

    const shiftRadioButton = (direction) => {
        const currentIndex = radioOptions.findIndex(option => option.value === state.selectedOption);
        let nextIndex = currentIndex + direction;
    
        // Ensure that the next index wraps around and doesn't go out of bounds
        if (nextIndex < 0) nextIndex = radioOptions.length - 1;
        if (nextIndex >= radioOptions.length) nextIndex = 0;
    
        const nextValue = radioOptions[nextIndex].value;
    
        dispatch({
            type: actionTypes.SET_SELECTED_OPTION,
            value: nextValue
        });
    };

    useEffect(() => {

        const handleKeyDown = (event) => {
            switch(event.key) {
                case 'Enter':
                    if (event.target.tagName !== 'INPUT') {
                        handleAdd();
                        event.preventDefault();
                    }
                    break;
                case '-':
                    handleSub();
                    event.preventDefault();
                    break;
                case 'ArrowLeft':
                    shiftRadioButton(-1);  // Shift to the previous radio button
                    event.preventDefault();
                    break;
                case 'ArrowRight':
                    shiftRadioButton(1);  // Shift to the next radio button
                    event.preventDefault();
                    break;
                default:
                    break;
            }
        };

        
        // Attaching the event listener
        document.addEventListener('keydown', handleKeyDown);

        // Cleanup: removing the event listener when the component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [state.multipleCount,state.isBlue, state.isRed, state.pickup, state.dealer, state.small, state.squareSmall, state.square, state.selectedOption]); 

    useEffect (()=> {
        console.log(`drop down is ${state.selectedDropdownValue}`);
        if (state.selectedDropdownValue == "Bellaswan") {
          //setUrlSaveLocation(`/api/talambansave/`);
          //setUrlLoadLocation("/api/talambanload/");
          setUrlLocations({
            saveLocation: `/api/talambansave/`,
            loadLocation: "/api/talambanload/"
            });
        } else if (state.selectedDropdownValue == "ARSO") {
          //setUrlSaveLocation(`/api/labangonsave/`);
          //setUrlLoadLocation("/api/labangonload/");
          setUrlLocations({
            saveLocation: `/api/labangonsave/`,
            loadLocation: "/api/labangonload/"
            });
        } else if (state.selectedDropdownValue == "Kalimpio") {
          //setUrlSaveLocation(`/api/kalimpiosave/`);
          //setUrlLoadLocation("/api/kalimpioload/");
          setUrlLocations({
            saveLocation: `/api/kalimpiosave/`,
            loadLocation: "/api/kalimpioload/"
            });
        }
   
      }, [state.selectedDropdownValue]);
    
    const handleChange = (event) => {
        dispatch({
            type: actionTypes.SET_SELECTED_OPTION,
            value: event.target.value
        });
    };
    
    const handleAdd = () => {
        toggleBackgroundColor('blue', dispatch, state);
        dispatch({
            type: actionTypes.ADJUST_COUNT,
            option: state.selectedOption,
            adjustment: 1 * state.multipleCount,
            messagePrefix: "Plus"
        });
        dispatch({ type: actionTypes.RESET_MULTIPLE_COUNT });
    };
    
    const handleSub = () => {
        toggleBackgroundColor('red', dispatch, state);
        dispatch({
            type: actionTypes.ADJUST_COUNT,
            option: state.selectedOption,
            adjustment: -1 * state.multipleCount,
            messagePrefix: "Minus"
        });
        dispatch({ type: actionTypes.RESET_MULTIPLE_COUNT });
    };

    const handleSave = () => {
        dispatch({
            type: actionTypes.SAVE_DATA
        });
    };
    
    const handleLoad = () => {
        dispatch({
            type: actionTypes.LOAD_DATA,
            value: state.textAreaValue
        });
    };

    const handleLoadDjango = async () => {
        try {
          const response = await axios.get(`${urlLocations.loadLocation}${state.date_monitored}/`);
          let dataToLoad = response.data;
          dispatch({ type: actionTypes.LOAD_DATA_FROM_DJANGO_SERVER, dataToLoad: dataToLoad });
          console.log(dataToLoad)
          return response.data;
        } catch (error) {
          console.error(error);
        }
      }
    
      const handleSaveDjango = async (event) => {
        console.log(urlLocations.saveLocation);
        event.preventDefault();
        const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
        axios.defaults.baseURL = 'http://127.0.0.1:8008/';
        axios.defaults.headers.common['X-CSRFToken'] = csrftoken;
        const baseURL = 'http://127.0.0.1:8008/';
        try {
          const response = await axios.post(`${baseURL}${urlLocations.saveLocation}${state.date_monitored}/`, state);
          console.log(response.data);
        } catch (error) {
          console.log(error);
        }
      };
    
    const setInputValue = (inputName, inputValue) => {
        dispatch({
            type: actionTypes.SET_INPUT_VALUE,
            inputName,
            inputValue
        });
    };

    const bodyStyle = {
        backgroundColor: state.isBlue ? 'blue' : (state.isRed ? 'red' : state.originalBackgroundColor),
        minHeight: '100vh', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
    };


    return (
        <div style={bodyStyle}>
            <InputGroup type="date" label="Date:" value={state.date_monitored} onChange={(e) => setInputValue('date_monitored', e.target.value)} />
            <InputGroup type="time" label="Time:" value={state.cctvTime} onChange={(e) => setInputValue('cctvTime', e.target.value)} />
            <DropdownSelectorGroup
                label="Dropdown"
                value={state.selectedDropdownValue}
                onChange={(e) => setInputValue('selectedDropdownValue', e.target.value)}
            />
            <InputGroup
                label="Multiple"
                value={state.multipleCount}
                onChange={(e) => setInputValue('multipleCount', Number(e.target.value))}
            />

            <InputGroup
                label="Dealer"
                value={state.dealer}
                onChange={(e) => setInputValue('dealer', Number(e.target.value))}
            />

            <InputGroup
                label="Pickup"
                value={state.pickup}
                onChange={(e) => setInputValue('pickup', Number(e.target.value))}
            />

            <InputGroup
                label="Small"
                value={state.small}
                onChange={(e) => setInputValue('small', Number(e.target.value))}
            />

            <InputGroup
                label="Square"
                value={state.square}
                onChange={(e) => setInputValue('square', Number(e.target.value))}
            />

            <InputGroup
                label="Small Square"
                value={state.squareSmall}
                onChange={(e) => setInputValue('squareSmall', Number(e.target.value))}
            />

            <RadioButtonGroup 
                options={radioOptions}
                selectedValue={state.selectedOption}
                onChange={handleChange}
            />
            <ButtonGroup buttons={ [{ label: 'Add', onClick: handleAdd },
                                    { label: 'Subtract', onClick: handleSub },]} />
            <div style={{margin: '10px 0',}}>
                <textarea 
                    value={state.textAreaValue} 
                    onChange={(e) => setInputValue('textAreaValue', e.target.value)}
                    rows="8"
                    cols="50"
                ></textarea>
            </div>
            <ButtonGroup buttons={ [{ label: 'Save', onClick: handleSave },
                                    { label: 'Load', onClick: handleLoad },]} />
        </div>
    );

};

export default RefillingIhapCamera;