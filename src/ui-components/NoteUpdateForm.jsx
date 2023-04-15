/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SelectField,
  TextField,
  VisuallyHidden
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Note } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
import DragDropFileInput from '../dragDropInput/DragDropFileInput';

export default function NoteUpdateForm(props) {
  const {
    id: idProp,
    note: noteModelProp,
    onSuccess,
    onError,
    onSubmit,
    onCancel,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    image: "",
    title: "",
    description: "",
    color: "",
  };
  const [image, setImage] = React.useState(initialValues.image);
  const [title, setTitle] = React.useState(initialValues.title);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [color, setColor] = React.useState(initialValues.color);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = noteRecord
      ? { ...initialValues, ...noteRecord }
      : initialValues;
    setImage(cleanValues.image);
    setTitle(cleanValues.title);
    setDescription(cleanValues.description);
    setColor(cleanValues.color);
    setErrors({});
    
  };
  const [noteRecord, setNoteRecord] = React.useState(noteModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Note, idProp)
        : noteModelProp;
      setNoteRecord(record);
      console.log("record", record)
    };
    queryData();
  }, [idProp, noteModelProp]);
  React.useEffect(resetStateValues, [noteRecord]);
  const validations = {
    image: [],
    title: [{ type: "Required" }],
    description: [],
    color: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          image,
          title,
          description,
          color,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value.trim() === "") {
              modelFields[key] = undefined;
            }
          });
          await DataStore.save(
            Note.copyOf(noteRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "NoteUpdateForm")}
      {...rest}
    >
    <DragDropFileInput />
    <VisuallyHidden>
      <TextField
        label="Image"
        isRequired={false}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image: value,
              title,
              description,
              color,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
    </VisuallyHidden>
      <TextField
        label="Title"
        isRequired={true}
        isReadOnly={false}
        value={title}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image,
              title: value,
              description,
              color,
            };
            const result = onChange(modelFields);
            value = result?.title ?? value;
          }
          if (errors.title?.hasError) {
            runValidationTasks("title", value);
          }
          setTitle(value);
        }}
        onBlur={() => runValidationTasks("title", title)}
        errorMessage={errors.title?.errorMessage}
        hasError={errors.title?.hasError}
        {...getOverrideProps(overrides, "title")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image,
              title,
              description: value,
              color,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <SelectField
        label="Color"
        placeholder="Please select an option"
        isDisabled={false}
        value={color}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image,
              title,
              description,
              color: value,
            };
            const result = onChange(modelFields);
            value = result?.color ?? value;
          }
          if (errors.color?.hasError) {
            runValidationTasks("color", value);
          }
          setColor(value);
        }}
        onBlur={() => runValidationTasks("color", color)}
        errorMessage={errors.color?.errorMessage}
        hasError={errors.color?.hasError}
        {...getOverrideProps(overrides, "color")}
      >
        <option
          children="#fff475"
          value="#fff475"
          {...getOverrideProps(overrides, "coloroption0")}
        ></option>
        <option
          children="#cbf0f8"
          value="#cbf0f8"
          {...getOverrideProps(overrides, "coloroption1")}
        ></option>
        <option
          children="#fdcfe8"
          value="#fdcfe8"
          {...getOverrideProps(overrides, "coloroption2")}
        ></option>
        <option
          children="#fbbc04"
          value="#fbbc04"
          {...getOverrideProps(overrides, "coloroption3")}
        ></option>
        <option
          children="#d7aefb"
          value="#d7aefb"
          {...getOverrideProps(overrides, "coloroption4")}
        ></option>
        <option
          children="#e8eaed"
          value="#e8eaed"
          {...getOverrideProps(overrides, "coloroption5")}
        ></option>
      </SelectField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || noteModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Cancel"
            type="button"
            onClick={() => {
              onCancel && onCancel();
            }}
            {...getOverrideProps(overrides, "CancelButton")}
          ></Button>
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || noteModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
