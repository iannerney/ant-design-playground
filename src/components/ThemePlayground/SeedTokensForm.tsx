"use client";
import React, { useState } from "react";
import { Form, Row, Col, ColorPicker, Input, InputNumber, Select, Switch, ThemeConfig, Typography } from "antd";
import type { SeedToken } from "antd/es/theme/internal";

const { Paragraph } = Typography;
interface SeedTokensFormProps {
    customizableTheme: ThemeConfig;
    setCustomizableTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>;
}

const SeedTokensForm: React.FC<SeedTokensFormProps> = ({ customizableTheme, setCustomizableTheme }) => {
    // Generate array of SeedToken properties
    type SeedTokenObject = Record<keyof SeedToken, undefined> & { [key: string]: undefined };
    let seedTokenProperties: SeedTokenObject = {
        colorPrimary: undefined,
        colorSuccess: undefined,
        colorWarning: undefined,
        colorError: undefined,
        colorInfo: undefined,
        colorTextBase: undefined,
        colorBgBase: undefined,
        colorLink: undefined,
        fontFamily: undefined, // TODO: Make font family selections SFPro, Inter
        fontFamilyCode: undefined,
        fontSize: undefined,
        lineWidth: undefined,
        lineType: undefined,
        borderRadius: undefined,
        sizeUnit: undefined,
        sizeStep: undefined,
        sizePopupArrow: undefined,
        controlHeight: undefined,
        zIndexBase: undefined,
        zIndexPopupBase: undefined,
        opacityImage: undefined,
        motionUnit: undefined,
        motionBase: undefined,
        motionEaseOutCirc: undefined,
        motionEaseInOutCirc: undefined,
        motionEaseInOut: undefined,
        motionEaseOutBack: undefined,
        motionEaseInBack: undefined,
        motionEaseInQuint: undefined,
        motionEaseOutQuint: undefined,
        motionEaseOut: undefined,
        wireframe: undefined,
        motion: undefined,
        blue: undefined,
        purple: undefined,
        cyan: undefined,
        green: undefined,
        magenta: undefined,
        pink: undefined,
        red: undefined,
        orange: undefined,
        yellow: undefined,
        volcano: undefined,
        geekblue: undefined,
        lime: undefined,
        gold: undefined,
    };
    const allSeedTokenProperties = Object.keys(seedTokenProperties) as (keyof SeedToken)[];

    const handleOnValuesChange = (changedValues: any, allValues: any) => {
        // Filter out undefined values
        const definedValues = Object.fromEntries(
            Object.entries(allValues).filter(([key, value]) => value !== undefined),
        );

        // Convert ColorFactory objects to hex strings
        // Convert Color objects to hex strings
        const convertedValues: ThemeConfig["token"] = Object.entries(definedValues).reduce((acc, [key, value]) => {
            if (typeof value === "object" && value !== null && "toHexString" in value) {
                // TODO: Fix this type assertion
                // @ts-ignore
                acc[key] = value.toHexString();
            } else {
                // TODO: Fix this type assertion
                // @ts-ignore
                acc[key] = value;
            }
            return acc;
        }, {});
        setCustomizableTheme({
            ...customizableTheme,
            token: {
                ...customizableTheme.token,
                ...convertedValues,
            },
        });
    };

    if (customizableTheme.token && allSeedTokenProperties.length > 0) {
        return (
            <Form
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                layout="vertical"
                onValuesChange={handleOnValuesChange}
            >
                <Row gutter={[24, 12]}>
                    {allSeedTokenProperties.map((property) => {
                        let type = typeof customizableTheme.token?.[property];
                        let value = customizableTheme.token?.[property] ?? null;

                        const renderFormItem = () => {
                            if (type === "string") {
                                if (value?.toString().startsWith("#") || property.startsWith("color")) {
                                    // If color, display color picker
                                    return (
                                        <ColorPicker
                                            defaultValue={value as string}
                                            defaultFormat="hex"
                                            format="hex"
                                            showText
                                            disabledAlpha
                                        />
                                    );
                                } else if (property === "fontFamily") {
                                    // If font family, display font family selection
                                    return (
                                        <Select
                                            defaultValue="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol','Noto Color Emoji'"
                                            options={[
                                                {
                                                    value: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol','Noto Color Emoji'",
                                                    label: "System Font",
                                                },
                                                { value: "var(--font-inter)", label: "Inter" },
                                                { value: "var(--font-lato)", label: "Lato" },
                                                { value: "var(--font-montserrat)", label: "Montserrat" },
                                                { value: "var(--font-open-sans)", label: "Open Sans" },
                                                { value: "var(--font-oswald)", label: "Oswald" },
                                                { value: "var(--font-playfair)", label: "Playfair Display" },
                                                { value: "var(--font-poppins)", label: "Poppins" },
                                                { value: "var(--font-raleway)", label: "Raleway" },
                                                { value: "var(--font-roboto)", label: "Roboto" },
                                                { value: "var(--font-source-sans-pro)", label: "Source Sans Pro" },
                                            ]}
                                        />
                                    );
                                } else if (property === "fontFamilyCode") {
                                    return (
                                        <Select
                                            defaultValue="'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace"
                                            options={[
                                                {
                                                    value: "'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace",
                                                    label: "System Font",
                                                },
                                                { value: "var(--font-source-code-pro)", label: "Source Code Pro" },
                                                { value: "var(--font-ubuntu)", label: "Ubuntu" },
                                            ]}
                                        />
                                    );
                                } else if (property === "lineType") {
                                    return (
                                        <Select
                                            defaultValue="solid"
                                            options={[
                                                { value: "solid", label: "Solid" },
                                                { value: "dashed", label: "Dashed" },
                                                { value: "dotted", label: "Dotted" },
                                            ]}
                                        />
                                    );
                                } else {
                                    return <Input defaultValue={value as string} />;
                                }
                            } else if (type === "number") {
                                return <InputNumber defaultValue={value as number} />;
                            } else if (type === "boolean") {
                                return (
                                    <Switch
                                        checkedChildren="true"
                                        unCheckedChildren="false"
                                        defaultChecked={value as boolean}
                                    />
                                );
                            }
                        };

                        return (
                            <Col xs={24} sm={12} xl={8} key={property}>
                                <Form.Item label={property} name={property}>
                                    {renderFormItem()}
                                </Form.Item>
                            </Col>
                        );
                    })}
                </Row>
            </Form>
        );
    }
};

export default SeedTokensForm;
