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

                if(data[0].Title !== this.state.current) {
                    console.log('NOT SAME');
                    this.props.onDatachange(data);
                } else  {
                    console.log('SAME');
                    this.setState({ searching: false });
                }
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
                            <MenuItem value="movie">Movie</MenuItem>
                            <MenuItem value="series">TV Show</MenuItem>
                        </Select>
                    </FormControl>

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
                </form>
            </section>
        );
    }
};

