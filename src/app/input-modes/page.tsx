"use client";

import React, { useState } from "react";
import { Switch, Select, Input, InputNumber, Card, Space, Typography, Divider } from "antd";
import AntDesignLayout from "@/components/Layouts/AntDesignLayout";

const { Title, Text, Paragraph } = Typography;
const { Option } = Select;

// HTML input types that are commonly used
const inputTypes = [
    "undefined",
    "text",
    "password",
    "email",
    "tel",
    "url",
    "search",
    "number",
    "date",
    "time",
    "datetime-local",
    "month",
    "week",
    "color",
];

// HTML inputmode attribute values
const inputModes = ["undefined", "none", "text", "decimal", "numeric", "tel", "search", "email", "url"] as const;

type InputMode = (typeof inputModes)[number];

export default function InputModesPage() {
    const [useInputNumber, setUseInputNumber] = useState(false);
    const [inputType, setInputType] = useState<string>("undefined");
    const [inputMode, setInputMode] = useState<InputMode>("undefined");
    const [inputValue, setInputValue] = useState<string | number>("");

    const handleInputChange = (value: string | number | null) => {
        setInputValue(value || "");
    };

    return (
        <AntDesignLayout>
            <div style={{ padding: "24px", maxWidth: "800px", margin: "0 auto" }}>
                <Title level={2}>Input Modes Testing</Title>
                <Text type="secondary">
                    Test different HTML input types and inputmode attributes with Ant Design Input components
                </Text>

                <Divider />

                {/* Controls Section */}
                <Card title="Controls" style={{ marginBottom: "24px" }}>
                    <Space direction="vertical" size="large" style={{ width: "100%" }}>
                        {/* Toggle 1: Input vs InputNumber */}
                        <div>
                            <Text strong>Component Type: </Text>
                            <Switch
                                checked={useInputNumber}
                                onChange={setUseInputNumber}
                                checkedChildren="InputNumber"
                                unCheckedChildren="Input"
                            />
                        </div>

                        {/* Toggle 2: HTML type attribute */}
                        <div>
                            <Text strong>HTML Type Attribute: </Text>
                            <Select
                                value={inputType}
                                onChange={setInputType}
                                style={{ width: 200, marginLeft: "8px" }}
                                placeholder="Select input type"
                            >
                                {inputTypes.map((type) => (
                                    <Option key={type} value={type}>
                                        {type}
                                    </Option>
                                ))}
                            </Select>
                        </div>

                        {/* Toggle 3: HTML inputmode attribute */}
                        <div>
                            <Text strong>HTML InputMode Attribute: </Text>
                            <Select
                                value={inputMode}
                                onChange={setInputMode}
                                style={{ width: 200, marginLeft: "8px" }}
                                placeholder="Select input mode"
                            >
                                {inputModes.map((mode) => (
                                    <Option key={mode} value={mode}>
                                        {mode}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    </Space>
                </Card>

                {/* Preview Section */}
                <Card title="Component Preview" style={{ marginBottom: "24px" }}>
                    <Space direction="vertical" size="large" style={{ width: "100%" }}>
                        <div>
                            <Text strong>Current Configuration:</Text>
                            <ul style={{ marginTop: "8px", marginBottom: "16px" }}>
                                <li>Component: {useInputNumber ? "InputNumber" : "Input"}</li>
                                <li>Type: {inputType}</li>
                                <li>InputMode: {inputMode}</li>
                            </ul>
                        </div>

                        <div>
                            <Text strong>Rendered Component:</Text>
                            <div style={{ marginTop: "8px" }}>
                                {useInputNumber ? (
                                    <InputNumber
                                        value={inputValue as number}
                                        onChange={handleInputChange}
                                        placeholder="Enter a number..."
                                        style={{ width: "300px" }}
                                        type={inputType === "undefined" ? undefined : inputType}
                                        inputMode={inputMode === "undefined" ? undefined : inputMode}
                                    />
                                ) : (
                                    <Input
                                        value={inputValue as string}
                                        onChange={(e) => handleInputChange(e.target.value)}
                                        placeholder="Enter text..."
                                        style={{ width: "300px" }}
                                        type={inputType === "undefined" ? undefined : inputType}
                                        inputMode={inputMode === "undefined" ? undefined : inputMode}
                                    />
                                )}
                            </div>
                        </div>

                        <div>
                            <Text strong>Component Code:</Text>
                            <Paragraph
                                copyable
                                style={{
                                    marginTop: "8px",
                                    padding: "8px",
                                    backgroundColor: "#f5f5f5",
                                    borderRadius: "4px",
                                    fontFamily: "monospace",
                                }}
                            >
                                {`<${useInputNumber ? "InputNumber" : "Input"}${inputType !== "undefined" ? ` type="${inputType}"` : ""}${inputMode !== "undefined" ? ` inputMode="${inputMode}"` : ""} />`}
                            </Paragraph>
                        </div>

                        <div>
                            <Text strong>Current Value:</Text>
                            <div
                                style={{
                                    marginTop: "8px",
                                    padding: "8px",
                                    backgroundColor: "#f5f5f5",
                                    borderRadius: "4px",
                                    fontFamily: "monospace",
                                }}
                            >
                                {JSON.stringify(inputValue)}
                            </div>
                        </div>
                    </Space>
                </Card>

                {/* Information Section */}
                <Card title="Information" type="inner">
                    <Space direction="vertical" size="middle">
                        <div>
                            <Text strong>About HTML Type Attribute:</Text>
                            <Text>
                                <br />
                                The type attribute specifies the type of input element to display. Different types
                                provide different input validation and user interface elements.
                            </Text>
                        </div>

                        <div>
                            <Text strong>About HTML InputMode Attribute:</Text>
                            <Text>
                                <br />
                                The inputmode attribute provides a hint to browsers about the type of virtual keyboard
                                configuration to use when editing this element or its contents, especially on mobile
                                devices.
                            </Text>
                        </div>

                        <div>
                            <Text strong>Note about InputNumber:</Text>
                            <Text>
                                <br />
                                InputNumber is specifically designed for numeric input and doesn't support HTML type and
                                inputmode attributes in the same way as regular Input components.
                            </Text>
                        </div>
                    </Space>
                </Card>
            </div>
        </AntDesignLayout>
    );
}
