import React, { useState, useCallback, useRef, forwardRef, useImperativeHandle } from "react";
import { Input, Tag, Space } from "antd";
import type { InputRef, InputProps } from "antd";

export interface TagInputProps extends Omit<InputProps, "value" | "onChange"> {
    value?: string;
    onChange?: (value: string) => void;
    maxTags?: number;
    allowDuplicates?: boolean;
    separator?: string | RegExp;
}

interface TagInputRef extends InputRef {
    addTag: (tag: string) => void;
    removeTag: (index: number) => void;
    clearTags: () => void;
    getTags: () => string[];
}

const TagInput = forwardRef<TagInputRef, TagInputProps>(
    (
        {
            value = "",
            onChange,
            maxTags,
            allowDuplicates = false,
            separator = /[,\s]+/,
            placeholder = "Type and press Enter, comma, or space to add tags",
            disabled,
            style,
            className,
            ...inputProps
        },
        ref,
    ) => {
        const [inputValue, setInputValue] = useState("");
        const [tags, setTags] = useState<string[]>(() => {
            return value ? value.split(",").filter((tag) => tag.trim() !== "") : [];
        });
        const inputRef = useRef<InputRef>(null);

        // Sync tags when value prop changes
        React.useEffect(() => {
            const newTags = value ? value.split(",").filter((tag) => tag.trim() !== "") : [];
            setTags(newTags);
        }, [value]);

        const updateValue = useCallback(
            (newTags: string[]) => {
                const newValue = newTags.join(",");
                onChange?.(newValue);
            },
            [onChange],
        );

        const addTag = useCallback(
            (tagText: string) => {
                const trimmedTag = tagText.trim();

                if (!trimmedTag) return;

                // Check for duplicates if not allowed
                if (!allowDuplicates && tags.includes(trimmedTag)) {
                    return;
                }

                // Check max tags limit
                if (maxTags && tags.length >= maxTags) {
                    return;
                }

                const newTags = [...tags, trimmedTag];
                setTags(newTags);
                updateValue(newTags);
            },
            [tags, allowDuplicates, maxTags, updateValue],
        );

        const removeTag = useCallback(
            (indexToRemove: number) => {
                const newTags = tags.filter((_, index) => index !== indexToRemove);
                setTags(newTags);
                updateValue(newTags);
            },
            [tags, updateValue],
        );

        const clearTags = useCallback(() => {
            setTags([]);
            updateValue([]);
        }, [updateValue]);

        const getTags = useCallback(() => tags, [tags]);

        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newValue = e.target.value;

            // Check if the input contains separator characters
            const separatorRegex =
                typeof separator === "string"
                    ? new RegExp(`[${separator.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]`)
                    : separator;

            if (separatorRegex.test(newValue)) {
                // Split by separator and add all valid tags
                const potentialTags = newValue.split(separatorRegex);

                // Add all tags except the last one (which might be incomplete)
                const tagsToAdd = potentialTags.slice(0, -1);
                const lastPart = potentialTags[potentialTags.length - 1];

                tagsToAdd.forEach((tag) => {
                    if (tag.trim()) {
                        addTag(tag);
                    }
                });

                // Keep the last part as the new input value
                setInputValue(lastPart);
            } else {
                setInputValue(newValue);
            }
        };

        const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter" && inputValue.trim()) {
                e.preventDefault();
                addTag(inputValue);
                setInputValue("");
            } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
                // Remove last tag when backspace is pressed on empty input
                removeTag(tags.length - 1);
            }

            // Call original onKeyDown if provided
            inputProps.onKeyDown?.(e);
        };

        const handleTagClose = (indexToRemove: number) => {
            removeTag(indexToRemove);
        };

        // Expose methods via ref
        useImperativeHandle(
            ref,
            () => ({
                ...inputRef.current!,
                addTag,
                removeTag,
                clearTags,
                getTags,
            }),
            [addTag, removeTag, clearTags, getTags],
        );

        const containerStyle: React.CSSProperties = {
            border: "1px solid #d9d9d9",
            borderRadius: "6px",
            padding: "4px 8px",
            minHeight: "32px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "4px",
            cursor: "text",
            transition: "border-color 0.2s",
            backgroundColor: disabled ? "#f5f5f5" : "#ffffff",
            ...style,
        };

        const focusContainerStyle: React.CSSProperties = {
            ...containerStyle,
            borderColor: "#4096ff",
            boxShadow: "0 0 0 2px rgba(5, 145, 255, 0.1)",
        };

        const [isFocused, setIsFocused] = useState(false);

        const handleContainerClick = () => {
            if (!disabled) {
                inputRef.current?.focus();
            }
        };

        const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(true);
            inputProps.onFocus?.(e);
        };

        const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false);

            // Add remaining input as tag on blur if it's not empty
            if (inputValue.trim()) {
                addTag(inputValue);
                setInputValue("");
            }

            inputProps.onBlur?.(e);
        };

        return (
            <div
                style={isFocused ? focusContainerStyle : containerStyle}
                className={className}
                onClick={handleContainerClick}
                data-testid="tag-input-container"
            >
                <Space size={[4, 4]} wrap style={{ flex: 1 }}>
                    {tags.map((tag, index) => (
                        <Tag
                            key={`${tag}-${index}`}
                            closable={!disabled}
                            onClose={() => handleTagClose(index)}
                            style={{ margin: 0 }}
                        >
                            {tag}
                        </Tag>
                    ))}
                    <Input
                        {...inputProps}
                        ref={inputRef}
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        placeholder={tags.length === 0 ? placeholder : ""}
                        disabled={disabled}
                        bordered={false}
                        data-testid="tag-input-field"
                        style={{
                            border: "none",
                            outline: "none",
                            boxShadow: "none",
                            padding: 0,
                            minWidth: "120px",
                            flex: 1,
                        }}
                    />
                </Space>
            </div>
        );
    },
);

TagInput.displayName = "TagInput";

export default TagInput;
