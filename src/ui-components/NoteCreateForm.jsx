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
import { Storage } from "@aws-amplify/storage"


export default function NoteCreateForm(props) {
  const {
    clearOnSuccess = true,
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
    title: "",
    image: "",
    description: "",
    color: "#ffffff",
  };
  const [title, setTitle] = React.useState(initialValues.title);
  const [image, setImage] = React.useState(initialValues.image);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [color, setColor] = React.useState(initialValues.color);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setTitle(initialValues.title);
    setImage(initialValues.image);
    setDescription(initialValues.description);
    setColor(initialValues.color);
    setErrors({});
    setFormBgColor("#ffffff");
    setUploadedFileKey("");
    setResetKey(resetKey + 1);
  };

  // used to know which image to delete when the user click the "Clear" button
  const [uploadedFileKey, setUploadedFileKey] = React.useState("");

  //this is used to indicate to the DragDropFileInput component that the user created a new note, so it should reset its own state.
  const [resetKey, setResetKey] = React.useState(0);

  //function passed to the DragDropFileInput component to handle the file upload
  const handleFileSelect = async (file) => {

    try {
      const result = await Storage.put(file.name, file, {
        contentType: file.type,
        level: 'public',
      });

      // Update the image field with the URL of the uploaded file
      setImage(result.key);

      // Update the image field with the S3 file key
      console.log('Uploaded file name:', result.key);
      
      // used to know which image to delete when the user click the "Clear" button
      setUploadedFileKey(result.key);
      
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };


  // used to change the background color of the form
  const [formBgColor, setFormBgColor] = React.useState("#ffffff");

  const validations = {
    title: [{ type: "Required" }],
    image: [],
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
  const colors = [
    { name: "yellow", hex: "#fff475" },
    { name: "blue", hex: "#cbf0f8" },
    { name: "pink", hex: "#fdcfe8" },
    { name: "orange", hex: "#fbbc04" },
    { name: "purple", hex: "#d7aefb" },
    { name: "gray", hex: "#e8eaed" },
  ];
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      style={{ backgroundColor: formBgColor }}

      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          title,
          image,
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
          await DataStore.save(new Note(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "NoteCreateForm")}
      {...rest}
    >
      <DragDropFileInput 
      
        onFileSelect={handleFileSelect} 
        //this tells DragDropFileInput to reset its state 
        resetKey={resetKey} />
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
                title,
                image: value,
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
              title: value,
              image,
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
              title,
              image,
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
      <VisuallyHidden>
        <SelectField
          label="Color"
          placeholder="Please select an option"
          isDisabled={false}
          value={color}
          onChange={(e) => {
            let { value } = e.target;
            if (onChange) {
              const modelFields = {
                title,
                image,
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
      </VisuallyHidden>
      <Flex>
        {colors.map((colorObj) => (
          <div
            key={colorObj.name}
            style={{
              backgroundColor: colorObj.hex,
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              cursor: "pointer",
            }}
            onClick={() => {
              setColor(colorObj.hex);
              setFormBgColor(colorObj.hex);
            }}
          />
        ))}
      </Flex>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          // Clear the form and delete the file from S3
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
            if (uploadedFileKey) {
              // Delete the file from S3
              Storage.remove(uploadedFileKey)
                .then(() => console.log("Deleted file:", uploadedFileKey))
                .catch((error) =>
                  console.error("Error deleting file:", uploadedFileKey, error)
                );
            }
            setUploadedFileKey("");
          }}
          {...getOverrideProps(overrides, "ClearButton")}
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
            children="Create"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
