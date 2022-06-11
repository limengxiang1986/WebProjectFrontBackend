import React from "react";
import Item from "./Item";
import DropWrapper from "./DropWrapper";
import Column from "./Column";
import {Status} from "./Status";
import "../../css/KanbanBoard.css";

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: props.data.items ? [...props.data.items] : [],
            assignee_uid: props ? props.data["assignee_uid"] : "",
            assignee_squad_group: props ? props.data["assignee_squad_group"] : "",
            assignee_display_name: props ? props.data["assignee_display_name"] : "",
            assignee_mail: props ? props.data["assignee_mail"] : "",
            parentDataId: props.parentDataId,
            changeStatusFunction: props.changeStatusFunction
        };
    }

    static getDerivedStateFromProps(props, current_state) {
    if (current_state.items !== props.data) {
      return {
        items: [...props.data.items],
        assignee_uid: props.data["assignee_uid"],
        assignee_squad_group: props.data["assignee_squad_group"],
        assignee_display_name: props.data["assignee_display_name"],
        assignee_mail: props ? props.data["assignee_mail"] : "",
        parentDataId: props.parentDataId,
        changeStatusFunction: props.changeStatusFunction,
      }
    }
    return null
   }




    render() {
        return (

            <div className={"board"}>
                <div className={"header_assignee"}>
                    <p className={"display_name"}>{this.state.assignee_display_name}</p>
                    <p className={"squad_group"}>{this.state.assignee_squad_group}</p>
                </div>
                <div className={"row"}>
                {
                    Status.map(s => {
                        return (
                            <div key={s.status} className={"col-wrapper"}>
                                <div className={"color-bar"} style={{
                                    backgroundColor: s.color,
                                    width: "100%",
                                    paddingBottom: "0px",
                                    paddingTop: "0px",
                                    marginTop: "5px"
                                }}/>
                                <h2 className={"col-header"}>{s.status}</h2>
                                <DropWrapper>
                                    <Column>
                                        {this.state.items
                                            .filter(i => i.status === s.status)
                                            .sort(i => i.priority)
                                            .map((i, idx) => <Item key={i.id} item={i} index={idx}
                                                                   moveItem={this.moveItem}
                                                                   status={s}/>)
                                        }
                                    </Column>
                                </DropWrapper>
                            </div>
                        );
                    })
                }
                </div>
            </div>
        )
    }
}

export default Board;