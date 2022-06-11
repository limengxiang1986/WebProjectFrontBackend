import React from "react";
import { Select } from "antd";
import debounce from 'lodash/debounce';
import {EmptySearchSelector} from "./EmptySearchSelector";
import {fetchDataForSelector} from "./FetchDataForSelector";


function JiraKeySelect({debounceTimeout = 800, ...props}) {
    const [fetching, setFetching] = React.useState(false);
    const [fetchedAtLeastOnce, setFetchedAtLeastOnce] = React.useState(false);
    const [options, setOptions] = React.useState([]);
    const fetchRef = React.useRef(0);


    const debounceFetcher = React.useMemo(() => {
        const loadOptions = (value) => {
            fetchRef.current += 1;
            const fetchId = fetchRef.current;
            setOptions([]);
            setFetching(true);

            const url = "select/jira_key/" + value;
            fetchDataForSelector(url).then((newOptions) => {
                if (fetchId !== fetchRef.current) {
                    // for fetch callback order
                    return;
                }

                setOptions(newOptions);
                setFetching(false);
                setFetchedAtLeastOnce(true);
            });
        };

        return debounce(loadOptions, debounceTimeout);
    }, [debounceTimeout]);


    return (
        <Select
            labelInValue
            showSearch
            filterOption={false}
            onSearch={debounceFetcher}
            notFoundContent={<EmptySearchSelector searchType="Jira key" fetching={fetching} fetchedAtLeastOnce={fetchedAtLeastOnce} dataLength={options ? options.length : null}/>}
            {...props}
            options={options}
        />
    );

}

export default JiraKeySelect;
