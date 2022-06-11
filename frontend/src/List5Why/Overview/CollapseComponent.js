import Collapse from "@kunukn/react-collapse";
import cx from "clsx";
import "../../css/overview/CollapseComponent.css";


const CollapseHeader = ({
                            firstHeading,
                            secondHeading,
                            onToggle,
                            isOpen,
                            transitionDuration
                        }) => {
    return (
        <button
            aria-expanded={isOpen}
            onClick={onToggle}
            className="CollapseHeader"
        >
            <div>
                <span className="firstHeading">
                    {firstHeading}
                </span>

                {secondHeading ?
                    <span className="secondHeading">
                        {secondHeading}
                    </span>
                    : null
                }
            </div>
            <svg
                width="2em"
                height="2em"
                viewBox="0 0 32 32"
                className={cx("collapse", {
                    "arrow_is_open": !isOpen,
                    "arrow_is_closed": isOpen
                })}
            >
                <path
                    fill="rgb(18, 65, 145)"
                    d="M29.602 8.002l-13.6 11.562-13.6-11.562-2.4 2.752 16 13.764 16-13.764z"
                />
            </svg>
            <div className="collapse_divider"/>
        </button>
    );
};

const CollapseComponent = ({
                               children,
                               isOpen,
                               firstHeading,
                               secondHeading,
                               onToggle,
                               transitionDuration
                           }) => {
    return (
        <div
            className={cx("accordion", {
                "accordion--is-open": isOpen,
                "accordion--is-closed": !isOpen
            })}

        >
            <CollapseHeader
                {...{
                    firstHeading,
                    secondHeading,
                    transitionDuration,
                    onToggle,
                    isOpen
                }}
            />


            <Collapse
                isOpen={isOpen}
                style={{transitionDuration}}
                aria-hidden={!isOpen}
            >
                <div className={"Collapse"}>
                    {children}
                </div>
            </Collapse>
        </div>
    );
};


export default CollapseComponent;
