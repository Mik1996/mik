import { minLength, pattern, required, schema, Schema } from "@angular/forms/signals";
import { strongPasswordRegex } from "./regex";

export const nameSchema: Schema<string> = schema((path) => {
  required(path, { message: 'REQUIRED_FIELD' });
  minLength(path, 3, { message: 'MINLENGHT_3_FIELD' });
});

export const passwordSchema: Schema<string> = schema((path) => {
  required(path, { message: 'REQUIRED_FIELD' }),
  pattern(path, strongPasswordRegex, { message: 'WEAK_PASSWORD'})
});
