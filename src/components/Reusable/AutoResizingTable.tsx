"use client";
import React, { useEffect, useState } from "react";
import { Table, type TableProps, Spin } from "antd";

interface AutoResizingTableProps<T = any> extends TableProps<T> {}

const AutoResizingTable = <T extends Record<string, any> = any>({ ...rest }: AutoResizingTableProps<T>) => {
    // Set the height offset to account for other UI elements
    // Value in pixels above and below the table
    const fixedHeightOffset = 400;

    // Track if component has hydrated on client side
    const [isClient, setIsClient] = useState(false);
    const [windowHeight, setWindowHeight] = useState(600); // Default fallback

    useEffect(() => {
        // Mark as client-side and set up window listeners
        if (typeof window !== "undefined") {
            const handleResize = () => {
                setWindowHeight(window.innerHeight);
            };

            // Set initial height and mark as client-side
            setWindowHeight(window.innerHeight);
            setIsClient(true);

            window.addEventListener("resize", handleResize);

            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }
    }, []);

    // Show loading spinner until client-side hydration is complete
    if (!isClient) {
        return (
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: 200,
                    width: "100%",
                }}
            >
                <Spin size="large" tip="Loading table..." />
            </div>
        );
    }

    return <Table scroll={{ y: windowHeight - fixedHeightOffset, x: "max-content" }} {...rest} />;
};

export default AutoResizingTable;
