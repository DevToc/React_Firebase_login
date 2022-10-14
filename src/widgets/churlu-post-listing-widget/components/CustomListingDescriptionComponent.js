import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import {
  customListingDescriptionMapStateToProps,
  customListingDescriptionMapDispatchToProps,
} from "../models";
import { customListingDescriptionStyle } from "../style";
import { updateFormStore } from "../../../utils";
import * as _ from "lodash";
import { DynamicFormComponent } from "../../../components/dynamic-form-component/DynamicFormComponent";
import { Grid } from "@material-ui/core";
import { FieldType } from "../utils";

const CustomListingDescriptionComponent = ({
  additionalProps,
  listingForm,
}) => {
  const properties = _.get(additionalProps, "properties");

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateFormStore({ form: "listingForm", field: name, value: value });
  };

  const handleToggleChange = (e) => {
    const { checked, name } = e.target;
    updateFormStore({ form: "listingForm", field: name, value: checked });
  };

  useEffect(() => {
    !_.isEmpty(properties) &&
      properties.forEach((prop) => {
        if (
          prop.options?.length > 0 &&
          !_.get(listingForm, `${prop.field}.value`)
        ) {
          updateFormStore({
            form: "listingForm",
            field: prop.field,
            value: prop.options[0],
          });
        } else if (
          prop.withDropdown &&
          prop.additionalProperty?.options?.length > 0 &&
          !_.get(listingForm, `${prop.field}.value`)
        ) {
          updateFormStore({
            form: "listingForm",
            field: prop.additionalProperty.name,
            value: prop.additionalProperty.options[0],
          });
        }
      });

    // eslint-disable-next-line
  }, [properties]);

  return (
    <>
      <StyledCustomListingDescription>
        <Grid
          style={{ marginTop: 12 }}
          container
          alignItems="center"
          spacing={3}
        >
          {!_.isEmpty(properties) &&
            properties.map((singleProperty, key) => {
              if (_.includes(_.get(singleProperty, 'hiddenFor'), _.get(listingForm, 'selectedCategory.value.name'))) {
                return null;
              }
              if (singleProperty.empty) {
                return <Grid item xs={singleProperty.columns || 6} />;
              }
              if (singleProperty.category) {
                return (
                  <Grid style={{ padding: 0, paddingLeft: 12 }} item xs={12}>
                    <h3 className="listing-category-label">
                      {singleProperty.category}
                    </h3>
                  </Grid>
                );
              }

              return _.includes(
                [FieldType.CHECKBOX],
                singleProperty.fieldType
              ) ? (
                  <>
                    <DynamicFormComponent
                      formComponentType={singleProperty.fieldType}
                      field={{
                        name: singleProperty.field,
                        label: singleProperty.label,
                        value: _.get(
                          listingForm,
                          `${singleProperty.field}.value`
                        ),
                        fullWidth: _.get(singleProperty, "fullWidth"),
                        isValid: _.get(
                          listingForm,
                          `${singleProperty.field}.isValid`,
                          true
                        ),
                        type: _.get(singleProperty, "type"),
                        options: _.get(singleProperty, "options", []),
                        additionalProperty: _.get(
                          singleProperty,
                          "additionalProperty",
                          {}
                        ),
                        className: _.get(singleProperty, "className", ""),
                      }}
                      listingForm={listingForm}
                      handleChange={handleChange}
                      handleToggleChange={handleToggleChange}
                      id={key}
                    />
                  </>
                ) : (
                  <Grid
                    item
                    style={{ paddingBottom: 0, marginBottom: 5, paddingTop: 0 }}
                    xs={
                      (_.includes(
                        [FieldType.SELECT_DROPDOWN, FieldType.TEXTBOX],
                        singleProperty.fieldType
                      ) &&
                        !singleProperty.additionalProperty) ||
                        singleProperty.withDropdown
                        ? 6
                        : 12
                    }
                    className="display-flex"
                  >
                    <DynamicFormComponent
                      formComponentType={singleProperty.fieldType}
                      field={{
                        name: singleProperty.field,
                        label: singleProperty.label,
                        value: _.get(
                          listingForm,
                          `${singleProperty.field}.value`
                        ),
                        fullWidth: _.get(singleProperty, "fullWidth"),
                        isValid: _.get(
                          listingForm,
                          `${singleProperty.field}.isValid`,
                          true
                        ),
                        type: _.get(singleProperty, "type"),
                        options: _.get(singleProperty, "options", []),
                        additionalProperty: _.get(
                          singleProperty,
                          "additionalProperty",
                          {}
                        ),
                        withDropdown: _.get(
                          singleProperty,
                          "withDropdown",
                          false
                        ),
                        additionalPropertyValue: _.get(
                          listingForm,
                          `${_.get(
                            singleProperty,
                            "additionalProperty.name"
                          )}.value`,
                          null
                        ),
                        className: _.get(singleProperty, "className", ""),
                      }}
                      handleChange={handleChange}
                      handleToggleChange={handleToggleChange}
                      id={key}
                    />
                  </Grid>
                );
            })}
        </Grid>
        <br />
      </StyledCustomListingDescription>
    </>
  );
};

const StyledCustomListingDescription = customListingDescriptionStyle;

export const CustomListingDescription = connect(
  customListingDescriptionMapStateToProps,
  customListingDescriptionMapDispatchToProps
)(memo(CustomListingDescriptionComponent));
