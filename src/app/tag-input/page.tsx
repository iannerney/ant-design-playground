"use client";

import React, { useState, useRef } from "react";
import { Card, Space, Typography, Divider, Button, Row, Col, Switch } from "antd";
import { ClearOutlined } from "@ant-design/icons";
import AntDesignLayout from "@/components/Layouts/AntDesignLayout";
import TagInput from "@/components/Reusable/TagInput";

const { Title, Text, Paragraph } = Typography;

export default function TagInputPage() {
    const [basicValue, setBasicValue] = useState("react,javascript,typescript");
    const [limitedValue, setLimitedValue] = useState("html,css");
    const [duplicatesValue, setDuplicatesValue] = useState("tag1,tag1,tag2");
    const [customSeparatorValue, setCustomSeparatorValue] = useState("apple|banana|cherry");
    const [disabledValue, setDisabledValue] = useState("read,only,tags");
    const [allowDuplicates, setAllowDuplicates] = useState(true);

    const tagInputRef = useRef<any>(null);

    const handleClearAll = () => {
        tagInputRef.current?.clearTags();
    };

    const handleAddSample = () => {
        tagInputRef.current?.addTag("Sample Tag");
    };

    return (
        <AntDesignLayout>
            <div style={{ padding: "24px", maxWidth: "1000px", margin: "0 auto" }}>
                <Title level={2}>Tag Input Component</Title>
                <Paragraph type="secondary">
                    A flexible tag input component that supports multiple separators, duplicate control, and various
                    customization options.
                </Paragraph>

                <Divider />

                <Space direction="vertical" size="large" style={{ width: "100%" }}>
                    {/* Basic Usage */}
                    <Card title="Basic Usage" size="small">
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Text>
                                Type text and press <Text code>Enter</Text>, <Text code>comma</Text>, or{" "}
                                <Text code>space</Text> to add tags.
                            </Text>
                            <TagInput
                                value={basicValue}
                                onChange={setBasicValue}
                                placeholder="Add programming languages..."
                                style={{ width: "100%" }}
                            />
                            <Text type="secondary">Current value: {basicValue}</Text>
                        </Space>
                    </Card>

                    {/* Limited Tags */}
                    <Card title="Limited Tags (Max 3)" size="small">
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Text>This example limits the maximum number of tags to 3.</Text>
                            <TagInput
                                value={limitedValue}
                                onChange={setLimitedValue}
                                maxTags={3}
                                placeholder="Add up to 3 skills..."
                                style={{ width: "100%" }}
                            />
                            <Text type="secondary">
                                Tags: {limitedValue.split(",").filter((t) => t.trim()).length}/3
                            </Text>
                        </Space>
                    </Card>

                    {/* Duplicate Control */}
                    <Row gutter={16}>
                        <Col span={12}>
                            <Card title="Allow Duplicates" size="small">
                                <Space direction="vertical" style={{ width: "100%" }}>
                                    <Space>
                                        <Text>Allow duplicates:</Text>
                                        <Switch checked={allowDuplicates} onChange={setAllowDuplicates} size="small" />
                                    </Space>
                                    <TagInput
                                        value={duplicatesValue}
                                        onChange={setDuplicatesValue}
                                        allowDuplicates={allowDuplicates}
                                        placeholder="Try adding duplicate tags..."
                                        style={{ width: "100%" }}
                                    />
                                </Space>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card title="Custom Separator (|)" size="small">
                                <Space direction="vertical" style={{ width: "100%" }}>
                                    <Text>Uses pipe (|) as separator instead of comma/space.</Text>
                                    <TagInput
                                        value={customSeparatorValue}
                                        onChange={setCustomSeparatorValue}
                                        separator="|"
                                        placeholder="fruit1|fruit2|fruit3"
                                        style={{ width: "100%" }}
                                    />
                                </Space>
                            </Card>
                        </Col>
                    </Row>

                    {/* Imperative API */}
                    <Card title="Imperative API (useRef)" size="small">
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Text>Control the component programmatically using refs.</Text>
                            <TagInput
                                ref={tagInputRef}
                                placeholder="Use buttons below to control this input..."
                                style={{ width: "100%" }}
                            />
                            <Space>
                                <Button type="primary" onClick={handleAddSample}>
                                    Add Sample Tag
                                </Button>
                                <Button onClick={handleClearAll} icon={<ClearOutlined />}>
                                    Clear All
                                </Button>
                            </Space>
                        </Space>
                    </Card>

                    {/* Disabled State */}
                    <Card title="Disabled State" size="small">
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Text>Read-only mode with existing tags.</Text>
                            <TagInput value={disabledValue} disabled style={{ width: "100%" }} />
                        </Space>
                    </Card>

                    {/* Features List */}
                    <Card title="Features" type="inner">
                        <Row gutter={[16, 8]}>
                            <Col span={12}>
                                <ul>
                                    <li>Multiple separators (comma, space, custom)</li>
                                    <li>Duplicate tag control</li>
                                    <li>Maximum tag limits</li>
                                    <li>Keyboard navigation (Enter, Backspace)</li>
                                </ul>
                            </Col>
                            <Col span={12}>
                                <ul>
                                    <li>Imperative API via refs</li>
                                    <li>Disabled/readonly state</li>
                                    <li>Auto-tag on blur</li>
                                    <li>Focus management</li>
                                </ul>
                            </Col>
                        </Row>
                    </Card>
                </Space>
            </div>
        </AntDesignLayout>
    );
}
