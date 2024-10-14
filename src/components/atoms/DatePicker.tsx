/* eslint-disable jsx-a11y/accessible-emoji */
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as React from "react";
import { ViewStyle } from "react-native";

export type DisplayType =
  | "spinner"
  | "calendar"
  | "clock"
  | "compact"
  | "default"
  | "inline";

export type ModeType = "date";

export interface DatePickerProps {
  maxDate?: Date;
  value: Date;
  display?: DisplayType | undefined;
  mode?: ModeType;
  style?: ViewStyle;
  onChange: (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => void;
}

// const MODE_VALUES = Platform.select({
//   ios: Object.values(IOS_MODE),
//   android: Object.values(ANDROID_MODE),
//   windows: [],
// });
// const DISPLAY_VALUES = Platform.select({
//   ios: Object.values(IOS_DISPLAY),
//   android: Object.values(ANDROID_DISPLAY),
//   windows: [],
// });
// Types of property 'mode' are incompatible.
// Type 'ModeType' is not assignable to type 'AndroidMode | undefined'.

const DatePicker: React.FC<DatePickerProps> = ({
  maxDate = new Date(),
  value,
  display,
  mode,
  style,
  onChange,
}: DatePickerProps) => {
  return (
    <DateTimePicker
      testID="dateTimePicker"
      value={value}
      maximumDate={maxDate}
      mode={mode}
      is24Hour
      display={display}
      onChange={(
        event: DateTimePickerEvent,
        selectedDate: Date | undefined,
      ): void => onChange(event, selectedDate)}
      style={style}
    />
  );
};
export default DatePicker;
