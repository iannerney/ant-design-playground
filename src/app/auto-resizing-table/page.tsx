"use client";

import React from "react";
import { Typography, Card, Space, Tag, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import AutoResizingTable from "@/components/Reusable/AutoResizingTable";

const { Title, Text } = Typography;

// Sample data for demonstration
interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    email: string;
    phone: string;
    department: string;
    status: "active" | "inactive" | "pending";
    joinDate: string;
    salary: number;
}

const generateSampleData = (): DataType[] => {
    const departments = ["Engineering", "Marketing", "Sales", "HR", "Finance", "Operations"];
    const statuses: ("active" | "inactive" | "pending")[] = ["active", "inactive", "pending"];
    const sampleData: DataType[] = [];

    for (let i = 1; i <= 50; i++) {
        sampleData.push({
            key: i.toString(),
            name: `Employee ${i}`,
            age: 22 + (i % 40),
            address: `${100 + i} Main Street, City ${Math.ceil(i / 10)}, State`,
            email: `employee${i}@company.com`,
            phone: `+1 (555) ${String(i).padStart(3, "0")}-${String((i * 11) % 10000).padStart(4, "0")}`,
            department: departments[i % departments.length],
            status: statuses[i % statuses.length],
            joinDate: new Date(2020 + (i % 4), i % 12, (i % 28) + 1).toLocaleDateString(),
            salary: 50000 + i * 1000,
        });
    }

    return sampleData;
};

const columns: ColumnsType<DataType> = [
    {
        title: "Name",
        dataIndex: "name",
        key: "name",
        width: 120,
        fixed: "left" as const,
    },
    {
        title: "Age",
        dataIndex: "age",
        key: "age",
        width: 80,
        sorter: (a: DataType, b: DataType) => a.age - b.age,
    },
    {
        title: "Email",
        dataIndex: "email",
        key: "email",
        width: 200,
    },
    {
        title: "Phone",
        dataIndex: "phone",
        key: "phone",
        width: 150,
    },
    {
        title: "Department",
        dataIndex: "department",
        key: "department",
        width: 120,
        filters: [
            { text: "Engineering", value: "Engineering" },
            { text: "Marketing", value: "Marketing" },
            { text: "Sales", value: "Sales" },
            { text: "HR", value: "HR" },
            { text: "Finance", value: "Finance" },
            { text: "Operations", value: "Operations" },
        ],
        onFilter: (value: any, record: DataType) => record.department === value,
    },
    {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: 100,
        render: (status: string) => {
            const color = status === "active" ? "green" : status === "inactive" ? "red" : "orange";
            return <Tag color={color}>{status.toUpperCase()}</Tag>;
        },
        filters: [
            { text: "Active", value: "active" },
            { text: "Inactive", value: "inactive" },
            { text: "Pending", value: "pending" },
        ],
        onFilter: (value: any, record: DataType) => record.status === value,
    },
    {
        title: "Join Date",
        dataIndex: "joinDate",
        key: "joinDate",
        width: 120,
        sorter: (a: DataType, b: DataType) => new Date(a.joinDate).getTime() - new Date(b.joinDate).getTime(),
    },
    {
        title: "Salary",
        dataIndex: "salary",
        key: "salary",
        width: 120,
        render: (salary: number) => `$${salary.toLocaleString()}`,
        sorter: (a: DataType, b: DataType) => a.salary - b.salary,
    },
    {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 250,
    },
    {
        title: "Actions",
        key: "actions",
        width: 150,
        fixed: "right" as const,
        render: (_: any, record: DataType) => (
            <Space size="small">
                <Button type="text" icon={<EyeOutlined />} size="small" onClick={() => console.log("View:", record)} />
                <Button type="text" icon={<EditOutlined />} size="small" onClick={() => console.log("Edit:", record)} />
                <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    size="small"
                    danger
                    onClick={() => console.log("Delete:", record)}
                />
            </Space>
        ),
    },
];

export default function AutoResizingTablePage() {
    const data = generateSampleData();

    return (
        <div style={{ padding: "24px" }}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
                <div>
                    <Title level={2}>Auto Resizing Table Demo</Title>
                    <Text type="secondary">
                        This table automatically adjusts its height based on the window size and provides horizontal
                        scrolling for wide content.
                    </Text>
                </div>

                <Card title={`Employee Directory (${data.length} records)`} style={{ height: "auto" }}>
                    <AutoResizingTable<DataType>
                        columns={columns}
                        dataSource={data}
                        pagination={{
                            pageSize: 20,
                            showSizeChanger: true,
                            showQuickJumper: true,
                            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                        }}
                        rowSelection={{
                            type: "checkbox",
                            onChange: (selectedRowKeys, selectedRows) => {
                                console.log("Selected rows:", selectedRows);
                            },
                        }}
                    />
                </Card>
            </Space>
        </div>
    );
}
