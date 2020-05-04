import React from 'react';
import grafService from '../services/grafService';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Switch, } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';

export class GrafFilter extends React.Component {

    constructor() {
        super();
        this.elSearch = React.createRef;
        this.elType = React.createRef;
    }

    state = {
        searching: false,
        current: 'Default',
        type: 'series'
    };

    componentDidMount() {

    }
    componentDidUpdate() {
        if (this.props.name !== this.state.current) {
            this.setState({ searching: false, current: this.props.name })
        }
    }

    onSearch = (event) => {
        event.preventDefault();
        if (this.state.searching) return;
        this.setState({ searching: true });

        let type = event.target.type.value;
        // event.target.type.value = '';
        let searchString = event.target.search.value;
        // event.target.search.value = '';

        let searchObj = {
            type,
            search: searchString,
        }

        let data;
        grafService.getGrafData(searchObj)
            .then(res => data = res)
            .then(res => {

                console.log(data);
                if(!data.length) {
                    data = null;
                    this.setState({ searching: false });
                }
                this.props.onDatachange(data);
            })
    }

    handleChange = ({ target }) => {
        console.log(target);
        let property = target.name;
        let value = target.value;

        this.setState({ [property]: value }, console.log(this.state));
    }

    render() {
        const { searching, type } = this.state;
        return (
            <section className="graf-filter flex align-center space-around">
                <form onSubmit={this.onSearch} className="flex align-center space-around">
                    <FormControl>
                        <InputLabel id="select-type">Media</InputLabel>
                        <Select
                            name="type"
                            ref={this.elType}
                            autoWidth
                            required
                            labelId="select-type"
                            value={type}
                            onChange={this.handleChange}
                        >
                            {/* <MenuItem value=""><em>None</em></MenuItem> */}
                            <MenuItem value="movie">Movie</MenuItem>
                            <MenuItem value="series">TV Show</MenuItem>
                        </Select>
                    </FormControl>

                    {/* <select type="text" name="type" ref={this.elType}>
                        <option value="movie">Movie</option>
                        <option value="series">TV Show</option>
                    </select> */}

                    {/* <input type="text" name="search" placeholder="Search" ref={this.elSearch} /> */}
                    <TextField id="standard-basic" label="Search" variant="standard" name="search" ref={this.elSearch} required />
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
                    {/* <div className="darkmode-switch flex align-center space-center">
                        <p className={`dark`} >Dark-Mode</p>
                        <Switch
                            checked={false}
                            // defaultChecked
                            onChange={() => console.log('kaki')}
                            name="theme"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                    </div> */}
                    {/* <Button variant="contained" color="primary" >Search</Button> */}
                </form>
            </section>
        );
    }
};

