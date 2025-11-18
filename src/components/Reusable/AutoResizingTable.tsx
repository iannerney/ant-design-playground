import React, { useEffect, useState } from "react";
import { Table, type TableProps } from "antd";

interface AutoResizingTableProps<T = any> extends TableProps<T> {}

const AutoResizingTable = <T extends Record<string, any> = any>({ ...rest }: AutoResizingTableProps<T>) => {
    // Set the height offset to account for other UI elements
    // Value in pixels above and below the table
    const fixedHeightOffset = 400;
    // Set the event listeners for resizing
    const [windowHeight, setWindowHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 600);

    useEffect(() => {
        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return <Table scroll={{ y: windowHeight - fixedHeightOffset, x: "max-content" }} {...rest} />;
};

export default AutoResizingTable;
