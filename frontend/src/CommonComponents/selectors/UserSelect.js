import React from "react";
import { Select } from "antd";
import {EmptySearchSelector} from "./EmptySearchSelector";
import axios from "../../axios/axios";
import debounce from 'lodash/debounce';



async function fetchUsers(displayNameContains=null) {
    let params = {};
    let url = "PrTool/select/LDAP/users";

    if (displayNameContains === null || displayNameContains.length <= 1) {
        params["squad_group"] = localStorage.squadGroup;
    }
    if (displayNameContains) {
        params["display_name_contains"] = displayNameContains;
    }


    return axios.get(url, {
        params: params,
        headers: {'Authorization': `Token ${localStorage.token}`}
    }).then(response => {
       if (response.status === 200) {
           if (response.data.results) {
               let data = response.data.results.map((user) => ({
                   label: user.display_name,
                   key: user.uid,
                   value: user.uid
               }));
               return data;
           }
           else {
               return null;
           }
       }
    }).catch(response => {
        return null;
    });
}



function UserSelect({debounceTimeout = 800, ...props}) {
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
            fetchUsers(value).then((newOptions) => {
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

    if(!props.hasOwnProperty("maxselected") || props.maxselected === 1) {
        return (
            <Select
                labelInValue
                showSearch
                filterOption={false}
                onSearch={debounceFetcher}
                notFoundContent={<EmptySearchSelector searchType="person" fetching={fetching} fetchedAtLeastOnce={fetchedAtLeastOnce} dataLength={options ? options.length : null}/>}
                {...props}
                options={options}
                showArrow={false}
            />
        );
    }
    else {
        return (
            <Select
                labelInValue
                mode={"multiple"}
                filterOption={false}
                onSearch={debounceFetcher}
                notFoundContent={<EmptySearchSelector searchType="person" fetching={fetching} fetchedAtLeastOnce={fetchedAtLeastOnce} dataLength={options ? options.length : null}/>}
                {...props}
                options={options}
                showArrow={false}
            />
        );
    }
}

export default UserSelect;
