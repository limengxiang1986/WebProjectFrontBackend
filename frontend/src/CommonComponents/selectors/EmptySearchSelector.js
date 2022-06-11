import { Empty } from 'antd';
import {FunctionComponent} from "react";
import {Ring} from "react-spinners-css";


export const EmptySearchSelector: FunctionComponent<Empty> = (
    props
) => {
    let description = <span>Type and search for a {props.searchType}</span>;
    if (props.hasOwnProperty("fetching")) {
        if( (props.hasOwnProperty("fetchedAtLeastOnce") && props.fetchedAtLeastOnce)
            && (props.hasOwnProperty("dataLength") && (props.dataLength === null || props.dataLength === 0))) {
            description = <span>No {props.searchType} found</span>
        }
    }
    else if((props.hasOwnProperty("dataLength") && (props.dataLength === null || props.dataLength === 0))) {
        description = <span>No {props.searchType} found for your input. Type and search for another one</span>
    }

    if(props.hasOwnProperty("fetching") && props.fetching) {
        return (
            <Ring size="25" color="#124191" style={{
                position: "absolute",
                transform: "translate(-50%, -50%)"
            }}/>
        )
    }
    else {
        return(
            <Empty
                image={null}
                imageStyle={{
                    height: 0
                }}
                description={
                    description
                }
            />
        );
    }
};