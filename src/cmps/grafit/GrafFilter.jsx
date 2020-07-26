import React, { useRef, useState, useEffect } from 'react';
import grafService from '../../services/grafService';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';

const GrafFilter = (props) => {

    const elSearch = useRef(null);
    const elType = useRef(null);

    const [searching, setIsSearching] = useState(false);
    const [current, setCurrent] = useState('Default');
    const [type, setType] = useState('series');


    useEffect(() => {
        if (props.name !== current) {
            setIsSearching(false);
            setCurrent(props.name);
        }
    }, [props.name, current])

    const onSearch = (event) => {
        event.preventDefault();
        if (searching) return;
        setIsSearching(true);

        let type = event.target.type.value;
        let searchString = event.target.search.value;

        let searchObj = {
            type,
            search: searchString,
        }

        let data;
        grafService.getGrafData(searchObj)
            .then(res => data = res)
            .then(res => {

                console.log(data);
                if(!data.values.length) {
                    data = null;
                    setIsSearching(false);
                }

                if(data.values[0].Title !== current) {
                    console.log('NOT SAME');
                    props.onDataChange(data);
                } else  {
                    console.log('SAME');
                    setIsSearching(false);
                }
            })
    }

    const handleTypeChange = ({ target }) => {
        console.log(target);
        let value = target.value;

        setType(value)
    }

        return (
            <section className="graf-filter flex align-center space-around">
                <form onSubmit={onSearch} className="flex align-center space-around">
                    <FormControl>
                        <InputLabel id="select-type">Media</InputLabel>
                        <Select
                            name="type"
                            ref={elType}
                            autoWidth
                            required
                            labelId="select-type"
                            value={type}
                            onChange={handleTypeChange}
                        >
                            <MenuItem value="movie">Movie</MenuItem>
                            <MenuItem value="series">TV Show</MenuItem>
                        </Select>
                    </FormControl>

                    <TextField id="standard-basic" label="Search" variant="standard" name="search" ref={elSearch} required />
                    {(searching) ?
                        <CircularProgress /> :
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<SearchIcon />}
                            type="submit"
                        >
                            Search
                    </Button>
                    }
                </form>
            </section>
        );
    
};

export default GrafFilter;