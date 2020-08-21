import React, { useState, useEffect, useRef } from "react";

import grafService from "../../services/grafService";
import { ReactComponent as TvIcon } from "../../assets/img/tv.svg";
import { ReactComponent as MoviesIcon } from "../../assets/img/movie.svg";

import LoadingRing from "./LoadingRing";
import SearchOptions from "./SearchOptions";
import TypeSwitcher from "./TypeSwitcher/TypeSwitcher";
import DataPreview from "./DataPreview";

const SearchContainer = (props) => {
  let inputRef = useRef();

  const { onDataSearch, isSearchOpen, theme, onCloseSearch } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("series");
  const [searchStatus, setSearchStatus] = useState({
    result: false,
    picked: false,
  });
  const [searchResults, setSearchResults] = useState(null);
  const [searching, setIsSearching] = useState(false);
  const [current, setCurrent] = useState("Default");
  const [openClass, setOpenClass] = useState("");
  const [result, setResult] = useState(null);
  const [resultInfo, setResultInfo] = useState(null);
  const [resultOptions, setResultOptions] = useState([]);

  useEffect(() => {
    if (props.name !== current) {
      setIsSearching(false);
      setCurrent(props.name);
    }
  }, [props.name, current]);

  useEffect(() => {
    inputRef.current.focus();
  }, [searchType]);

  useEffect(() => {
    if (isSearchOpen) {
      if (openClass === "") {
        setTimeout(() => {
          setOpenClass("open");
        }, 50);
      } else {
        setOpenClass("");
        setTimeout(() => {
          setOpenClass("open");
        }, 50);
      }
    } else {
      setOpenClass("");
    }
  }, [isSearchOpen]);

  const handleSearchTerm = ({ target }) => {
    setSearchTerm(target.value);
  };
  const handleSearchType = (type) => {
    // if (result) return;
    setSearchType(type);
  };

  // const handleSearch = (event) => {
  //   event.preventDefault();
  //   if (searching) return;
  //   setIsSearching(true);

  //   let searchObj = {
  //     type: searchType,
  //     search: searchTerm,
  //   };

  //   let data;
  //   let dataLocation = searchType === "series" ? "values" : "Search";

  //   grafService
  //     .getGrafData(searchObj)
  //     .then((res) => (data = res))
  //     .then((res) => {
  //       console.log(data);

  //       if (!data.error) {
  //         setResultOptions(data.titles);
  //         setSearchResults(data.results);
  //         setSearchStatus({ result: true, picked: false });
  //       } else {
  //         setSearchResults(null);
  //         setSearchStatus({ result: false, picked: false });
  //       }

  //       if (searchType === "series") {
  //         if (!data[dataLocation].length) {
  //           data = null;
  //           setResult(null);
  //         } else {
  //           setResultInfo(
  //             data[searchType === "series" ? "seriesInfo" : "movieInfo"]
  //           );
  //         }
  //       } else {
  //         setResultInfo(null);
  //       }

  //       // if(data.values[0].Title !== current) {
  //       // console.log('NOT SAME');

  //       setResult({ data, Type: searchType });

  //       // } else  {
  //       // console.log('SAME');
  //       setIsSearching(false);
  //       // }
  //     });
  // };

  const handleSearching = (event) => {
    event.preventDefault();
    if (searching) return;
    setIsSearching(true);

    let searchObj = {
      type: searchType,
      search: searchTerm,
    };

    let data;

    grafService
      .searchMediaData(searchObj)
      .then((res) => (data = res))
      .then(() => {
        // console.log(data);

        if (!data.error) {
          setResultOptions(data.titles);
          setSearchResults(data.results);
          setSearchStatus({ result: true, picked: false });
        } else {
          setSearchResults(null);
          setSearchStatus({ result: false, picked: false });
        }

        setIsSearching(false);
      });
  };

  const onDataSelect = () => {
    setIsSearching(false);
    setResult(null);
    setSearchStatus({ result: false, picked: true });
    setTimeout(() => {
      onDataSearch(result.data);
      onCloseSearch();
    }, 100);
  };

  const onMediaPick = (id) => {
    if (searching) return;
    setIsSearching(true);
    let currType = searchResults[0].Type === "series" ? "series" : "movie";
    let dataLocation = searchType === "series" ? "values" : "Search";
    grafService.getMediaData({ imdbID: id, type: currType }).then((data) => {
      if (searchType === "series") {
        if (!data[dataLocation].length) {
          data = null;
          setResult(null);
        } else {
          setResultInfo(
            data[searchType === "series" ? "seriesInfo" : "movieInfo"]
          );
        }
      } else {
        setResultInfo(null);
      }
      setSearchStatus({ result: true, picked: true });
      setResult({ data, Type: searchType });

      setIsSearching(false);
    });
  };

  let searchContainerClass = searching ? "search-ongoing search-with-result-loading " : "";
  searchContainerClass +=
    result || searchStatus.result ? `search-with-result ${searching ? "" : ""}` : "";
  // console.log(result);
  const resultsClass =
    !result && searchStatus.result && !searchStatus.picked
      ? "result-overflow"
      : "";
  return (
    <div
      className={`search-container flex column align-center space-start ${openClass} ${searchContainerClass}`}
    >
      <form
        action=""
        onSubmit={handleSearching}
        className="search-form flex align-center space-between"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchTerm}
          className="search-input"
          placeholder={`Search ${
            searchType === "series" ? "TV Shows" : "Movies"
          }`}
          ref={inputRef}
        />
        <TypeSwitcher
          handleTypeChange={handleSearchType}
          dataTypes={[
            { type: "series", img: <TvIcon />, label: "TV Shows" },
            { type: "movie", img: <MoviesIcon />, label: "Movies" },
          ]}
          initType={0}
          animation="activeTab"
          switcherClass="type-switcher"
          switcherImgClass="switcher-img"
          swticherLabelClass="switcher-label"
          switchOnStart={true}
        />
      </form>

      <div className={`result-container ${resultsClass} flex align-center space-center`}>
        {searching ? (
          <LoadingRing theme={theme} />
        ) : result ? (
          <DataPreview
            onDataSelect={onDataSelect}
            data={result.Type === "series" ? resultInfo : result}
            setResult={setResult}
          />
        ) : searchStatus.result && !searchStatus.picked ? (
          <SearchOptions onMediaPick={onMediaPick} options={resultOptions} />
        ) : null}
      </div>
    </div>
  );
};

export default SearchContainer;
