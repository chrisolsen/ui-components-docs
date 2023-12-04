import { GoAAccordion } from "@abgov/react-components";
import { useContext, useEffect, useState } from "react";
import { LanguageContext } from "@components/sandbox";

import css from "./ComponentProperties.module.css";

export type ComponentProperty = {
  name: string;
  type?: string | string[];
  lang?: "react" | "angular";
  required?: boolean;
  description?: string;
  defaultValue?: string;
};

interface Props {
  properties: ComponentProperty[];
  heading?: string;
}

export const ComponentProperties = (props: Props) => {
  const lang = useContext(LanguageContext);
  const [filteredProperties, setFilteredProperties] = useState<ComponentProperty[]>([]);

  const filterBy = (properties: ComponentProperty[]) => {
    const result = properties.filter((child: ComponentProperty) => {
      return !child.lang || child.lang === lang;
    });
    return result;
  };

  useEffect(() => {
    setFilteredProperties([...filterBy(props.properties)]);
  }, [lang]);

  return (
    <GoAAccordion heading={props.heading || "Component properties"} mt="xl">
      {filteredProperties.map((props, index) => (
        <ComponentProperty key={index} props={props} />
      ))}
    </GoAAccordion>
  );
};

interface ComponentPropertyProps {
  props: ComponentProperty;
}

function ComponentProperty({ props }: ComponentPropertyProps) {
  return (
    <div className={css["component-props"]}>
      <div className={css.details}>
        <code className={`${css.code} ${css.name}`}>{props.name}</code>

        {props.type && (
          <code className={`${css.code} ${css.type}`}>
            {typeof props.type === "string" ? props.type : props.type.join(" | ")}
          </code>
        )}
      </div>

      <div className={css.description}>
        {props.required && <span>Required. </span>}
        {props.description}
        {props.defaultValue && (
          <span>
            {" "}
            Defaults to <code className={css.code}>{props.defaultValue}</code>.
          </span>
        )}
      </div>
    </div>
  );
}
